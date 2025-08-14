import React, { useState, useMemo } from "react";
import {
	Search,
	Filter,
	Eye,
	Edit,
	Trash2,
	MoreVertical,
	TrendingUp,
	Phone,
	Mail,
	CheckCircle,
	XCircle,
} from "lucide-react";
import { toast } from "sonner";
import BackButton from "../../components/BackButton";

// Mock data for students
const INITIAL_STUDENTS = [
	{
		id: "S1001",
		name: "Aman Kumar",
		rollNo: 12,
		class: "Class 6",
		section: "A",
		gender: "Male",
		dateOfBirth: "2012-03-15",
		admissionDate: "2023-06-01",
		parentName: "Rajesh Kumar",
		parentPhone: "+91 98765 43210",
		parentEmail: "rajesh.kumar@email.com",
		address: "123 Main Street, Bangalore, Karnataka",
		bloodGroup: "O+",
		attendance: {
			totalDays: 180,
			presentDays: 165,
			absentDays: 12,
			lateDays: 3,
			attendancePercentage: 91.7,
		},
		academicPerformance: {
			currentGrade: "A",
			overallPercentage: 85.5,
			subjects: [
				{ name: "Mathematics", grade: "A", percentage: 88, rank: 5 },
				{ name: "Science", grade: "A", percentage: 87, rank: 8 },
				{ name: "English", grade: "B+", percentage: 82, rank: 12 },
				{ name: "Hindi", grade: "A", percentage: 89, rank: 3 },
				{ name: "Social Studies", grade: "B+", percentage: 83, rank: 15 },
				{ name: "Kannada", grade: "A", percentage: 86, rank: 7 },
			],
			recentTests: [
				{
					name: "FA1 - Mathematics",
					score: 18,
					maxScore: 20,
					date: "2024-01-15",
				},
				{ name: "FA1 - Science", score: 17, maxScore: 20, date: "2024-01-18" },
				{
					name: "Mid Term - English",
					score: 42,
					maxScore: 50,
					date: "2024-02-10",
				},
			],
		},
		status: "Active",
	},
	{
		id: "S1002",
		name: "Riya Singh",
		rollNo: 7,
		class: "Class 7",
		section: "B",
		gender: "Female",
		dateOfBirth: "2011-07-22",
		admissionDate: "2022-06-01",
		parentName: "Priya Singh",
		parentPhone: "+91 98765 43211",
		parentEmail: "priya.singh@email.com",
		address: "456 Park Avenue, Bangalore, Karnataka",
		bloodGroup: "B+",
		attendance: {
			totalDays: 180,
			presentDays: 178,
			absentDays: 2,
			lateDays: 0,
			attendancePercentage: 98.9,
		},
		academicPerformance: {
			currentGrade: "A+",
			overallPercentage: 92.3,
			subjects: [
				{ name: "Mathematics", grade: "A+", percentage: 95, rank: 1 },
				{ name: "Science", grade: "A+", percentage: 93, rank: 2 },
				{ name: "English", grade: "A", percentage: 90, rank: 4 },
				{ name: "Hindi", grade: "A+", percentage: 94, rank: 1 },
				{ name: "Social Studies", grade: "A", percentage: 89, rank: 3 },
				{ name: "Kannada", grade: "A+", percentage: 92, rank: 2 },
			],
			recentTests: [
				{
					name: "FA1 - Mathematics",
					score: 20,
					maxScore: 20,
					date: "2024-01-15",
				},
				{ name: "FA1 - Science", score: 19, maxScore: 20, date: "2024-01-18" },
				{
					name: "Mid Term - English",
					score: 48,
					maxScore: 50,
					date: "2024-02-10",
				},
			],
		},
		status: "Active",
	},
	{
		id: "S1003",
		name: "Karthik Rao",
		rollNo: 23,
		class: "Class 8",
		section: "C",
		gender: "Male",
		dateOfBirth: "2010-11-08",
		admissionDate: "2021-06-01",
		parentName: "Suresh Rao",
		parentPhone: "+91 98765 43212",
		parentEmail: "suresh.rao@email.com",
		address: "789 Lake Road, Bangalore, Karnataka",
		bloodGroup: "A+",
		attendance: {
			totalDays: 180,
			presentDays: 155,
			absentDays: 20,
			lateDays: 5,
			attendancePercentage: 86.1,
		},
		academicPerformance: {
			currentGrade: "B+",
			overallPercentage: 78.2,
			subjects: [
				{ name: "Mathematics", grade: "B", percentage: 75, rank: 18 },
				{ name: "Science", grade: "B+", percentage: 82, rank: 12 },
				{ name: "English", grade: "B", percentage: 78, rank: 16 },
				{ name: "Hindi", grade: "B+", percentage: 80, rank: 14 },
				{ name: "Social Studies", grade: "C+", percentage: 72, rank: 22 },
				{ name: "Kannada", grade: "B", percentage: 76, rank: 17 },
			],
			recentTests: [
				{
					name: "FA1 - Mathematics",
					score: 15,
					maxScore: 20,
					date: "2024-01-15",
				},
				{ name: "FA1 - Science", score: 16, maxScore: 20, date: "2024-01-18" },
				{
					name: "Mid Term - English",
					score: 38,
					maxScore: 50,
					date: "2024-02-10",
				},
			],
		},
		status: "Active",
	},
	{
		id: "S1004",
		name: "Ananya Patel",
		rollNo: 5,
		class: "Class 9",
		section: "A",
		gender: "Female",
		dateOfBirth: "2009-04-12",
		admissionDate: "2020-06-01",
		parentName: "Arun Patel",
		parentPhone: "+91 98765 43213",
		parentEmail: "arun.patel@email.com",
		address: "321 Garden Street, Bangalore, Karnataka",
		bloodGroup: "AB+",
		attendance: {
			totalDays: 180,
			presentDays: 172,
			absentDays: 6,
			lateDays: 2,
			attendancePercentage: 95.6,
		},
		academicPerformance: {
			currentGrade: "A",
			overallPercentage: 88.7,
			subjects: [
				{ name: "Mathematics", grade: "A", percentage: 91, rank: 6 },
				{ name: "Science", grade: "A", percentage: 89, rank: 8 },
				{ name: "English", grade: "A+", percentage: 94, rank: 2 },
				{ name: "Hindi", grade: "A", percentage: 87, rank: 10 },
				{ name: "Social Studies", grade: "A", percentage: 88, rank: 9 },
				{ name: "Kannada", grade: "A", percentage: 90, rank: 7 },
			],
			recentTests: [
				{
					name: "FA1 - Mathematics",
					score: 19,
					maxScore: 20,
					date: "2024-01-15",
				},
				{ name: "FA1 - Science", score: 18, maxScore: 20, date: "2024-01-18" },
				{
					name: "Mid Term - English",
					score: 47,
					maxScore: 50,
					date: "2024-02-10",
				},
			],
		},
		status: "Active",
	},
	{
		id: "S1005",
		name: "Vikram Sharma",
		rollNo: 15,
		class: "Class 10",
		section: "B",
		gender: "Male",
		dateOfBirth: "2008-09-30",
		admissionDate: "2019-06-01",
		parentName: "Ramesh Sharma",
		parentPhone: "+91 98765 43214",
		parentEmail: "ramesh.sharma@email.com",
		address: "654 Hill View, Bangalore, Karnataka",
		bloodGroup: "O-",
		attendance: {
			totalDays: 180,
			presentDays: 175,
			absentDays: 3,
			lateDays: 2,
			attendancePercentage: 97.2,
		},
		academicPerformance: {
			currentGrade: "A+",
			overallPercentage: 91.8,
			subjects: [
				{ name: "Mathematics", grade: "A+", percentage: 94, rank: 3 },
				{ name: "Science", grade: "A+", percentage: 93, rank: 4 },
				{ name: "English", grade: "A", percentage: 89, rank: 8 },
				{ name: "Hindi", grade: "A+", percentage: 92, rank: 5 },
				{ name: "Social Studies", grade: "A+", percentage: 91, rank: 6 },
				{ name: "Kannada", grade: "A", percentage: 90, rank: 7 },
			],
			recentTests: [
				{
					name: "FA1 - Mathematics",
					score: 20,
					maxScore: 20,
					date: "2024-01-15",
				},
				{ name: "FA1 - Science", score: 19, maxScore: 20, date: "2024-01-18" },
				{
					name: "Mid Term - English",
					score: 45,
					maxScore: 50,
					date: "2024-02-10",
				},
			],
		},
		status: "Active",
	},
];

// Available classes and sections
const AVAILABLE_CLASSES = [
	"Class 1",
	"Class 2",
	"Class 3",
	"Class 4",
	"Class 5",
	"Class 6",
	"Class 7",
	"Class 8",
	"Class 9",
	"Class 10",
];

const SECTIONS = ["A", "B", "C", "D"];

export default function Students() {
	const [students, setStudents] = useState(INITIAL_STUDENTS);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState("asc");
	const [filterClass, setFilterClass] = useState("");
	const [filterSection, setFilterSection] = useState("");
	const [showAddStudent, setShowAddStudent] = useState(false);
	const [editingStudent, setEditingStudent] = useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [studentToDelete, setStudentToDelete] = useState(null);
	const [openDropdown, setOpenDropdown] = useState(null);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [showStudentDetail, setShowStudentDetail] = useState(false);

	// Filtered and sorted students
	const filteredAndSortedStudents = useMemo(() => {
		let filtered = students.filter(
			(student) =>
				student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
				student.rollNo.toString().includes(searchTerm) ||
				student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
		);

		// Apply class filter
		if (filterClass) {
			filtered = filtered.filter((student) => student.class === filterClass);
		}

		// Apply section filter
		if (filterSection) {
			filtered = filtered.filter(
				(student) => student.section === filterSection
			);
		}

		// Only show data if there are active filters
		if (!searchTerm && !filterClass && !filterSection) {
			return [];
		}

		filtered.sort((a, b) => {
			let aValue, bValue;

			switch (sortBy) {
				case "name":
					aValue = a.name;
					bValue = b.name;
					break;
				case "id":
					aValue = a.id;
					bValue = b.id;
					break;
				case "rollNo":
					aValue = a.rollNo;
					bValue = b.rollNo;
					break;
				case "class":
					aValue = a.class;
					bValue = b.class;
					break;
				case "attendance":
					aValue = a.attendance.attendancePercentage;
					bValue = b.attendance.attendancePercentage;
					break;
				case "performance":
					aValue = a.academicPerformance.overallPercentage;
					bValue = b.academicPerformance.overallPercentage;
					break;
				default:
					aValue = a.name;
					bValue = b.name;
			}

			if (typeof aValue === "string" && typeof bValue === "string") {
				return sortOrder === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			} else {
				return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
			}
		});

		return filtered;
	}, [students, searchTerm, sortBy, sortOrder, filterClass, filterSection]);

	// Generate unique student ID
	const generateStudentId = () => {
		const existingIds = students.map((s) => parseInt(s.id.slice(1)));
		const nextId = Math.max(...existingIds, 1000) + 1;
		return `S${nextId}`;
	};

	// Handle sorting
	const handleSort = (column) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(column);
			setSortOrder("asc");
		}
	};

	// Handle edit student
	const handleEditStudent = (student) => {
		setEditingStudent(student);
		setShowAddStudent(true);
		setOpenDropdown(null);
	};

	// Handle delete student
	const handleDeleteStudent = (student) => {
		setStudentToDelete(student);
		setShowDeleteConfirm(true);
		setOpenDropdown(null);
	};

	// Handle view student details
	const handleViewStudent = (student) => {
		setSelectedStudent(student);
		setShowStudentDetail(true);
		setOpenDropdown(null);
	};

	// Confirm delete
	const confirmDelete = () => {
		setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
		setShowDeleteConfirm(false);
		setStudentToDelete(null);
		toast.success("Student removed successfully");
	};

	// Save student
	const handleSaveStudent = (studentData) => {
		if (editingStudent) {
			// Update existing student
			setStudents((prev) =>
				prev.map((s) =>
					s.id === editingStudent.id
						? { ...studentData, id: editingStudent.id }
						: s
				)
			);
			toast.success("Student updated successfully");
		}
		setShowAddStudent(false);
		setEditingStudent(null);
	};

	// Get sort icon
	const getSortIcon = (column) => {
		if (sortBy !== column) return null;
		return sortOrder === "asc" ? "↑" : "↓";
	};

	// Get attendance status color
	const getAttendanceColor = (percentage) => {
		if (percentage >= 90) return "text-green-600";
		if (percentage >= 75) return "text-yellow-600";
		return "text-red-600";
	};

	// Get performance status color
	const getPerformanceColor = (percentage) => {
		if (percentage >= 85) return "text-green-600";
		if (percentage >= 70) return "text-yellow-600";
		return "text-red-600";
	};

	// Get grade color
	const getGradeColor = (grade) => {
		if (grade === "A+" || grade === "A") return "text-green-600";
		if (grade === "B+" || grade === "B") return "text-yellow-600";
		return "text-red-600";
	};

  return (
    <div className="space-y-6">
			{/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <BackButton className="hidden sm:flex" />
					<h2 className="text-xl font-semibold text-gray-900">
						Student Management
					</h2>
				</div>
			</div>

			{/* Search and Filters */}
			<div className="bg-white p-4 rounded-lg border border-gray-200">
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="flex items-center gap-2">
						<Filter className="h-4 w-4 text-gray-500" />
						<select
							value={filterClass}
							onChange={(e) => setFilterClass(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="">All Classes</option>
							{AVAILABLE_CLASSES.map((className) => (
								<option key={className} value={className}>
									{className}
								</option>
							))}
						</select>
						<select
							value={filterSection}
							onChange={(e) => setFilterSection(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="">All Sections</option>
							{SECTIONS.map((section) => (
								<option key={section} value={section}>
									Section {section}
								</option>
							))}
						</select>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="name">Sort by Name</option>
							<option value="id">Sort by Student ID</option>
							<option value="rollNo">Sort by Roll No</option>
							<option value="class">Sort by Class</option>
							<option value="attendance">Sort by Attendance</option>
							<option value="performance">Sort by Performance</option>
						</select>
						<button
							onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
							className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
						>
							{sortOrder === "asc" ? "↑" : "↓"}
						</button>
        </div>
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<input
							type="text"
							placeholder="Search students by name, ID, roll number, or parent name..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
      </div>
          </div>
        </div>

			{/* Students Table */}
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[1000px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("name")}
								>
									<div className="flex items-center gap-1">
										Student Name
										{getSortIcon("name")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("id")}
								>
									<div className="flex items-center gap-1">
										Student ID
										{getSortIcon("id")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("class")}
								>
									<div className="flex items-center gap-1">
										Class & Section
										{getSortIcon("class")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("rollNo")}
								>
									<div className="flex items-center gap-1">
										Roll No
										{getSortIcon("rollNo")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("attendance")}
								>
									<div className="flex items-center gap-1">
										Attendance
										{getSortIcon("attendance")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("performance")}
								>
									<div className="flex items-center gap-1">
										Performance
										{getSortIcon("performance")}
									</div>
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Contact
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
							{filteredAndSortedStudents.length === 0 ? (
								<tr>
									<td colSpan="8" className="px-6 py-12 text-center">
										<div className="text-gray-500">
											{!searchTerm && !filterClass && !filterSection ? (
												<div>
													<p className="text-lg font-medium mb-2">
														No filters applied
													</p>
													<p className="text-sm">
														Use the search bar or filters above to find students
													</p>
												</div>
											) : (
												<div>
													<p className="text-lg font-medium mb-2">
														No students found
													</p>
													<p className="text-sm">
														Try adjusting your search criteria or filters
													</p>
												</div>
											)}
										</div>
									</td>
								</tr>
							) : (
								filteredAndSortedStudents.map((student, index) => (
									<tr
										key={student.id}
										className={`${
											index % 2 === 0 ? "bg-white" : "bg-gray-50"
										} hover:bg-gray-100 transition-colors`}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
													<span className="text-blue-600 font-semibold text-sm">
														{student.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</span>
												</div>
												<div>
													<div className="font-medium text-gray-900">
														{student.name}
													</div>
													<div className="text-sm text-gray-500">
														{student.gender}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
												{student.id}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900">
												{student.class} - {student.section}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="text-sm text-gray-900 font-medium">
												{student.rollNo}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<CheckCircle
													className={`h-4 w-4 ${getAttendanceColor(
														student.attendance.attendancePercentage
													)}`}
												/>
												<span
													className={`text-sm font-medium ${getAttendanceColor(
														student.attendance.attendancePercentage
													)}`}
												>
													{student.attendance.attendancePercentage}%
												</span>
											</div>
											<div className="text-xs text-gray-500">
												{student.attendance.presentDays}/
												{student.attendance.totalDays} days
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<TrendingUp
													className={`h-4 w-4 ${getPerformanceColor(
														student.academicPerformance.overallPercentage
													)}`}
												/>
												<span
													className={`text-sm font-medium ${getPerformanceColor(
														student.academicPerformance.overallPercentage
													)}`}
												>
													{student.academicPerformance.overallPercentage}%
												</span>
											</div>
											<div className="text-xs text-gray-500">
												Grade:{" "}
												<span
													className={getGradeColor(
														student.academicPerformance.currentGrade
													)}
												>
													{student.academicPerformance.currentGrade}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-3">
												<a
													href={`tel:${student.parentPhone}`}
													className="text-green-600 hover:text-green-800"
													title="Call parent"
												>
													<Phone className="h-4 w-4" />
												</a>
												<a
													href={`mailto:${student.parentEmail}`}
													className="text-blue-600 hover:text-blue-800"
													title="Email parent"
												>
													<Mail className="h-4 w-4" />
												</a>
											</div>
										</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
											<div className="flex items-center justify-end gap-2">
												<button
													onClick={() => handleViewStudent(student)}
													className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
													title="View details"
												>
													<Eye className="h-4 w-4" />
												</button>
												<button
													onClick={() => handleEditStudent(student)}
													className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
													title="Edit student"
												>
													<Edit className="h-4 w-4" />
												</button>
												<div className="relative">
													<button
														onClick={() =>
															setOpenDropdown(
																openDropdown === student.id ? null : student.id
															)
														}
														className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50"
														title="More options"
													>
														<MoreVertical className="h-4 w-4" />
													</button>
													{openDropdown === student.id && (
														<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
															<div className="py-1">
																<button
																	onClick={() => handleViewStudent(student)}
																	className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
																>
																	<Eye className="h-4 w-4" />
																	View Details
																</button>
																<button
																	onClick={() => handleEditStudent(student)}
																	className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
																>
																	<Edit className="h-4 w-4" />
																	Edit Student
																</button>
																<button
																	onClick={() => handleDeleteStudent(student)}
																	className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
																>
																	<Trash2 className="h-4 w-4" />
																	Remove Student
																</button>
															</div>
														</div>
													)}
												</div>
											</div>
                </td>
              </tr>
								))
							)}
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
								Remove Student
							</h3>
						</div>
						<div className="p-6">
							<p className="text-gray-600 mb-4">
								Are you sure you want to remove{" "}
								<strong>{studentToDelete?.name}</strong>? This action cannot be
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
									Remove
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Student Detail Modal */}
			{showStudentDetail && selectedStudent && (
				<StudentDetailModal
					student={selectedStudent}
					onClose={() => {
						setShowStudentDetail(false);
						setSelectedStudent(null);
					}}
				/>
			)}

			{/* Edit Student Modal */}
			{showAddStudent && (
				<StudentFormModal
					student={editingStudent}
					onSave={handleSaveStudent}
					onClose={() => {
						setShowAddStudent(false);
						setEditingStudent(null);
					}}
				/>
			)}
		</div>
	);
}

// Student Detail Modal Component
function StudentDetailModal({ student, onClose }) {
	const getAttendanceColor = (percentage) => {
		if (percentage >= 90) return "text-green-600";
		if (percentage >= 75) return "text-yellow-600";
		return "text-red-600";
	};

	const getPerformanceColor = (percentage) => {
		if (percentage >= 85) return "text-green-600";
		if (percentage >= 70) return "text-yellow-600";
		return "text-red-600";
	};

	const getGradeColor = (grade) => {
		if (grade === "A+" || grade === "A") return "text-green-600";
		if (grade === "B+" || grade === "B") return "text-yellow-600";
		return "text-red-600";
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-gray-900">
							Student Details
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
					{/* Student Basic Information */}
					<div className="bg-gray-50 rounded-lg p-4">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
								<span className="text-blue-600 font-semibold text-xl">
									{student.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</span>
							</div>
							<div>
								<h4 className="text-xl font-semibold text-gray-900">
									{student.name}
								</h4>
								<p className="text-gray-600">Student ID: {student.id}</p>
								<p className="text-gray-600">
									{student.class} - Section {student.section} | Roll No:{" "}
									{student.rollNo}
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-gray-600">Gender</p>
								<p className="font-medium">{student.gender}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Date of Birth</p>
								<p className="font-medium">
									{new Date(student.dateOfBirth).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Blood Group</p>
								<p className="font-medium">{student.bloodGroup}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Admission Date</p>
								<p className="font-medium">
									{new Date(student.admissionDate).toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>

					{/* Parent Information */}
					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="text-lg font-semibold text-gray-900 mb-4">
							Parent Information
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-gray-600">Parent Name</p>
								<p className="font-medium">{student.parentName}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Phone Number</p>
								<p className="font-medium">{student.parentPhone}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Email</p>
								<p className="font-medium">{student.parentEmail}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Address</p>
								<p className="font-medium">{student.address}</p>
							</div>
						</div>
					</div>

					{/* Attendance Summary */}
					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="text-lg font-semibold text-gray-900 mb-4">
							Attendance Summary
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="text-center">
								<p className="text-2xl font-bold text-blue-600">
									{student.attendance.totalDays}
								</p>
								<p className="text-sm text-gray-600">Total Days</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-green-600">
									{student.attendance.presentDays}
								</p>
								<p className="text-sm text-gray-600">Present Days</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-red-600">
									{student.attendance.absentDays}
								</p>
								<p className="text-sm text-gray-600">Absent Days</p>
							</div>
							<div className="text-center">
								<p
									className={`text-2xl font-bold ${getAttendanceColor(
										student.attendance.attendancePercentage
									)}`}
								>
									{student.attendance.attendancePercentage}%
								</p>
								<p className="text-sm text-gray-600">Attendance</p>
							</div>
						</div>
					</div>

					{/* Academic Performance */}
					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="text-lg font-semibold text-gray-900 mb-4">
							Academic Performance
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							<div className="text-center">
								<p
									className={`text-2xl font-bold ${getPerformanceColor(
										student.academicPerformance.overallPercentage
									)}`}
								>
									{student.academicPerformance.overallPercentage}%
								</p>
								<p className="text-sm text-gray-600">Overall Percentage</p>
							</div>
							<div className="text-center">
								<p
									className={`text-2xl font-bold ${getGradeColor(
										student.academicPerformance.currentGrade
									)}`}
								>
									{student.academicPerformance.currentGrade}
								</p>
								<p className="text-sm text-gray-600">Current Grade</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-purple-600">
									{student.academicPerformance.subjects.length}
								</p>
								<p className="text-sm text-gray-600">Subjects</p>
							</div>
						</div>

						{/* Subject Performance */}
						<div className="space-y-3">
							<h5 className="font-medium text-gray-900">
								Subject-wise Performance
							</h5>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								{student.academicPerformance.subjects.map((subject, index) => (
									<div
										key={index}
										className="bg-white rounded-lg p-3 border border-gray-200"
									>
										<div className="flex justify-between items-center">
											<div>
												<p className="font-medium text-gray-900">
													{subject.name}
												</p>
												<p className="text-sm text-gray-600">
													Rank: {subject.rank}
												</p>
											</div>
											<div className="text-right">
												<p
													className={`font-bold ${getGradeColor(
														subject.grade
													)}`}
												>
													{subject.grade}
												</p>
												<p className="text-sm text-gray-600">
													{subject.percentage}%
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Recent Tests */}
						{student.academicPerformance.recentTests.length > 0 && (
							<div className="mt-6">
								<h5 className="font-medium text-gray-900 mb-3">Recent Tests</h5>
								<div className="space-y-2">
									{student.academicPerformance.recentTests.map(
										(test, index) => (
											<div
												key={index}
												className="bg-white rounded-lg p-3 border border-gray-200"
											>
												<div className="flex justify-between items-center">
													<div>
														<p className="font-medium text-gray-900">
															{test.name}
														</p>
														<p className="text-sm text-gray-600">
															{new Date(test.date).toLocaleDateString()}
														</p>
													</div>
													<div className="text-right">
														<p className="font-bold text-gray-900">
															{test.score}/{test.maxScore}
														</p>
														<p className="text-sm text-gray-600">
															{Math.round((test.score / test.maxScore) * 100)}%
														</p>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// Student Form Modal Component
function StudentFormModal({ student, onSave, onClose }) {
	const [formData, setFormData] = useState({
		name: student?.name || "",
		rollNo: student?.rollNo || "",
		class: student?.class || "",
		section: student?.section || "",
		gender: student?.gender || "",
		dateOfBirth: student?.dateOfBirth || "",
		admissionDate:
			student?.admissionDate || new Date().toISOString().split("T")[0],
		parentName: student?.parentName || "",
		parentPhone: student?.parentPhone || "",
		parentEmail: student?.parentEmail || "",
		address: student?.address || "",
		bloodGroup: student?.bloodGroup || "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">
						{student ? "Edit Student" : "Add New Student"}
					</h3>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Basic Information */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Basic Information
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Full Name *
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
									Roll Number *
								</label>
								<input
									type="number"
									name="rollNo"
									value={formData.rollNo}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Class *
								</label>
								<select
									name="class"
									value={formData.class}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="">Select Class</option>
									{AVAILABLE_CLASSES.map((className) => (
										<option key={className} value={className}>
											{className}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Section *
								</label>
								<select
									name="section"
									value={formData.section}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="">Select Section</option>
									{SECTIONS.map((section) => (
										<option key={section} value={section}>
											Section {section}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Gender *
								</label>
								<select
									name="gender"
									value={formData.gender}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="">Select Gender</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Date of Birth *
								</label>
								<input
									type="date"
									name="dateOfBirth"
									value={formData.dateOfBirth}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Blood Group
								</label>
								<select
									name="bloodGroup"
									value={formData.bloodGroup}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="">Select Blood Group</option>
									<option value="A+">A+</option>
									<option value="A-">A-</option>
									<option value="B+">B+</option>
									<option value="B-">B-</option>
									<option value="AB+">AB+</option>
									<option value="AB-">AB-</option>
									<option value="O+">O+</option>
									<option value="O-">O-</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Admission Date
								</label>
								<input
									type="date"
									name="admissionDate"
									value={formData.admissionDate}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>
					</div>

					{/* Parent Information */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Parent Information
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Parent Name *
								</label>
								<input
									type="text"
									name="parentName"
									value={formData.parentName}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Parent Phone *
								</label>
								<input
									type="tel"
									name="parentPhone"
									value={formData.parentPhone}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Parent Email *
								</label>
								<input
									type="email"
									name="parentEmail"
									value={formData.parentEmail}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Address
								</label>
								<input
									type="text"
									name="address"
									value={formData.address}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
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
							{student ? "Update Student" : "Add Student"}
						</button>
					</div>
				</form>
      </div>
    </div>
  );
}
