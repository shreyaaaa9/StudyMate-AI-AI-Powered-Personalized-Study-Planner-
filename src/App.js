import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { INITIAL_SUBJECTS, INITIAL_TASKS, INITIAL_SCHEDULE } from "./data";
import { daysUntil } from "./utils/helpers";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Schedule from "./pages/Schedule";
import Tasks from "./pages/Tasks";
import Exams from "./pages/Exams";
import AIPlanner from "./pages/AIPlanner";

import Signup from "./auth/Signup";
import Login from "./auth/Login";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  subjects: "My Subjects",
  schedule: "Weekly Schedule",
  tasks: "Tasks",
  exams: "Exam Countdown",
  ai: "AI Study Planner",
};

export default function App() {
  // Firebase Authentication State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Existing App State
  const [page, setPage] = useState("dashboard");
  const [subjects, setSubjects] = useLocalStorage(
    "sm_subjects",
    INITIAL_SUBJECTS
  );
  const [tasks, setTasks] = useLocalStorage(
    "sm_tasks",
    INITIAL_TASKS
  );
  const [schedule, setSchedule] = useLocalStorage(
    "sm_schedule",
    INITIAL_SCHEDULE
  );

  const streak = 12;

  const nextExam = [...subjects].sort(
    (a, b) => new Date(a.examDate) - new Date(b.examDate)
  )[0];

  const nextExamDays = nextExam
    ? daysUntil(nextExam.examDate)
    : null;

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return (
          <Dashboard
            subjects={subjects}
            tasks={tasks}
            schedule={schedule}
          />
        );

      case "subjects":
        return (
          <Subjects
            subjects={subjects}
            setSubjects={setSubjects}
          />
        );

      case "schedule":
        return (
          <Schedule
            schedule={schedule}
            setSchedule={setSchedule}
            subjects={subjects}
          />
        );

      case "tasks":
        return (
          <Tasks
            tasks={tasks}
            setTasks={setTasks}
            subjects={subjects}
          />
        );

      case "exams":
        return <Exams subjects={subjects} />;

      case "ai":
        return (
          <AIPlanner
            subjects={subjects}
            tasks={tasks}
          />
        );

      default:
        return null;
    }
  };

  // Loading while Firebase checks auth
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        Loading...
      </div>
    );
  }

  // Show Login / Signup when user is not logged in
  if (!user) {
    return showLogin ? (
      <Login onSwitch={() => setShowLogin(false)} />
    ) : (
      <Signup onSwitch={() => setShowLogin(true)} />
    );
  }
    // Show Dashboard when logged in
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar
        page={page}
        setPage={setPage}
        streak={streak}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            padding: "14px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#0B0F1A",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#F1F5FF",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {PAGE_TITLES[page]}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {nextExam && (
              <div
                style={{
                  fontSize: 12,
                  padding: "4px 12px",
                  borderRadius: 20,
                  background:
                    nextExamDays <= 10
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(99,102,241,0.15)",
                  color:
                    nextExamDays <= 10
                      ? "#FCA5A5"
                      : "#818CF8",
                  fontWeight: 500,
                }}
              >
                {nextExam.name} in {nextExamDays}d
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <button
                onClick={() => signOut(auth)}
                style={{
                  background: "#EF4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Logout
              </button>

              <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "6px 12px",
    background: "#161D2F",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
  }}
>
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 700,
      fontSize: 18,
    }}
  >
    {user.email?.charAt(0).toUpperCase()}
  </div>

  <div>
    <div
      style={{
        color: "#fff",
        fontWeight: 600,
        fontSize: "14px",
      }}
    >
      {user.email?.split("@")[0]}
    </div>

    <div
      style={{
        color: "#94A3B8",
        fontSize: "12px",
      }}
    >
      Student
    </div>
  </div>
</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {renderPage()}
        </div>
      </div>
    </div>
  );
}