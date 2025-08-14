import React, { useState } from "react";
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";

const TeacherHome = () => {
	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState("");

	// Mock data for teacher's assigned classes and subjects
	const teacherData = {
		T1001: {
			name: "John Doe",
			classes: [
				{ id: "7A", name: "Class 7A", subjects: ["Mathematics", "Science"] },
				{ id: "8B", name: "Class 8B", subjects: ["Mathematics"] },
				{ id: "9A", name: "Class 9A", subjects: ["Physics"] },
			],
		},
		T1002: {
			name: "Jane Smith",
			classes: [
				{ id: "6A", name: "Class 6A", subjects: ["English", "Social Studies"] },
				{ id: "7B", name: "Class 7B", subjects: ["English"] },
			],
		},
	};

	// TODO: Load teacher data from backend when ready
	// For now, using mock data

	// Demo function to load mock data
	const loadDemoData = () => {
		loadTeacherClasses("T1001");
	};

	// TODO: Replace with actual API call when backend is ready
	const loadTeacherClasses = (id) => {
		const teacher = teacherData[id] || { classes: [] };
		setClasses(teacher.classes);
	};

	const handleClassSelect = (classId) => {
		setSelectedClass(classId);
		// TODO: Navigate to subjects when backend is ready
		console.log("Selected class:", classId);
	};

	const handleReset = () => {
		// TODO: Implement reset logic when backend is ready
		console.log("Reset functionality will be implemented after backend");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						Select Your Class
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Choose a class to continue
					</p>
					<button
						onClick={loadDemoData}
						className="mt-2 text-sm text-green-600 hover:text-green-800"
					>
						Load Demo Data
					</button>
				</div>

				<div className="mt-8 space-y-4">
					{classes.length > 0 ? (
						classes.map((cls) => (
							<button
								key={cls.id}
								onClick={() => handleClassSelect(cls.id)}
								className="group relative w-full flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors duration-200"
							>
								<div className="flex items-center">
									<div className="p-2 bg-green-100 rounded-lg mr-4">
										<GraduationCap className="h-6 w-6 text-green-600" />
									</div>
									<div className="text-left">
										<h3 className="text-lg font-medium text-gray-900">
											{cls.name}
										</h3>
										<p className="text-sm text-gray-500">
											{cls.subjects.join(", ")}
										</p>
									</div>
								</div>
								<ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
							</button>
						))
					) : (
						<div className="text-center py-8">
							<BookOpen className="mx-auto h-12 w-12 text-gray-400" />
							<h3 className="mt-2 text-sm font-medium text-gray-900">
								No classes assigned
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								You don't have any classes assigned to you yet.
							</p>
							<button
								onClick={handleReset}
								className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Back to Login
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TeacherHome;
