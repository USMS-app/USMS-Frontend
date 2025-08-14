# Teacher Dashboard - USMS Frontend

## Overview

The Teacher Dashboard is a comprehensive system designed for teachers to manage their classes, student marks, and attendance. It provides an intuitive interface for teachers to efficiently handle their daily tasks.

## Features

### 1. Main Dashboard (`/teacher`)

- **Class Selection**: Dropdown to select from assigned classes
- **Class Teacher Status**: Visual indicators for classes where the teacher is the class teacher
- **Integrated Marks Management**: Create and manage tests/exams directly from the dashboard
- **Quick Access**: Easy navigation between different functionalities

### 2. Marks Management

- **Standard Test Types**: Support for all school assessments:
  - FA1 (Formative Assessment 1)
  - FA2 (Formative Assessment 2)
  - Mid Term Exam
  - FA3 (Formative Assessment 3)
  - FA4 (Formative Assessment 4)
  - Final Exam
- **Custom Tests**: Teachers can create additional custom tests
- **Bulk Marks Entry**: Enter marks for all students in a class at once
- **Test Management**: View, edit, and manage existing tests

### 3. Attendance Management (`/teacher/attendance`)

- **Class Teacher Only**: Only class teachers can access attendance for their assigned classes
- **Smart Defaults**: All students are marked as present by default
- **Quick Actions**:
  - Mark All Present
  - Mark All Absent
  - Individual student toggle
- **Date Selection**: Choose specific dates for attendance
- **Filtering**: Filter students by attendance status
- **Visual Indicators**: Clear present/absent status with color coding
- **Bulk Update**: Review and submit attendance in a dedicated dialog

### 4. Analytics (`/teacher/analytics`)

- **Performance Overview**:
  - Average performance across all assessments
  - Attendance rates
  - Top performing students
- **Detailed Analysis**:
  - Performance breakdown by test type
  - Student rankings
  - Performance trends
- **Class & Subject Selection**: Filter data by specific classes and subjects
- **Export Functionality**: Download reports for further analysis

## Technical Implementation

### Components Structure

```
src/pages/teacher/
├── TeacherHome.jsx          # Main dashboard with integrated functionality
├── Attendance.jsx           # Dedicated attendance management
├── Analytics.jsx            # Performance analytics and reports
└── TeacherLayout.jsx        # Navigation and layout wrapper
```

### Key Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Role-Based Access**: Teachers can only access data for their assigned classes
- **Real-time Updates**: Immediate feedback for all actions
- **Data Validation**: Input validation for marks and attendance
- **Mock Data**: Comprehensive demo data for testing and demonstration

### State Management

- **Local State**: Uses React hooks for component-level state
- **Data Persistence**: Ready for backend integration
- **Optimistic Updates**: Immediate UI updates for better user experience

## Usage Instructions

### For Teachers

1. **Access Dashboard**

   - Navigate to `/teacher`
   - Select your class from the dropdown
   - View your assigned subjects and class teacher status

2. **Manage Marks**

   - Click "Create New Test" to add a new assessment
   - Select test type (standard or custom)
   - Enter marks for all students
   - Submit marks for the selected test

3. **Manage Attendance** (Class Teachers Only)

   - Navigate to `/teacher/attendance`
   - Select class and date
   - Use quick actions or individual toggles
   - Submit attendance data

4. **View Analytics**
   - Navigate to `/teacher/analytics`
   - Select class and subject
   - View performance metrics and trends
   - Export reports as needed

### Security Features

- **Teacher ID Validation**: Each teacher has a unique ID
- **Class Assignment**: Teachers can only access their assigned classes
- **Subject Restriction**: Subject-specific data access
- **Attendance Restriction**: Only class teachers can manage attendance

## Data Structure

### Teacher Data

```javascript
{
  teacherId: "T1001",
  name: "John Doe",
  classes: [
    {
      id: "7A",
      name: "Class 7A",
      subjects: ["Mathematics", "Science"],
      isClassTeacher: true
    }
  ]
}
```

### Test Data

```javascript
{
  id: "T001",
  name: "FA1 - Mathematics",
  type: "FA1",
  subject: "Mathematics",
  date: "2024-01-15",
  maxMarks: 20
}
```

### Student Data

```javascript
{
  id: "S001",
  name: "Alice Johnson",
  rollNo: "001",
  present: true
}
```

## Future Enhancements

1. **Backend Integration**: Replace mock data with real API calls
2. **Real-time Updates**: WebSocket integration for live data
3. **Advanced Analytics**: Charts and graphs for better visualization
4. **Bulk Import/Export**: Excel/CSV support for data management
5. **Notifications**: Alerts for missing marks or attendance
6. **Mobile App**: Native mobile application for teachers

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Dependencies

- React 19.1.1
- React Router DOM 7.8.0
- Tailwind CSS 4.1.11
- Lucide React (icons)
- Radix UI components
- Sonner (toast notifications)

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Navigate to `/teacher` to access the teacher dashboard
4. Use the demo data to explore all features

## Support

For technical support or feature requests, please contact the development team.
