import React, { useState, useEffect } from "react";
import {
	BarChart3,
	TrendingUp,
	Users,
	BookOpen,
	Award,
	Calendar,
	Filter,
	Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analytics = () => {
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedPeriod, setSelectedPeriod] = useState("month");
	const [analyticsData, setAnalyticsData] = useState({});

	// Mock data for teacher's assigned classes and subjects
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

	// Mock analytics data
	const mockAnalytics = {
		"7A": {
			Mathematics: {
				attendance: { present: 85, absent: 15, rate: 85 },
				performance: {
					FA1: { average: 78, highest: 95, lowest: 60 },
					FA2: { average: 82, highest: 98, lowest: 65 },
					MID: { average: 75, highest: 92, lowest: 58 },
					FA3: { average: 80, highest: 96, lowest: 62 },
					FA4: { average: 79, highest: 94, lowest: 61 },
					FINAL: { average: 81, highest: 97, lowest: 63 },
				},
				topStudents: [
					{ name: "Alice Johnson", rollNo: "001", average: 92, rank: 1 },
					{ name: "Bob Smith", rollNo: "002", average: 89, rank: 2 },
					{ name: "Carol Davis", rollNo: "003", average: 87, rank: 3 },
				],
			},
			Science: {
				attendance: { present: 88, absent: 12, rate: 88 },
				performance: {
					FA1: { average: 80, highest: 96, lowest: 62 },
					FA2: { average: 83, highest: 97, lowest: 65 },
					MID: { average: 78, highest: 94, lowest: 60 },
					FA3: { average: 81, highest: 95, lowest: 63 },
					FA4: { average: 79, highest: 93, lowest: 61 },
					FINAL: { average: 82, highest: 96, lowest: 64 },
				},
				topStudents: [
					{ name: "Alice Johnson", rollNo: "001", average: 91, rank: 1 },
					{ name: "David Wilson", rollNo: "004", average: 88, rank: 2 },
					{ name: "Eva Brown", rollNo: "005", average: 86, rank: 3 },
				],
			},
		},
		"8B": {
			Mathematics: {
				attendance: { present: 90, absent: 10, rate: 90 },
				performance: {
					FA1: { average: 76, highest: 94, lowest: 58 },
					FA2: { average: 79, highest: 96, lowest: 61 },
					MID: { average: 74, highest: 92, lowest: 56 },
					FA3: { average: 77, highest: 93, lowest: 59 },
					FA4: { average: 75, highest: 91, lowest: 57 },
					FINAL: { average: 78, highest: 95, lowest: 60 },
				},
				topStudents: [
					{ name: "Frank Miller", rollNo: "001", average: 89, rank: 1 },
					{ name: "Grace Lee", rollNo: "002", average: 86, rank: 2 },
					{ name: "Henry Taylor", rollNo: "003", average: 84, rank: 3 },
				],
			},
		},
		"9A": {
			Physics: {
				attendance: { present: 87, absent: 13, rate: 87 },
				performance: {
					FA1: { average: 79, highest: 95, lowest: 61 },
					FA2: { average: 82, highest: 97, lowest: 64 },
					MID: { average: 77, highest: 93, lowest: 59 },
					FA3: { average: 80, highest: 94, lowest: 62 },
					FA4: { average: 78, highest: 92, lowest: 60 },
					FINAL: { average: 81, highest: 96, lowest: 63 },
				},
				topStudents: [
					{ name: "Ivy Chen", rollNo: "001", average: 90, rank: 1 },
					{ name: "Jack Anderson", rollNo: "002", average: 87, rank: 2 },
					{ name: "Kate Martinez", rollNo: "003", average: 85, rank: 3 },
				],
			},
		},
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
				setSelectedSubject(teacher.classes[0].subjects[0]);
				loadAnalyticsData(
					teacher.classes[0].id,
					teacher.classes[0].subjects[0]
				);
			}
		}
	};

	const loadAnalyticsData = (classId, subject) => {
		const data = mockAnalytics[classId]?.[subject];
		if (data) {
			setAnalyticsData(data);
		}
	};

	const handleClassSelect = (classId) => {
		setSelectedClass(classId);
		const teacher = teacherData["T1001"];
		const selectedClassData = teacher.classes.find((cls) => cls.id === classId);
		if (selectedClassData) {
			setSelectedSubject(selectedClassData.subjects[0]);
			loadAnalyticsData(classId, selectedClassData.subjects[0]);
		}
	};

	const handleSubjectSelect = (subject) => {
		setSelectedSubject(subject);
		loadAnalyticsData(selectedClass, subject);
	};

	const getCurrentTeacher = () => teacherData["T1001"];

	const getCurrentClassData = () => {
		const teacher = getCurrentTeacher();
		return teacher?.classes.find((cls) => cls.id === selectedClass);
	};

	const getPerformanceTrend = () => {
		if (!analyticsData.performance) return [];

		const tests = ["FA1", "FA2", "MID", "FA3", "FA4", "FINAL"];
		return tests.map((test) => ({
			test,
			average: analyticsData.performance[test]?.average || 0,
			highest: analyticsData.performance[test]?.highest || 0,
			lowest: analyticsData.performance[test]?.lowest || 0,
		}));
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Performance Analytics
					</h2>
					<p className="mt-1 text-sm text-gray-500">
						View detailed performance insights and reports
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" className="flex items-center gap-2">
						<Download className="h-4 w-4" />
						Export Report
					</Button>
				</div>
			</div>

			{/* Filters */}
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
						<CardTitle className="text-sm font-medium">
							Select Subject
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Select value={selectedSubject} onValueChange={handleSubjectSelect}>
							<SelectTrigger>
								<SelectValue placeholder="Select a subject" />
							</SelectTrigger>
							<SelectContent>
								{getCurrentClassData()?.subjects.map((subject) => (
									<SelectItem key={subject} value={subject}>
										{subject}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">Time Period</CardTitle>
					</CardHeader>
					<CardContent>
						<Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="week">This Week</SelectItem>
								<SelectItem value="month">This Month</SelectItem>
								<SelectItem value="quarter">This Quarter</SelectItem>
								<SelectItem value="year">This Year</SelectItem>
							</SelectContent>
						</Select>
					</CardContent>
				</Card>
			</div>

			{selectedClass && selectedSubject && (
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="performance">Performance</TabsTrigger>
						<TabsTrigger value="attendance">Attendance</TabsTrigger>
						<TabsTrigger value="rankings">Rankings</TabsTrigger>
					</TabsList>

					{/* Overview Tab */}
					<TabsContent value="overview" className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Average Performance
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{analyticsData.performance
											? Math.round(
													Object.values(analyticsData.performance).reduce(
														(sum, test) => sum + test.average,
														0
													) / 6
											  )
											: 0}
										%
									</div>
									<p className="text-xs text-muted-foreground">
										Across all assessments
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Attendance Rate
									</CardTitle>
									<Users className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{analyticsData.attendance?.rate || 0}%
									</div>
									<p className="text-xs text-muted-foreground">
										{analyticsData.attendance?.present || 0} present,{" "}
										{analyticsData.attendance?.absent || 0} absent
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Top Performer
									</CardTitle>
									<Award className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-lg font-bold">
										{analyticsData.topStudents?.[0]?.name || "N/A"}
									</div>
									<p className="text-xs text-muted-foreground">
										Average: {analyticsData.topStudents?.[0]?.average || 0}%
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Performance Trend Chart */}
						<Card>
							<CardHeader>
								<CardTitle>Performance Trend</CardTitle>
								<CardDescription>
									Performance across different assessments
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{getPerformanceTrend().map((test) => (
										<div
											key={test.test}
											className="flex items-center justify-between p-3 border rounded-lg"
										>
											<div className="flex items-center gap-4">
												<Badge variant="outline">{test.test}</Badge>
												<span className="text-sm text-gray-600">
													Average: {test.average}%
												</span>
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-500">
												<span>Highest: {test.highest}%</span>
												<span>Lowest: {test.lowest}%</span>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Performance Tab */}
					<TabsContent value="performance" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Detailed Performance Analysis</CardTitle>
								<CardDescription>
									Breakdown of performance by assessment type
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Assessment</TableHead>
											<TableHead>Average</TableHead>
											<TableHead>Highest</TableHead>
											<TableHead>Lowest</TableHead>
											<TableHead>Performance</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{getPerformanceTrend().map((test) => (
											<TableRow key={test.test}>
												<TableCell>
													<Badge variant="outline">{test.test}</Badge>
												</TableCell>
												<TableCell>{test.average}%</TableCell>
												<TableCell>{test.highest}%</TableCell>
												<TableCell>{test.lowest}%</TableCell>
												<TableCell>
													<div className="w-full bg-gray-200 rounded-full h-2">
														<div
															className="bg-green-600 h-2 rounded-full"
															style={{ width: `${test.average}%` }}
														></div>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Attendance Tab */}
					<TabsContent value="attendance" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Attendance Overview</CardTitle>
								<CardDescription>
									Daily attendance statistics and trends
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-4">
										<div className="text-center p-6 bg-green-50 rounded-lg">
											<div className="text-3xl font-bold text-green-600">
												{analyticsData.attendance?.rate || 0}%
											</div>
											<div className="text-sm text-green-600 mt-1">
												Overall Attendance Rate
											</div>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="text-center p-4 bg-blue-50 rounded-lg">
												<div className="text-xl font-bold text-blue-600">
													{analyticsData.attendance?.present || 0}
												</div>
												<div className="text-xs text-blue-600">Present</div>
											</div>
											<div className="text-center p-4 bg-red-50 rounded-lg">
												<div className="text-xl font-bold text-red-600">
													{analyticsData.attendance?.absent || 0}
												</div>
												<div className="text-xs text-red-600">Absent</div>
											</div>
										</div>
									</div>
									<div className="space-y-4">
										<h4 className="font-medium">Attendance Insights</h4>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span>Excellent (90%+)</span>
												<Badge variant="default" className="bg-green-600">
													{analyticsData.attendance?.rate >= 90 ? "Yes" : "No"}
												</Badge>
											</div>
											<div className="flex justify-between">
												<span>Good (80-89%)</span>
												<Badge variant="default" className="bg-blue-600">
													{analyticsData.attendance?.rate >= 80 &&
													analyticsData.attendance?.rate < 90
														? "Yes"
														: "No"}
												</Badge>
											</div>
											<div className="flex justify-between">
												<span>Needs Improvement</span>
												<Badge variant="destructive">
													{analyticsData.attendance?.rate < 80 ? "Yes" : "No"}
												</Badge>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Rankings Tab */}
					<TabsContent value="rankings" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Student Rankings</CardTitle>
								<CardDescription>
									Top performing students in {selectedSubject}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Rank</TableHead>
											<TableHead>Student Name</TableHead>
											<TableHead>Roll No</TableHead>
											<TableHead>Average</TableHead>
											<TableHead>Performance</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{analyticsData.topStudents?.map((student, index) => (
											<TableRow key={student.id}>
												<TableCell>
													<div className="flex items-center gap-2">
														{index === 0 && (
															<Award className="h-4 w-4 text-yellow-500" />
														)}
														<span className="font-medium">#{student.rank}</span>
													</div>
												</TableCell>
												<TableCell className="font-medium">
													{student.name}
												</TableCell>
												<TableCell>{student.rollNo}</TableCell>
												<TableCell>{student.average}%</TableCell>
												<TableCell>
													<div className="w-full bg-gray-200 rounded-full h-2">
														<div
															className="bg-green-600 h-2 rounded-full"
															style={{ width: `${student.average}%` }}
														></div>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			)}

			{(!selectedClass || !selectedSubject) && (
				<Card>
					<CardContent className="text-center py-8">
						<BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
						<h3 className="mt-2 text-sm font-medium text-gray-900">
							Select Class and Subject
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Choose a class and subject to view analytics
						</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Analytics;
