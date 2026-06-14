export const SUBJECT_COLORS = {
  'Calculus II': { main: '#6366F1', light: '#EEF2FF', text: '#3730A3' },
  'Physics': { main: '#22C55E', light: '#DCFCE7', text: '#166534' },
  'English Literature': { main: '#F59E0B', light: '#FEF9C3', text: '#92400E' },
  'History': { main: '#EC4899', light: '#FCE7F3', text: '#9D174D' },
};

export const INITIAL_SUBJECTS = [
  { id: 1, name: 'Calculus II', examDate: '2026-06-19', progress: 72, hoursWeek: 7.2, avgScore: 81, totalHours: 48, topics: ['Integration', 'Sequences & Series', 'Differential Equations', 'Parametric Equations'] },
  { id: 2, name: 'Physics', examDate: '2026-06-28', progress: 58, hoursWeek: 5.5, avgScore: 78, totalHours: 36, topics: ["Newton's Laws", 'Waves & Optics', 'Thermodynamics', 'Electrostatics'] },
  { id: 3, name: 'English Literature', examDate: '2026-07-03', progress: 85, hoursWeek: 3.8, avgScore: 91, totalHours: 52, topics: ['The Great Gatsby', 'Poetry Analysis', 'Essay Writing', 'Shakespeare'] },
  { id: 4, name: 'History', examDate: '2026-07-10', progress: 44, hoursWeek: 2.0, avgScore: 76, totalHours: 28, topics: ['World War II', 'Cold War', 'Industrial Revolution', 'Colonial Era'] },
];

export const INITIAL_TASKS = [
  { id: 1, title: 'Review integration by parts — Chapter 7', subject: 'Calculus II', difficulty: 'Easy', dueDate: '2026-06-13', duration: 45, done: true },
  { id: 2, title: "Read Physics textbook Ch.5 — Newton's Laws", subject: 'Physics', difficulty: 'Medium', dueDate: '2026-06-13', duration: 60, done: true },
  { id: 3, title: "Newton's Laws problem set (20 problems)", subject: 'Physics', difficulty: 'Medium', dueDate: '2026-06-14', duration: 60, done: false },
  { id: 4, title: 'Write Gatsby analysis paragraph — Ch.4', subject: 'English Literature', difficulty: 'Hard', dueDate: '2026-06-14', duration: 90, done: false },
  { id: 5, title: 'Calculus II timed mock exam', subject: 'Calculus II', difficulty: 'Hard', dueDate: '2026-06-14', duration: 150, done: false },
  { id: 6, title: 'History reading — WW2 causes and context', subject: 'History', difficulty: 'Easy', dueDate: '2026-06-15', duration: 45, done: false },
  { id: 7, title: 'L\'Hôpital\'s rule practice problems', subject: 'Calculus II', difficulty: 'Medium', dueDate: '2026-06-15', duration: 50, done: false },
  { id: 8, title: 'Physics lab report draft', subject: 'Physics', difficulty: 'Hard', dueDate: '2026-06-16', duration: 120, done: false },
];

export const INITIAL_SCHEDULE = [
  { id: 1, date: '2026-06-12', startTime: '08:00', duration: 90, subject: 'Calculus II', label: 'Integration review + L\'Hôpital\'s rule' },
  { id: 2, date: '2026-06-12', startTime: '09:45', duration: 60, subject: 'Physics', label: "Newton's Laws problem set" },
  { id: 3, date: '2026-06-12', startTime: '11:30', duration: 90, subject: 'English Literature', label: 'Gatsby paragraph writing' },
  { id: 4, date: '2026-06-13', startTime: '09:00', duration: 120, subject: 'Calculus II', label: 'Full timed mock exam' },
  { id: 5, date: '2026-06-13', startTime: '11:30', duration: 60, subject: 'History', label: 'WW2 causes reading' },
  { id: 6, date: '2026-06-14', startTime: '10:00', duration: 90, subject: 'Physics', label: 'Waves & Optics — intro' },
  { id: 7, date: '2026-06-14', startTime: '11:45', duration: 60, subject: 'English Literature', label: 'Essay structure practice' },
  { id: 8, date: '2026-06-15', startTime: '08:30', duration: 120, subject: 'Calculus II', label: 'Error review + formula sheet' },
  { id: 9, date: '2026-06-15', startTime: '11:00', duration: 50, subject: 'History', label: 'Cold War key events' },
  { id: 10, date: '2026-06-16', startTime: '09:00', duration: 90, subject: 'Calculus II', label: 'Final concepts revision' },
  { id: 11, date: '2026-06-16', startTime: '11:00', duration: 120, subject: 'Physics', label: 'Lab report draft' },
];

export const WEEK_HOURS = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 4.0 },
  { day: 'Wed', hours: 2.5 },
  { day: 'Thu', hours: 4.5 },
  { day: 'Fri', hours: 2.0 },
  { day: 'Sat', hours: 1.0 },
  { day: 'Sun', hours: 1.0 },
];

export const AI_PROMPTS = [
  'Build my study plan for this week',
  "I'm struggling with integrals",
  'How should I prep for Calculus exam?',
  'Optimize my schedule',
  'Which subject needs most attention?',
  'Give me a Pomodoro plan for today',
];
