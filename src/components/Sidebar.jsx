import React from 'react';
import { LayoutDashboard, BookOpen, CalendarDays, CheckSquare, Clock, Sparkles, Flame, Brain } from 'lucide-react';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'subjects', label: 'Subjects', icon: BookOpen },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'exams', label: 'Exams', icon: Clock },
];

export default function Sidebar({ page, setPage, streak }) {
  return (
    <aside style={{ width: 200, background: '#0D1220', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '18px 16px 14px', display: 'flex', alignItems: 'center', gap: 9, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={16} color="#fff"/>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5FF', fontFamily: "'Space Grotesk', sans-serif" }}>
          Study<span style={{ color: '#818CF8' }}>Mate</span>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '10px 8px' }}>
        <div style={{ fontSize: 10, color: '#334155', padding: '4px 10px 6px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>Menu</div>
        {NAV.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setPage(id)}
            style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: page === id ? '#A5B4FC' : '#64748B', width: '100%', border: 'none', background: page === id ? 'rgba(99,102,241,0.12)' : 'transparent', textAlign: 'left', marginBottom: 2, fontWeight: page === id ? 500 : 400 }}>
            <Icon size={16} color={page === id ? '#818CF8' : '#64748B'}/>
            {label}
          </button>
        ))}
        <div style={{ fontSize: 10, color: '#334155', padding: '12px 10px 6px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>AI Tools</div>
        <button onClick={() => setPage('ai')}
          style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: page === 'ai' ? '#A5B4FC' : '#64748B', width: '100%', border: 'none', background: page === 'ai' ? 'rgba(99,102,241,0.12)' : 'transparent', textAlign: 'left', marginBottom: 2, fontWeight: page === 'ai' ? 500 : 400 }}>
          <Sparkles size={16} color={page === 'ai' ? '#818CF8' : '#64748B'}/>
          AI Planner
          <span style={{ marginLeft: 'auto', fontSize: 9, padding: '1px 5px', borderRadius: 4, background: 'rgba(99,102,241,0.3)', color: '#818CF8', fontWeight: 700 }}>AI</span>
        </button>
      </nav>
      <div style={{ margin: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Flame size={18} color="#F59E0B"/>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F59E0B', fontFamily: "'Space Grotesk', sans-serif" }}>{streak} day streak</div>
        </div>
        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: 14 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < streak ? '#F59E0B' : 'rgba(255,255,255,0.08)' }}/>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: 5 }}>Best: 21 days</div>
        </div>
      </div>
    </aside>
  );
}
