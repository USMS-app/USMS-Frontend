import React, { useState } from 'react';
import { CalendarDays, User2, GraduationCap, ChevronRight, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const TABS = [
  { key: 'details', label: 'Student details', icon: User2 },
  { key: 'attendance', label: 'Student attendance', icon: CalendarDays },
  { key: 'grades', label: 'Student grades', icon: GraduationCap },
];

export default function StudentDashboard() {
  const [tab, setTab] = useState('details');
  const navigate = useNavigate();

  // Mock data until backend wiring
  const student = {
    name: 'Rahul Sharma',
    schoolName: 'Greenwood High',
    rollNo: '23A041',
    class: 'Grade 8 - B',
    dob: '2012-03-14',
    parent: { name: 'Anil Sharma', phone: '+91 98765 43210' },
    address: 'Bengaluru, Karnataka',
  };

  const attendance = {
    percent: 94,
    recent: [
      { date: '2025-08-05', status: 'Present' },
      { date: '2025-08-04', status: 'Present' },
      { date: '2025-08-03', status: 'Absent' },
      { date: '2025-08-02', status: 'Present' },
      { date: '2025-08-01', status: 'Present' },
    ],
  };

  const grades = {
    fixedExams: [
      { name: 'F1', subjects: [{ s: 'Math', m: 18, t: 20 }, { s: 'Science', m: 17, t: 20 }, { s: 'English', m: 19, t: 20 }] },
      { name: 'F2', subjects: [{ s: 'Math', m: 17, t: 20 }, { s: 'Science', m: 18, t: 20 }, { s: 'English', m: 18, t: 20 }] },
      { name: 'Mid-term', subjects: [{ s: 'Math', m: 88, t: 100 }, { s: 'Science', m: 85, t: 100 }, { s: 'English', m: 91, t: 100 }] },
      { name: 'F3', subjects: [{ s: 'Math', m: 19, t: 20 }, { s: 'Science', m: 18, t: 20 }, { s: 'English', m: 19, t: 20 }] },
      { name: 'F4', subjects: [{ s: 'Math', m: 18, t: 20 }, { s: 'Science', m: 19, t: 20 }, { s: 'English', m: 20, t: 20 }] },
      { name: 'Final semester', subjects: [{ s: 'Math', m: 92, t: 100 }, { s: 'Science', m: 90, t: 100 }, { s: 'English', m: 94, t: 100 }] },
    ],
    otherAssessments: [
      { title: 'Weekly Quiz - Algebra', date: '2025-07-28', score: '9/10' },
      { title: 'Science Lab - Acids & Bases', date: '2025-07-22', score: '18/20' },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FEFEFC]">
      {/* Top bar */}
      <header className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="USMS" className="h-8 sm:h-10 w-auto object-contain" />
            <span className="font-semibold truncate">USMS</span>
          </div>
          <div className="flex-1 text-center min-w-0">
            <div className="text-sm sm:text-base font-medium truncate">
              {student.name} <span className="opacity-80">({student.schoolName})</span>
            </div>
            <div className="text-[12px] opacity-80 hidden sm:block">Student/Parents Dashboard</div>
          </div>
          <div className="min-w-0 flex items-center justify-end">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-blue-900 font-semibold px-3 py-1.5 rounded-md"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="rounded-xl shadow-xl bg-blue-900 text-white p-2 border border-blue-800">
          <div className="grid grid-cols-3 gap-1">
            {TABS.map(({ key, label, icon: Icon }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`${active ? 'bg-amber-400 text-blue-900 ring-1 ring-amber-300' : 'bg-blue-700 text-white hover:bg-blue-600'} min-w-0 w-full h-11 sm:h-12 rounded font-semibold text-xs sm:text-[15px] leading-4 px-2 sm:px-3 text-center whitespace-normal break-words flex items-center justify-center gap-2 transition-colors`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="mt-6">
          {tab === 'details' && <DetailsCard student={student} />}
          {tab === 'attendance' && <AttendanceCard attendance={attendance} />}
          {tab === 'grades' && <GradesCard grades={grades} />}
        </div>
      </main>
    </div>
  );
}

function Section({ title, children, action }) {
  return (
    <section className="rounded-2xl bg-white border border-blue-100 shadow-sm">
      <div className="px-4 sm:px-6 py-4 border-b border-blue-100 flex items-center justify-between">
        <h2 className="text-blue-900 font-semibold">{title}</h2>
        {action}
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function DetailsCard({ student }) {
  return (
    <Section title="Student details">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" value={student.name} />
        <Field label="Roll no" value={student.rollNo} />
        <Field label="Class" value={student.class} />
        <Field label="Date of birth" value={student.dob} />
        <Field label="Parent/Guardian" value={student.parent.name} />
        <Field label="Contact" value={student.parent.phone} />
        <Field label="Address" value={student.address} className="sm:col-span-2" />
      </div>
    </Section>
  );
}

function Field({ label, value, className = '' }) {
  return (
    <div className={className}>
      <div className="text-[12px] text-slate-500">{label}</div>
      <div className="text-blue-900 font-medium">{value}</div>
    </div>
  );
}

function AttendanceCard({ attendance }) {
  return (
    <Section
      title="Student attendance"
      action={
        <button className="text-blue-900 bg-amber-400 hover:bg-amber-500 font-semibold px-3 py-1.5 rounded-md flex items-center gap-1">
          View full report <ChevronRight size={16} />
        </button>
      }
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-1/3">
          <div className="text-[12px] text-slate-500 mb-1">Attendance percentage</div>
          <div className="text-4xl font-bold text-blue-900">{attendance.percent}%</div>
        </div>
        <div className="sm:flex-1">
          <div className="text-[12px] text-slate-500 mb-2">Recent days</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {attendance.recent.map((d) => (
              <div key={d.date} className={`rounded-lg px-3 py-2 border text-sm ${d.status === 'Present' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                <div className="font-medium">{d.status}</div>
                <div className="text-[12px] opacity-80">{d.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function GradesCard({ grades }) {
  return (
    <Section
      title="Student grades"
      action={
        <button className="text-blue-900 bg-amber-400 hover:bg-amber-500 font-semibold px-3 py-1.5 rounded-md flex items-center gap-1">
          Download PDF <ChevronRight size={16} />
        </button>
      }
    >
      <div className="space-y-6">
        {/* Fixed exams */}
        <div>
          <div className="text-[12px] text-slate-500 mb-2">Fixed exams</div>
          <div className="grid gap-3">
            {grades.fixedExams.map((exam) => (
              <div key={exam.name} className="rounded-xl border border-blue-100 bg-white">
                <div className="px-4 py-2 border-b border-blue-100 text-blue-900 font-semibold">{exam.name}</div>
                <div className="p-4 grid sm:grid-cols-3 gap-3">
                  {exam.subjects.map((s) => (
                    <div key={s.s} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                      <div className="text-[12px] text-slate-500">{s.s}</div>
                      <div className="text-blue-900 font-medium">{s.m} / {s.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other assessments created by teachers */}
        <div>
          <div className="text-[12px] text-slate-500 mb-2">Other assessments (by teachers)</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {grades.otherAssessments.map((a, idx) => (
              <div key={idx} className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-blue-900 font-semibold">{a.title}</div>
                <div className="text-[12px] text-slate-500">{a.date}</div>
                <div className="mt-1 text-blue-900">Score: {a.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
