import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/stdDash/StudentProfile";
import Attendance from "./pages/stdDash/Attendance";
import Academics from "./pages/stdDash/Academics";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/student-dashboard" element={<StudentDashboard />} />

				<Route path="/student-profile" element={<StudentProfile />} />
				<Route path="/attendance" element={<Attendance />} />
				<Route path="/academics" element={<Academics />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Toaster position="top-right" richColors expand />
		</BrowserRouter>
	);
};

export default App;
