import React, { useState } from 'react';
import { Plus, X, Filter } from 'lucide-react';
import { SUBJECT_COLORS, INITIAL_SUBJECTS } from '../data';
import { minutesToHours, difficultyStyle } from '../utils/helpers';

export default function Tasks({ tasks, setTasks, subjects }) {
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ title: '', subject: subjects[0]?.name || '', difficulty: 'Medium', dueDate: '', duration: 60 });

  const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id) => setTasks(tasks.filter(t => t.id !== id));
  const addTask = () => {
    if (!form.title) return;
    setTasks([...tasks, { ...form, id: Date.now(), done: false, duration: Number(form.duration) }]);
    setShowAdd(false);
    setForm({ title: '', subject: subjects[0]?.name || '', difficulty: 'Medium', dueDate: '', duration: 60 });
  };

  const filtered = tasks.filter(t => {
    if (filter === 'pending') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const pending = tasks.filter(t => !t.done).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'pending', 'done'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'pending' && pending > 0 && <span style={styles.count}>{pending}</span>}
            </button>
          ))}
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addBtn}><Plus size={14}/> Add task</button>
      </div>

      {showAdd && (
        <div style={styles.modal}>
          <div style={styles.modalInner}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>New task</div>
              <button onClick={() => setShowAdd(false)} style={styles.iconBtn}><X size={16}/></button>
            </div>
            {[
              { label: 'Task title', key: 'title', type: 'text', placeholder: 'e.g. Review integration by parts' },
              { label: 'Due date', key: 'dueDate', type: 'date' },
              { label: 'Duration (minutes)', key: 'duration', type: 'number', placeholder: '60' },
            ].map(f => (
              <div key={f.key} style={styles.formGroup}>
                <label style={styles.label}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} style={styles.input} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <select style={styles.input} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                {subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Difficulty</label>
              <select style={styles.input} value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                {['Easy', 'Medium', 'Hard'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <button onClick={addTask} style={styles.addBtn}>Add task</button>
          </div>
        </div>
      )}

      {/* Group by due date */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
          <div style={{ fontSize: 14 }}>No tasks here. Add one to get started!</div>
        </div>
      ) : (
        <div style={styles.taskList}>
          {filtered.map(t => {
            const col = SUBJECT_COLORS[t.subject] || { main: '#6366F1' };
            const diff = difficultyStyle(t.difficulty);
            return (
              <div key={t.id} style={styles.taskItem}>
                <div
                  onClick={() => toggle(t.id)}
                  style={{ ...styles.checkBox, background: t.done ? '#6366F1' : 'transparent', borderColor: t.done ? '#6366F1' : '#334155', cursor: 'pointer' }}
                >
                  {t.done && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: t.done ? '#475569' : '#E2E8F0', textDecoration: t.done ? 'line-through' : 'none', marginBottom: 6 }}>
                    {t.title}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ ...styles.tag, background: `${col.main}22`, color: col.main }}>{t.subject}</span>
                    <span style={{ ...styles.tag, ...diff }}>{t.difficulty}</span>
                    <span style={{ ...styles.tag, background: 'rgba(255,255,255,0.05)', color: '#64748B' }}>{minutesToHours(t.duration)}</span>
                    {t.dueDate && <span style={{ ...styles.tag, background: 'rgba(255,255,255,0.05)', color: '#64748B' }}>Due {new Date(t.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                  </div>
                </div>
                <button onClick={() => remove(t.id)} style={styles.iconBtn}><X size={14}/></button>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary bar */}
      <div style={styles.summaryBar}>
        <span style={{ color: '#94A3B8' }}>{tasks.filter(t => t.done).length} of {tasks.length} tasks complete</span>
        <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden', margin: '0 12px' }}>
          <div style={{ height: '100%', background: '#6366F1', borderRadius: 2, width: `${tasks.length ? Math.round(tasks.filter(t => t.done).length / tasks.length * 100) : 0}%`, transition: 'width 0.4s' }} />
        </div>
        <span style={{ color: '#6366F1', fontWeight: 600 }}>{tasks.length ? Math.round(tasks.filter(t => t.done).length / tasks.length * 100) : 0}%</span>
      </div>
    </div>
  );
}

const styles = {
  filterBtn: {
    padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)',
    background: 'transparent', color: '#64748B', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
  },
  filterBtnActive: { background: 'rgba(99,102,241,0.15)', color: '#818CF8', borderColor: 'rgba(99,102,241,0.3)' },
  count: { background: '#6366F1', color: '#fff', fontSize: 10, padding: '1px 5px', borderRadius: 10, fontWeight: 600 },
  addBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', background: '#6366F1', color: '#fff',
    border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500,
  },
  taskList: { display: 'flex', flexDirection: 'column', gap: 0, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14 },
  taskItem: {
    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  checkBox: {
    width: 20, height: 20, borderRadius: 5, border: '1.5px solid',
    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  tag: { fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 500 },
  iconBtn: { background: 'transparent', border: 'none', cursor: 'pointer', color: '#475569', padding: 4, display: 'flex', alignItems: 'center' },
  summaryBar: {
    marginTop: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 12,
  },
  modal: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 },
  modalInner: { background: '#131929', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24, width: 360 },
  formGroup: { marginBottom: 14 },
  label: { display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 },
  input: { width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F1F5FF', fontSize: 13, outline: 'none' },
};
