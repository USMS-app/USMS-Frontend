import React, { useState, useEffect } from "react";
import {
	CheckCircle,
	XCircle,
	Users,
	Calendar,
	Filter,
	Download,
	Upload,
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

const Attendance = () => {
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [students, setStudents] = useState([]);
	const [attendanceData, setAttendanceData] = useState({});
	const [isClassTeacher, setIsClassTeacher] = useState(false);
	const [showBulkUpdate, setShowBulkUpdate] = useState(false);
	const [filterStatus, setFilterStatus] = useState("all");

	// Mock data for teacher's assigned classes
	const teacherData = {
		T1001: {
			name: "John Doe",
			teacherId: "T1001",
			classes: [
				{
					id: "7A",
					name: "Class 7A",
					subjects: ["Mathematics", "Science"],
					isClassTeacher: true,
				},
				{
					id: "8B",
					name: "Class 8B",
					subjects: ["Mathematics"],
					isClassTeacher: false,
				},
				{
					id: "9A",
					name: "Class 9A",
					subjects: ["Physics"],
					isClassTeacher: false,
				},
			],
		},
	};

	// Mock students data
	const mockStudents = {
		"7A": [
			{ id: "S001", name: "Alice Johnson", rollNo: "001", present: true },
			{ id: "S002", name: "Bob Smith", rollNo: "002", present: true },
			{ id: "S003", name: "Carol Davis", rollNo: "003", present: true },
			{ id: "S004", name: "David Wilson", rollNo: "004", present: true },
			{ id: "S005", name: "Eva Brown", rollNo: "005", present: true },
		],
		"8B": [
			{ id: "S006", name: "Frank Miller", rollNo: "001", present: true },
			{ id: "S007", name: "Grace Lee", rollNo: "002", present: true },
			{ id: "S008", name: "Henry Taylor", rollNo: "003", present: true },
		],
		"9A": [
			{ id: "S009", name: "Ivy Chen", rollNo: "001", present: true },
			{ id: "S010", name: "Jack Anderson", rollNo: "002", present: true },
			{ id: "S011", name: "Kate Martinez", rollNo: "003", present: true },
		],
	};

	useEffect(() => {
		// Load demo data for T1001 teacher
		loadTeacherData("T1001");
	}, []);

	const loadTeacherData = (teacherId) => {
		const teacher = teacherData[teacherId];
		if (teacher) {
			// Set default class if available
			if (teacher.classes.length > 0) {
				setSelectedClass(teacher.classes[0].id);
				const isClassTeacherForFirstClass = teacher.classes[0].isClassTeacher;
				setIsClassTeacher(isClassTeacherForFirstClass);
				loadClassData(teacher.classes[0].id);
			}
		}
	};

	const loadClassData = (classId) => {
		setStudents(mockStudents[classId] || []);

		// Initialize attendance data
		const initialAttendance = {};
		mockStudents[classId]?.forEach((student) => {
			initialAttendance[student.id] = true; // Default present
		});
		setAttendanceData(initialAttendance);
	};

	const handleClassSelect = (classId) => {
		setSelectedClass(classId);
		const teacher = teacherData["T1001"]; // Current teacher
		const selectedClassData = teacher.classes.find((cls) => cls.id === classId);
		setIsClassTeacher(selectedClassData?.isClassTeacher || false);
		loadClassData(classId);
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

	const handleAttendanceSubmit = () => {
		// Here you would submit attendance to backend
		console.log("Attendance submitted:", {
			classId: selectedClass,
			date: selectedDate,
			attendance: attendanceData,
		});
		setShowBulkUpdate(false);
	};

	const getCurrentTeacher = () => teacherData["T1001"];

	const filteredStudents = students.filter((student) => {
		if (filterStatus === "all") return true;
		if (filterStatus === "present") return attendanceData[student.id];
		if (filterStatus === "absent") return !attendanceData[student.id];
		return true;
	});

	const presentCount = Object.values(attendanceData).filter(Boolean).length;
	const absentCount = students.length - presentCount;

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Attendance Management
					</h2>
					<p className="mt-1 text-sm text-gray-500">
						Manage daily attendance for your classes
					</p>
				</div>
			</div>

			{/* Class and Date Selection */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">Select Class</CardTitle>
					</CardHeader>
					<CardContent>
						<Select value={selectedClass} onValueChange={handleClassSelect}>
							<SelectTrigger>
								<SelectValue placeholder="Select a class" />
							</SelectTrigger>
							<SelectContent>
								{getCurrentTeacher()?.classes.map((cls) => (
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
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">Date</CardTitle>
					</CardHeader>
					<CardContent>
						<Input
							type="date"
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">Status</CardTitle>
					</CardHeader>
					<CardContent>
						<Select value={filterStatus} onValueChange={setFilterStatus}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Students</SelectItem>
								<SelectItem value="present">Present Only</SelectItem>
								<SelectItem value="absent">Absent Only</SelectItem>
							</SelectContent>
						</Select>
					</CardContent>
				</Card>
			</div>

			{/* Attendance Summary */}
			{selectedClass && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-5 w-5" />
							Attendance Summary - {selectedClass}
						</CardTitle>
						<CardDescription>
							{selectedDate} • {students.length} total students
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="text-center p-4 bg-green-50 rounded-lg">
								<div className="text-2xl font-bold text-green-600">
									{presentCount}
								</div>
								<div className="text-sm text-green-600">Present</div>
							</div>
							<div className="text-center p-4 bg-red-50 rounded-lg">
								<div className="text-2xl font-bold text-red-600">
									{absentCount}
								</div>
								<div className="text-sm text-red-600">Absent</div>
							</div>
							<div className="text-center p-4 bg-blue-50 rounded-lg">
								<div className="text-2xl font-bold text-blue-600">
									{students.length > 0
										? Math.round((presentCount / students.length) * 100)
										: 0}
									%
								</div>
								<div className="text-sm text-blue-600">Attendance Rate</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Attendance Management */}
			{selectedClass && isClassTeacher ? (
				<Card>
					<CardHeader>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div>
								<CardTitle className="flex items-center gap-2">
									<CheckCircle className="h-5 w-5" />
									Mark Attendance
								</CardTitle>
								<CardDescription>
									Click on student cards to toggle attendance status
								</CardDescription>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" onClick={setAllPresent}>
									Mark All Present
								</Button>
								<Button variant="outline" onClick={setAllAbsent}>
									Mark All Absent
								</Button>
								<Dialog open={showBulkUpdate} onOpenChange={setShowBulkUpdate}>
									<DialogTrigger asChild>
										<Button>Update Attendance</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Update Attendance</DialogTitle>
											<DialogDescription>
												Review and submit attendance for {selectedClass} on{" "}
												{selectedDate}
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
													onClick={() => setShowBulkUpdate(false)}
												>
													Cancel
												</Button>
												<Button onClick={handleAttendanceSubmit}>
													Submit Attendance
												</Button>
											</div>
										</div>
									</DialogContent>
								</Dialog>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{filteredStudents.map((student) => (
								<div
									key={student.id}
									className={`p-4 border rounded-lg cursor-pointer transition-colors hover:shadow-md ${
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
					</CardContent>
				</Card>
			) : selectedClass ? (
				<Card>
					<CardContent className="text-center py-8">
						<CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
						<h3 className="mt-2 text-sm font-medium text-gray-900">
							Attendance Access Restricted
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Only class teachers can manage attendance for this class
						</p>
					</CardContent>
				</Card>
			) : (
				<Card>
					<CardContent className="text-center py-8">
						<Users className="mx-auto h-12 w-12 text-gray-400" />
						<h3 className="mt-2 text-sm font-medium text-gray-900">
							Select a Class
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Choose a class to start managing attendance
						</p>
					</CardContent>
				</Card>
			)}

			{/* Attendance Table View */}
			{selectedClass && students.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Detailed View</CardTitle>
						<CardDescription>Tabular view of attendance data</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Roll No</TableHead>
									<TableHead>Student Name</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredStudents.map((student) => (
									<TableRow key={student.id}>
										<TableCell>{student.rollNo}</TableCell>
										<TableCell>{student.name}</TableCell>
										<TableCell>
											<Badge
												variant={
													attendanceData[student.id] ? "default" : "destructive"
												}
												className={
													attendanceData[student.id] ? "bg-green-600" : ""
												}
											>
												{attendanceData[student.id] ? "Present" : "Absent"}
											</Badge>
										</TableCell>
										<TableCell>
											<Button
												variant="outline"
												size="sm"
												onClick={() => toggleAttendance(student.id)}
											>
												{attendanceData[student.id]
													? "Mark Absent"
													: "Mark Present"}
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Attendance;
