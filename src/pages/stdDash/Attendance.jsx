import React, { useState } from "react";
import { ArrowLeft, ChevronRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
	const navigate = useNavigate();
	const [currentMonth, setCurrentMonth] = useState(new Date());

	// Legend data array for dynamic rendering
	const legendItems = [
		{ color: "bg-green-200", label: "Present" },
		{ color: "bg-red-500", label: "Absent" },
		{ color: "bg-blue-500", label: "Festival" },
		{ color: "bg-orange-500", label: "Early Off" },
		{ color: "bg-yellow-500", label: "Late" },
	];

	// Mock attendance data for the current month
	const getAttendanceData = (year, month) => {
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const attendanceData = [];

		// Add days from previous month
		const daysInPrevMonth = new Date(year, month, 0).getDate();
		for (let i = firstDayOfMonth - 1; i >= 0; i--) {
			attendanceData.push({
				date: new Date(year, month - 1, daysInPrevMonth - i),
				status: "other-month",
				day: daysInPrevMonth - i,
			});
		}

		// Add days of current month
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			// Mock attendance status - in real app this would come from backend
			let status = "present";
			if (day === 11 || day === 28) status = "absent";
			else if (day === 8) status = "early-off";
			else if (day === 24) status = "late";
			else if (day === 16 || day === 26) status = "festival";
			else if (day % 7 === 0) status = "present"; // Every 7th day present
			else if (day % 5 === 0) status = "present"; // Every 5th day present
			else status = "present";

			attendanceData.push({
				date: date,
				status: status,
				day: day,
			});
		}

		// Add days from next month to complete the grid
		const remainingDays = 42 - attendanceData.length; // 6 rows * 7 days = 42
		for (let day = 1; day <= remainingDays; day++) {
			attendanceData.push({
				date: new Date(year, month + 1, day),
				status: "other-month",
				day: day,
			});
		}

		return attendanceData;
	};

	const getStatusText = (status) => {
		switch (status) {
			case "present":
				return "Present";
			case "absent":
				return "Absent";
			case "late":
				return "Late";
			case "early-off":
				return "Early Off";
			case "festival":
				return "Festival";
			default:
				return "";
		}
	};

	const navigateMonth = (direction) => {
		setCurrentMonth((prev) => {
			const newDate = new Date(prev);
			if (direction === "prev") {
				newDate.setMonth(prev.getMonth() - 1);
			} else {
				newDate.setMonth(prev.getMonth() + 1);
			}
			return newDate;
		});
	};

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const currentMonthData = getAttendanceData(
		currentMonth.getFullYear(),
		currentMonth.getMonth()
	);

	const handleBackToDashboard = () => {
		navigate("/student-dashboard");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile Header */}
			<div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
				<button
					onClick={handleBackToDashboard}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
				>
					<ArrowLeft size={20} />
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
					<User size={20} />
				</button>
			</div>

			{/* Main Content */}
			<main className="p-4 sm:p-6 lg:p-8">
				<div className="space-y-6">
					{/* Back Button */}
					<div className="flex items-center gap-4">
						<button
							onClick={handleBackToDashboard}
							className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
						>
							<ArrowLeft size={20} />
							<span>Back to Dashboard</span>
						</button>
					</div>

					{/* Attendance Calendar */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						{/* Calendar Header */}
						<div className="flex items-center justify-between mb-8">
							<button
								onClick={() => navigateMonth("prev")}
								className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
							>
								<ChevronRight size={16} className="rotate-180" />
							</button>
							<h2 className="text-lg font-semibold text-gray-900">
								{monthNames[currentMonth.getMonth()]}{" "}
								{currentMonth.getFullYear()}
							</h2>
							<button
								onClick={() => navigateMonth("next")}
								className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
							>
								<ChevronRight size={16} />
							</button>
						</div>

						{/* Calendar Container */}
						<div className="max-w-lg mx-auto">
							{/* Days of Week Header */}
							<div className="grid grid-cols-7 mb-2">
								{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
									<div
										key={index}
										className="text-center text-xs font-medium text-gray-400 py-2"
									>
										{day}
									</div>
								))}
							</div>

							{/* Calendar Grid */}
							<div className="grid grid-cols-7 gap-1">
								{currentMonthData.map((dayData, index) => (
									<div
										key={index}
										className={`relative w-9 h-9 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
											dayData.status === "other-month"
												? "text-gray-200"
												: dayData.status === "present"
												? "text-gray-900 bg-green-200  cursor-pointer"
												: dayData.status === "absent"
												? "text-white bg-red-500  cursor-pointer"
												: dayData.status === "late"
												? "text-white bg-yellow-500  cursor-pointer"
												: dayData.status === "early-off"
												? "text-white bg-orange-500  cursor-pointer"
												: dayData.status === "festival"
												? "text-white bg-blue-500 cursor-pointer"
												: "text-gray-900 bg-gray-50  cursor-pointer"
										} rounded-lg`}
										title={
											dayData.status !== "other-month"
												? getStatusText(dayData.status)
												: ""
										}
									>
										{dayData.day}
										{/* Status Indicator Dot */}
										{dayData.status !== "other-month" &&
											dayData.status !== "present" && (
												<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-80"></div>
											)}
									</div>
								))}
							</div>
						</div>

						{/* Legend */}
						<div className="mt-8 pt-6 border-t border-gray-100">
							<h3 className="text-sm font-medium text-gray-700 mb-4 text-center">
								Attendance Legend
							</h3>
							<div className="flex flex-wrap gap-6 justify-center">
								{legendItems.map((item, index) => (
									<div key={index} className="flex items-center gap-2">
										<div className={`w-3 h-3 ${item.color} rounded`}></div>
										<span className="text-xs text-gray-600">{item.label}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Attendance Summary */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Monthly Summary
						</h3>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
							<div className="text-center p-4 bg-green-50 rounded-lg">
								<div className="text-2xl font-bold text-green-600">25</div>
								<div className="text-sm text-gray-600">Present Days</div>
							</div>
							<div className="text-center p-4 bg-red-50 rounded-lg">
								<div className="text-2xl font-bold text-red-600">2</div>
								<div className="text-sm text-gray-600">Absent Days</div>
							</div>
							<div className="text-center p-4 bg-blue-50 rounded-lg">
								<div className="text-2xl font-bold text-blue-600">2</div>
								<div className="text-sm text-gray-600">Festival Days</div>
							</div>
							<div className="text-center p-4 bg-yellow-50 rounded-lg">
								<div className="text-2xl font-bold text-yellow-600">1</div>
								<div className="text-sm text-gray-600">Late Days</div>
							</div>
							<div className="text-center p-4 bg-orange-50 rounded-lg">
								<div className="text-2xl font-bold text-orange-600">1</div>
								<div className="text-sm text-gray-600">Early Off Days</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
