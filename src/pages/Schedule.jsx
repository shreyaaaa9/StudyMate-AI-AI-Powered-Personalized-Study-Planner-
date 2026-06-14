import React, { useState } from 'react';
import { Plus, X, Clock } from 'lucide-react';
import { SUBJECT_COLORS } from '../data';
import { getDayLabel, minutesToHours } from '../utils/helpers';

export default function Schedule({ schedule, setSchedule, subjects }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ date: '', startTime: '09:00', duration: 60, subject: subjects[0]?.name || '', label: '' });

  const addBlock = () => {
    if (!form.date || !form.label) return;
    setSchedule([...schedule, { ...form, id: Date.now(), duration: Number(form.duration) }]);
    setShowAdd(false);
    setForm({ date: '', startTime: '09:00', duration: 60, subject: subjects[0]?.name || '', label: '' });
  };

  const remove = (id) => setSchedule(schedule.filter(b => b.id !== id));

  const grouped = schedule.reduce((acc, b) => {
    if (!acc[b.date]) acc[b.date] = [];
    acc[b.date].push(b);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: '#64748B' }}>{schedule.length} study blocks scheduled</div>
        <button onClick={() => setShowAdd(true)} style={styles.addBtn}><Plus size={14}/> Add block</button>
      </div>

      {showAdd && (
        <div style={styles.modal}>
          <div style={styles.modalInner}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>New study block</div>
              <button onClick={() => setShowAdd(false)} style={styles.iconBtn}><X size={16}/></button>
            </div>
            {[
              { label: 'Date', key: 'date', type: 'date' },
              { label: 'Start time', key: 'startTime', type: 'time' },
              { label: 'Duration (minutes)', key: 'duration', type: 'number', placeholder: '60' },
              { label: 'Description', key: 'label', type: 'text', placeholder: 'e.g. Integration review' },
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
            <button onClick={addBlock} style={styles.addBtn}>Add block</button>
          </div>
        </div>
      )}

      {sortedDates.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
          <Clock size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
          <div style={{ fontSize: 14 }}>No study blocks yet. Add one to build your schedule.</div>
        </div>
      ) : (
        sortedDates.map(date => {
          const isToday = date === new Date().toISOString().split('T')[0];
          const blocks = [...grouped[date]].sort((a, b) => a.startTime.localeCompare(b.startTime));
          const totalMin = blocks.reduce((s, b) => s + b.duration, 0);
          return (
            <div key={date} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: isToday ? '#818CF8' : '#94A3B8' }}>{getDayLabel(date)}</div>
                {isToday && <span style={styles.todayBadge}>Today</span>}
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ fontSize: 11, color: '#475569' }}>{minutesToHours(totalMin)} total</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {blocks.map(b => {
                  const col = SUBJECT_COLORS[b.subject] || { main: '#6366F1' };
                  return (
                    <div key={b.id} style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
                      <div style={{ fontSize: 11, color: '#475569', width: 44, paddingTop: 10, flexShrink: 0, textAlign: 'right' }}>{b.startTime}</div>
                      <div style={{ flex: 1, padding: '10px 14px', borderRadius: 10, borderLeft: `3px solid ${col.main}`, background: `${col.main}16`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{b.label}</div>
                          <div style={{ fontSize: 11, color: '#64748B', marginTop: 3, display: 'flex', gap: 8 }}>
                            <span style={{ color: col.main }}>{b.subject}</span>
                            <span>·</span>
                            <span>{minutesToHours(b.duration)}</span>
                          </div>
                        </div>
                        <button onClick={() => remove(b.id)} style={styles.iconBtn}><X size={12}/></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

const styles = {
  addBtn: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#6366F1', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500 },
  iconBtn: { background: 'transparent', border: 'none', cursor: 'pointer', color: '#475569', padding: 4, display: 'flex', alignItems: 'center' },
  todayBadge: { fontSize: 10, padding: '2px 8px', borderRadius: 20, background: '#6366F1', color: '#fff', fontWeight: 600 },
  modal: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 },
  modalInner: { background: '#131929', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24, width: 360 },
  formGroup: { marginBottom: 14 },
  label: { display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 },
  input: { width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F1F5FF', fontSize: 13, outline: 'none' },
};
