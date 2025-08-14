# Teacher Dashboard Structure - USMS Frontend

## Overview

The Teacher Dashboard has been restructured to provide separate, specialized interfaces for different types of teachers:

- **Class Teachers**: Full access to attendance, analytics, and subject marks
- **Subject Teachers**: Focused on marks management and student information

## Dashboard Structure

### 1. Main Teacher Dashboard (`/teacher`)

- **Navigation Hub**: Provides access to different teacher dashboards
- **Quick Actions**: Direct access to common features
- **Teacher Type Selection**: Clear navigation to specialized dashboards

### 2. Class Teacher Dashboard (`/teacher/class-teacher`)

**Access**: Only for teachers assigned as class teachers

**Features:**

- **Overview Tab**:
  - Total students count
  - Attendance rate
  - Total tests created
  - Quick action buttons
- **Attendance Tab**:
  - Date selection
  - Mark all present/absent
  - Individual student attendance toggle
  - Visual attendance indicators
- **Marks Management Tab**:
  - Create new tests (standard + custom)
  - Manage existing tests
  - Enter marks for all students
- **Analytics Tab**:
  - Performance overview
  - Attendance statistics
  - Top performing students
  - Performance trends

**Key Capabilities:**

- Full attendance management
- Comprehensive analytics
- Subject marks for all subjects taught
- Student information with parent contact details

### 3. Subject Teacher Dashboard (`/teacher/subject-teacher`)

**Access**: For teachers who teach specific subjects (not class teachers)

**Features:**

- **Overview Tab**:
  - Total students in class
  - Subject being taught
  - Total tests created
  - Quick action buttons
- **Marks Management Tab**:
  - Create new tests for specific subject
  - Manage existing tests
  - Enter marks for students
- **Student Information Tab**:
  - Student roll numbers
  - Student names
  - Parent names
  - Parent mobile numbers
  - Click-to-call functionality

**Key Capabilities:**

- Subject-specific marks management
- Student information access
- Parent contact details
- Test creation and management

## Navigation Structure

```
/teacher
├── / (Main Dashboard)
├── /class-teacher (Class Teacher Dashboard)
├── /subject-teacher (Subject Teacher Dashboard)
├── /attendance (Attendance Management)
└── /analytics (Performance Analytics)
```

## Teacher Types and Access

### Class Teacher

- **Role**: Manages a specific class
- **Access**:
  - Attendance management
  - Analytics and reports
  - Subject marks for all subjects
  - Student information
- **Navigation**: Full access to all features

### Subject Teacher

- **Role**: Teaches specific subjects to multiple classes
- **Access**:
  - Subject-specific marks management
  - Student information with parent contacts
  - Test creation and management
- **Navigation**: Limited to subject-related features

## Data Structure

### Student Information

```javascript
{
  id: "S001",
  name: "Alice Johnson",
  rollNo: "001",
  parentName: "Mr. Robert Johnson",
  parentMobile: "+91-9876543210"
}
```

### Test Types

- **Standard Tests**: FA1, FA2, Mid Term, FA3, FA4, Final Exam
- **Custom Tests**: Teacher-created assessments

### Class Assignment

```javascript
{
  id: "7A",
  name: "Class 7A",
  subjects: ["Mathematics", "Science"],
  isClassTeacher: true/false
}
```

## Security Features

- **Role-based Access**: Teachers can only access their assigned classes
- **Subject Restriction**: Subject teachers see only their subject data
- **Attendance Restriction**: Only class teachers can manage attendance
- **Teacher ID Validation**: Unique identification for each teacher

## Usage Instructions

### For Class Teachers

1. Navigate to `/teacher/class-teacher`
2. Select your assigned class
3. Use tabs to access different features:
   - Overview: Quick statistics and actions
   - Attendance: Daily attendance management
   - Marks: Subject marks for all subjects
   - Analytics: Performance insights

### For Subject Teachers

1. Navigate to `/teacher/subject-teacher`
2. Select class and subject
3. Use tabs to access different features:
   - Overview: Class and subject statistics
   - Marks: Subject-specific test management
   - Students: Student information and parent contacts

## Technical Implementation

### Components

- `ClassTeacherDashboard.jsx`: Full-featured dashboard for class teachers
- `SubjectTeacherDashboard.jsx`: Focused dashboard for subject teachers
- `TeacherHome.jsx`: Main navigation hub
- `TeacherLayout.jsx`: Navigation wrapper

### State Management

- Local React state for each dashboard
- Mock data for demonstration
- Ready for backend integration

### Responsive Design

- Works on desktop, tablet, and mobile
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

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

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Navigate to `/teacher` to access the main teacher dashboard
4. Choose your teacher type to access specialized features

## Support

For technical support or feature requests, please contact the development team.
