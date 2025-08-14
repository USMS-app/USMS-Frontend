import React, { useState, useMemo } from "react";
import {
	Search,
	Filter,
	Plus,
	Edit,
	Trash2,
	MoreVertical,
	Calendar,
	Clock,
	CheckCircle,
	XCircle,
	MessageCircle,
	Bell,
	Settings,
	Play,
	Pause,
	Eye,
	Send,
	Users,
	Zap,
	Smartphone,
	Mail,
	MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import BackButton from "../../components/BackButton";

// Mock data for report schedules
const INITIAL_SCHEDULES = [
	{
		id: "RS001",
		name: "Weekly Performance Report",
		description: "Weekly academic and attendance summary for all students",
		frequency: "weekly",
		dayOfWeek: "Friday",
		time: "18:00",
		status: "active",
		recipients: "all_students",
		channels: ["whatsapp"],
		lastSent: "2024-01-19T18:00:00",
		nextScheduled: "2024-01-26T18:00:00",
		createdAt: "2024-01-01T10:00:00",
		includeAttendance: true,
		includePerformance: true,
		includeRemarks: false,
		totalRecipients: 245,
		successRate: 98.5,
		deliveryStats: {
			delivered: 241,
			failed: 4,
			pending: 0,
		},
	},
	{
		id: "RS002",
		name: "Monthly Comprehensive Report",
		description:
			"Detailed monthly report with performance analysis and recommendations",
		frequency: "monthly",
		dayOfMonth: 1,
		time: "09:00",
		status: "active",
		recipients: "all_students",
		channels: ["whatsapp", "email"],
		lastSent: "2024-01-01T09:00:00",
		nextScheduled: "2024-02-01T09:00:00",
		createdAt: "2024-01-01T10:00:00",
		includeAttendance: true,
		includePerformance: true,
		includeRemarks: true,
		totalRecipients: 245,
		successRate: 95.2,
		deliveryStats: {
			delivered: 233,
			failed: 12,
			pending: 0,
		},
	},
	{
		id: "RS003",
		name: "Class 10 Board Exam Prep",
		description:
			"Special weekly report for Class 10 students focusing on board exam preparation",
		frequency: "weekly",
		dayOfWeek: "Sunday",
		time: "16:00",
		status: "paused",
		recipients: "class_10",
		channels: ["whatsapp"],
		lastSent: "2024-01-14T16:00:00",
		nextScheduled: "2024-01-21T16:00:00",
		createdAt: "2024-01-05T14:30:00",
		includeAttendance: true,
		includePerformance: true,
		includeRemarks: true,
		totalRecipients: 28,
		successRate: 100,
		deliveryStats: {
			delivered: 28,
			failed: 0,
			pending: 0,
		},
	},
];

// Available frequencies and their details
const FREQUENCIES = [
	{ value: "weekly", label: "Weekly", description: "Send reports every week" },
	{
		value: "monthly",
		label: "Monthly",
		description: "Send reports every month",
	},
	{
		value: "quarterly",
		label: "Quarterly",
		description: "Send reports every 3 months",
	},
	{ value: "custom", label: "Custom", description: "Set custom schedule" },
];

// Days of the week
const DAYS_OF_WEEK = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

// Days of the month
const DAYS_OF_MONTH = Array.from({ length: 28 }, (_, i) => i + 1);

// Available channels
const CHANNELS = [
	{
		value: "whatsapp",
		label: "WhatsApp",
		icon: Smartphone,
		color: "text-green-600",
	},
	{ value: "email", label: "Email", icon: Mail, color: "text-blue-600" },
	{ value: "sms", label: "SMS", icon: MessageSquare, color: "text-purple-600" },
];

// Recipient options
const RECIPIENT_OPTIONS = [
	{ value: "all_students", label: "All Students", count: 245 },
	{ value: "class_1", label: "Class 1", count: 25 },
	{ value: "class_2", label: "Class 2", count: 28 },
	{ value: "class_3", label: "Class 3", count: 26 },
	{ value: "class_4", label: "Class 4", count: 24 },
	{ value: "class_5", label: "Class 5", count: 27 },
	{ value: "class_6", label: "Class 6", count: 30 },
	{ value: "class_7", label: "Class 7", count: 29 },
	{ value: "class_8", label: "Class 8", count: 31 },
	{ value: "class_9", label: "Class 9", count: 26 },
	{ value: "class_10", label: "Class 10", count: 28 },
];

export default function ReportScheduling() {
	const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [filterFrequency, setFilterFrequency] = useState("");
	const [showAddSchedule, setShowAddSchedule] = useState(false);
	const [editingSchedule, setEditingSchedule] = useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [scheduleToDelete, setScheduleToDelete] = useState(null);
	const [openDropdown, setOpenDropdown] = useState(null);
	const [selectedSchedule, setSelectedSchedule] = useState(null);
	const [showScheduleDetail, setShowScheduleDetail] = useState(false);
	const [showClassReportModal, setShowClassReportModal] = useState(false);
	const [selectedClass, setSelectedClass] = useState(null);
	const [classReportConfig, setClassReportConfig] = useState({
		includeAttendance: true,
		includePerformance: true,
		includeRemarks: false,
		channels: ["whatsapp"],
		customMessage: "",
	});

	// Filtered and sorted schedules
	const filteredSchedules = useMemo(() => {
		let filtered = schedules.filter(
			(schedule) =>
				schedule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				schedule.id.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (filterStatus) {
			filtered = filtered.filter(
				(schedule) => schedule.status === filterStatus
			);
		}

		if (filterFrequency) {
			filtered = filtered.filter(
				(schedule) => schedule.frequency === filterFrequency
			);
		}

		return filtered.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
	}, [schedules, searchTerm, filterStatus, filterFrequency]);

	// Generate unique schedule ID
	const generateScheduleId = () => {
		const existingIds = schedules.map((s) => parseInt(s.id.slice(2)));
		const nextId = Math.max(...existingIds, 0) + 1;
		return `RS${nextId.toString().padStart(3, "0")}`;
	};

	// Handle add schedule
	const handleAddSchedule = () => {
		setEditingSchedule(null);
		setShowAddSchedule(true);
	};

	// Handle edit schedule
	const handleEditSchedule = (schedule) => {
		setEditingSchedule(schedule);
		setShowAddSchedule(true);
		setOpenDropdown(null);
	};

	// Handle delete schedule
	const handleDeleteSchedule = (schedule) => {
		setScheduleToDelete(schedule);
		setShowDeleteConfirm(true);
		setOpenDropdown(null);
	};

	// Handle view schedule details
	const handleViewSchedule = (schedule) => {
		setSelectedSchedule(schedule);
		setShowScheduleDetail(true);
		setOpenDropdown(null);
	};

	// Handle toggle schedule status
	const handleToggleStatus = (schedule) => {
		setSchedules((prev) =>
			prev.map((s) =>
				s.id === schedule.id
					? { ...s, status: s.status === "active" ? "paused" : "active" }
					: s
			)
		);
		toast.success(
			`Schedule ${
				schedule.status === "active" ? "paused" : "activated"
			} successfully`
		);
	};

	// Confirm delete
	const confirmDelete = () => {
		setSchedules((prev) => prev.filter((s) => s.id !== scheduleToDelete.id));
		setShowDeleteConfirm(false);
		setScheduleToDelete(null);
		toast.success("Report schedule deleted successfully");
	};

	// Save schedule
	const handleSaveSchedule = (scheduleData) => {
		if (editingSchedule) {
			// Update existing schedule
			setSchedules((prev) =>
				prev.map((s) =>
					s.id === editingSchedule.id
						? { ...scheduleData, id: editingSchedule.id }
						: s
				)
			);
			toast.success("Report schedule updated successfully");
		} else {
			// Add new schedule
			const newSchedule = {
				...scheduleData,
				id: generateScheduleId(),
				status: "active",
				createdAt: new Date().toISOString(),
				lastSent: null,
				nextScheduled: calculateNextScheduled(scheduleData),
				totalRecipients: getRecipientCount(scheduleData.recipients),
				successRate: 0,
				deliveryStats: {
					delivered: 0,
					failed: 0,
					pending: 0,
				},
			};
			setSchedules((prev) => [...prev, newSchedule]);
			toast.success("Report schedule created successfully");
		}
		setShowAddSchedule(false);
		setEditingSchedule(null);
	};

	// Calculate next scheduled date
	const calculateNextScheduled = (scheduleData) => {
		const now = new Date();
		const nextDate = new Date(now);

		if (scheduleData.frequency === "weekly") {
			const dayIndex = DAYS_OF_WEEK.indexOf(scheduleData.dayOfWeek);
			const currentDay = now.getDay();
			const daysUntilNext = (dayIndex - currentDay + 7) % 7;
			nextDate.setDate(now.getDate() + daysUntilNext);
		} else if (scheduleData.frequency === "monthly") {
			nextDate.setDate(scheduleData.dayOfMonth);
			if (nextDate <= now) {
				nextDate.setMonth(nextDate.getMonth() + 1);
			}
		}

		const [hours, minutes] = scheduleData.time.split(":");
		nextDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

		return nextDate.toISOString();
	};

	// Get recipient count
	const getRecipientCount = (recipients) => {
		const option = RECIPIENT_OPTIONS.find((opt) => opt.value === recipients);
		return option ? option.count : 0;
	};

	// Get status color
	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "text-green-600 bg-green-100";
			case "paused":
				return "text-yellow-600 bg-yellow-100";
			case "draft":
				return "text-gray-600 bg-gray-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	// Get frequency label
	const getFrequencyLabel = (frequency) => {
		const freq = FREQUENCIES.find((f) => f.value === frequency);
		return freq ? freq.label : frequency;
	};

	// Get channel icons
	const getChannelIcons = (channels) => {
		return channels.map((channel) => {
			const channelInfo = CHANNELS.find((c) => c.value === channel);
			if (channelInfo) {
				const Icon = channelInfo.icon;
				return (
					<Icon key={channel} className={`h-4 w-4 ${channelInfo.color}`} />
				);
			}
			return null;
		});
	};

	// Handle send individual class report
	const handleSendClassReport = (cls) => {
		setSelectedClass(cls);
		setShowClassReportModal(true);
	};

	// Handle send class report with configuration
	const handleSendClassReportWithConfig = () => {
		if (!selectedClass) return;

		toast.info(`Sending immediate report for ${selectedClass.name}...`);
		// In a real application, you would call an API to send the report
		// For demonstration, we'll simulate a successful delivery
		setSchedules((prev) =>
			prev.map((s) =>
				s.id === "RS003" // Assuming RS003 is the class 10 report schedule
					? {
							...s,
							lastSent: new Date().toISOString(),
							nextScheduled: calculateNextScheduled({
								...s,
								lastSent: new Date().toISOString(),
							}),
							deliveryStats: {
								...s.deliveryStats,
								delivered: s.totalRecipients,
								failed: 0,
								pending: 0,
							},
							successRate: 100,
					  }
					: s
			)
		);
		toast.success(
			`Immediate report for ${selectedClass.name} sent successfully!`
		);
		setShowClassReportModal(false);
		setSelectedClass(null);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div className="flex items-center gap-4">
					<BackButton className="hidden sm:flex" />
					<div>
						<h2 className="text-xl font-semibold text-gray-900">
							Report Scheduling & Delivery
						</h2>
						<p className="text-sm text-gray-600">
							Automate student report delivery to parents
						</p>
					</div>
				</div>
				<button
					onClick={handleAddSchedule}
					className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
				>
					<Plus size={18} />
					Create Schedule
				</button>
			</div>

			{/* Search and Filters */}
			<div className="bg-white p-4 rounded-lg border border-gray-200">
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<input
							type="text"
							placeholder="Search schedules by name, description, or ID..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div className="flex items-center gap-2">
						<Filter className="h-4 w-4 text-gray-500" />
						<select
							value={filterStatus}
							onChange={(e) => setFilterStatus(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="">All Status</option>
							<option value="active">Active</option>
							<option value="paused">Paused</option>
							<option value="draft">Draft</option>
						</select>
						<select
							value={filterFrequency}
							onChange={(e) => setFilterFrequency(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="">All Frequencies</option>
							<option value="weekly">Weekly</option>
							<option value="monthly">Monthly</option>
							<option value="quarterly">Quarterly</option>
						</select>
					</div>
				</div>
			</div>

			{/* Individual Class Report Sending */}
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">
						Send Individual Class Reports
					</h3>
					<p className="text-sm text-gray-600 mt-1">
						Send immediate reports to specific classes
					</p>
				</div>
				<div className="p-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
						{[
							{ id: 6, name: "Class 6", students: 30, color: "bg-blue-500" },
							{ id: 7, name: "Class 7", students: 29, color: "bg-green-500" },
							{ id: 8, name: "Class 8", students: 31, color: "bg-purple-500" },
							{ id: 9, name: "Class 9", students: 26, color: "bg-orange-500" },
							{ id: 10, name: "Class 10", students: 28, color: "bg-pink-500" },
						].map((cls) => (
							<div
								key={cls.id}
								className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
							>
								<div className="flex items-center justify-between mb-3">
									<div
										className={`w-10 h-10 ${cls.color} rounded-lg flex items-center justify-center`}
									>
										<span className="text-white font-bold text-sm">
											{cls.id}
										</span>
									</div>
									<span className="text-xs text-gray-500">
										{cls.students} students
									</span>
								</div>
								<h4 className="font-medium text-gray-900 mb-2">{cls.name}</h4>
								<button
									onClick={() => handleSendClassReport(cls)}
									className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
								>
									<Send className="h-4 w-4" />
									Send Report
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Schedules Table */}
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[1000px] divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Schedule Details
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Frequency & Timing
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Recipients & Channels
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status & Stats
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredSchedules.map((schedule, index) => (
								<tr
									key={schedule.id}
									className={`${
										index % 2 === 0 ? "bg-white" : "bg-gray-50"
									} hover:bg-gray-100 transition-colors`}
								>
									<td className="px-6 py-4">
										<div>
											<div className="flex items-center gap-2 mb-1">
												<span className="text-sm font-medium text-gray-900">
													{schedule.name}
												</span>
												<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
													{schedule.id}
												</span>
											</div>
											<p className="text-sm text-gray-600">
												{schedule.description}
											</p>
											<div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
												<span>
													Created:{" "}
													{new Date(schedule.createdAt).toLocaleDateString()}
												</span>
												{schedule.lastSent && (
													<span>
														Last sent:{" "}
														{new Date(schedule.lastSent).toLocaleDateString()}
													</span>
												)}
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<div>
											<div className="flex items-center gap-2 mb-1">
												<Clock className="h-4 w-4 text-gray-400" />
												<span className="text-sm font-medium text-gray-900">
													{getFrequencyLabel(schedule.frequency)}
												</span>
											</div>
											<div className="text-sm text-gray-600">
												{schedule.frequency === "weekly" && (
													<span>
														{schedule.dayOfWeek}s at {schedule.time}
													</span>
												)}
												{schedule.frequency === "monthly" && (
													<span>
														Day {schedule.dayOfMonth} at {schedule.time}
													</span>
												)}
											</div>
											<div className="text-xs text-gray-500 mt-1">
												Next:{" "}
												{new Date(schedule.nextScheduled).toLocaleDateString()}
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<div>
											<div className="flex items-center gap-2 mb-2">
												<Users className="h-4 w-4 text-gray-400" />
												<span className="text-sm font-medium text-gray-900">
													{schedule.totalRecipients} recipients
												</span>
											</div>
											<div className="flex items-center gap-2">
												{getChannelIcons(schedule.channels)}
												<span className="text-xs text-gray-500">
													{schedule.channels.length} channel
													{schedule.channels.length !== 1 ? "s" : ""}
												</span>
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<div>
											<div className="flex items-center gap-2 mb-2">
												<span
													className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
														schedule.status
													)}`}
												>
													{schedule.status === "active"
														? "Active"
														: schedule.status === "paused"
														? "Paused"
														: "Draft"}
												</span>
												<span className="text-sm font-medium text-gray-900">
													{schedule.successRate}% success
												</span>
											</div>
											<div className="text-xs text-gray-500">
												{schedule.deliveryStats.delivered} delivered,{" "}
												{schedule.deliveryStats.failed} failed
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right">
										<div className="flex items-center justify-end gap-2">
											<button
												onClick={() => handleViewSchedule(schedule)}
												className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
												title="View details"
											>
												<Eye className="h-4 w-4" />
											</button>
											<button
												onClick={() => handleToggleStatus(schedule)}
												className={`p-1 rounded ${
													schedule.status === "active"
														? "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50"
														: "text-green-600 hover:text-green-800 hover:bg-green-50"
												}`}
												title={
													schedule.status === "active"
														? "Pause schedule"
														: "Activate schedule"
												}
											>
												{schedule.status === "active" ? (
													<Pause className="h-4 w-4" />
												) : (
													<Play className="h-4 w-4" />
												)}
											</button>
											<button
												onClick={() => handleEditSchedule(schedule)}
												className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
												title="Edit schedule"
											>
												<Edit className="h-4 w-4" />
											</button>
											<div className="relative">
												<button
													onClick={() =>
														setOpenDropdown(
															openDropdown === schedule.id ? null : schedule.id
														)
													}
													className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50"
													title="More options"
												>
													<MoreVertical className="h-4 w-4" />
												</button>
												{openDropdown === schedule.id && (
													<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
														<div className="py-1">
															<button
																onClick={() => handleViewSchedule(schedule)}
																className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
															>
																<Eye className="h-4 w-4" />
																View Details
															</button>
															<button
																onClick={() => handleEditSchedule(schedule)}
																className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
															>
																<Edit className="h-4 w-4" />
																Edit Schedule
															</button>
															<button
																onClick={() => handleToggleStatus(schedule)}
																className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
															>
																{schedule.status === "active" ? (
																	<Pause className="h-4 w-4" />
																) : (
																	<Play className="h-4 w-4" />
																)}
																{schedule.status === "active"
																	? "Pause Schedule"
																	: "Activate Schedule"}
															</button>
															<button
																onClick={() => handleDeleteSchedule(schedule)}
																className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
															>
																<Trash2 className="h-4 w-4" />
																Delete Schedule
															</button>
														</div>
													</div>
												)}
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Click outside to close dropdown */}
			{openDropdown && (
				<div
					className="fixed inset-0 z-0"
					onClick={() => setOpenDropdown(null)}
				/>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteConfirm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-xl max-w-md w-full">
						<div className="p-6 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900">
								Delete Schedule
							</h3>
						</div>
						<div className="p-6">
							<p className="text-gray-600 mb-4">
								Are you sure you want to delete{" "}
								<strong>{scheduleToDelete?.name}</strong>? This action cannot be
								undone.
							</p>
							<div className="flex gap-3">
								<button
									onClick={() => setShowDeleteConfirm(false)}
									className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={confirmDelete}
									className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Schedule Detail Modal */}
			{showScheduleDetail && selectedSchedule && (
				<ScheduleDetailModal
					schedule={selectedSchedule}
					onClose={() => {
						setShowScheduleDetail(false);
						setSelectedSchedule(null);
					}}
				/>
			)}

			{/* Add/Edit Schedule Modal */}
			{showAddSchedule && (
				<ScheduleFormModal
					schedule={editingSchedule}
					onSave={handleSaveSchedule}
					onClose={() => {
						setShowAddSchedule(false);
						setEditingSchedule(null);
					}}
				/>
			)}

			{/* Class Report Configuration Modal */}
			{showClassReportModal && selectedClass && (
				<ClassReportConfigModal
					class={selectedClass}
					config={classReportConfig}
					onClose={() => {
						setShowClassReportModal(false);
						setSelectedClass(null);
					}}
					onSave={(config) => {
						setClassReportConfig(config);
						handleSendClassReportWithConfig();
					}}
				/>
			)}
		</div>
	);
}

// Schedule Detail Modal Component
function ScheduleDetailModal({ schedule, onClose }) {
	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "text-green-600 bg-green-100";
			case "paused":
				return "text-yellow-600 bg-yellow-100";
			case "draft":
				return "text-gray-600 bg-gray-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getFrequencyLabel = (frequency) => {
		const freq = FREQUENCIES.find((f) => f.value === frequency);
		return freq ? freq.label : frequency;
	};

	const getChannelIcons = (channels) => {
		return channels.map((channel) => {
			const channelInfo = CHANNELS.find((c) => c.value === channel);
			if (channelInfo) {
				const Icon = channelInfo.icon;
				return (
					<Icon key={channel} className={`h-4 w-4 ${channelInfo.color}`} />
				);
			}
			return null;
		});
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-gray-900">
							Schedule Details
						</h3>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600"
						>
							<XCircle className="h-6 w-6" />
						</button>
					</div>
				</div>

				<div className="p-6 space-y-6">
					{/* Basic Information */}
					<div className="bg-gray-50 rounded-lg p-4">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
								<Calendar className="h-8 w-8 text-blue-600" />
							</div>
							<div>
								<h4 className="text-xl font-semibold text-gray-900">
									{schedule.name}
								</h4>
								<p className="text-gray-600">Schedule ID: {schedule.id}</p>
								<p className="text-gray-600">{schedule.description}</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-gray-600">Status</p>
								<span
									className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
										schedule.status
									)}`}
								>
									{schedule.status === "active"
										? "Active"
										: schedule.status === "paused"
										? "Paused"
										: "Draft"}
								</span>
							</div>
							<div>
								<p className="text-sm text-gray-600">Created</p>
								<p className="font-medium">
									{new Date(schedule.createdAt).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Last Sent</p>
								<p className="font-medium">
									{schedule.lastSent
										? new Date(schedule.lastSent).toLocaleDateString()
										: "Never"}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Next Scheduled</p>
								<p className="font-medium">
									{new Date(schedule.nextScheduled).toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>

					{/* Schedule Configuration */}
					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="text-lg font-semibold text-gray-900 mb-4">
							Schedule Configuration
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-gray-600">Frequency</p>
								<p className="font-medium">
									{getFrequencyLabel(schedule.frequency)}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Timing</p>
								<p className="font-medium">
									{schedule.frequency === "weekly" &&
										`${schedule.dayOfWeek}s at ${schedule.time}`}
									{schedule.frequency === "monthly" &&
										`Day ${schedule.dayOfMonth} at ${schedule.time}`}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Recipients</p>
								<p className="font-medium">
									{schedule.totalRecipients} students
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Delivery Channels</p>
								<div className="flex items-center gap-2 mt-1">
									{getChannelIcons(schedule.channels)}
									<span className="text-sm text-gray-600">
										{schedule.channels
											.map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
											.join(", ")}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Report Content */}
					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="text-lg font-semibold text-gray-900 mb-4">
							Report Content
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="flex items-center gap-2">
								<CheckCircle
									className={`h-5 w-5 ${
										schedule.includeAttendance
											? "text-green-600"
											: "text-gray-400"
									}`}
								/>
								<span className="text-sm font-medium">Attendance Data</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle
									className={`h-5 w-5 ${
										schedule.includePerformance
											? "text-green-600"
											: "text-gray-400"
									}`}
								/>
								<span className="text-sm font-medium">
									Academic Performance
								</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle
									className={`h-5 w-5 ${
										schedule.includeRemarks ? "text-green-600" : "text-gray-400"
									}`}
								/>
								<span className="text-sm font-medium">Teacher Remarks</span>
							</div>
						</div>
					</div>

					{/* Delivery Statistics */}
					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="text-lg font-semibold text-gray-900 mb-4">
							Delivery Statistics
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="text-center">
								<p className="text-2xl font-bold text-blue-600">
									{schedule.totalRecipients}
								</p>
								<p className="text-sm text-gray-600">Total Recipients</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-green-600">
									{schedule.deliveryStats.delivered}
								</p>
								<p className="text-sm text-gray-600">Delivered</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-red-600">
									{schedule.deliveryStats.failed}
								</p>
								<p className="text-sm text-gray-600">Failed</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-purple-600">
									{schedule.successRate}%
								</p>
								<p className="text-sm text-gray-600">Success Rate</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Schedule Form Modal Component
function ScheduleFormModal({ schedule, onSave, onClose }) {
	const [formData, setFormData] = useState({
		name: schedule?.name || "",
		description: schedule?.description || "",
		frequency: schedule?.frequency || "weekly",
		dayOfWeek: schedule?.dayOfWeek || "Friday",
		dayOfMonth: schedule?.dayOfMonth || 1,
		time: schedule?.time || "18:00",
		recipients: schedule?.recipients || "all_students",
		channels: schedule?.channels || ["whatsapp"],
		includeAttendance: schedule?.includeAttendance ?? true,
		includePerformance: schedule?.includePerformance ?? true,
		includeRemarks: schedule?.includeRemarks ?? false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleChannelChange = (channel) => {
		setFormData((prev) => ({
			...prev,
			channels: prev.channels.includes(channel)
				? prev.channels.filter((c) => c !== channel)
				: [...prev.channels, channel],
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">
						{schedule ? "Edit Schedule" : "Create New Schedule"}
					</h3>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Basic Information */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Basic Information
						</h4>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Schedule Name *
								</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Description
								</label>
								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									rows={3}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>
					</div>

					{/* Schedule Configuration */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Schedule Configuration
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Frequency *
								</label>
								<select
									name="frequency"
									value={formData.frequency}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									{FREQUENCIES.map((freq) => (
										<option key={freq.value} value={freq.value}>
											{freq.label}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Time *
								</label>
								<input
									type="time"
									name="time"
									value={formData.time}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							{formData.frequency === "weekly" && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Day of Week *
									</label>
									<select
										name="dayOfWeek"
										value={formData.dayOfWeek}
										onChange={handleChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									>
										{DAYS_OF_WEEK.map((day) => (
											<option key={day} value={day}>
												{day}
											</option>
										))}
									</select>
								</div>
							)}
							{formData.frequency === "monthly" && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Day of Month *
									</label>
									<select
										name="dayOfMonth"
										value={formData.dayOfMonth}
										onChange={handleChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									>
										{DAYS_OF_MONTH.map((day) => (
											<option key={day} value={day}>
												{day}
											</option>
										))}
									</select>
								</div>
							)}
						</div>
					</div>

					{/* Recipients */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Recipients
						</h4>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Select Recipients *
							</label>
							<select
								name="recipients"
								value={formData.recipients}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{RECIPIENT_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label} ({option.count} students)
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Delivery Channels */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Delivery Channels
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							{CHANNELS.map((channel) => {
								const Icon = channel.icon;
								return (
									<label
										key={channel.value}
										className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
									>
										<input
											type="checkbox"
											checked={formData.channels.includes(channel.value)}
											onChange={() => handleChannelChange(channel.value)}
											className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
										/>
										<Icon className={`h-5 w-5 ml-2 ${channel.color}`} />
										<span className="ml-2 text-sm text-gray-700">
											{channel.label}
										</span>
									</label>
								);
							})}
						</div>
					</div>

					{/* Report Content */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Report Content
						</h4>
						<div className="space-y-3">
							<label className="flex items-center">
								<input
									type="checkbox"
									name="includeAttendance"
									checked={formData.includeAttendance}
									onChange={handleChange}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Include Attendance Data
								</span>
							</label>
							<label className="flex items-center">
								<input
									type="checkbox"
									name="includePerformance"
									checked={formData.includePerformance}
									onChange={handleChange}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Include Academic Performance Summary
								</span>
							</label>
							<label className="flex items-center">
								<input
									type="checkbox"
									name="includeRemarks"
									checked={formData.includeRemarks}
									onChange={handleChange}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Include Teacher Remarks
								</span>
							</label>
						</div>
					</div>

					{/* Form Actions */}
					<div className="flex gap-3 pt-4 border-t border-gray-200">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							{schedule ? "Update Schedule" : "Create Schedule"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// Class Report Configuration Modal Component
function ClassReportConfigModal({ class: cls, config, onClose, onSave }) {
	const [formData, setFormData] = useState({
		includeAttendance: config.includeAttendance,
		includePerformance: config.includePerformance,
		includeRemarks: config.includeRemarks,
		channels: config.channels,
		customMessage: config.customMessage,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleChannelChange = (channel) => {
		setFormData((prev) => ({
			...prev,
			channels: prev.channels.includes(channel)
				? prev.channels.filter((c) => c !== channel)
				: [...prev.channels, channel],
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">
						Configure Report for {cls.name}
					</h3>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Basic Information */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Basic Information
						</h4>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Custom Message (optional)
								</label>
								<textarea
									name="customMessage"
									value={formData.customMessage}
									onChange={handleChange}
									rows={3}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>
					</div>

					{/* Report Content */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Report Content
						</h4>
						<div className="space-y-3">
							<label className="flex items-center">
								<input
									type="checkbox"
									name="includeAttendance"
									checked={formData.includeAttendance}
									onChange={handleChange}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Include Attendance Data
								</span>
							</label>
							<label className="flex items-center">
								<input
									type="checkbox"
									name="includePerformance"
									checked={formData.includePerformance}
									onChange={handleChange}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Include Academic Performance Summary
								</span>
							</label>
							<label className="flex items-center">
								<input
									type="checkbox"
									name="includeRemarks"
									checked={formData.includeRemarks}
									onChange={handleChange}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Include Teacher Remarks
								</span>
							</label>
						</div>
					</div>

					{/* Delivery Channels */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Delivery Channels
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							{CHANNELS.map((channel) => {
								const Icon = channel.icon;
								return (
									<label
										key={channel.value}
										className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
									>
										<input
											type="checkbox"
											checked={formData.channels.includes(channel.value)}
											onChange={() => handleChannelChange(channel.value)}
											className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
										/>
										<Icon className={`h-5 w-5 ml-2 ${channel.color}`} />
										<span className="ml-2 text-sm text-gray-700">
											{channel.label}
										</span>
									</label>
								);
							})}
						</div>
					</div>

					{/* Form Actions */}
					<div className="flex gap-3 pt-4 border-t border-gray-200">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Send Report
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
