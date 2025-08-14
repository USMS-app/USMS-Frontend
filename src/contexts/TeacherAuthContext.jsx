import React, { createContext, useContext, useState, useEffect } from "react";

const TeacherAuthContext = createContext();

export const useTeacherAuth = () => {
	const context = useContext(TeacherAuthContext);
	if (!context) {
		throw new Error("useTeacherAuth must be used within a TeacherAuthProvider");
	}
	return context;
};

export const TeacherAuthProvider = ({ children }) => {
	const [teacher, setTeacher] = useState(null);
	const [isClassTeacher, setIsClassTeacher] = useState(false);
	const [loading, setLoading] = useState(true);

	// Mock teacher data - in real app, this would come from API
	const mockTeacherData = {
		T1001: {
			id: "T1001",
			name: "John Doe",
			email: "john.doe@school.com",
			role: "class_teacher", // "class_teacher" or "subject_teacher"
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
		T1002: {
			id: "T1002",
			name: "Jane Smith",
			email: "jane.smith@school.com",
			role: "subject_teacher",
			classes: [
				{
					id: "6A",
					name: "Class 6A",
					subjects: ["English", "Social Studies"],
					isClassTeacher: true,
				},
				{
					id: "7B",
					name: "Class 7B",
					subjects: ["English"],
					isClassTeacher: false,
				},
			],
		},
	};

	useEffect(() => {
		// Simulate API call to get teacher data
		const loadTeacherData = async () => {
			try {
				// In real app, this would be an API call with authentication token
				const teacherId = localStorage.getItem("teacherId") || "T1001"; // Default for demo
				const teacherData = mockTeacherData[teacherId];

				if (teacherData) {
					setTeacher(teacherData);
					// Check if teacher is a class teacher for any class
					const hasClassTeacherRole = teacherData.classes.some(
						(cls) => cls.isClassTeacher
					);
					setIsClassTeacher(hasClassTeacherRole);
				}
			} catch (error) {
				console.error("Error loading teacher data:", error);
			} finally {
				setLoading(false);
			}
		};

		loadTeacherData();
	}, []);

	const login = (teacherId) => {
		localStorage.setItem("teacherId", teacherId);
		const teacherData = mockTeacherData[teacherId];
		if (teacherData) {
			setTeacher(teacherData);
			const hasClassTeacherRole = teacherData.classes.some(
				(cls) => cls.isClassTeacher
			);
			setIsClassTeacher(hasClassTeacherRole);
		}
	};

	const logout = () => {
		localStorage.removeItem("teacherId");
		setTeacher(null);
		setIsClassTeacher(false);
	};

	const value = {
		teacher,
		isClassTeacher,
		loading,
		login,
		logout,
	};

	return (
		<TeacherAuthContext.Provider value={value}>
			{children}
		</TeacherAuthContext.Provider>
	);
};
