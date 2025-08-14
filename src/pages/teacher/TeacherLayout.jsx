import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
	Home,
	BookOpen,
	FileText,
	Menu,
	X,
	LogOut,
	Users,
	BarChart3,
	GraduationCap,
} from "lucide-react";
import { useTeacherAuth } from "@/contexts/TeacherAuthContext";

export default function TeacherLayout() {
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { teacher, isClassTeacher, logout } = useTeacherAuth();

	// Navigation items based on teacher role
	const getNavigationItems = () => {
		const baseNav = [
			{ to: "/teacher", label: "Dashboard", icon: Home, exact: true },
			{
				to: "/teacher/class-teacher",
				label: "Class Teacher",
				icon: GraduationCap,
			},
			{
				to: "/teacher/subject-teacher",
				label: "Subject Teacher",
				icon: BookOpen,
			},
		];

		// Only show attendance and analytics for class teachers
		if (isClassTeacher) {
			baseNav.push(
				{ to: "/teacher/attendance", label: "Attendance", icon: Users },
				{ to: "/teacher/analytics", label: "Analytics", icon: BarChart3 }
			);
		}

		return baseNav;
	};

	const NAV = getNavigationItems();

	const isActive = (to, exact = false) => {
		if (exact) return location.pathname === to;
		return location.pathname.startsWith(to);
	};

	const handleLogout = () => {
		logout();
		// Redirect to login page
		window.location.href = "/";
	};

	if (!teacher) {
		return null; // Will be handled by ProtectedRoute
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile header */}
			<div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
				<button
					onClick={() => setSidebarOpen(true)}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
				>
					<Menu size={22} />
				</button>
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">T</span>
					</div>
					<span className="text-gray-900 font-semibold">Teacher Portal</span>
				</div>
				<button
					onClick={handleLogout}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
				>
					<LogOut size={18} />
				</button>
			</div>

			<div className="flex">
				{/* Sidebar - Desktop */}
				<aside className="hidden lg:block w-64 bg-white shadow-lg border-r border-gray-200 fixed h-full z-30">
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">T</span>
							</div>
							<div>
								<h2 className="font-semibold text-gray-900">Teacher Portal</h2>
								<p className="text-xs text-gray-500">
									{isClassTeacher ? "Class Teacher" : "Subject Teacher"}
								</p>
								<p className="text-xs text-gray-500">{teacher.name}</p>
							</div>
						</div>
					</div>
					<nav className="p-4 space-y-1">
						{NAV.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
									isActive(item.to, item.exact)
										? "bg-green-50 text-green-700"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<item.icon
									size={20}
									className={
										isActive(item.to, item.exact)
											? "text-green-600"
											: "text-gray-400"
									}
								/>
								<span className="font-medium">{item.label}</span>
							</Link>
						))}
					</nav>
					<div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
						<button
							onClick={handleLogout}
							className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
						>
							<LogOut size={20} className="text-gray-500" />
							<span className="font-medium">Logout</span>
						</button>
					</div>
				</aside>

				{/* Mobile sidebar */}
				{sidebarOpen && (
					<div className="fixed inset-0 z-40 lg:hidden">
						<div
							className="fixed inset-0 bg-black/20"
							onClick={() => setSidebarOpen(false)}
						></div>
						<div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 overflow-y-auto">
							<div className="p-4 flex items-center justify-between border-b border-gray-200">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
										<span className="text-white font-bold text-lg">T</span>
									</div>
									<div>
										<span className="font-semibold text-gray-900">
											Teacher Portal
										</span>
										<p className="text-xs text-gray-500">
											{isClassTeacher ? "Class Teacher" : "Subject Teacher"}
										</p>
									</div>
								</div>
								<button
									onClick={() => setSidebarOpen(false)}
									className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
								>
									<X size={20} />
								</button>
							</div>
							<nav className="p-2 space-y-1">
								{NAV.map((item) => (
									<Link
										key={item.to}
										to={item.to}
										onClick={() => setSidebarOpen(false)}
										className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
											isActive(item.to, item.exact)
												? "bg-green-50 text-green-700"
												: "text-gray-700 hover:bg-gray-100"
										}`}
									>
										<item.icon
											size={20}
											className={
												isActive(item.to, item.exact)
													? "text-green-600"
													: "text-gray-400"
											}
										/>
										<span className="font-medium">{item.label}</span>
									</Link>
								))}
							</nav>
						</div>
					</div>
				)}

				{/* Main content */}
				<div className="flex-1 lg:ml-64 overflow-x-hidden">
					<header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
						<div className="flex items-center justify-between">
							<h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
								Teacher Dashboard
							</h1>
							<div className="hidden sm:flex items-center gap-4">
								<div className="text-sm text-gray-600">
									<span className="font-medium">{teacher.name}</span>
									<span className="mx-2">•</span>
									<span
										className={
											isClassTeacher ? "text-green-600" : "text-blue-600"
										}
									>
										{isClassTeacher ? "Class Teacher" : "Subject Teacher"}
									</span>
								</div>
								<button
									onClick={handleLogout}
									className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
								>
									<LogOut size={16} />
									<span>Logout</span>
								</button>
							</div>
						</div>
					</header>
					<main className="p-4 sm:p-6 lg:p-8">
						<Outlet />
					</main>
				</div>
			</div>

			{/* Mobile Bottom Navigation */}
			<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-40">
				{NAV.map((item) => (
					<Link
						key={item.to}
						to={item.to}
						className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
							isActive(item.to, item.exact)
								? "text-green-600 bg-green-50"
								: "text-gray-600 hover:bg-gray-50"
						}`}
						onClick={() => setSidebarOpen(false)}
					>
						<item.icon size={20} className="mb-1" />
						<span className="text-xs">{item.label}</span>
					</Link>
				))}
			</div>
		</div>
	);
}
