import React, { useState, useEffect } from "react";
import {
	GraduationCap,
	Users,
	FileText,
	Calendar,
	CheckCircle,
	XCircle,
	Plus,
	Edit3,
	BarChart3,
	TrendingUp,
	Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useTeacherAuth } from "@/contexts/TeacherAuthContext";

const ClassTeacherDashboard = () => {
	const { teacher, isClassTeacher } = useTeacherAuth();
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedTest, setSelectedTest] = useState("");
	const [students, setStudents] = useState([]);
	const [tests, setTests] = useState([]);
	const [showMarksForm, setShowMarksForm] = useState(false);
	const [showAttendanceForm, setShowAttendanceForm] = useState(false);
	const [newTestName, setNewTestName] = useState("");
	const [newTestType, setNewTestType] = useState("");
	const [newTestDate, setNewTestDate] = useState("");
	const [marksData, setMarksData] = useState({});
	const [attendanceData, setAttendanceData] = useState({});
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);

	// Standard test types
	const standardTests = [
		{ id: "FA1", name: "FA1 (Formative Assessment 1)", type: "Formative" },
		{ id: "FA2", name: "FA2 (Formative Assessment 2)", type: "Formative" },
		{ id: "MID", name: "Mid Term Exam", type: "Summative" },
		{ id: "FA3", name: "FA3 (Formative Assessment 3)", type: "Formative" },
		{ id: "FA4", name: "FA4 (Formative Assessment 4)", type: "Formative" },
		{ id: "FINAL", name: "Final Exam", type: "Summative" },
	];

	// Mock students data
	const mockStudents = {
		"7A": [
			{
				id: "S001",
				name: "Alice Johnson",
				rollNo: "001",
				present: true,
				parentMobile: "+91 98765 43210",
			},
			{
				id: "S002",
				name: "Bob Smith",
				rollNo: "002",
				present: true,
				parentMobile: "+91 98765 43211",
			},
			{
				id: "S003",
				name: "Carol Davis",
				rollNo: "003",
				present: true,
				parentMobile: "+91 98765 43212",
			},
			{
				id: "S004",
				name: "David Wilson",
				rollNo: "004",
				present: true,
				parentMobile: "+91 98765 43213",
			},
			{
				id: "S005",
				name: "Eva Brown",
				rollNo: "005",
				present: true,
				parentMobile: "+91 98765 43214",
			},
		],
		"8B": [
			{
				id: "S006",
				name: "Frank Miller",
				rollNo: "001",
				present: true,
				parentMobile: "+91 98765 43215",
			},
			{
				id: "S007",
				name: "Grace Lee",
				rollNo: "002",
				present: true,
				parentMobile: "+91 98765 43216",
			},
			{
				id: "S008",
				name: "Henry Taylor",
				rollNo: "003",
				present: true,
				parentMobile: "+91 98765 43217",
			},
		],
		"9A": [
			{
				id: "S009",
				name: "Ivy Chen",
				rollNo: "001",
				present: true,
				parentMobile: "+91 98765 43218",
			},
			{
				id: "S010",
				name: "Jack Anderson",
				rollNo: "002",
				present: true,
				parentMobile: "+91 98765 43219",
			},
			{
				id: "S011",
				name: "Kate Martinez",
				rollNo: "003",
				present: true,
				parentMobile: "+91 98765 43220",
			},
		],
	};

	// Mock tests data
	const mockTests = {
		"7A": [
			{
				id: "T001",
				name: "FA1 - Mathematics",
				type: "FA1",
				subject: "Mathematics",
				date: "2024-01-15",
				maxMarks: 20,
			},
			{
				id: "T002",
				name: "FA1 - Science",
				type: "FA1",
				subject: "Science",
				date: "2024-01-20",
				maxMarks: 20,
			},
			{
				id: "T003",
				name: "Custom Test - Algebra",
				type: "Custom",
				subject: "Mathematics",
				date: "2024-01-25",
				maxMarks: 25,
			},
		],
		"8B": [
			{
				id: "T004",
				name: "FA1 - Mathematics",
				type: "FA1",
				subject: "Mathematics",
				date: "2024-01-15",
				maxMarks: 20,
			},
		],
		"9A": [
			{
				id: "T005",
				name: "FA1 - Physics",
				type: "FA1",
				subject: "Physics",
				date: "2024-01-15",
				maxMarks: 20,
			},
		],
	};

	// Mock analytics data
	const mockAnalytics = {
		"7A": {
			attendanceRate: 95,
			averageMarks: 78,
			topPerformers: 3,
			improvementAreas: ["Science", "English"],
		},
		"8B": {
			attendanceRate: 92,
			averageMarks: 82,
			topPerformers: 2,
			improvementAreas: ["Mathematics"],
		},
		"9A": {
			attendanceRate: 88,
			averageMarks: 75,
			topPerformers: 1,
			improvementAreas: ["Physics", "Chemistry"],
		},
	};

	useEffect(() => {
		// Load demo data for the current teacher
		if (teacher && teacher.classes.length > 0) {
			// Set default class if available
			setSelectedClass(teacher.classes[0].id);
			loadClassData(teacher.classes[0].id);
		}
	}, [teacher]);

	const loadClassData = (classId) => {
		setStudents(mockStudents[classId] || []);
		setTests(mockTests[classId] || []);

		// Initialize marks data
		const initialMarks = {};
		mockStudents[classId]?.forEach((student) => {
			initialMarks[student.id] = {};
			mockTests[classId]?.forEach((test) => {
				initialMarks[student.id][test.id] = "";
			});
		});
		setMarksData(initialMarks);

		// Initialize attendance data
		const initialAttendance = {};
		mockStudents[classId]?.forEach((student) => {
			initialAttendance[student.id] = true; // Default present
		});
		setAttendanceData(initialAttendance);
	};

	const handleClassSelect = (classId) => {
		setSelectedClass(classId);
		loadClassData(classId);
	};

	const handleTestSelect = (testId) => {
		setSelectedTest(testId);
		setShowMarksForm(true);
	};

	const handleCreateTest = () => {
		if (!newTestName || !newTestType || !newTestDate) return;

		const newTest = {
			id: `T${Date.now()}`,
			name: newTestName,
			type: newTestType,
			subject: "Custom", // This would come from the selected subject
			date: newTestDate,
			maxMarks: 25,
		};

		setTests([...tests, newTest]);
		setNewTestName("");
		setNewTestType("");
		setNewTestDate("");

		// Initialize marks for new test
		const updatedMarks = { ...marksData };
		students.forEach((student) => {
			if (!updatedMarks[student.id]) updatedMarks[student.id] = {};
			updatedMarks[student.id][newTest.id] = "";
		});
		setMarksData(updatedMarks);
	};

	const handleMarksSubmit = () => {
		// Here you would submit marks to backend
		console.log("Marks submitted:", marksData);
		setShowMarksForm(false);
	};

	const handleAttendanceSubmit = () => {
		// Here you would submit attendance to backend
		console.log("Attendance submitted:", attendanceData);
		setShowAttendanceForm(false);
	};

	const toggleAttendance = (studentId) => {
		setAttendanceData((prev) => ({
			...prev,
			[studentId]: !prev[studentId],
		}));
	};

	const setAllPresent = () => {
		const allPresent = {};
		students.forEach((student) => {
			allPresent[student.id] = true;
		});
		setAttendanceData(allPresent);
	};

	const setAllAbsent = () => {
		const allAbsent = {};
		students.forEach((student) => {
			allAbsent[student.id] = false;
		});
		setAttendanceData(allAbsent);
	};

	// Calculate attendance statistics
	const presentCount = Object.values(attendanceData).filter(Boolean).length;
	const absentCount = students.length - presentCount;

	if (!teacher || !isClassTeacher) {
		return (
			<div className="text-center py-8">
				<GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
				<h3 className="mt-2 text-sm font-medium text-gray-900">
					Class Teacher Access Required
				</h3>
				<p className="mt-1 text-sm text-gray-500">
					This dashboard is only available for class teachers.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Class Teacher Dashboard
					</h2>
					<p className="mt-1 text-sm text-gray-500">
						Welcome back, {teacher.name} - Class Teacher
					</p>
				</div>
			</div>

			{/* Class Selection */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<GraduationCap className="h-5 w-5" />
						Select Class
					</CardTitle>
					<CardDescription>
						Choose a class to manage attendance, marks, and view analytics
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col sm:flex-row gap-4">
						<Select value={selectedClass} onValueChange={handleClassSelect}>
							<SelectTrigger className="w-full sm:w-64">
								<SelectValue placeholder="Select a class" />
							</SelectTrigger>
							<SelectContent>
								{teacher.classes.map((cls) => (
									<SelectItem key={cls.id} value={cls.id}>
										<div className="flex items-center gap-2">
											<span>{cls.name}</span>
											{cls.isClassTeacher && (
												<Badge variant="secondary" className="text-xs">
													Class Teacher
												</Badge>
											)}
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{selectedClass && (
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Users className="h-4 w-4" />
								<span>{students.length} students</span>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{selectedClass && (
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="attendance">Attendance</TabsTrigger>
						<TabsTrigger value="marks">Marks Management</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
					</TabsList>

					{/* Overview Tab */}
					<TabsContent value="overview" className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Students
									</CardTitle>
									<Users className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{students.length}</div>
									<p className="text-xs text-muted-foreground">
										Enrolled in {selectedClass}
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Attendance Rate
									</CardTitle>
									<CheckCircle className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{students.length > 0
											? Math.round((presentCount / students.length) * 100)
											: 0}
										%
									</div>
									<p className="text-xs text-muted-foreground">
										{presentCount} present, {absentCount} absent
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Tests
									</CardTitle>
									<FileText className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{tests.length}</div>
									<p className="text-xs text-muted-foreground">
										Created assessments
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
								<CardDescription>
									Common tasks for class management
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									<Button
										onClick={() => setShowAttendanceForm(true)}
										className="h-20 flex flex-col items-center justify-center gap-2"
									>
										<CheckCircle className="h-6 w-6" />
										<span>Mark Attendance</span>
									</Button>
									<Button
										onClick={() => setShowMarksForm(true)}
										variant="outline"
										className="h-20 flex flex-col items-center justify-center gap-2"
									>
										<FileText className="h-6 w-6" />
										<span>Enter Marks</span>
									</Button>
									<Button
										onClick={() => {
											// Navigate to analytics tab
											document
												.querySelector('[data-value="analytics"]')
												.click();
										}}
										variant="outline"
										className="h-20 flex flex-col items-center justify-center gap-2"
									>
										<BarChart3 className="h-6 w-6" />
										<span>View Analytics</span>
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Attendance Tab */}
					<TabsContent value="attendance" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Calendar className="h-5 w-5" />
									Attendance Management
								</CardTitle>
								<CardDescription>
									Manage daily attendance for {selectedClass}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center gap-4">
										<Input
											type="date"
											value={selectedDate}
											onChange={(e) => setSelectedDate(e.target.value)}
											className="w-48"
										/>
										<Button onClick={setAllPresent} variant="outline">
											Set All Present
										</Button>
										<Button onClick={setAllAbsent} variant="outline">
											Set All Absent
										</Button>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
										{students.map((student) => (
											<div
												key={student.id}
												className={`p-4 border rounded-lg cursor-pointer transition-colors ${
													attendanceData[student.id]
														? "border-green-200 bg-green-50"
														: "border-red-200 bg-red-50"
												}`}
												onClick={() => toggleAttendance(student.id)}
											>
												<div className="flex items-center justify-between">
													<div>
														<p className="font-medium text-gray-900">
															{student.name}
														</p>
														<p className="text-sm text-gray-500">
															Roll No: {student.rollNo}
														</p>
														<p className="text-xs text-gray-400">
															{student.parentMobile}
														</p>
													</div>
													{attendanceData[student.id] ? (
														<CheckCircle className="h-6 w-6 text-green-600" />
													) : (
														<XCircle className="h-6 w-6 text-red-600" />
													)}
												</div>
											</div>
										))}
									</div>

									<div className="flex justify-end">
										<Button onClick={handleAttendanceSubmit}>
											Update Attendance
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Marks Management Tab */}
					<TabsContent value="marks" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FileText className="h-5 w-5" />
									Marks Management
								</CardTitle>
								<CardDescription>
									Create tests and manage student marks
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{/* Create New Test */}
									<div className="border rounded-lg p-4 bg-gray-50">
										<h4 className="font-medium mb-3">Create New Test</h4>
										<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
											<Input
												placeholder="Test Name"
												value={newTestName}
												onChange={(e) => setNewTestName(e.target.value)}
											/>
											<Select
												value={newTestType}
												onValueChange={setNewTestType}
											>
												<SelectTrigger>
													<SelectValue placeholder="Test Type" />
												</SelectTrigger>
												<SelectContent>
													{standardTests.map((test) => (
														<SelectItem key={test.id} value={test.id}>
															{test.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<Input
												type="date"
												value={newTestDate}
												onChange={(e) => setNewTestDate(e.target.value)}
											/>
										</div>
										<Button
											onClick={handleCreateTest}
											className="mt-3"
											disabled={!newTestName || !newTestType || !newTestDate}
										>
											<Plus className="h-4 w-4 mr-2" />
											Create Test
										</Button>
									</div>

									{/* Existing Tests */}
									<div>
										<h4 className="font-medium mb-3">Existing Tests</h4>
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
											{tests.map((test) => (
												<div
													key={test.id}
													className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
													onClick={() => handleTestSelect(test.id)}
												>
													<div className="flex items-center justify-between mb-2">
														<h5 className="font-medium">{test.name}</h5>
														<Badge
															variant={
																test.type === "Custom" ? "secondary" : "default"
															}
														>
															{test.type}
														</Badge>
													</div>
													<p className="text-sm text-gray-600 mb-2">
														{test.subject} • {test.date}
													</p>
													<p className="text-xs text-gray-500">
														Max Marks: {test.maxMarks}
													</p>
													<div className="mt-3 flex items-center gap-2">
														<Button
															size="sm"
															onClick={(e) => {
																e.stopPropagation();
																handleTestSelect(test.id);
															}}
														>
															<Edit3 className="h-4 w-4 mr-1" />
															Enter Marks
														</Button>
														<Button
															size="sm"
															variant="outline"
															onClick={(e) => {
																e.stopPropagation();
																// View marks functionality
															}}
														>
															<Edit3 className="h-4 w-4 mr-1" />
															View Marks
														</Button>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Analytics Tab */}
					<TabsContent value="analytics" className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Attendance Rate
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{mockAnalytics[selectedClass]?.attendanceRate || 0}%
									</div>
									<p className="text-xs text-muted-foreground">This month</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Average Marks
									</CardTitle>
									<Award className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{mockAnalytics[selectedClass]?.averageMarks || 0}%
									</div>
									<p className="text-xs text-muted-foreground">All subjects</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Top Performers
									</CardTitle>
									<Award className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{mockAnalytics[selectedClass]?.topPerformers || 0}
									</div>
									<p className="text-xs text-muted-foreground">
										Students with 90%+
									</p>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Performance Insights</CardTitle>
								<CardDescription>
									Areas that need attention for {selectedClass}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{mockAnalytics[selectedClass]?.improvementAreas?.map(
										(area, index) => (
											<div
												key={index}
												className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
											>
												<BarChart3 className="h-5 w-5 text-yellow-600" />
												<span className="font-medium text-yellow-800">
													{area}
												</span>
												<span className="text-sm text-yellow-700">
													- Below average performance
												</span>
											</div>
										)
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			)}

			{/* Marks Entry Dialog */}
			<Dialog open={showMarksForm} onOpenChange={setShowMarksForm}>
				<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Enter Marks</DialogTitle>
						<DialogDescription>
							Enter marks for{" "}
							{selectedTest && tests.find((t) => t.id === selectedTest)?.name}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div className="border rounded-lg overflow-hidden bg-white">
							<Table>
								<TableHeader>
									<TableRow className="bg-gray-50 hover:bg-gray-50">
										<TableHead className="bg-gray-50 text-gray-900 font-semibold">
											Roll No
										</TableHead>
										<TableHead className="bg-gray-50 text-gray-900 font-semibold">
											Student Name
										</TableHead>
										<TableHead className="bg-gray-50 text-gray-900 font-semibold">
											Parent Mobile
										</TableHead>
										<TableHead className="bg-gray-50 text-gray-900 font-semibold">
											Marks
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{students.map((student, index) => (
										<TableRow
											key={student.id}
											className={`${
												index % 2 === 0 ? "bg-white" : "bg-gray-50"
											} hover:bg-gray-100 transition-colors`}
										>
											<TableCell className="font-medium text-gray-900">
												{student.rollNo}
											</TableCell>
											<TableCell className="text-gray-900">
												{student.name}
											</TableCell>
											<TableCell className="text-gray-700">
												{student.parentMobile}
											</TableCell>
											<TableCell>
												<Input
													type="number"
													min="0"
													max={
														tests.find((t) => t.id === selectedTest)
															?.maxMarks || 100
													}
													value={marksData[student.id]?.[selectedTest] || ""}
													onChange={(e) => {
														const newMarks = { ...marksData };
														if (!newMarks[student.id])
															newMarks[student.id] = {};
														newMarks[student.id][selectedTest] = e.target.value;
														setMarksData(newMarks);
													}}
													placeholder="Enter marks"
													className="w-24"
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
						<div className="flex justify-end gap-2">
							<Button variant="outline" onClick={() => setShowMarksForm(false)}>
								Cancel
							</Button>
							<Button onClick={handleMarksSubmit}>Submit Marks</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Attendance Update Dialog */}
			<Dialog open={showAttendanceForm} onOpenChange={setShowAttendanceForm}>
				<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Update Attendance</DialogTitle>
						<DialogDescription>
							Review and update attendance for {selectedClass} on {selectedDate}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
							{students.map((student) => (
								<div
									key={student.id}
									className={`p-4 border rounded-lg cursor-pointer transition-colors ${
										attendanceData[student.id]
											? "border-green-200 bg-green-50"
											: "border-red-200 bg-red-50"
									}`}
									onClick={() => toggleAttendance(student.id)}
								>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-gray-900">
												{student.name}
											</p>
											<p className="text-sm text-gray-500">
												Roll No: {student.rollNo}
											</p>
											<p className="text-xs text-gray-400">
												{student.parentMobile}
											</p>
										</div>
										{attendanceData[student.id] ? (
											<CheckCircle className="h-6 w-6 text-green-600" />
										) : (
											<XCircle className="h-6 w-6 text-red-600" />
										)}
									</div>
								</div>
							))}
						</div>
						<div className="flex justify-end gap-2">
							<Button
								variant="outline"
								onClick={() => setShowAttendanceForm(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleAttendanceSubmit}>
								Update Attendance
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ClassTeacherDashboard;
