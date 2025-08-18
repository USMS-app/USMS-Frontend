## USMS Backend MVP (Node.js) — Multi‑Tenant Architecture

This README documents the MVP backend plan for USMS using plain Node.js (Express) and PostgreSQL, designed for a single frontend serving many schools, with a routing (directory) server that forwards each request to a dedicated per‑school backend and database.

- One React SPA frontend (already present)
- One Directory (Logic/Router) Server + its own DB
- Many School API Servers (one per school) + one Postgres DB per school

The directory server owns school provisioning and routes API requests from the frontend to each school’s backend, keeping data stores isolated (no shared multi‑tenant tables).


## Technology Stack

- Node.js 20+, Express 5
- PostgreSQL 15+
- Prisma ORM + Prisma Migrate
- Zod (request validation)
- JWT (access/refresh), bcrypt (password hashing)
- pino (structured logging), helmet (security), cors, rate-limiter-flexible
- dotenv (config), OpenAPI (optional, later), vitest + supertest (tests)


## High‑Level Topology

```
Frontend (React SPA)
      |
      v
Directory Server (router + registry + owner dashboard)
      |                 |                 |
      v                 v                 v
School API (A)     School API (B)    School API (C)
Postgres (A)       Postgres (B)      Postgres (C)
```

- The frontend sends the selected school code (from a dropdown) to the directory server.
- The directory resolves the school and either proxies or returns the school API base URL.
- Each school has its own backend and its own database.


## Minimal Frontend Change (Login)

- Add a school dropdown for Teacher and Student roles.
- Populate options from `GET /public/schools` on the directory server.
- Submit login to `POST /proxy/{schoolCode}/auth/login` (recommended) or resolve once via `GET /resolve?code=X` and call the school API directly.


## Services and Folder Structure

Two small Express codebases:

```
directory/
  src/
    index.ts
    config.ts
    logger.ts
    prisma.ts
    middlewares/ (authOwner, rateLimit, error, bodyRaw)
    routes/
      public.ts      // /public/schools, /resolve
      proxy.ts       // /proxy/:code/*
      owner.ts       // owner auth + schools CRUD + provision trigger
    services/
      tenants.ts
      proxy.ts
  prisma/
    schema.prisma

school-api/
  src/
    index.ts
    config.ts
    logger.ts
    prisma.ts
    middlewares/ (authJwt, roleGuard, zodValidate, rateLimit, error)
    modules/
      auth/
      users/
      teachers/
      students/
      academic/     // years, grades, sections
      enrollments/
      sessions/     // timetable sessions
      attendance/
      assignments/
      announcements/
      settings/
    utils/
      hash.ts, jwt.ts, pagination.ts
  prisma/
    schema.prisma
```


## Directory Server

Purpose: school registry and request router.

Endpoints:
- `GET /public/schools` → `[ { code, name } ]` for login dropdown
- `GET /resolve?code=XYZ` → `{ apiBaseUrl }` (optional if proxying)
- `POST /proxy/:code/*` → forwards to target school API (keeps same origin)
- Owner dashboard (later): `POST /owner/schools`, `PATCH /owner/schools/:id`, `POST /owner/schools/:id/provision`

Express proxy sketch:

```ts
// middleware to capture raw body for proxying when needed
app.use((req, _res, next) => {
  let data: Buffer[] = [];
  req.on("data", (c) => data.push(c));
  req.on("end", () => {
    (req as any).bodyRaw = Buffer.concat(data);
    next();
  });
});

app.post("/proxy/:code/*", async (req, res) => {
  const { code } = req.params;
  const tenant = await prisma.tenant.findUnique({ where: { code } });
  if (!tenant?.apiBaseUrl || tenant.status !== "ACTIVE") {
    return res.status(404).json({ error: "School not found" });
  }
  const targetPath = req.originalUrl.replace(`/proxy/${code}`, "");
  const targetUrl = new URL(targetPath, tenant.apiBaseUrl).toString();

  const r = await fetch(targetUrl, {
    method: req.method,
    headers: { ...req.headers, host: undefined } as any,
    body: ["GET","HEAD"].includes(req.method) ? undefined : (req as any).bodyRaw,
  });
  res.status(r.status);
  r.body?.pipe(res);
});
```

Directory DB (Prisma models, minimal):

```prisma
model Tenant {
  id          String   @id @default(uuid())
  code        String   @unique
  name        String
  subdomain   String?
  apiBaseUrl  String?
  status      TenantStatus @default(PENDING)
  plan        String?
  createdAt   DateTime @default(now())
}

enum TenantStatus { PENDING ACTIVE SUSPENDED }

model OwnerUser {
  id            String   @id @default(uuid())
  email         String   @unique
  password_hash String
  is_active     Boolean  @default(true)
  createdAt     DateTime @default(now())
}

model ProvisioningJob {
  id         String   @id @default(uuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  status     String
  logs       Json?
  createdAt  DateTime @default(now())
  finishedAt DateTime?
}
```

Environment (`directory/.env`):

```env
PORT=4000
DATABASE_URL=postgres://user:pass@host:5432/usms_directory
JWT_SECRET=change_me_for_owner_dashboard
ALLOWED_ORIGINS=http://localhost:5173
```


## School API Server (per school)

MVP Endpoints:
- Auth: `POST /auth/login`, `POST /auth/refresh`, `GET /auth/me`
- Users: `GET/POST/PATCH /users`
- Teachers: `GET/POST/PATCH /teachers`
- Students: `GET/POST/PATCH /students`
- Academic: `GET/POST /academic-years`, `grades`, `sections`
- Enrollment: `POST /enrollments`, `GET /students/:id/enrollments`
- Sessions: `POST/GET /sessions` (basic timetable entries)
- Attendance: `POST /attendance/mark`, `GET /attendance?sectionId&date`
- Assignments: `POST/GET /assignments`, `POST /assignments/:id/submissions`
- Announcements: `POST/GET /announcements`
- Settings: `GET /settings/school`, `PATCH /settings/school`

Auth login sketch:

```ts
app.post("/auth/login", zValidate(loginSchema), async (req, res) => {
  const { username, password, role, teacherId } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !user.is_active) return res.status(401).json({ error: "Invalid credentials" });
  if (role && user.role != role) return res.status(403).json({ error: "Role mismatch" });
  if (role === "TEACHER" && teacherId) {
    const t = await prisma.teacherProfile.findUnique({ where: { user_id: user.id } });
    if (!t || t.teacher_code !== teacherId) return res.status(401).json({ error: "Invalid teacher ID" });
  }
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const accessToken = signJwt({ sub: user.id, role: user.role }, "15m");
  const refreshToken = crypto.randomUUID();
  await prisma.authSession.create({ data: { user_id: user.id, refresh_token: refreshToken, expires_at: addDays(new Date(), 30) }});
  res.json({ accessToken, refreshToken });
});
```

School DB (Prisma models — MVP subset):

```prisma
enum Role { OWNER ADMIN TEACHER STUDENT PARENT }

model User {
  id            String   @id @default(uuid())
  username      String   @unique
  email         String?  @unique
  password_hash String
  role          Role
  is_active     Boolean  @default(true)
  last_login_at DateTime?
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt

  teacher_profile TeacherProfile?
  student_profile StudentProfile?
}

model AuthSession {
  id           String   @id @default(uuid())
  user_id      String
  user         User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  refresh_token String  @unique
  expires_at   DateTime
  created_at   DateTime @default(now())
  revoked_at   DateTime?
}

model TeacherProfile {
  user_id      String  @id
  user         User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  teacher_code String? @unique
  first_name   String
  last_name    String
  hire_date    DateTime?
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt
}

model StudentProfile {
  user_id      String  @id
  user         User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  admission_no String? @unique
  first_name   String
  last_name    String
  dob          DateTime?
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt
}

model AcademicYear {
  id         String   @id @default(uuid())
  code       String   @unique
  name       String
  starts_on  DateTime
  ends_on    DateTime
  is_current Boolean  @default(false)
  created_at DateTime @default(now())
}

model Grade {
  id         String   @id @default(uuid())
  code       String   @unique
  name       String
  order_no   Int
  created_at DateTime @default(now())
}

model Section {
  id         String   @id @default(uuid())
  grade_id   String
  grade      Grade    @relation(fields: [grade_id], references: [id], onDelete: Cascade)
  name       String
  capacity   Int?
  created_at DateTime @default(now())

  @@unique([grade_id, name])
}

model StudentEnrollment {
  id                String   @id @default(uuid())
  student_user_id   String
  student           StudentProfile @relation(fields: [student_user_id], references: [user_id], onDelete: Cascade)
  academic_year_id  String
  academic_year     AcademicYear   @relation(fields: [academic_year_id], references: [id], onDelete: Cascade)
  section_id        String
  section           Section        @relation(fields: [section_id], references: [id])
  roll_no           Int?
  status            String  @default("ACTIVE")
  joined_on         DateTime @default(now())
  left_on           DateTime?

  @@unique([student_user_id, academic_year_id])
}

model ClassSession {
  id             String   @id @default(uuid())
  section_id     String
  section        Section  @relation(fields: [section_id], references: [id], onDelete: Cascade)
  starts_at      DateTime
  ends_at        DateTime
  created_at     DateTime @default(now())
}

model AttendanceEntry {
  id               String   @id @default(uuid())
  class_session_id String
  class_session    ClassSession @relation(fields: [class_session_id], references: [id], onDelete: Cascade)
  student_user_id  String
  student          StudentProfile @relation(fields: [student_user_id], references: [user_id], onDelete: Cascade)
  status           String
  marked_by_user_id String
  marked_at        DateTime @default(now())

  @@unique([class_session_id, student_user_id])
}

model Assignment {
  id          String   @id @default(uuid())
  section_id  String
  section     Section  @relation(fields: [section_id], references: [id], onDelete: Cascade)
  title       String
  description String?
  due_at      DateTime?
  max_marks   Int      @default(100)
  created_at  DateTime @default(now())
}

model AssignmentSubmission {
  id               String   @id @default(uuid())
  assignment_id    String
  assignment       Assignment @relation(fields: [assignment_id], references: [id], onDelete: Cascade)
  student_user_id  String
  student          StudentProfile @relation(fields: [student_user_id], references: [user_id], onDelete: Cascade)
  submitted_at     DateTime?
  content_url      String?
  marks_obtained   Int?
  graded_at        DateTime?

  @@unique([assignment_id, student_user_id])
}

model Announcement {
  id          String   @id @default(uuid())
  title       String
  body        String
  created_at  DateTime @default(now())
}

model SchoolSettings {
  id         String   @id @default(uuid())
  name       String
  code       String   @unique
  timezone   String   @default("Asia/Kolkata")
  locale     String   @default("en-IN")
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

Environment (`school-api/.env`):

```env
PORT=4100
DATABASE_URL=postgres://user:pass@host:5432/usms_school_ABC
JWT_SECRET=change_me_per_school
ALLOWED_ORIGINS=http://localhost:5173
```


## Provisioning Flow (New School)

1. Owner creates a school in directory: `POST /owner/schools { code, name, plan }` → `PENDING`.
2. Provision job:
   - Create a new Postgres database `usms_{code}`.
   - Run Prisma migrate for `school-api` against that DB.
   - Seed: admin user + `school_settings` rows.
   - Start a `school-api` container with `DATABASE_URL=.../usms_{code}`.
   - Update tenant row with `api_base_url` and set `status=ACTIVE`.
3. `GET /public/schools` now includes the new school; frontend dropdown shows it.

Example (script outline):

```bash
createdb usms_${CODE}
docker run --rm \
  -e DATABASE_URL=postgres://user:pass@db:5432/usms_${CODE} \
  ghcr.io/yourorg/school-api:latest \
  sh -lc "npx prisma migrate deploy && node dist/seed.js"

# bring up the service (compose or infra as code)
docker compose up -d school-${CODE}
```


## Security & Operations

- Directory does NOT store per‑school user passwords; it stores owner users and provisioning metadata only.
- Short‑lived access tokens (e.g., 15m) + refresh tokens persisted in `auth_sessions`.
- Rate‑limit login and proxy endpoints; enable `helmet`, strict CORS (or prefer proxying to keep same origin).
- Per‑school DB backups and rotation; tag logs/metrics by school code; health checks at `/health`.


## Local Development

Prerequisites: Node 20+, Docker, Postgres 15+.

1) Directory service
- `cd directory`
- `cp .env.example .env` and fill values
- `npm i`
- `npx prisma migrate dev`
- `npm run dev`

2) School service (first school)
- `cd school-api`
- `cp .env.example .env` → point `DATABASE_URL` to a local DB (e.g., `usms_demo`)
- `npm i`
- `npx prisma migrate dev`
- `npm run dev`

3) Frontend
- Already set up; add the school dropdown and call directory endpoints.


## API Contracts (MVP examples)

Auth (school API):

```http
POST /auth/login
Content-Type: application/json

{ "username": "alice", "password": "***", "role": "TEACHER", "teacherId": "T-1001" }

200 { "accessToken": "...", "refreshToken": "..." }
401/403 on errors
```

Attendance (school API):

```http
POST /attendance/mark
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "classSessionId": "uuid",
  "entries": [ { "studentUserId": "uuid", "status": "PRESENT" } ]
}
```

Directory public listing:

```http
GET /public/schools
200 [ { "code": "ABC", "name": "ABC Public School" } ]
```


## What to Build First

1. Directory: `/public/schools`, `/resolve`, `/proxy/:code/*`
2. School API: auth, users, teachers, students
3. Academic structure: years, grades, sections; enrollment
4. Sessions + attendance; assignments + submissions
5. Announcements; school settings


## Notes

- Keep services small and explicit; add modules only when needed.
- Prefer directory proxying for simplicity (no CORS headaches and a single API base URL in the frontend).
- Each school can be versioned/rolled out independently via the directory’s registry.

