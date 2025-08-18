## USMS Frontend Workflows and Feature Map (Developer Guide)

This guide summarizes the current frontend (React + Vite + shadcn/ui) pages, roles, and user flows to help backend developers design and implement the API and database correctly.


## Roles and Routes

The app supports four roles with dedicated sections. Router map:

```text
/                        → Login

/student                → StudentLayout
  • (index)             → StudentHome
  • /profile            → StudentProfile
  • /attendance         → Student Attendance view
  • /academics          → Subjects, tests, grades

/admin                  → AdminLayout
  • (index)             → AdminHome (KPIs, recent activity)
  • /classes            → Classes list
  • /classes/:classId   → ClassDetail (class roster, subjects, teachers)
  • /teachers           → Teachers management
  • /students           → Students management
  • /report-scheduling  → Automated report scheduling (WhatsApp/Email)

/teacher                → TeacherLayout (ProtectedRoute + TeacherAuthProvider)
  • (index)             → TeacherHome
  • /class-teacher      → ClassTeacherDashboard (marks, attendance, reports)
  • /subject-teacher    → SubjectTeacherDashboard (by subject)
  • /attendance         → TeacherAttendance (requireClassTeacher)
  • /analytics          → TeacherAnalytics (requireClassTeacher)

/owner                  → OwnerLayout (platform owner)
  • (index)             → OwnerHome
  • /schools            → Schools list
  • /schools/new        → AddSchool (provisioning form)
  • /schools/:id        → SchoolDetail
  • /analytics          → Directory analytics
  • /settings           → Directory settings
```

Notes:
- Teacher routes are guarded by `ProtectedRoute` and use `TeacherAuthContext` (mocked now; will be API-backed). The login page will also include a school selector for Teacher/Student roles.


## Page Features and Expected Backend Capabilities

### Login
- Role tabs: Admin, Teacher, Student/Parent
- Fields: username, password; Teacher role adds Teacher ID; Captcha check
- Planned: School dropdown for Teacher and Student
- Backend:
  - `POST /auth/login` → returns `{ accessToken, refreshToken }`
  - Validate `role`; for Teacher, verify `teacherId` matches teacher profile
  - Directory: `GET /public/schools` (options), proxy `POST /proxy/:schoolCode/auth/login`

### Student Area
- StudentHome: summary widgets
- StudentProfile: personal details, guardians
- Attendance: calendar/summary view
- Academics: subjects, recent tests/marks
- Backend:
  - `GET /auth/me`
  - `GET /students/me` (profile + guardians)
  - `GET /attendance?studentId=me&from&to`
  - `GET /grades?studentId=me`

### Admin Area
- AdminHome: KPIs (total classes, teachers, students) and recent activity
- Classes (list): search, sort, add class; actions view/edit/delete; navigate to `ClassDetail`
- ClassDetail: class info, class teacher, subjects, teachers, student roster with parent contacts
- Teachers: list with search/sort; add/edit/delete; assign subjects and classes; flag as class teacher
- Students: list with search/filter; details include demographics, parent contacts, attendance stats, academic performance, recent tests
- Report Scheduling: define recurring jobs (weekly/monthly/custom), recipients (all or class-level), channels (WhatsApp/Email/SMS), status (active/paused); preview and manual run
- Backend:
  - Classes/Sections
    - `GET /grades`, `POST /grades`
    - `GET /sections?gradeId`, `POST /sections`, `PATCH /sections/:id`, `DELETE /sections/:id`
  - Teachers
    - `GET /teachers`, `POST /teachers`, `PATCH /teachers/:id`, `DELETE /teachers/:id`
    - `GET /teacher-assignments?teacherId|sectionId`, `POST /teacher-assignments`
  - Students
    - `GET /students`, `POST /students`, `PATCH /students/:id`
    - `POST /enrollments`, `GET /students/:id/enrollments`
    - `GET /students/:id/attendance`, `GET /students/:id/grades`
  - Report Scheduling
    - `GET /report-schedules`, `POST /report-schedules`, `PATCH /report-schedules/:id`, `DELETE /report-schedules/:id`
    - `POST /report-schedules/:id/run` (manual trigger)

### Teacher Area
- TeacherHome: quick summary of assigned classes and tasks
- ClassTeacherDashboard:
  - Manage class roster
  - Create/select tests (FA1/FA2/Mid/Final)
  - Enter marks and attendance for selected date
  - Generate/send class reports to parents (WhatsApp/Email)
- SubjectTeacherDashboard: similar, oriented by subject across multiple classes
- Attendance: choose class + date, toggle present/absent, bulk set, filter, export/import
- Analytics: class KPIs for class teachers
- Backend:
  - `GET /teacher/classes` (assigned sections/subjects)
  - `GET /students?sectionId`
  - `POST /attendance/mark` (bulk per class and date)
  - `GET /attendance?sectionId&date`
  - `POST /assignments` or `POST /tests` (depending on naming)
  - `POST /marks/bulk` or `POST /assignments/:id/submissions`
  - `POST /announcements` (optional for class communication)

### Owner (Directory) Area
- Schools: list with search, filters (status/city), pagination; open detail; delete
- AddSchool: create a school record (code, name, contacts, city/state); triggers provisioning
- SchoolDetail: school info, status, stats (students/teachers/classes)
- Analytics/Settings: directory-level
- Backend (directory service):
  - `GET /public/schools`
  - `POST /owner/schools`, `PATCH /owner/schools/:id`, `DELETE /owner/schools/:id`
  - `POST /owner/schools/:id/provision` → create DB, run migrations, deploy school API, set `apiBaseUrl`
  - `GET /resolve?code=...`, `POST /proxy/:code/*`


## Key User Flows (End-to-End)

1) School provisioning (Owner)
- Create school → Provision job creates DB and School API → Update directory with `apiBaseUrl` and status ACTIVE → Appears in `/public/schools` for login dropdown.

2) Admin setup
- Create grades and sections → Add teachers → Assign class teachers and subjects → Add students → Enroll students into sections for current academic year.

3) Daily operations (Teacher)
- Class teacher selects class and date → Marks attendance → Creates a test (or assignment) → Enters marks → Optionally triggers class report broadcast.

4) Student/Parent portal
- Login → View profile, attendance summary, and academic results.

5) Automated reports (Admin)
- Configure schedule (frequency, recipients, channels) → Service sends reports (WhatsApp/Email) at schedule → View delivery stats.


## Data Model Mapping (Frontend → Backend → DB)

- User and Roles → `users(role)`; teacher/student/parent profiles → `teacher_profiles`, `student_profiles`, `parent_profiles`; relationships via `student_guardians`.
- Academic structure → `academic_years`, `grades`, `sections`, `subjects`.
- Enrollment → `student_enrollments(student_user_id, academic_year_id, section_id)` unique per year.
- Teacher assignments → `teacher_assignments(teacher_user_id, section_id, subject_id, academic_year_id)`.
- Sessions/Timetable → `class_sessions(section_id, subject_id, starts_at, ends_at)`.
- Attendance → `attendance_entries(class_session_id, student_user_id, status)` with enum.
- Assessments → either `assignments` + `assignment_submissions` (MVP) or `exams`, `exam_papers`, `exam_marks` later.
- Announcements/Notifications → `announcements`, `notifications`.
- Report scheduling (admin) → `report_schedules`, `delivery_logs` (or aggregate JSON stats) in a messaging module; channel configs stored per school.
- School settings → `school_settings` (+ `files` for logo).


## API Contracts (Representative)

Auth (per-school API):

```http
POST /auth/login
{ "username": "alice", "password": "***", "role": "TEACHER", "teacherId": "T1001" }
→ 200 { accessToken, refreshToken }
```

Teacher attendance (per-school API):

```http
POST /attendance/mark
{
  "classSessionId": "uuid",
  "date": "2025-01-18",
  "entries": [ { "studentUserId": "uuid", "status": "PRESENT" } ]
}
```

Admin report schedules (per-school API):

```http
POST /report-schedules
{
  "name": "Weekly Performance",
  "frequency": "weekly",
  "dayOfWeek": "Friday",
  "time": "18:00",
  "recipients": "all_students",
  "channels": ["whatsapp"],
  "includeAttendance": true,
  "includePerformance": true,
  "includeRemarks": false
}
```

Directory (router):

```http
GET /public/schools → [ { code, name } ]
POST /proxy/{schoolCode}/auth/login → forwards to school API
GET /resolve?code={schoolCode} → { apiBaseUrl }
```


## Permissions Matrix (MVP)

- Owner: manage schools (directory only)
- Admin: full access within a school (users, academic, enrollments, schedules)
- Teacher (subject): view classes/roster for assigned subjects; create assignments; enter marks for those
- Teacher (class): subject rights + mark attendance for own section(s); view analytics
- Student/Parent: read-only access to own data


## State Management and Auth

- Teacher routes use `TeacherAuthContext` (mock) and `ProtectedRoute`.
- Replace mock with real login to get a JWT, store in memory or secure storage, and fetch teacher profile (`/auth/me`) to derive `isClassTeacher`.


## Multi‑Tenant Routing (Frontend Integration)

- Add school selector to Login for Teacher/Student roles.
- Fetch options from directory `GET /public/schools`.
- Submit credentials to directory proxy `POST /proxy/{schoolCode}/auth/login` and reuse the same proxy base for subsequent calls.


## Developer Handoff Checklist

- Endpoints required per page are listed above; implement per the per‑school API.
- Ensure pagination/filtering on list pages (`students`, `teachers`, `classes`).
- Support bulk endpoints for attendance and marks to reduce round trips.
- Add indexes for high‑volume tables (attendance, marks, notifications).
- Use the shared schema document `BACKEND_MVP_README.md` for DB table details.

