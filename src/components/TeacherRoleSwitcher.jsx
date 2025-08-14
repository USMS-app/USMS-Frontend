import React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useTeacherAuth } from "@/contexts/TeacherAuthContext";

const TeacherRoleSwitcher = () => {
	const { login } = useTeacherAuth();

	const switchToTeacher = (teacherId) => {
		login(teacherId);
	};

	return (
		<Card className="mb-6">
			<CardHeader>
				<CardTitle>Teacher Role Switcher (Demo)</CardTitle>
				<CardDescription>
					Switch between different teacher roles to see how the interface
					changes
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-3">
					<Button
						onClick={() => switchToTeacher("T1001")}
						variant="outline"
						className="flex-1"
					>
						Switch to Class Teacher (John Doe)
					</Button>
					<Button
						onClick={() => switchToTeacher("T1002")}
						variant="outline"
						className="flex-1"
					>
						Switch to Subject Teacher (Jane Smith)
					</Button>
				</div>
				<p className="text-xs text-gray-500 mt-2">
					T1001: Class Teacher with access to attendance & analytics | T1002:
					Subject Teacher with marks management only
				</p>
			</CardContent>
		</Card>
	);
};

export default TeacherRoleSwitcher;
