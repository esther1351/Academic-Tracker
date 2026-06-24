// Dummy data - structured like API responses
const DUMMY_DATA = {
    students: [
        { id: 1, name: 'John Doe', email: 'john@student.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@student.com' },
        { id: 3, name: 'Mike Johnson', email: 'mike@student.com' }
    ],
    subjects: [
        { id: 1, name: 'Mathematics', studentId: 1, targetMarks: 80, actualMarks: 75 },
        { id: 2, name: 'Physics', studentId: 1, targetMarks: 70, actualMarks: 85 },
        { id: 3, name: 'Chemistry', studentId: 1, targetMarks: 75, actualMarks: 60 },
        { id: 4, name: 'Mathematics', studentId: 2, targetMarks: 85, actualMarks: 90 },
        { id: 5, name: 'Physics', studentId: 2, targetMarks: 80, actualMarks: 75 },
        { id: 6, name: 'Biology', studentId: 3, targetMarks: 70, actualMarks: 65 }
    ],
    availableSubjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History']
};

// Login handler
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // TODO: Replace with actual API call
    // fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password, role }) })
    
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    
    if (role === 'student') window.location.href = 'student.html';
    else if (role === 'teacher') window.location.href = 'teacher.html';
    else if (role === 'admin') window.location.href = 'admin.html';
});

// Logout
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// Student Dashboard
function loadStudentDashboard() {
    // TODO: Replace with API call
    // fetch('/api/student/subjects').then(res => res.json()).then(data => { ... })
    
    const studentEmail = localStorage.getItem('email');
    const student = DUMMY_DATA.students.find(s => s.email === studentEmail) || DUMMY_DATA.students[0];
    const subjects = DUMMY_DATA.subjects.filter(s => s.studentId === student.id);
    
    const container = document.getElementById('subjectsContainer');
    container.innerHTML = subjects.map(subject => {
        const progress = (subject.actualMarks / subject.targetMarks) * 100;
        const isBelowTarget = subject.actualMarks < subject.targetMarks;
        
        return `
            <div class="subject-card">
                <h3>${subject.name}</h3>
                <div class="marks-info">
                    <span>Target: <input type="number" class="target-input" value="${subject.targetMarks}" 
                        onchange="updateTarget(${subject.id}, this.value)"></span>
                    <span>Actual: ${subject.actualMarks}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${isBelowTarget ? 'below-target' : ''}" 
                        style="width: ${Math.min(progress, 100)}%"></div>
                </div>
                ${isBelowTarget ? `
                    <div class="alert-box">
                        <p>⚠️ Below target! Choose a punishment:</p>
                        <div class="punishment-options">
                            <button class="btn-small" onclick="selectPunishment(${subject.id}, 'Quiz')">Quiz</button>
                            <button class="btn-small" onclick="selectPunishment(${subject.id}, 'Assessment')">Assessment</button>
                            <button class="btn-small" onclick="selectPunishment(${subject.id}, 'Assignment')">Assignment</button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function updateTarget(subjectId, newTarget) {
    // TODO: Replace with API call
    // fetch(`/api/subjects/${subjectId}/target`, { method: 'PUT', body: JSON.stringify({ target: newTarget }) })
    
    const subject = DUMMY_DATA.subjects.find(s => s.id === subjectId);
    if (subject) {
        subject.targetMarks = parseInt(newTarget);
        loadStudentDashboard();
    }
}

function selectPunishment(subjectId, punishment) {
    // TODO: Replace with API call
    // fetch('/api/punishments', { method: 'POST', body: JSON.stringify({ subjectId, punishment }) })
    
    alert(`${punishment} selected for subject ID ${subjectId}`);
}

// Teacher Dashboard
function loadTeacherDashboard() {
    // TODO: Replace with API call
    // fetch('/api/teacher/students').then(res => res.json()).then(data => { ... })
    
    const allData = [];
    DUMMY_DATA.students.forEach(student => {
        const subjects = DUMMY_DATA.subjects.filter(s => s.studentId === student.id);
        subjects.forEach(subject => {
            allData.push({
                studentName: student.name,
                subject: subject.name,
                targetMarks: subject.targetMarks,
                actualMarks: subject.actualMarks,
                status: subject.actualMarks >= subject.targetMarks ? 'above' : 'below'
            });
        });
    });
    
    const belowCount = allData.filter(d => d.status === 'below').length;
    document.getElementById('totalStudents').textContent = DUMMY_DATA.students.length;
    document.getElementById('belowTarget').textContent = belowCount;
    
    const tbody = document.querySelector('#studentsTable tbody');
    tbody.innerHTML = allData.map(row => `
        <tr>
            <td>${row.studentName}</td>
            <td>${row.subject}</td>
            <td>${row.targetMarks}</td>
            <td>${row.actualMarks}</td>
            <td><span class="status-badge ${row.status}">${row.status === 'above' ? 'Above Target' : 'Below Target'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action assign" onclick="assignPunishment('${row.studentName}', '${row.subject}')">Assign Punishment</button>
                    <button class="btn-action deadline" onclick="setDeadline('${row.studentName}', '${row.subject}')">Set Deadline</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function assignPunishment(studentName, subject) {
    // TODO: Replace with API call
    // fetch('/api/teacher/assign-punishment', { method: 'POST', body: JSON.stringify({ studentName, subject }) })
    
    alert(`Assigning punishment to ${studentName} for ${subject}`);
}

function setDeadline(studentName, subject) {
    // TODO: Replace with API call
    // fetch('/api/teacher/set-deadline', { method: 'POST', body: JSON.stringify({ studentName, subject }) })
    
    alert(`Setting deadline for ${studentName} - ${subject}`);
}

// Admin Dashboard
function loadAdminDashboard() {
    // TODO: Replace with API call
    // fetch('/api/admin/overview').then(res => res.json()).then(data => { ... })
    
    document.getElementById('adminTotalStudents').textContent = DUMMY_DATA.students.length;
    document.getElementById('totalSubjects').textContent = DUMMY_DATA.availableSubjects.length;
    
    const totalMarks = DUMMY_DATA.subjects.reduce((sum, s) => sum + s.actualMarks, 0);
    const totalPossible = DUMMY_DATA.subjects.reduce((sum, s) => sum + s.targetMarks, 0);
    const avgPerf = Math.round((totalMarks / totalPossible) * 100);
    document.getElementById('avgPerformance').textContent = avgPerf + '%';
    
    const studentSelect = document.getElementById('studentSelect');
    studentSelect.innerHTML = '<option value="">Select Student</option>' + 
        DUMMY_DATA.students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    
    const subjectSelect = document.getElementById('subjectSelect');
    subjectSelect.innerHTML = '<option value="">Select Subject</option>' + 
        DUMMY_DATA.availableSubjects.map(s => `<option value="${s}">${s}</option>`).join('');
    
    loadAssignmentsTable();
}

function loadAssignmentsTable() {
    const tbody = document.querySelector('#assignmentsTable tbody');
    tbody.innerHTML = DUMMY_DATA.students.map(student => {
        const subjects = DUMMY_DATA.subjects.filter(s => s.studentId === student.id);
        const subjectNames = subjects.map(s => s.name).join(', ');
        const avgMarks = subjects.length ? Math.round(subjects.reduce((sum, s) => sum + s.actualMarks, 0) / subjects.length) : 0;
        
        return `
            <tr>
                <td>${student.name}</td>
                <td>${subjectNames || 'None'}</td>
                <td>${avgMarks}%</td>
            </tr>
        `;
    }).join('');
}

document.getElementById('assignSubjectForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const studentId = document.getElementById('studentSelect').value;
    const subject = document.getElementById('subjectSelect').value;
    
    // TODO: Replace with API call
    // fetch('/api/admin/assign-subject', { method: 'POST', body: JSON.stringify({ studentId, subject }) })
    
    alert(`Assigned ${subject} to student ID ${studentId}`);
    this.reset();
});
