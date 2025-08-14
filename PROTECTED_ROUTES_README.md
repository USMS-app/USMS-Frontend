# Protected Routes and Role-Based Access Control

## Overview

This document describes the implementation of protected routes and role-based access control for the teacher dashboard, ensuring that teachers only have access to features appropriate for their role.

## Architecture

### 1. TeacherAuthContext (`src/contexts/TeacherAuthContext.jsx`)

The central authentication and role management context that:

- Manages teacher authentication state
- Determines teacher roles (Class Teacher vs Subject Teacher)
- Provides login/logout functionality
- Stores teacher data and assigned classes

**Key Features:**

- Automatic role detection based on assigned classes
- Persistent authentication state (localStorage)
- Mock data for demonstration purposes

### 2. ProtectedRoute Component (`src/components/ProtectedRoute.jsx`)

A wrapper component that:

- Checks authentication status
- Enforces role-based access control
- Redirects unauthorized users
- Shows loading states during authentication

**Usage:**

```jsx
<ProtectedRoute requireClassTeacher={true}>
	<TeacherAttendance />
</ProtectedRoute>
```

### 3. Role-Based Navigation

The sidebar navigation automatically adjusts based on teacher role:

**Class Teachers see:**

- Dashboard
- Class Teacher Dashboard
- Subject Teacher Dashboard
- Attendance (protected)
- Analytics (protected)

**Subject Teachers see:**

- Dashboard
- Class Teacher Dashboard
- Subject Teacher Dashboard
- (Attendance and Analytics are hidden)

## Implementation Details

### Route Protection in App.jsx

```jsx
{
	/* Teacher nested routes with authentication and role-based access */
}
<Route
	path="/teacher"
	element={
		<TeacherAuthProvider>
			<ProtectedRoute>
				<TeacherLayout />
			</ProtectedRoute>
		</TeacherAuthProvider>
	}
>
	<Route index element={<TeacherHome />} />
	<Route path="class-teacher" element={<ClassTeacherDashboard />} />
	<Route path="subject-teacher" element={<SubjectTeacherDashboard />} />
	<Route
		path="attendance"
		element={
			<ProtectedRoute requireClassTeacher={true}>
				<TeacherAttendance />
			</ProtectedRoute>
		}
	/>
	<Route
		path="analytics"
		element={
			<ProtectedRoute requireClassTeacher={true}>
				<TeacherAnalytics />
			</ProtectedRoute>
		}
	/>
</Route>;
```

### Teacher Role Detection

The system automatically detects if a teacher is a class teacher by checking if they have any classes where `isClassTeacher: true`:

```jsx
const hasClassTeacherRole = teacherData.classes.some(
	(cls) => cls.isClassTeacher
);
setIsClassTeacher(hasClassTeacherRole);
```

### Mock Teacher Data

**T1001 - John Doe (Class Teacher):**

- Has access to attendance and analytics
- Can manage multiple classes
- Primary role: Class Teacher

**T1002 - Jane Smith (Subject Teacher):**

- No access to attendance and analytics
- Limited to marks management
- Primary role: Subject Teacher

## UI Improvements

### Table Background Colors

All student tables now have proper background colors for better readability:

```jsx
<div className="border rounded-lg overflow-hidden bg-white">
	<Table>
		<TableHeader>
			<TableRow className="bg-gray-50 hover:bg-gray-50">
				<TableHead className="bg-gray-50 text-gray-900 font-semibold">
					Roll No
				</TableHead>
				{/* ... other headers */}
			</TableRow>
		</TableHeader>
		<TableBody>
			{students.map((student, index) => (
				<TableRow
					key={student.id}
					className={`${
						index % 2 === 0 ? "bg-white" : "bg-gray-50"
					} hover:bg-gray-100 transition-colors`}
				>
					{/* ... table cells */}
				</TableRow>
			))}
		</TableBody>
	</Table>
</div>
```

### Responsive Design

- Mobile-first approach with responsive breakpoints
- Collapsible sidebar for mobile devices
- Bottom navigation for mobile users
- Responsive grid layouts for different screen sizes

## Security Features

### 1. Route-Level Protection

- Unauthorized access attempts are redirected
- Class teacher-only routes are protected at the component level

### 2. UI-Level Protection

- Navigation items are hidden based on role
- Quick access buttons are conditionally rendered
- Dashboard features are role-aware

### 3. Context-Based Security

- Authentication state is managed centrally
- Role information is consistent across components
- Logout functionality clears all sensitive data

## Usage Instructions

### For Developers

1. **Wrap protected routes:**

```jsx
<ProtectedRoute requireClassTeacher={true}>
	<YourComponent />
</ProtectedRoute>
```

2. **Use authentication context:**

```jsx
const { teacher, isClassTeacher, loading } = useTeacherAuth();
```

3. **Conditional rendering:**

```jsx
{
	isClassTeacher && <Button>Class Teacher Only Feature</Button>;
}
```

### For Teachers

1. **Class Teachers:**

   - Full access to all features
   - Can manage attendance and view analytics
   - Access to comprehensive class management tools

2. **Subject Teachers:**
   - Limited to marks management
   - Can view student information and parent contacts
   - No access to attendance or analytics

## Demo Features

### Teacher Role Switcher

A demonstration component that allows switching between different teacher roles to see how the interface changes:

- **Class Teacher (T1001):** Full access to all features
- **Subject Teacher (T1002):** Limited access to marks management only

### Quick Access

Role-appropriate quick access buttons that change based on teacher type:

- Class Teachers see: Attendance, Analytics, Enter Marks, Mark Attendance
- Subject Teachers see: Enter Marks only

## Future Enhancements

### 1. Backend Integration

- Replace mock data with real API calls
- Implement proper JWT authentication
- Add role-based database queries

### 2. Advanced Permissions

- Granular permission system
- Subject-specific access control
- Time-based access restrictions

### 3. Audit Logging

- Track access attempts
- Log role changes
- Monitor feature usage

## Troubleshooting

### Common Issues

1. **Navigation items not showing:**

   - Check if `isClassTeacher` is properly set
   - Verify teacher data structure
   - Check console for authentication errors

2. **Protected routes not working:**

   - Ensure `ProtectedRoute` is properly imported
   - Check `requireClassTeacher` prop usage
   - Verify context provider wrapping

3. **Table styling issues:**
   - Ensure proper CSS classes are applied
   - Check for conflicting styles
   - Verify responsive breakpoints

### Debug Mode

Enable debug logging by adding to TeacherAuthContext:

```jsx
console.log("Teacher role:", isClassTeacher);
console.log("Teacher data:", teacher);
```

## Conclusion

This implementation provides a robust, secure, and user-friendly role-based access control system that ensures teachers only see features appropriate for their role while maintaining a clean and responsive user interface.
