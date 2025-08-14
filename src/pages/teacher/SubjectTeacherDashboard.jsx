import React, { useState, useEffect } from "react";
import {
	GraduationCap,
	Users,
	FileText,
	Calendar,
	Plus,
	Edit3,
	Phone,
	User,
	Hash,
	BookOpen,
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

const SubjectTeacherDashboard = () => {
	const { teacher, isClassTeacher } = useTeacherAuth();
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedTest, setSelectedTest] = useState("");
	const [students, setStudents] = useState([]);
	const [tests, setTests] = useState([]);
	const [showMarksForm, setShowMarksForm] = useState(false);
	const [newTestName, setNewTestName] = useState("");
	const [newTestType, setNewTestType] = useState("");
	const [newTestDate, setNewTestDate] = useState("");
	const [marksData, setMarksData] = useState({});

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
				parentName: "Mr. Johnson",
				parentMobile: "+91 98765 43210",
			},
			{
				id: "S002",
				name: "Bob Smith",
				rollNo: "002",
				parentName: "Mrs. Smith",
				parentMobile: "+91 98765 43211",
			},
			{
				id: "S003",
				name: "Carol Davis",
				rollNo: "003",
				parentName: "Mr. Davis",
				parentMobile: "+91 98765 43212",
			},
			{
				id: "S004",
				name: "David Wilson",
				rollNo: "004",
				parentName: "Mrs. Wilson",
				parentMobile: "+91 98765 43213",
			},
			{
				id: "S005",
				name: "Eva Brown",
				rollNo: "005",
				parentName: "Mr. Brown",
				parentMobile: "+91 98765 43214",
			},
		],
		"8B": [
			{
				id: "S006",
				name: "Frank Miller",
				rollNo: "001",
				parentName: "Mrs. Miller",
				parentMobile: "+91 98765 43215",
			},
			{
				id: "S007",
				name: "Grace Lee",
				rollNo: "002",
				parentName: "Mr. Lee",
				parentMobile: "+91 98765 43216",
			},
			{
				id: "S008",
				name: "Henry Taylor",
				rollNo: "003",
				parentName: "Mrs. Taylor",
				parentMobile: "+91 98765 43217",
			},
		],
		"9A": [
			{
				id: "S009",
				name: "Ivy Chen",
				rollNo: "001",
				parentName: "Mr. Chen",
				parentMobile: "+91 98765 43218",
			},
			{
				id: "S010",
				name: "Jack Anderson",
				rollNo: "002",
				parentName: "Mrs. Anderson",
				parentMobile: "+91 98765 43219",
			},
			{
				id: "S011",
				name: "Kate Martinez",
				rollNo: "003",
				parentName: "Mr. Martinez",
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
	};

	const handleClassSelect = (classId) => {
		setSelectedClass(classId);
		loadClassData(classId);
	};

	const handleSubjectSelect = (subject) => {
		setSelectedSubject(subject);
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
			subject: selectedSubject || "Custom",
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

	if (!teacher) {
		return null;
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Subject Teacher Dashboard
					</h2>
					<p className="mt-1 text-sm text-gray-500">
						Welcome back, {teacher.name} - Subject Teacher
					</p>
				</div>
			</div>

			{/* Class and Subject Selection */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BookOpen className="h-5 w-5" />
						Select Class & Subject
					</CardTitle>
					<CardDescription>
						Choose a class and subject to manage marks and view student
						information
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<Select value={selectedClass} onValueChange={handleClassSelect}>
							<SelectTrigger>
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

						<Select value={selectedSubject} onValueChange={handleSubjectSelect}>
							<SelectTrigger>
								<SelectValue placeholder="Select a subject" />
							</SelectTrigger>
							<SelectContent>
								{selectedClass &&
									teacher.classes
										.find((cls) => cls.id === selectedClass)
										?.subjects.map((subject) => (
											<SelectItem key={subject} value={subject}>
												{subject}
											</SelectItem>
										))}
							</SelectContent>
						</Select>
					</div>

					{selectedClass && selectedSubject && (
						<div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
							<Users className="h-4 w-4" />
							<span>{students.length} students</span>
							<span className="mx-2">•</span>
							<BookOpen className="h-4 w-4" />
							<span>{selectedSubject}</span>
						</div>
					)}
				</CardContent>
			</Card>

			{selectedClass && selectedSubject && (
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="marks">Marks Management</TabsTrigger>
						<TabsTrigger value="students">Student Information</TabsTrigger>
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
										Total Tests
									</CardTitle>
									<FileText className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{tests.length}</div>
									<p className="text-xs text-muted-foreground">
										For {selectedSubject}
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Subject</CardTitle>
									<BookOpen className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{selectedSubject}</div>
									<p className="text-xs text-muted-foreground">
										Currently teaching
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
								<CardDescription>
									Common tasks for subject management
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<Button
										onClick={() => setShowMarksForm(true)}
										className="h-20 flex flex-col items-center justify-center gap-2"
									>
										<Edit3 className="h-6 w-6" />
										<span>Enter Marks</span>
									</Button>
									<Button
										variant="outline"
										className="h-20 flex flex-col items-center justify-center gap-2"
										onClick={() => {
											// Navigate to students tab
											document.querySelector('[data-value="students"]').click();
										}}
									>
										<Users className="h-6 w-6" />
										<span>View Students</span>
									</Button>
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
									Create tests and manage student marks for {selectedSubject}
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
													<div className="mt-3">
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
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Student Information Tab */}
					<TabsContent value="students" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5" />
									Student Information - {selectedClass}
								</CardTitle>
								<CardDescription>
									View student details and parent contact information
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="border rounded-lg overflow-hidden bg-white">
									<Table>
										<TableHeader>
											<TableRow className="bg-gray-50 hover:bg-gray-50">
												<TableHead className="bg-gray-50 text-gray-900 font-semibold flex items-center gap-1">
													<Hash className="h-4 w-4" />
													Roll No
												</TableHead>
												<TableHead className="bg-gray-50 text-gray-900 font-semibold flex items-center gap-1">
													<User className="h-4 w-4" />
													Student Name
												</TableHead>
												<TableHead className="bg-gray-50 text-gray-900 font-semibold">
													Parent Name
												</TableHead>
												<TableHead className="bg-gray-50 text-gray-900 font-semibold flex items-center gap-1">
													<Phone className="h-4 w-4" />
													Parent Mobile
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
														{student.parentName}
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															<span className="text-gray-700">
																{student.parentMobile}
															</span>
															<Button
																variant="outline"
																size="sm"
																onClick={() =>
																	window.open(`tel:${student.parentMobile}`)
																}
															>
																<Phone className="h-3 w-3" />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
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
											Parent Name
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
												{student.parentName}
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
		</div>
	);
};

export default SubjectTeacherDashboard;
