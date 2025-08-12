import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import StudentDashboard from "../pages/StudentDashboard";
import StudentProfile from "../pages/stdDash/StudentProfile";
import Attendance from "../pages/stdDash/Attendance";
import Academics from "../pages/stdDash/Academics";

export default function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/student-dashboard" element={<StudentDashboard />} />
				<Route path="/student-profile" element={<StudentProfile />} />
				<Route path="/attendance" element={<Attendance />} />
				<Route path="/academics" element={<Academics />} />
			</Routes>
		</Router>
	);
}
