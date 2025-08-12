import React, { useState } from "react";
import {
	Home,
	FileText,
	Clock,
	User,
	Calendar,
	GraduationCap,
	CreditCard,
	LogOut,
	ChevronRight,
	Menu,
	X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
	{ key: "dashboard", label: "Dashboard", icon: Home, active: true },
	{ key: "profile", label: "Student Profile", icon: User, active: false },
	{ key: "academics", label: "Academics", icon: FileText, active: false },
	{ key: "attendance", label: "Attendance", icon: Calendar, active: false },
];

const QUICK_ACTIONS = [
	{
		key: "profile",
		label: "Student Profile",
		icon: User,
		bgColor: "bg-purple-100",
		iconColor: "text-purple-600",
		iconBg: "bg-purple-500",
	},
	{
		key: "academics",
		label: "Academics",
		icon: FileText,
		bgColor: "bg-blue-100",
		iconColor: "text-blue-600",
		iconBg: "bg-blue-500",
	},
	{
		key: "attendance",
		label: "Attendance",
		icon: Calendar,
		bgColor: "bg-teal-100",
		iconColor: "text-teal-600",
		iconBg: "bg-teal-500",
	},
];

export default function StudentDashboard() {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navigate = useNavigate();

	// Mock data until backend wiring
	const student = {
		name: "Vinod R",
		avatar: null,
		date: "08-4-12",
		schoolName: "Greenwood High",
		rollNo: "24",
		class: "9 A",
		registrationNo: "STU2024001",
		dob: "2006-03-14",
		parent: { name: "Bryan M. Morales", phone: "+91 98765 43210" },
		address: "Bengaluru, Karnataka",
		email: "ali.khan@email.com",
		bloodGroup: "O+",
		emergencyContact: "+91 98765 43211",
		admissionDate: "2020-06-01",
		previousSchool: "Sunrise Elementary",
		achievements: ["Best Student Award 2023", "Science Olympiad Winner 2022"],
		extracurricular: ["Football Team Captain", "School Band Member"],
	};

	const attendance = {
		percent: 94,
		recent: [
			{ date: "2025-01-15", status: "Present" },
			{ date: "2025-01-14", status: "Present" },
			{ date: "2025-01-13", status: "Absent" },
			{ date: "2025-01-12", status: "Present" },
			{ date: "2025-01-11", status: "Present" },
		],
	};

	const fees = {
		total: 50000,
		paid: 35000,
		pending: 15000,
		dueDate: "2025-01-31",
		transactions: [
			{
				date: "2025-01-15",
				amount: 15000,
				type: "Paid",
				description: "Tuition Fee",
			},
			{
				date: "2025-01-10",
				amount: 20000,
				type: "Paid",
				description: "Transport Fee",
			},
		],
	};

	const handleNavClick = (key) => {
		if (key === "profile") {
			navigate("/student-profile");
		} else if (key === "academics") {
			navigate("/academics");
		} else if (key === "attendance") {
			navigate("/attendance");
		} else {
			setActiveTab(key);
		}
		setSidebarOpen(false); // Close sidebar on mobile after navigation
	};

	const handleQuickAction = (key) => {
		handleNavClick(key);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile Header */}
			<div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
				<button
					onClick={() => setSidebarOpen(true)}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
				>
					<Menu size={24} />
				</button>
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">U</span>
					</div>
					<span className="text-gray-900 font-semibold">USMS</span>
				</div>
				<button
					onClick={() => navigate("/")}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
				>
					<LogOut size={20} />
				</button>
			</div>

			<div className="flex">
				{/* Sidebar - Desktop */}
				<div className="hidden lg:block w-64 bg-white shadow-lg border-r border-gray-200 fixed h-full z-30">
					{/* Logo Section */}
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-xl">U</span>
							</div>
							<span className="text-gray-900 font-semibold text-lg">USMS</span>
						</div>
					</div>

					{/* Navigation Menu */}
					<nav className="p-4 space-y-2">
						{NAV_ITEMS.map((item) => (
							<button
								key={item.key}
								onClick={() => handleNavClick(item.key)}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
									activeTab === item.key
										? "bg-gray-100 text-gray-900"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								}`}
							>
								<item.icon
									size={20}
									className={
										activeTab === item.key ? "text-gray-900" : "text-gray-500"
									}
								/>
								<span className="font-medium">{item.label}</span>
							</button>
						))}
					</nav>

					{/* Logout Button */}
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

				{/* Mobile Sidebar Overlay */}
				{sidebarOpen && (
					<div className="lg:hidden fixed inset-0 z-40">
						<div
							className="fixed inset-0 bg-black bg-opacity-50"
							onClick={() => setSidebarOpen(false)}
						></div>
						<div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
							{/* Mobile Sidebar Header */}
							<div className="p-4 border-b border-gray-200 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
										<span className="text-white font-bold text-sm">U</span>
									</div>
									<span className="text-gray-900 font-semibold">USMS</span>
								</div>
								<button
									onClick={() => setSidebarOpen(false)}
									className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
								>
									<X size={20} />
								</button>
							</div>

							{/* Mobile Navigation */}
							<nav className="p-4 space-y-2">
								{NAV_ITEMS.map((item) => (
									<button
										key={item.key}
										onClick={() => handleNavClick(item.key)}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
											activeTab === item.key
												? "bg-gray-100 text-gray-900"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
										}`}
									>
										<item.icon
											size={20}
											className={
												activeTab === item.key
													? "text-gray-900"
													: "text-gray-500"
											}
										/>
										<span className="font-medium">{item.label}</span>
									</button>
								))}
							</nav>

							{/* Mobile Logout */}
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

				{/* Main Content Area */}
				<div className="flex-1 lg:ml-64">
					{/* Top Header */}
					<header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3 sm:gap-4">
								{/* Avatar */}
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
									<User size={24} className="sm:w-8 sm:h-8 text-blue-600" />
								</div>
								<div>
									<h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
										{student.name}
									</h1>
									<p className="text-gray-500 text-xs sm:text-sm">
										{student.rollNo}
									</p>
								</div>
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

					{/* Main Content */}
					<main className="p-4 sm:p-6 lg:p-8">
						{activeTab === "dashboard" && (
							<DashboardContent
								attendance={attendance}
								fees={fees}
								onQuickAction={handleQuickAction}
							/>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}

function DashboardContent({ attendance, fees, onQuickAction }) {
	return (
		<div className="space-y-6 sm:space-y-8">
			{/* Quick Actions Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				{QUICK_ACTIONS.map((action) => (
					<button
						key={action.key}
						onClick={() => onQuickAction(action.key)}
						className={`${action.bgColor} p-4 sm:p-6 rounded-xl hover:shadow-lg transition-all duration-200 group`}
					>
						<div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
							<div
								className={`w-12 h-12 sm:w-16 sm:h-16 ${action.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
							>
								<action.icon size={20} className="sm:w-7 sm:h-7 text-white" />
							</div>
							<span className="font-semibold text-gray-900 text-sm sm:text-lg">
								Roll No: {action.label}
							</span>
						</div>
					</button>
				))}
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-600 text-xs sm:text-sm font-medium">
								Attendance
							</p>
							<p className="text-2xl sm:text-3xl font-bold text-gray-900">
								{attendance.percent}%
							</p>
						</div>
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<Calendar size={20} className="sm:w-6 sm:h-6 text-green-600" />
						</div>
					</div>
				</div>

				<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-600 text-xs sm:text-sm font-medium">
								Average Score
							</p>
							<p className="text-2xl sm:text-3xl font-bold text-gray-900">
								85%
							</p>
						</div>
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<GraduationCap
								size={20}
								className="sm:w-6 sm:h-6 text-blue-600"
							/>
						</div>
					</div>
				</div>

				<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 sm:col-span-2 lg:col-span-1">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-600 text-xs sm:text-sm font-medium">
								Fees Paid
							</p>
							<p className="text-2xl sm:text-3xl font-bold text-gray-900">
								₹{(fees.paid / 1000).toFixed(0)}k
							</p>
						</div>
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<CreditCard size={20} className="sm:w-6 sm:h-6 text-purple-600" />
						</div>
					</div>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200">
				<div className="p-4 sm:p-6 border-b border-gray-200">
					<h2 className="text-lg sm:text-xl font-semibold text-gray-900">
						Recent Activity
					</h2>
				</div>
				<div className="p-4 sm:p-6">
					<div className="space-y-3 sm:space-y-4">
						{attendance.recent.slice(0, 3).map((day, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
							>
								<div className="flex items-center gap-2 sm:gap-3">
									<div
										className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
											day.status === "Present" ? "bg-green-500" : "bg-red-500"
										}`}
									></div>
									<span className="text-gray-900 font-medium text-sm sm:text-base">
										{day.status} on {day.date}
									</span>
								</div>
								<ChevronRight
									size={14}
									className="sm:w-4 sm:h-4 text-gray-400"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
