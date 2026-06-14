import React, { useState } from 'react';
import { Plus, BookOpen, Target, Clock, TrendingUp, X } from 'lucide-react';
import { SUBJECT_COLORS } from '../data';
import { daysUntil, formatDate, urgencyColor } from '../utils/helpers';

export default function Subjects({ subjects, setSubjects }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', examDate: '', color: '#6366F1' });

  const addSubject = () => {
    if (!form.name || !form.examDate) return;
    const newSubj = {
      id: Date.now(),
      name: form.name,
      examDate: form.examDate,
      progress: 0,
      hoursWeek: 0,
      avgScore: 0,
      totalHours: 0,
      topics: [],
      customColor: form.color,
    };
    setSubjects([...subjects, newSubj]);
    setShowAdd(false);
    setForm({ name: '', examDate: '', color: '#6366F1' });
  };

  const removeSubject = (id) => setSubjects(subjects.filter(s => s.id !== id));

  const updateProgress = (id, val) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, progress: Number(val) } : s));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: '#64748B' }}>{subjects.length} subjects tracked</div>
        <button onClick={() => setShowAdd(true)} style={styles.addBtn}>
          <Plus size={14} /> Add subject
        </button>
      </div>

      {showAdd && (
        <div style={styles.modal}>
          <div style={styles.modalInner}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Add new subject</div>
              <button onClick={() => setShowAdd(false)} style={styles.iconBtn}><X size={16}/></button>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject name</label>
              <input style={styles.input} placeholder="e.g. Calculus II" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Exam date</label>
              <input type="date" style={styles.input} value={form.examDate} onChange={e => setForm({ ...form, examDate: e.target.value })} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Color</label>
              <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ width: 48, height: 36, border: 'none', background: 'none', cursor: 'pointer' }} />
            </div>
            <button onClick={addSubject} style={styles.addBtn}>Add subject</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {subjects.map(s => {
          const col = SUBJECT_COLORS[s.name] || { main: s.customColor || '#6366F1', light: '#EEF2FF', text: '#3730A3' };
          const days = daysUntil(s.examDate);
          const urg = urgencyColor(days);
          return (
            <div key={s.id} style={styles.subjCard}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 4, height: '100%', minHeight: 60, borderRadius: 4, background: col.main, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#F1F5FF', marginBottom: 3 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>Exam: {formatDate(s.examDate)}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600, background: urg.bg, color: urg.text }}>{days}d left</span>
                      <button onClick={() => removeSubject(s.id)} style={styles.iconBtn}><X size={14}/></button>
                    </div>
                  </div>

                  {/* Progress slider */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: '#64748B' }}>Progress</span>
                      <span style={{ fontSize: 12, color: col.main, fontWeight: 600 }}>{s.progress}%</span>
                    </div>
                    <input
                      type="range" min={0} max={100} value={s.progress}
                      onChange={e => updateProgress(s.id, e.target.value)}
                      style={{ width: '100%', accentColor: col.main }}
                    />
                  </div>

                  {/* Stats grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {[
                      { icon: <Clock size={12}/>, label: 'This week', val: `${s.hoursWeek}h` },
                      { icon: <Target size={12}/>, label: 'Avg score', val: s.avgScore ? `${s.avgScore}%` : '—' },
                      { icon: <BookOpen size={12}/>, label: 'Total hours', val: `${s.totalHours}h` },
                    ].map((m, i) => (
                      <div key={i} style={styles.miniStat}>
                        <div style={{ fontSize: 10, color: '#64748B', display: 'flex', gap: 4, alignItems: 'center', marginBottom: 3 }}>
                          {React.cloneElement(m.icon, { color: '#64748B' })} {m.label}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#E2E8F0', fontFamily: "'Space Grotesk',sans-serif" }}>{m.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Topics */}
                  {s.topics && s.topics.length > 0 && (
                    <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {s.topics.map((t, i) => (
                        <span key={i} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: `${col.main}20`, color: col.main }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  subjCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14,
    padding: '16px 18px',
  },
  addBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', background: '#6366F1', color: '#fff',
    border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500,
  },
  iconBtn: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    color: '#64748B', padding: 4, display: 'flex', alignItems: 'center',
  },
  miniStat: {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 8, padding: '8px 10px',
  },
  modal: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999,
  },
  modalInner: {
    background: '#131929', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16, padding: 24, width: 360,
  },
  formGroup: { marginBottom: 14 },
  label: { display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 },
  input: {
    width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
    color: '#F1F5FF', fontSize: 13, outline: 'none',
  },
};
