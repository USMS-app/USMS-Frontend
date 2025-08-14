import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTeacherAuth } from "@/contexts/TeacherAuthContext";

export const ProtectedRoute = ({ children, requireClassTeacher = false }) => {
	const { teacher, isClassTeacher, loading } = useTeacherAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
			</div>
		);
	}

	if (!teacher) {
		// Redirect to login if not authenticated
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	if (requireClassTeacher && !isClassTeacher) {
		// Redirect to subject teacher dashboard if class teacher access is required
		return <Navigate to="/teacher/subject-teacher" replace />;
	}

	return children;
};

export default ProtectedRoute;
