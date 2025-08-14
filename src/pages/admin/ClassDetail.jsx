import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	Users,
	User,
	BookOpen,
	Plus,
	Edit,
	Trash2,
	Search,
	Filter,
	Phone,
	Mail,
	GraduationCap,
	Calendar,
	MapPin,
} from "lucide-react";
import BackButton from "../../components/BackButton";

// Mock data for class details
const getClassData = (classId) => {
	const classData = {
		1: {
			name: "Class 1",
			classTeacher: "Mrs. Sarah Johnson",
			totalStudents: 45,
			maleStudents: 23,
			femaleStudents: 22,
			subjects: [
				{
					id: 1,
					name: "Kannada",
					code: "KAN",
					isCompulsory: true,
					teacher: "Mrs. Sarah Johnson",
				},
				{
					id: 2,
					name: "English",
					code: "ENG",
					isCompulsory: true,
					teacher: "Mrs. Sarah Johnson",
				},
				{
					id: 3,
					name: "Hindi",
					code: "HIN",
					isCompulsory: true,
					teacher: "Mrs. Sarah Johnson",
				},
				{
					id: 4,
					name: "EVS",
					code: "EVS",
					isCompulsory: true,
					teacher: "Ms. Emily Davis",
				},
				{
					id: 5,
					name: "Mathematics",
					code: "MATH",
					isCompulsory: true,
					teacher: "Mr. James Wilson",
				},
			],
			teachers: [
				{
					name: "Mrs. Sarah Johnson",
					subject: "English & Class Teacher",
					email: "sarah.johnson@school.com",
					phone: "+1-555-0101",
				},
				{
					name: "Mr. James Wilson",
					subject: "Mathematics",
					email: "james.wilson@school.com",
					phone: "+1-555-0102",
				},
				{
					name: "Ms. Emily Davis",
					subject: "EVS",
					email: "emily.davis@school.com",
					phone: "+1-555-0103",
				},
			],
			students: [
				{
					id: 1,
					rollNo: "1A001",
					name: "Alex Johnson",
					gender: "Male",
					parentName: "Mr. John Johnson",
					parentMobile: "+1-555-1001",
					parentEmail: "john.johnson@email.com",
					address: "123 Main St, City",
				},
				{
					id: 2,
					rollNo: "1A002",
					name: "Emma Wilson",
					gender: "Female",
					parentName: "Mrs. Mary Wilson",
					parentMobile: "+1-555-1002",
					parentEmail: "mary.wilson@email.com",
					address: "456 Oak Ave, City",
				},
				{
					id: 3,
					rollNo: "1A003",
					name: "Michael Brown",
					gender: "Male",
					parentName: "Mr. Robert Brown",
					parentMobile: "+1-555-1003",
					parentEmail: "robert.brown@email.com",
					address: "789 Pine Rd, City",
				},
				{
					id: 4,
					rollNo: "1A004",
					name: "Sophia Davis",
					gender: "Female",
					parentName: "Mrs. Jennifer Davis",
					parentMobile: "+1-555-1004",
					parentEmail: "jennifer.davis@email.com",
					address: "321 Elm St, City",
				},
				{
					id: 5,
					rollNo: "1A005",
					name: "William Taylor",
					gender: "Male",
					parentName: "Mr. David Taylor",
					parentMobile: "+1-555-1005",
					parentEmail: "david.taylor@email.com",
					address: "654 Maple Dr, City",
				},
			],
		},
	};

	// Generate data for other classes if not exists
	if (!classData[classId]) {
		// Define class teachers based on class ID
		const classTeachers = {
			1: "Mrs. Anita Sharma",
			2: "Mr. Rahul Verma",
			3: "Ms. Meera Iyer",
			4: "Mr. Rajesh Kumar",
			5: "Mrs. Priya Singh",
			6: "Mr. Amit Patel",
			7: "Ms. Neha Gupta",
			8: "Mr. Sanjay Reddy",
			9: "Mrs. Kavita Malhotra",
			10: "Mr. Deepak Sharma",
		};

		// Define subjects based on class level
		let subjects = [];
		if (classId <= 5) {
			// Classes 1-5: 5 subjects (Kannada, English, Hindi, EVS, Mathematics)
			subjects = [
				{
					id: 1,
					name: "Kannada",
					code: "KAN",
					isCompulsory: true,
					teacher: classTeachers[classId],
				},
				{
					id: 2,
					name: "English",
					code: "ENG",
					isCompulsory: true,
					teacher: classTeachers[classId],
				},
				{
					id: 3,
					name: "Hindi",
					code: "HIN",
					isCompulsory: true,
					teacher: classTeachers[classId],
				},
				{
					id: 4,
					name: "EVS",
					code: "EVS",
					isCompulsory: true,
					teacher: classTeachers[classId],
				},
				{
					id: 5,
					name: "Mathematics",
					code: "MATH",
					isCompulsory: true,
					teacher: "Mr. Rajesh Kumar",
				},
			];
		} else {
			// Classes 6-10: 6 subjects (Kannada, English, Hindi, Social, Science, Mathematics)
			subjects = [
				{
					id: 1,
					name: "Kannada",
					code: "KAN",
					isCompulsory: true,
					teacher: classTeachers[classId],
				},
				{
					id: 2,
					name: "English",
					code: "ENG",
					isCompulsory: true,
					teacher: classTeachers[classId],
				},
				{
					id: 3,
					name: "Hindi",
					code: "HIN",
					isCompulsory: true,
					teacher: classTeachers[classId],
				},
				{
					id: 4,
					name: "Social Studies",
					code: "SOC",
					isCompulsory: true,
					teacher: classTeachers[classId],
				},
				{
					id: 5,
					name: "Science",
					code: "SCI",
					isCompulsory: true,
					teacher: "Ms. Neha Gupta",
				},
				{
					id: 6,
					name: "Mathematics",
					code: "MATH",
					isCompulsory: true,
					teacher: "Mr. Rajesh Kumar",
				},
			];
		}

		const baseData = {
			name: `Class ${classId}`,
			classTeacher: classTeachers[classId],
			totalStudents: 40 + Math.floor(Math.random() * 20),
			maleStudents: 20 + Math.floor(Math.random() * 10),
			femaleStudents: 20 + Math.floor(Math.random() * 10),
			subjects: subjects,
			teachers: [
				{
					name: classTeachers[classId],
					subject: "Class Teacher",
					email: `teacher${classId}@school.com`,
					phone: `+1-555-0${classId.toString().padStart(3, "0")}`,
				},
				{
					name: "Mr. Rajesh Kumar",
					subject: "Mathematics",
					email: `math${classId}@school.com`,
					phone: `+1-555-1${classId.toString().padStart(3, "0")}`,
				},
				{
					name: "Ms. Neha Gupta",
					subject: "Science",
					email: `science${classId}@school.com`,
					phone: `+1-555-2${classId.toString().padStart(3, "0")}`,
				},
			],
			students: [],
		};

		// Generate mock students
		for (let i = 1; i <= baseData.totalStudents; i++) {
			const gender = Math.random() > 0.5 ? "Male" : "Female";
			baseData.students.push({
				id: i,
				rollNo: `${classId.toString().padStart(2, "0")}A${i
					.toString()
					.padStart(3, "0")}`,
				name: `Student ${i}`,
				gender,
				parentName: `Parent ${i}`,
				parentMobile: `+1-555-${classId.toString().padStart(2, "0")}${i
					.toString()
					.padStart(3, "0")}`,
				parentEmail: `parent${i}@email.com`,
				address: `${i} Street ${classId}, City`,
			});
		}

		classData[classId] = baseData;
	}

	return classData[classId];
};

export default function ClassDetail() {
	const { classId } = useParams();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("details");
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("rollNo");
	const [showAddStudent, setShowAddStudent] = useState(false);
	const [editingStudent, setEditingStudent] = useState(null);
	const [showAddSubject, setShowAddSubject] = useState(false);
	const [editingSubject, setEditingSubject] = useState(null);
	const [classData, setClassData] = useState(null);

	useEffect(() => {
		const data = getClassData(parseInt(classId));
		setClassData(data);
	}, [classId]);

	// Filter and sort students - moved to top level to follow Rules of Hooks
	const filteredAndSortedStudents = React.useMemo(() => {
		if (!classData) return [];

		let filtered = classData.students.filter(
			(student) =>
				student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
				student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
		);

		// Sort students
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "rollNo":
					return a.rollNo.localeCompare(b.rollNo);
				case "name":
					return a.name.localeCompare(b.name);
				case "gender":
					return a.gender.localeCompare(b.gender);
				default:
					return 0;
			}
		});

		return filtered;
	}, [classData?.students, searchTerm, sortBy]);

	if (!classData) {
		return (
			<div className="flex items-center justify-center h-64">Loading...</div>
		);
	}

	const handleAddStudent = () => {
		setShowAddStudent(true);
		setEditingStudent(null);
	};

	const handleEditStudent = (student) => {
		setEditingStudent(student);
		setShowAddStudent(true);
	};

	const handleDeleteStudent = (studentId) => {
		if (window.confirm("Are you sure you want to delete this student?")) {
			setClassData((prev) => ({
				...prev,
				students: prev.students.filter((s) => s.id !== studentId),
				totalStudents: prev.totalStudents - 1,
				maleStudents:
					prev.students.find((s) => s.id === studentId)?.gender === "Male"
						? prev.maleStudents - 1
						: prev.maleStudents,
				femaleStudents:
					prev.students.find((s) => s.id === studentId)?.gender === "Female"
						? prev.femaleStudents - 1
						: prev.femaleStudents,
			}));
		}
	};

	const handleSaveStudent = (studentData) => {
		if (editingStudent) {
			// Update existing student
			setClassData((prev) => ({
				...prev,
				students: prev.students.map((s) =>
					s.id === editingStudent.id ? { ...s, ...studentData } : s
				),
			}));
		} else {
			// Add new student
			setClassData((prev) => {
				const newStudent = {
					id: Math.max(...prev.students.map((s) => s.id)) + 1,
					...studentData,
				};
				return {
					...prev,
					students: [...prev.students, newStudent],
					totalStudents: prev.totalStudents + 1,
					maleStudents:
						studentData.gender === "Male"
							? prev.maleStudents + 1
							: prev.maleStudents,
					femaleStudents:
						studentData.gender === "Female"
							? prev.femaleStudents + 1
							: prev.femaleStudents,
				};
			});
		}
		setShowAddStudent(false);
		setEditingStudent(null);
	};

	// Subject management functions
	const handleAddSubject = () => {
		setShowAddSubject(true);
		setEditingSubject(null);
	};

	const handleEditSubject = (subject) => {
		setEditingSubject(subject);
		setShowAddSubject(true);
	};

	const handleDeleteSubject = (subjectId) => {
		if (window.confirm("Are you sure you want to delete this subject?")) {
			setClassData((prev) => ({
				...prev,
				subjects: prev.subjects.filter((s) => s.id !== subjectId),
			}));
		}
	};

	const handleSaveSubject = (subjectData) => {
		if (editingSubject) {
			// Update existing subject
			setClassData((prev) => ({
				...prev,
				subjects: prev.subjects.map((s) =>
					s.id === editingSubject.id ? { ...s, ...subjectData } : s
				),
			}));
		} else {
			// Add new subject
			setClassData((prev) => {
				const newSubject = {
					id: Math.max(...prev.subjects.map((s) => s.id)) + 1,
					...subjectData,
				};
				return {
					...prev,
					subjects: [...prev.subjects, newSubject],
				};
			});
		}
		setShowAddSubject(false);
		setEditingSubject(null);
	};

	return (
		<div className="space-y-6 overflow-hidden">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div className="flex items-center gap-4">
					<BackButton onClick={() => navigate("/admin/classes")} />
					<div>
						<h2 className="text-xl font-semibold text-gray-900">
							{classData.name} Details
						</h2>
						<p className="text-sm text-gray-600">
							Manage class information and students
						</p>
					</div>
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => navigate("/admin/classes")}
						className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
					>
						<ArrowLeft className="h-4 w-4 mr-2 inline" />
						Back to Classes
					</button>
				</div>
			</div>

			{/* Tabs */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200">
				<div className="border-b border-gray-200">
					<nav className="flex overflow-x-auto space-x-4 sm:space-x-8 px-4 sm:px-6">
						<button
							onClick={() => setActiveTab("details")}
							className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
								activeTab === "details"
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							<div className="flex items-center gap-1 sm:gap-2">
								<BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
								<span className="hidden sm:inline">Class Details</span>
								<span className="sm:hidden">Details</span>
							</div>
						</button>
						<button
							onClick={() => setActiveTab("students")}
							className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
								activeTab === "students"
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							<div className="flex items-center gap-1 sm:gap-2">
								<Users className="h-3 w-3 sm:h-4 sm:w-4" />
								<span className="hidden sm:inline">Student Information</span>
								<span className="sm:hidden">Students</span>
								<span className="bg-gray-100 text-gray-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
									{classData.totalStudents}
								</span>
							</div>
						</button>
						<button
							onClick={() => setActiveTab("subjects")}
							className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
								activeTab === "subjects"
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							<div className="flex items-center gap-1 sm:gap-2">
								<BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
								<span className="hidden sm:inline">Subjects</span>
								<span className="sm:hidden">Subjects</span>
								<span className="bg-gray-100 text-gray-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
									{classData.subjects?.length || 0}
								</span>
							</div>
						</button>
					</nav>
				</div>

				<div className="p-6">
					{/* Class Details Tab */}
					{activeTab === "details" && (
						<div className="space-y-6">
							{/* Class Overview */}
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
								<div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
									<div className="flex items-center">
										<div className="p-3 bg-blue-100 rounded-lg">
											<Users className="h-6 w-6 text-blue-600" />
										</div>
										<div className="ml-4">
											<p className="text-sm font-medium text-blue-600">
												Total Students
											</p>
											<p className="text-2xl font-bold text-blue-900">
												{classData.totalStudents}
											</p>
										</div>
									</div>
								</div>
								<div className="bg-green-50 rounded-xl p-6 border border-green-200">
									<div className="flex items-center">
										<div className="p-3 bg-green-100 rounded-lg">
											<User className="h-6 w-6 text-green-600" />
										</div>
										<div className="ml-4">
											<p className="text-sm font-medium text-green-600">
												Male Students
											</p>
											<p className="text-2xl font-bold text-green-900">
												{classData.maleStudents}
											</p>
										</div>
									</div>
								</div>
								<div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
									<div className="flex items-center">
										<div className="p-3 bg-purple-100 rounded-lg">
											<User className="h-6 w-6 text-purple-600" />
										</div>
										<div className="ml-4">
											<p className="text-sm font-medium text-purple-600">
												Female Students
											</p>
											<p className="text-2xl font-bold text-purple-900">
												{classData.femaleStudents}
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Class Teacher Information */}
							<div className="bg-gray-50 rounded-xl p-4 sm:p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<GraduationCap className="h-5 w-5 text-blue-600" />
									Class Teacher Information
								</h3>
								<div className="bg-white rounded-lg p-4 border border-gray-200">
									<div className="flex flex-col sm:flex-row sm:items-center gap-4">
										<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
											<span className="text-blue-600 font-bold text-xl">
												{classData.classTeacher
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</span>
										</div>
										<div className="flex-1 min-w-0">
											<h4 className="text-lg font-semibold text-gray-900 truncate">
												{classData.classTeacher}
											</h4>
											<p className="text-gray-600">Class Teacher</p>
											<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
												<div className="flex items-center gap-2 text-gray-600">
													<Mail className="h-4 w-4 flex-shrink-0" />
													<span className="text-sm truncate">
														teacher@school.com
													</span>
												</div>
												<div className="flex items-center gap-2 text-gray-600">
													<Phone className="h-4 w-4 flex-shrink-0" />
													<span className="text-sm truncate">+1-555-0000</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Teachers Table */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Subject Teachers
								</h3>
								<div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
									<div className="overflow-x-auto">
										<table className="w-full min-w-[600px] divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Teacher Name
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Subject Taught
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Contact
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{classData.teachers.map((teacher, index) => (
													<tr
														key={index}
														className={`${
															index % 2 === 0 ? "bg-white" : "bg-gray-50"
														} hover:bg-gray-100 transition-colors`}
													>
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="flex items-center">
																<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
																	<span className="text-blue-600 font-semibold text-sm">
																		{teacher.name
																			.split(" ")
																			.map((n) => n[0])
																			.join("")}
																	</span>
																</div>
																<span className="font-medium text-gray-900">
																	{teacher.name}
																</span>
															</div>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-gray-700">
															{teacher.subject}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="flex items-center gap-3">
																<a
																	href={`mailto:${teacher.email}`}
																	className="text-blue-600 hover:text-blue-800"
																>
																	<Mail className="h-4 w-4" />
																</a>
																<a
																	href={`tel:${teacher.phone}`}
																	className="text-green-600 hover:text-green-800"
																>
																	<Phone className="h-4 w-4" />
																</a>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Student Information Tab */}
					{activeTab === "students" && (
						<div className="space-y-6">
							{/* Search and Actions */}
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="flex-1 relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
									<input
										type="text"
										placeholder="Search students by name, roll number, or parent name..."
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
										<option value="rollNo">Sort by Roll No</option>
										<option value="name">Sort by Name</option>
										<option value="gender">Sort by Gender</option>
									</select>
								</div>
								<button
									onClick={handleAddStudent}
									className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
								>
									<Plus className="h-5 w-5" />
									Add Student
								</button>
							</div>

							{/* Students Table */}
							<div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
								<div className="overflow-x-auto">
									<table className="w-full min-w-[800px] divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Roll No
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Student Name
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Gender
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Parent Name
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Contact
												</th>
												<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{filteredAndSortedStudents.map((student, index) => (
												<tr
													key={student.id}
													className={`${
														index % 2 === 0 ? "bg-white" : "bg-gray-50"
													} hover:bg-gray-100 transition-colors`}
												>
													<td className="px-6 py-4 whitespace-nowrap">
														<span className="font-medium text-gray-900">
															{student.rollNo}
														</span>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<span className="text-gray-900">
															{student.name}
														</span>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<span
															className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
																student.gender === "Male"
																	? "bg-blue-100 text-blue-800"
																	: "bg-pink-100 text-pink-800"
															}`}
														>
															{student.gender}
														</span>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-gray-700">
														{student.parentName}
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex items-center gap-2">
															<span className="text-gray-700">
																{student.parentMobile}
															</span>
															<a
																href={`tel:${student.parentMobile}`}
																className="text-green-600 hover:text-green-800"
															>
																<Phone className="h-4 w-4" />
															</a>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-center">
														<div className="flex items-center justify-center gap-2">
															<button
																onClick={() => handleEditStudent(student)}
																className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
																title="Edit Student"
															>
																<Edit className="h-4 w-4" />
															</button>
															<button
																onClick={() => handleDeleteStudent(student.id)}
																className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
																title="Delete Student"
															>
																<Trash2 className="h-4 w-4" />
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							{/* No Results */}
							{filteredAndSortedStudents.length === 0 && (
								<div className="text-center py-12">
									<Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-medium text-gray-900 mb-2">
										No students found
									</h3>
									<p className="text-gray-600 mb-4">
										{searchTerm
											? `No students match "${searchTerm}"`
											: "No students in this class yet"}
									</p>
									{!searchTerm && (
										<button
											onClick={handleAddStudent}
											className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
										>
											Add First Student
										</button>
									)}
								</div>
							)}
						</div>
					)}

					{/* Subjects Tab */}
					{activeTab === "subjects" && (
						<div className="space-y-6">
							{/* Header with Add Subject button */}
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="flex-1">
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										Class Subjects
									</h3>
								</div>
								<button
									onClick={handleAddSubject}
									className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105"
								>
									<Plus className="h-5 w-5" />
									Add Subject
								</button>
							</div>

							{/* Subjects Table */}
							<div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
								<div className="overflow-x-auto">
									<table className="w-full min-w-[600px] divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Subject Code
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Subject Name
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Teacher
												</th>
												<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{classData.subjects?.map((subject, index) => (
												<tr
													key={subject.id}
													className={`${
														index % 2 === 0 ? "bg-white" : "bg-gray-50"
													} hover:bg-gray-100 transition-colors`}
												>
													<td className="px-6 py-4 whitespace-nowrap">
														<span className="font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded text-sm">
															{subject.code}
														</span>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<span className="text-gray-900 font-medium">
															{subject.name}
														</span>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-gray-700">
														{subject.teacher}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-center">
														<div className="flex items-center justify-center gap-2">
															<button
																onClick={() => handleEditSubject(subject)}
																className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
																title="Edit Subject"
															>
																<Edit className="h-4 w-4" />
															</button>
															<button
																onClick={() => handleDeleteSubject(subject.id)}
																className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
																title="Delete Subject"
															>
																<Trash2 className="h-4 w-4" />
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							{/* No Subjects */}
							{(!classData.subjects || classData.subjects.length === 0) && (
								<div className="text-center py-12">
									<BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-medium text-gray-900 mb-2">
										No subjects found
									</h3>
									<p className="text-gray-600 mb-4">
										No subjects have been added to this class yet.
									</p>
									<button
										onClick={handleAddSubject}
										className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									>
										Add First Subject
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Add/Edit Student Modal */}
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

			{/* Add/Edit Subject Modal */}
			{showAddSubject && (
				<SubjectFormModal
					subject={editingSubject}
					onSave={handleSaveSubject}
					onClose={() => {
						setShowAddSubject(false);
						setEditingSubject(null);
					}}
				/>
			)}
		</div>
	);
}

// Subject Form Modal Component
function SubjectFormModal({ subject, onSave, onClose }) {
	const [formData, setFormData] = useState({
		code: subject?.code || "",
		name: subject?.name || "",
		teacher: subject?.teacher || "",
		isCompulsory: subject?.isCompulsory ?? true,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	const handleChange = (e) => {
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setFormData((prev) => ({
			...prev,
			[e.target.name]: value,
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">
						{subject ? "Edit Subject" : "Add New Subject"}
					</h3>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Subject Code
						</label>
						<input
							type="text"
							name="code"
							value={formData.code}
							onChange={handleChange}
							required
							placeholder="e.g., KAN, ENG, MATH"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Subject Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							placeholder="e.g., Kannada, English, Mathematics"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Teacher
						</label>
						<input
							type="text"
							name="teacher"
							value={formData.teacher}
							onChange={handleChange}
							required
							placeholder="Teacher name"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div className="flex items-center">
						<input
							type="checkbox"
							name="isCompulsory"
							id="isCompulsory"
							checked={formData.isCompulsory}
							onChange={handleChange}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
						<label
							htmlFor="isCompulsory"
							className="ml-2 block text-sm text-gray-900"
						>
							Compulsory Subject
						</label>
					</div>

					<div className="flex gap-3 pt-4">
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
							{subject ? "Update Subject" : "Add Subject"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// Student Form Modal Component
function StudentFormModal({ student, onSave, onClose }) {
	const [formData, setFormData] = useState({
		rollNo: student?.rollNo || "",
		name: student?.name || "",
		gender: student?.gender || "Male",
		parentName: student?.parentName || "",
		parentMobile: student?.parentMobile || "",
		parentEmail: student?.parentEmail || "",
		address: student?.address || "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">
						{student ? "Edit Student" : "Add New Student"}
					</h3>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Roll Number
						</label>
						<input
							type="text"
							name="rollNo"
							value={formData.rollNo}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Student Name
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
							Gender
						</label>
						<select
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Parent Name
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
							Parent Mobile
						</label>
						<input
							type="tel"
							name="parentMobile"
							value={formData.parentMobile}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Parent Email
						</label>
						<input
							type="email"
							name="parentEmail"
							value={formData.parentEmail}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Address
						</label>
						<textarea
							name="address"
							value={formData.address}
							onChange={handleChange}
							rows={3}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div className="flex gap-3 pt-4">
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
