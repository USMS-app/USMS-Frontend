import React from "react";
import { Layers, Users, User } from "lucide-react";

export default function AdminHome() {
  const stats = [
    { label: "Total Classes", value: 18, icon: Layers, color: "bg-blue-100", iconColor: "text-blue-600" },
    { label: "Teachers", value: 46, icon: Users, color: "bg-green-100", iconColor: "text-green-600" },
    { label: "Students", value: 920, icon: User, color: "bg-purple-100", iconColor: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{s.label}</p>
              <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            </div>
            <div className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center`}>
              <s.icon className={`${s.iconColor}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li>• New class "9-B" created</li>
          <li>• Teacher "Anita Sharma" added to Mathematics department</li>
          <li>• 35 students enrolled in "Science Fair" event</li>
        </ul>
      </div>
    </div>
  );
}
