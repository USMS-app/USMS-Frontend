import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
	Home,
	Layers,
	Users,
	User,
	LogOut,
	Menu,
	X,
	Calendar,
} from "lucide-react";

const NAV = [
	{ to: "/admin", label: "Dashboard", icon: Home, exact: true },
	{ to: "/admin/classes", label: "Classes", icon: Layers },
	{ to: "/admin/teachers", label: "Teachers", icon: Users },
	{ to: "/admin/students", label: "Students", icon: User },
	{
		to: "/admin/report-scheduling",
		label: "Report Scheduling",
		icon: Calendar,
	},
];

export default function AdminLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const isActive = (to, exact) => {
		if (exact) return location.pathname === to;
		return location.pathname.startsWith(to);
	};

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
					<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">U</span>
					</div>
					<span className="text-gray-900 font-semibold">USMS Admin</span>
				</div>
				<button
					onClick={() => navigate("/")}
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
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-xl">U</span>
							</div>
							<span className="text-gray-900 font-semibold text-lg">
								USMS Admin
							</span>
						</div>
					</div>
					<nav className="p-4 space-y-2">
						{NAV.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
									isActive(item.to, item.exact)
										? "bg-gray-100 text-gray-900"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								}`}
							>
								<item.icon
									size={20}
									className={
										isActive(item.to, item.exact)
											? "text-gray-900"
											: "text-gray-500"
									}
								/>
								<span className="font-medium">{item.label}</span>
							</Link>
						))}
					</nav>
					<div className="absolute bottom-6 left-4 right-4">
						<button
							onClick={() => navigate("/")}
							className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
						>
							<LogOut size={20} className="text-gray-500" />
							<span className="font-medium">Logout</span>
						</button>
					</div>
				</aside>

				{/* Mobile Sidebar */}
				{sidebarOpen && (
					<div className="lg:hidden fixed inset-0 z-40">
						<div
							className="fixed inset-0 bg-black bg-opacity-50"
							onClick={() => setSidebarOpen(false)}
						/>
						<div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
							<div className="p-4 border-b border-gray-200 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
										<span className="text-white font-bold text-sm">U</span>
									</div>
									<span className="text-gray-900 font-semibold">
										USMS Admin
									</span>
								</div>
								<button
									onClick={() => setSidebarOpen(false)}
									className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
								>
									<X size={18} />
								</button>
							</div>
							<nav className="p-4 space-y-2">
								{NAV.map((item) => (
									<Link
										key={item.to}
										to={item.to}
										onClick={() => setSidebarOpen(false)}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
											isActive(item.to, item.exact)
												? "bg-gray-100 text-gray-900"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
										}`}
									>
										<item.icon
											size={20}
											className={
												isActive(item.to, item.exact)
													? "text-gray-900"
													: "text-gray-500"
											}
										/>
										<span className="font-medium">{item.label}</span>
									</Link>
								))}
							</nav>
							<div className="absolute bottom-6 left-4 right-4">
								<button
									onClick={() => navigate("/")}
									className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
								>
									<LogOut size={20} className="text-gray-500" />
									<span className="font-medium">Logout</span>
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Main content */}
				<div className="flex-1 lg:ml-64 overflow-x-hidden">
					<header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
						<div className="flex items-center justify-center md:justify-between">
							<div className="flex flex-col justify-center items-center gap-2 ">
								<h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
									school Name
								</h1>
								<p className="text-gray-600 text-sm">Admin Dashboard</p>
							</div>
							<div className="hidden sm:flex items-center gap-4">
								<button
									onClick={() => navigate("/")}
									className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
								>
									<LogOut size={16} />
									<span>Logout</span>
								</button>
							</div>
						</div>
					</header>
					<main className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
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
						className={`flex flex-col items-center justify-items-start p-2 rounded-lg transition-colors duration-200 ${
							isActive(item.to, item.exact)
								? "text-blue-600 bg-blue-50"
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
