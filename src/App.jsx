import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentProfile from "./pages/student/StudentProfile";
import Attendance from "./pages/student/Attendance";
import Academics from "./pages/student/Academics";
import { Toaster } from "@/components/ui/sonner";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import Classes from "./pages/admin/Classes";
import ClassDetail from "./pages/admin/ClassDetail";
import Teachers from "./pages/admin/Teachers";
import Students from "./pages/admin/Students";
import ReportScheduling from "./pages/admin/ReportScheduling";
import StudentLayout from "./pages/student/StudentLayout";
import StudentHome from "./pages/student/StudentHome";
import TeacherLayout from "./pages/teacher/TeacherLayout";
import TeacherHome from "./pages/teacher/TeacherHome";
import ClassTeacherDashboard from "./pages/teacher/ClassTeacherDashboard";
import SubjectTeacherDashboard from "./pages/teacher/SubjectTeacherDashboard";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherAnalytics from "./pages/teacher/Analytics";
import { TeacherAuthProvider } from "./contexts/TeacherAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
// Owner imports
import OwnerLayout from "./pages/owner/OwnerLayout";
import OwnerHome from "./pages/owner/OwnerHome";
import Schools from "./pages/owner/Schools";
import AddSchool from "./pages/owner/AddSchool";
import SchoolDetail from "./pages/owner/SchoolDetail";
import Analytics from "./pages/owner/Analytics";
import Settings from "./pages/owner/Settings";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				{/* Student nested routes */}
				<Route path="/student" element={<StudentLayout />}>
					<Route index element={<StudentHome />} />
					<Route path="profile" element={<StudentProfile />} />
					<Route path="attendance" element={<Attendance />} />
					<Route path="academics" element={<Academics />} />
				</Route>
				{/* Admin nested routes */}
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<AdminHome />} />
					<Route path="classes" element={<Classes />} />
					<Route path="classes/:classId" element={<ClassDetail />} />
					<Route path="teachers" element={<Teachers />} />
					<Route path="students" element={<Students />} />
					<Route path="report-scheduling" element={<ReportScheduling />} />
				</Route>

				{/* Teacher nested routes with authentication and role-based access */}
				<Route
					path="/teacher"
					element={
						<TeacherAuthProvider>
							<ProtectedRoute>
								<TeacherLayout />
							</ProtectedRoute>
						</TeacherAuthProvider>
					}
				>
					<Route index element={<TeacherHome />} />
					<Route path="class-teacher" element={<ClassTeacherDashboard />} />
					<Route path="subject-teacher" element={<SubjectTeacherDashboard />} />
					<Route
						path="attendance"
						element={
							<ProtectedRoute requireClassTeacher={true}>
								<TeacherAttendance />
							</ProtectedRoute>
						}
					/>
					<Route
						path="analytics"
						element={
							<ProtectedRoute requireClassTeacher={true}>
								<TeacherAnalytics />
							</ProtectedRoute>
						}
					/>
				</Route>

				{/* Owner nested routes */}
				<Route path="/owner" element={<OwnerLayout />}>
					<Route index element={<OwnerHome />} />
					<Route path="schools" element={<Schools />} />
					<Route path="schools/new" element={<AddSchool />} />
					<Route path="schools/:id" element={<SchoolDetail />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="settings" element={<Settings />} />
				</Route>

				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Toaster position="top-right" richColors expand />
		</BrowserRouter>
	);
};

export default App;
