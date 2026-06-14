import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Flame, TrendingUp, CheckSquare, Clock, CalendarDays } from 'lucide-react';
import { SUBJECT_COLORS, WEEK_HOURS } from '../data';
import { daysUntil, formatDate, minutesToHours } from '../utils/helpers';

export default function Dashboard({ subjects, tasks, schedule }) {
  const totalHoursWeek = WEEK_HOURS.reduce((s, d) => s + d.hours, 0);
  const doneTasks = tasks.filter(t => t.done).length;
  const avgScore = Math.round(subjects.reduce((s, x) => s + x.avgScore, 0) / subjects.length);
  const nextExam = [...subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate))[0];
  const daysLeft = daysUntil(nextExam.examDate);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.dueDate === todayStr || !t.done).slice(0, 4);
  const todaySchedule = schedule.filter(s => s.date === todayStr);

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { icon: <Clock size={16}/>, label: 'Hours this week', value: `${totalHoursWeek}h`, sub: '+3.2h vs last week', subColor: '#22C55E' },
          { icon: <CheckSquare size={16}/>, label: 'Tasks done', value: `${doneTasks}/${tasks.length}`, sub: `${tasks.length - doneTasks} remaining`, subColor: '#F59E0B' },
          { icon: <TrendingUp size={16}/>, label: 'Avg score', value: `${avgScore}%`, sub: '+7% this month', subColor: '#22C55E' },
          { icon: <CalendarDays size={16}/>, label: 'Next exam', value: formatDate(nextExam.examDate), sub: `${daysLeft}d · ${nextExam.name}`, subColor: daysLeft <= 10 ? '#EF4444' : '#F59E0B' },
        ].map((s, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statLabel}>{React.cloneElement(s.icon, { color: '#6366F1' })} {s.label}</div>
            <div style={styles.statVal}>{s.value}</div>
            <div style={{ fontSize: 12, color: s.subColor, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Weekly chart */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Study hours this week</div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={WEEK_HOURS} barCategoryGap="30%">
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#CBD5E1' }}
                formatter={(v) => [`${v}h`, 'Hours']}
              />
              <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                {WEEK_HOURS.map((_, i) => (
                  <Cell key={i} fill={i === new Date().getDay() - 1 ? '#6366F1' : 'rgba(99,102,241,0.35)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject progress */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Subject progress</div>
          {subjects.map(s => {
            const col = SUBJECT_COLORS[s.name] || { main: '#6366F1' };
            return (
              <div key={s.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: '#CBD5E1' }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: col.main, fontWeight: 500 }}>{s.progress}%</span>
                </div>
                <div style={styles.progressTrack}>
                  <div style={{ ...styles.progressFill, width: `${s.progress}%`, background: col.main }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's plan */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={styles.cardTitle}>Today's plan</div>
          <div style={styles.badge}>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</div>
        </div>
        {todaySchedule.length > 0 && (
          <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Scheduled blocks</div>
            {todaySchedule.map(b => {
              const col = SUBJECT_COLORS[b.subject] || { main: '#6366F1' };
              return (
                <div key={b.id} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'stretch' }}>
                  <div style={{ fontSize: 11, color: '#64748B', width: 42, paddingTop: 8, flexShrink: 0 }}>{b.startTime}</div>
                  <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, borderLeft: `3px solid ${col.main}`, background: `${col.main}18` }}>
                    <div style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{b.label}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{b.subject} · {minutesToHours(b.duration)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {todayTasks.map(t => {
          const col = SUBJECT_COLORS[t.subject] || { main: '#6366F1' };
          return (
            <div key={t.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ ...styles.checkBox, background: t.done ? '#6366F1' : 'transparent', borderColor: t.done ? '#6366F1' : '#475569' }}>
                {t.done && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: t.done ? '#64748B' : '#E2E8F0', textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
                  <span style={{ ...styles.tag, background: `${col.main}22`, color: col.main }}>{t.subject}</span>
                  <span style={{ ...styles.tag, background: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}>{minutesToHours(t.duration)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Streak */}
      <div style={{ ...styles.card, marginTop: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Flame size={24} color="#F59E0B" />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F59E0B' }}>12 day streak</div>
            <div style={{ fontSize: 12, color: '#64748B' }}>Best: 21 days · Keep it going!</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: 21 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 8, borderRadius: 2, background: i < 12 ? '#F59E0B' : 'rgba(255,255,255,0.08)' }} />
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>12/21 days to new record</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  statCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: '14px 16px',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 6,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statVal: {
    fontSize: 24,
    fontWeight: 700,
    color: '#F1F5FF',
    lineHeight: 1,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14,
    padding: '16px 18px',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 500,
    color: '#94A3B8',
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  progressTrack: {
    height: 5,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.6s ease',
  },
  badge: {
    fontSize: 11,
    padding: '3px 10px',
    borderRadius: 20,
    background: 'rgba(99,102,241,0.15)',
    color: '#818CF8',
    fontWeight: 500,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    border: '1.5px solid',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  tag: {
    fontSize: 11,
    padding: '2px 8px',
    borderRadius: 20,
    fontWeight: 500,
  },
};
