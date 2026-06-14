import React from 'react';
import { Bell, Search } from 'lucide-react';
import { daysUntil } from '../utils/helpers';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  subjects: 'My Subjects',
  schedule: 'Weekly Schedule',
  tasks: 'Task List',
  exams: 'Exam Countdown',
  ai: 'AI Study Planner',
};

export default function Topbar({ page, subjects }) {
  const nextExam = [...subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate))[0];
  const days = nextExam ? daysUntil(nextExam.examDate) : null;

  return (
    <div style={styles.bar}>
      <div style={styles.title}>{PAGE_TITLES[page] || 'StudyMate'}</div>
      <div style={styles.right}>
        {days !== null && days >= 0 && (
          <div style={{ ...styles.examPill, background: days <= 7 ? 'rgba(239,68,68,0.12)' : 'rgba(99,102,241,0.12)', borderColor: days <= 7 ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: days <= 7 ? '#EF4444' : '#818CF8', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ color: days <= 7 ? '#FCA5A5' : '#A5B4FC', fontSize: 11, fontWeight: 500 }}>
              {nextExam.name} in {days}d
            </span>
          </div>
        )}
        <button style={styles.iconBtn}><Bell size={17}/></button>
      </div>
    </div>
  );
}

const styles = {
  bar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 },
  title: { fontSize: 16, fontWeight: 600, color: '#F1F5FF', fontFamily: "'Space Grotesk',sans-serif" },
  right: { display: 'flex', alignItems: 'center', gap: 10 },
  examPill: { display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, border: '1px solid' },
  iconBtn: { background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', padding: 5 },
};
