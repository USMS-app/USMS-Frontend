import React, { useState, useMemo } from "react";
import {
	Search,
	Filter,
	Plus,
	Edit,
	Trash2,
	MoreVertical,
	Mail,
	Phone,
	User,
	BookOpen,
	GraduationCap,
	Crown,
} from "lucide-react";
import { toast } from "sonner";
import BackButton from "../../components/BackButton";

// Mock data for teachers
const INITIAL_TEACHERS = [
	{
		id: "T1001",
		name: "Mrs. Anita Sharma",
		email: "anita.sharma@school.com",
		phone: "+91 98765 43210",
		subjects: ["Mathematics"],
		assignedClasses: ["Class 1", "Class 2"],
		isClassTeacher: true,
		classTeacherFor: "Class 1",
		joinDate: "2020-06-15",
		qualification: "M.Sc. Mathematics",
		experience: "8 years",
	},
	{
		id: "T1002",
		name: "Mr. Rahul Verma",
		email: "rahul.verma@school.com",
		phone: "+91 98765 43211",
		subjects: ["Science"],
		assignedClasses: ["Class 3", "Class 4"],
		isClassTeacher: false,
		classTeacherFor: null,
		joinDate: "2019-08-20",
		qualification: "M.Sc. Physics",
		experience: "6 years",
	},
	{
		id: "T1003",
		name: "Ms. Meera Iyer",
		email: "meera.iyer@school.com",
		phone: "+91 98765 43212",
		subjects: ["English"],
		assignedClasses: ["Class 5", "Class 6"],
		isClassTeacher: true,
		classTeacherFor: "Class 5",
		joinDate: "2021-03-10",
		qualification: "M.A. English",
		experience: "4 years",
	},
	{
		id: "T1004",
		name: "Mr. Rajesh Kumar",
		email: "rajesh.kumar@school.com",
		phone: "+91 98765 43213",
		subjects: ["Mathematics"],
		assignedClasses: ["Class 7", "Class 8"],
		isClassTeacher: false,
		classTeacherFor: null,
		joinDate: "2018-11-05",
		qualification: "M.Sc. Mathematics",
		experience: "10 years",
	},
	{
		id: "T1005",
		name: "Ms. Neha Gupta",
		email: "neha.gupta@school.com",
		phone: "+91 98765 43214",
		subjects: ["Science"],
		assignedClasses: ["Class 9", "Class 10"],
		isClassTeacher: true,
		classTeacherFor: "Class 9",
		joinDate: "2022-01-15",
		qualification: "M.Sc. Chemistry",
		experience: "3 years",
	},
];

// Available subjects and classes
const AVAILABLE_SUBJECTS = [
	"Kannada",
	"English",
	"Hindi",
	"Mathematics",
	"Science",
	"Social Studies",
	"EVS",
];

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

export default function Teachers() {
	const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState("asc");
	const [showAddTeacher, setShowAddTeacher] = useState(false);
	const [editingTeacher, setEditingTeacher] = useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [teacherToDelete, setTeacherToDelete] = useState(null);
	const [openDropdown, setOpenDropdown] = useState(null);

	// Filtered and sorted teachers
	const filteredAndSortedTeachers = useMemo(() => {
		let filtered = teachers.filter(
			(teacher) =>
				teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
				teacher.subjects.some((subject) =>
					subject.toLowerCase().includes(searchTerm.toLowerCase())
				) ||
				teacher.assignedClasses.some((className) =>
					className.toLowerCase().includes(searchTerm.toLowerCase())
				)
		);

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
				case "subjects":
					aValue = a.subjects.join(", ");
					bValue = b.subjects.join(", ");
					break;
				case "classes":
					aValue = a.assignedClasses.join(", ");
					bValue = b.assignedClasses.join(", ");
					break;
				case "joinDate":
					aValue = new Date(a.joinDate);
					bValue = new Date(b.joinDate);
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
	}, [teachers, searchTerm, sortBy, sortOrder]);

	// Generate unique teacher ID
	const generateTeacherId = () => {
		const existingIds = teachers.map((t) => parseInt(t.id.slice(1)));
		const nextId = Math.max(...existingIds, 1000) + 1;
		return `T${nextId}`;
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

	// Handle add teacher
	const handleAddTeacher = () => {
		setEditingTeacher(null);
		setShowAddTeacher(true);
	};

	// Handle edit teacher
	const handleEditTeacher = (teacher) => {
		setEditingTeacher(teacher);
		setShowAddTeacher(true);
		setOpenDropdown(null);
	};

	// Handle delete teacher
	const handleDeleteTeacher = (teacher) => {
		setTeacherToDelete(teacher);
		setShowDeleteConfirm(true);
		setOpenDropdown(null);
	};

	// Confirm delete
	const confirmDelete = () => {
		setTeachers((prev) => prev.filter((t) => t.id !== teacherToDelete.id));
		setShowDeleteConfirm(false);
		setTeacherToDelete(null);
		toast.success("Teacher deleted successfully");
	};

	// Save teacher
	const handleSaveTeacher = (teacherData) => {
		if (editingTeacher) {
			// Update existing teacher
			setTeachers((prev) =>
				prev.map((t) =>
					t.id === editingTeacher.id
						? { ...teacherData, id: editingTeacher.id }
						: t
				)
			);
			toast.success("Teacher updated successfully");
		} else {
			// Add new teacher
			const newTeacher = {
				...teacherData,
				id: generateTeacherId(),
			};
			setTeachers((prev) => [...prev, newTeacher]);
			toast.success("Teacher added successfully");
		}
		setShowAddTeacher(false);
		setEditingTeacher(null);
	};

	// Get sort icon
	const getSortIcon = (column) => {
		if (sortBy !== column) return null;
		return sortOrder === "asc" ? "↑" : "↓";
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div className="flex items-center gap-4">
					<BackButton className="hidden sm:flex" />
					<h2 className="text-xl font-semibold text-gray-900">
						Teacher Management
					</h2>
				</div>
				<button
					onClick={handleAddTeacher}
					className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
				>
					<Plus size={18} />
					Add Teacher
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
							<User className="h-5 w-5 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-gray-600">Total Teachers</p>
							<p className="text-xl font-semibold text-gray-900">
								{teachers.length}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
							<Crown className="h-5 w-5 text-green-600" />
						</div>
						<div>
							<p className="text-sm text-gray-600">Class Teachers</p>
							<p className="text-xl font-semibold text-gray-900">
								{teachers.filter((t) => t.isClassTeacher).length}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
							<BookOpen className="h-5 w-5 text-purple-600" />
						</div>
						<div>
							<p className="text-sm text-gray-600">Subject Teachers</p>
							<p className="text-xl font-semibold text-gray-900">
								{teachers.filter((t) => !t.isClassTeacher).length}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
							<GraduationCap className="h-5 w-5 text-orange-600" />
						</div>
						<div>
							<p className="text-sm text-gray-600">Active Classes</p>
							<p className="text-xl font-semibold text-gray-900">
								{new Set(teachers.flatMap((t) => t.assignedClasses)).size}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Search and Filters */}
			<div className="bg-white p-4 rounded-lg border border-gray-200">
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<input
							type="text"
							placeholder="Search teachers by name, ID, subjects, or classes..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div className="flex items-center gap-2">
						<Filter className="h-4 w-4 text-gray-500" />
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="name">Sort by Name</option>
							<option value="id">Sort by Teacher ID</option>
							<option value="subjects">Sort by Subjects</option>
							<option value="classes">Sort by Classes</option>
							<option value="joinDate">Sort by Join Date</option>
						</select>
						<button
							onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
							className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
						>
							{sortOrder === "asc" ? "↑" : "↓"}
						</button>
					</div>
				</div>
			</div>

			{/* Teachers Table */}
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
				{/* Scroll Indicator */}
				<div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
							<span className="text-xs text-gray-600 font-medium">
								Scroll horizontally to view all columns
							</span>
						</div>
						<div className="flex items-center gap-1">
							<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
							<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
							<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
						</div>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full min-w-[800px] divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("name")}
								>
									<div className="flex items-center gap-1">
										Teacher Name
										{getSortIcon("name")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("id")}
								>
									<div className="flex items-center gap-1">
										Teacher ID
										{getSortIcon("id")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("subjects")}
								>
									<div className="flex items-center gap-1">
										Assigned Subject(s)
										{getSortIcon("subjects")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									onClick={() => handleSort("classes")}
								>
									<div className="flex items-center gap-1">
										Assigned Class(es)
										{getSortIcon("classes")}
									</div>
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Contact
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Role
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredAndSortedTeachers.map((teacher, index) => (
								<tr
									key={teacher.id}
									className={`${
										index % 2 === 0 ? "bg-white" : "bg-gray-50"
									} hover:bg-gray-100 transition-colors`}
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
												<span className="text-blue-600 font-semibold text-sm">
													{teacher.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</span>
											</div>
											<div>
												<div className="font-medium text-gray-900">
													{teacher.name}
												</div>
												<div className="text-sm text-gray-500">
													{teacher.qualification}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											{teacher.id}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex flex-wrap gap-1">
											{teacher.subjects.map((subject, idx) => (
												<span
													key={idx}
													className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800"
												>
													{subject}
												</span>
											))}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex flex-wrap gap-1">
											{teacher.assignedClasses.map((className, idx) => (
												<span
													key={idx}
													className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800"
												>
													{className}
												</span>
											))}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center gap-3">
											<a
												href={`mailto:${teacher.email}`}
												className="text-blue-600 hover:text-blue-800"
												title="Send email"
											>
												<Mail className="h-4 w-4" />
											</a>
											<a
												href={`tel:${teacher.phone}`}
												className="text-green-600 hover:text-green-800"
												title="Call"
											>
												<Phone className="h-4 w-4" />
											</a>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{teacher.isClassTeacher ? (
											<div className="flex items-center gap-2">
												<Crown className="h-4 w-4 text-yellow-600" />
												<span className="text-sm font-medium text-gray-900">
													Class Teacher ({teacher.classTeacherFor})
												</span>
											</div>
										) : (
											<span className="text-sm text-gray-600">
												Subject Teacher
											</span>
										)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right">
										<div className="flex items-center justify-end gap-2">
											<button
												onClick={() => handleEditTeacher(teacher)}
												className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
												title="Edit teacher"
											>
												<Edit className="h-4 w-4" />
											</button>
											<div className="relative">
												<button
													onClick={() =>
														setOpenDropdown(
															openDropdown === teacher.id ? null : teacher.id
														)
													}
													className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50"
													title="More options"
												>
													<MoreVertical className="h-4 w-4" />
												</button>
												{openDropdown === teacher.id && (
													<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
														<div className="py-1">
															<button
																onClick={() => handleEditTeacher(teacher)}
																className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
															>
																<Edit className="h-4 w-4" />
																Edit Teacher
															</button>
															<button
																onClick={() => handleDeleteTeacher(teacher)}
																className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
															>
																<Trash2 className="h-4 w-4" />
																Delete Teacher
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
								Delete Teacher
							</h3>
						</div>
						<div className="p-6">
							<p className="text-gray-600 mb-4">
								Are you sure you want to delete{" "}
								<strong>{teacherToDelete?.name}</strong>? This action cannot be
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

			{/* Add/Edit Teacher Modal */}
			{showAddTeacher && (
				<TeacherFormModal
					teacher={editingTeacher}
					onSave={handleSaveTeacher}
					onClose={() => {
						setShowAddTeacher(false);
						setEditingTeacher(null);
					}}
				/>
			)}
		</div>
	);
}

// Teacher Form Modal Component
function TeacherFormModal({ teacher, onSave, onClose }) {
	const [formData, setFormData] = useState({
		name: teacher?.name || "",
		email: teacher?.email || "",
		phone: teacher?.phone || "",
		qualification: teacher?.qualification || "",
		experience: teacher?.experience || "",
		subjects: teacher?.subjects || [],
		assignedClasses: teacher?.assignedClasses || [],
		isClassTeacher: teacher?.isClassTeacher || false,
		classTeacherFor: teacher?.classTeacherFor || "",
		joinDate: teacher?.joinDate || new Date().toISOString().split("T")[0],
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

	const handleSubjectChange = (subject) => {
		setFormData((prev) => ({
			...prev,
			subjects: prev.subjects.includes(subject)
				? prev.subjects.filter((s) => s !== subject)
				: [...prev.subjects, subject],
		}));
	};

	const handleClassChange = (className) => {
		setFormData((prev) => ({
			...prev,
			assignedClasses: prev.assignedClasses.includes(className)
				? prev.assignedClasses.filter((c) => c !== className)
				: [...prev.assignedClasses, className],
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">
						{teacher ? "Edit Teacher" : "Add New Teacher"}
					</h3>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Personal Information */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Personal Information
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
									Email *
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Phone Number *
								</label>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Join Date
								</label>
								<input
									type="date"
									name="joinDate"
									value={formData.joinDate}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Qualification
								</label>
								<input
									type="text"
									name="qualification"
									value={formData.qualification}
									onChange={handleChange}
									placeholder="e.g., M.Sc. Mathematics"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Experience
								</label>
								<input
									type="text"
									name="experience"
									value={formData.experience}
									onChange={handleChange}
									placeholder="e.g., 5 years"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>
					</div>

					{/* Subject Assignment */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Subject Assignment
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{AVAILABLE_SUBJECTS.map((subject) => (
								<label key={subject} className="flex items-center">
									<input
										type="checkbox"
										checked={formData.subjects.includes(subject)}
										onChange={() => handleSubjectChange(subject)}
										className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<span className="ml-2 text-sm text-gray-700">{subject}</span>
								</label>
							))}
						</div>
					</div>

					{/* Class Assignment */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Class Assignment
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{AVAILABLE_CLASSES.map((className) => (
								<label key={className} className="flex items-center">
									<input
										type="checkbox"
										checked={formData.assignedClasses.includes(className)}
										onChange={() => handleClassChange(className)}
										className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<span className="ml-2 text-sm text-gray-700">
										{className}
									</span>
								</label>
							))}
						</div>
					</div>

					{/* Class Teacher Role */}
					<div>
						<h4 className="text-md font-medium text-gray-900 mb-4">
							Class Teacher Role
						</h4>
						<div className="space-y-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									name="isClassTeacher"
									checked={formData.isClassTeacher}
									onChange={handleChange}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Assign as Class Teacher
								</span>
							</label>

							{formData.isClassTeacher && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Class Teacher For
									</label>
									<select
										name="classTeacherFor"
										value={formData.classTeacherFor}
										onChange={handleChange}
										required={formData.isClassTeacher}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									>
										<option value="">Select a class</option>
										{AVAILABLE_CLASSES.map((className) => (
											<option key={className} value={className}>
												{className}
											</option>
										))}
									</select>
								</div>
							)}
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
							{teacher ? "Update Teacher" : "Add Teacher"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
