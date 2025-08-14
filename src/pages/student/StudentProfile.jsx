import React from "react";
import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
	const navigate = useNavigate();

	// Mock data until backend wiring
	const student = {
		name: "Vinod R",
		avatar: null,
		date: "08-4-12",
		schoolName: "Greenwood High",
		rollNo: "24",
		class: "9 A",
		registrationNo: "STU2024001",
		dob: "2006-03-14",
		parent: { name: "Bryan M. Morales", phone: "+91 98765 43210" },
		address: "Bengaluru, Karnataka",
		email: "ali.khan@email.com",
		bloodGroup: "O+",
		emergencyContact: "+91 98765 43211",
		admissionDate: "2020-06-01",
		previousSchool: "Sunrise Elementary",
		achievements: ["Best Student Award 2023", "Science Olympiad Winner 2022"],
		extracurricular: ["Football Team Captain", "School Band Member"],
	};

	const handleBackToDashboard = () => {
		navigate("/student");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			

			{/* Main Content */}
			<main className="p-4 sm:p-6 lg:p-8">
				<div className="space-y-6">
					{/* Back Button */}
					<div className="flex items-center gap-4">
						<button
							onClick={handleBackToDashboard}
							className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
						>
							<ArrowLeft size={20} />
							<span>Back to Dashboard</span>
						</button>
					</div>

					{/* Profile Header */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
							<div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
								<User size={40} className="text-blue-600" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-gray-900 mb-2">
									{student.name}
								</h1>
								<p className="text-gray-600 mb-1">
									Class: {student.class} | Roll No: {student.rollNo}
								</p>
								<p className="text-gray-600">
									Registration: {student.registrationNo}
								</p>
							</div>
						</div>
					</div>

					{/* Personal Information */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900">
								Personal Information
							</h2>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<InfoField label="Full Name" value={student.name} />
									<InfoField label="Date of Birth" value={student.dob} />
									<InfoField label="Blood Group" value={student.bloodGroup} />
									<InfoField label="Email" value={student.email} />
									<InfoField label="Address" value={student.address} />
								</div>
								<div className="space-y-4">
									<InfoField label="School" value={student.schoolName} />
									<InfoField
										label="Admission Date"
										value={student.admissionDate}
									/>
									<InfoField
										label="Previous School"
										value={student.previousSchool}
									/>
									<InfoField
										label="Emergency Contact"
										value={student.emergencyContact}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Parent/Guardian Information */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900">
								Parent/Guardian Information
							</h2>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<InfoField label="Name" value={student.parent.name} />
								<InfoField label="Phone" value={student.parent.phone} />
							</div>
						</div>
					</div>

					{/* Achievements & Activities */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900">
								Achievements & Activities
							</h2>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="font-medium text-gray-900 mb-3">
										Achievements
									</h3>
									<div className="space-y-2">
										{student.achievements.map((achievement, idx) => (
											<div key={idx} className="flex items-center gap-2">
												<div className="w-2 h-2 bg-green-500 rounded-full"></div>
												<span className="text-gray-700">{achievement}</span>
											</div>
										))}
									</div>
								</div>
								<div>
									<h3 className="font-medium text-gray-900 mb-3">
										Extracurricular Activities
									</h3>
									<div className="space-y-2">
										{student.extracurricular.map((activity, idx) => (
											<div key={idx} className="flex items-center gap-2">
												<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
												<span className="text-gray-700">{activity}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

function InfoField({ label, value, className = "" }) {
	return (
		<div className={className}>
			<div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
				{label}
			</div>
			<div className="text-sm text-gray-900 font-medium">{value}</div>
		</div>
	);
}
