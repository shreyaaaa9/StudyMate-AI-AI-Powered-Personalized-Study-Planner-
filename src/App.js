import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_SUBJECTS, INITIAL_TASKS, INITIAL_SCHEDULE } from './data';
import { daysUntil } from './utils/helpers';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Schedule from './pages/Schedule';
import Tasks from './pages/Tasks';
import Exams from './pages/Exams';
import AIPlanner from './pages/AIPlanner';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  subjects: 'My Subjects',
  schedule: 'Weekly Schedule',
  tasks: 'Tasks',
  exams: 'Exam Countdown',
  ai: 'AI Study Planner',
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [subjects, setSubjects] = useLocalStorage('sm_subjects', INITIAL_SUBJECTS);
  const [tasks, setTasks] = useLocalStorage('sm_tasks', INITIAL_TASKS);
  const [schedule, setSchedule] = useLocalStorage('sm_schedule', INITIAL_SCHEDULE);
  const streak = 12;

  const nextExam = [...subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate))[0];
  const nextExamDays = nextExam ? daysUntil(nextExam.examDate) : null;

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard subjects={subjects} tasks={tasks} schedule={schedule} />;
      case 'subjects': return <Subjects subjects={subjects} setSubjects={setSubjects} />;
      case 'schedule': return <Schedule schedule={schedule} setSchedule={setSchedule} subjects={subjects} />;
      case 'tasks': return <Tasks tasks={tasks} setTasks={setTasks} subjects={subjects} />;
      case 'exams': return <Exams subjects={subjects} />;
      case 'ai': return <AIPlanner subjects={subjects} tasks={tasks} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar page={page} setPage={setPage} streak={streak} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0B0F1A', flexShrink: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#F1F5FF', fontFamily: "'Space Grotesk', sans-serif" }}>{PAGE_TITLES[page]}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {nextExam && (
              <div style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: nextExamDays <= 10 ? 'rgba(239,68,68,0.15)' : 'rgba(99,102,241,0.15)', color: nextExamDays <= 10 ? '#FCA5A5' : '#818CF8', fontWeight: 500 }}>
                {nextExam.name} in {nextExamDays}d
              </div>
            )}
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
              A
            </div>
          </div>
        </div>
        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: page === 'ai' ? '20px 24px' : '20px 24px', display: 'flex', flexDirection: 'column' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
