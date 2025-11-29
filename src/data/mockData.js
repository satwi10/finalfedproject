// src/data/mockData.js

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const INITIAL_DB = {
  users: [
    { id: 1, email: 'teacher@test.com', password: '123', role: 'teacher', name: 'Mr. Teacher' },
    { id: 2, email: 'student@test.com', password: '123', role: 'student', name: 'John Student' },
  ],
  // ADDED NEW ASSIGNMENTS HERE
  assignments: [
    { 
      id: 101, 
      title: 'Database Design Schema', 
      desc: 'Create an ER Diagram for a library management system. Submit as PDF.', 
      deadline: '2025-11-30' 
    },
    { 
      id: 102, 
      title: 'Algorithm Analysis Report', 
      desc: 'Compare Sorting Algorithms (Quick vs Merge). Submit your report link or PDF.', 
      deadline: '2025-12-05' 
    },
    { 
      id: 103, 
      title: 'UI/UX Wireframes', 
      desc: 'Design the login flow for our mobile app. Submit Figma link.', 
      deadline: '2025-12-10' 
    },
  ],
  submissions: [] 
};

// ... (Rest of the file remains exactly the same, helper functions below) ...

const getDB = () => {
  const db = localStorage.getItem('edutrack_db');
  return db ? JSON.parse(db) : INITIAL_DB;
};

const saveDB = (data) => localStorage.setItem('edutrack_db', JSON.stringify(data));

if (!localStorage.getItem('edutrack_db')) saveDB(INITIAL_DB);

export const MockAPI = {
  login: async (email, password) => {
    await delay(700);
    const db = getDB();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    localStorage.setItem('edutrack_user', JSON.stringify(user));
    return user;
  },

  logout: () => localStorage.removeItem('edutrack_user'),
  getCurrentUser: () => JSON.parse(localStorage.getItem('edutrack_user')),

  register: async (name, email, password, role) => {
    await delay(700);
    const db = getDB();
    if (db.users.find(u => u.email === email)) throw new Error("User already exists");
    const newUser = { id: Date.now(), name, email, password, role };
    db.users.push(newUser);
    saveDB(db);
    return newUser;
  },

  getAssignments: async () => { await delay(500); return getDB().assignments; },
  
  createAssignment: async (assignment) => {
    await delay(500);
    const db = getDB();
    db.assignments.push({ ...assignment, id: Date.now() });
    saveDB(db);
  },

  deleteAssignment: async (id) => {
    await delay(400);
    const db = getDB();
    db.assignments = db.assignments.filter(a => a.id !== id);
    saveDB(db);
  },

  // MODIFIED to accept file type info
  submitAssignment: async (sub) => {
    await delay(800); // Slightly longer delay for "upload" simulation
    const db = getDB();
    // We store the submission. 'type' helps us know if it's a file or link.
    db.submissions.push({ 
      ...sub, 
      id: Date.now(), 
      status: 'submitted', 
      grade: null 
    });
    saveDB(db);
  },

  getSubmissions: async () => { await delay(500); return getDB().submissions; },

  gradeSubmission: async (id, grade, feedback) => {
    await delay(500);
    const db = getDB();
    const idx = db.submissions.findIndex(s => s.id === id);
    if (idx !== -1) {
      db.submissions[idx].grade = grade;
      db.submissions[idx].feedback = feedback;
      db.submissions[idx].status = 'graded';
      saveDB(db);
    }
  }
};
// Add this function inside your MockAPI object in src/data/mockData.js
// Keep everything else the same, just add this function.

  updateAssignment: async (updatedAssignment) => {
    await delay(500);
    const db = getDB();
    const index = db.assignments.findIndex(a => a.id === updatedAssignment.id);
    if (index !== -1) {
      db.assignments[index] = updatedAssignment;
      saveDB(db);
    }
  };