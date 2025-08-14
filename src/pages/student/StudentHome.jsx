import React from "react";
import { User, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentHome() {
  const quick = [
    { to: "/student/profile", label: "Profile", icon: User, bg: "bg-purple-100", iconBg: "bg-purple-500" },
    { to: "/student/academics", label: "Academics", icon: FileText, bg: "bg-blue-100", iconBg: "bg-blue-500" },
    { to: "/student/attendance", label: "Attendance", icon: Calendar, bg: "bg-teal-100", iconBg: "bg-teal-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-center flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Student Name </h1>
        <span className="text-gray-600 text-sm">Student ID</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quick.map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className={`${q.bg} p-6 rounded-xl hover:shadow-lg transition-all duration-200 group`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-16 h-16 ${q.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <q.icon className="text-white w-7 h-7" />
              </div>
              <span className="font-semibold text-gray-900 text-lg">{q.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm">Attendance</p>
          <p className="text-3xl font-bold text-gray-900">94%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm">Average Score</p>
          <p className="text-3xl font-bold text-gray-900">85%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm">Fees Paid</p>
          <p className="text-3xl font-bold text-gray-900">₹35k</p>
        </div>
      </div>
    </div>
  );
}
