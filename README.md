# Academic Performance Tracking System

A clean, modern frontend-only web application for role-based academic performance tracking.

## Files Structure

```
academic-tracker/
├── index.html      # Login page
├── student.html    # Student dashboard
├── teacher.html    # Teacher dashboard
├── admin.html      # Admin dashboard
├── style.css       # All styling
└── script.js       # All functionality + dummy data
```

## Features by Role

### Login Page (index.html)
- Email and password inputs
- Role selection dropdown (Student/Teacher/Admin)
- Stores role in localStorage for routing
- **API Integration Point**: Line 28 in script.js

### Student Dashboard
- View all subjects in card layout
- Each card shows:
  - Subject name
  - Editable target marks
  - Actual marks
  - Progress bar (green if above target, red if below)
  - Alert box with punishment options if below target
- **API Integration Points**: Lines 48, 88, 97 in script.js

### Teacher Dashboard
- Summary cards: Total students, Students below target
- Table with all student-subject combinations
- Shows: Name, Subject, Target, Actual, Status badge
- Action buttons: Assign Punishment, Set Deadline
- **API Integration Points**: Lines 103, 145, 152 in script.js

### Admin Dashboard
- Summary cards: Total students, Total subjects, Average performance
- Form to assign subjects to students
- Table showing all student assignments
- **API Integration Points**: Lines 158, 195 in script.js

## Dummy Data Structure

Located at top of `script.js`:

```javascript
DUMMY_DATA = {
    students: [{ id, name, email }],
    subjects: [{ id, name, studentId, targetMarks, actualMarks }],
    availableSubjects: ['Mathematics', 'Physics', ...]
}
```

## How to Use

1. Open `index.html` in browser
2. Enter any email/password
3. Select role: Student/Teacher/Admin
4. Click Login

**Test Credentials:**
- Student: john@student.com (sees 3 subjects)
- Teacher: any email (sees all students)
- Admin: any email (full access)

## Backend Integration Guide

All API integration points marked with `// TODO: Replace with actual API call`

### Required API Endpoints

**Authentication:**
- `POST /api/login` - Body: `{ email, password, role }`

**Student:**
- `GET /api/student/subjects` - Returns subject array
- `PUT /api/subjects/:id/target` - Body: `{ target }`
- `POST /api/punishments` - Body: `{ subjectId, punishment }`

**Teacher:**
- `GET /api/teacher/students` - Returns student-subject data
- `POST /api/teacher/assign-punishment` - Body: `{ studentName, subject }`
- `POST /api/teacher/set-deadline` - Body: `{ studentName, subject }`

**Admin:**
- `GET /api/admin/overview` - Returns stats and assignments
- `POST /api/admin/assign-subject` - Body: `{ studentId, subject }`

## Responsive Design

- Desktop: Sidebar + content layout
- Mobile: Stacked layout
- Breakpoint: 768px

## Technologies

- Pure HTML5, CSS3, JavaScript (ES6)
- No frameworks or dependencies
- localStorage for session management
- CSS Grid and Flexbox for layouts
