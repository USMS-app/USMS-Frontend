import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowLeft,
	Building2,
	Users,
	GraduationCap,
	MapPin,
	Phone,
	Mail,
	Globe,
	Calendar,
	Key,
	RefreshCw,
	CheckCircle,
	AlertCircle,
} from "lucide-react";

const SchoolDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [school, setSchool] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showResetModal, setShowResetModal] = useState(false);
	const [newCredentials, setNewCredentials] = useState(null);
	const [resetLoading, setResetLoading] = useState(false);

	useEffect(() => {
		// Mock data - replace with actual API call
		const mockSchool = {
			id: parseInt(id),
			name: "St. Mary's High School",
			code: "SMHS001",
			address: "123 Church Street, Mumbai, Maharashtra",
			contactPerson: "Mrs. Sarah Johnson",
			mobile: "+91 98765 43210",
			email: "admin@stmarys.edu",
			website: "https://www.stmarys.edu",
			city: "Mumbai",
			state: "Maharashtra",
			status: "Active",
			students: 450,
			teachers: 28,
			classes: 15,
			joinedDate: "2023-01-15",
			lastActive: "2024-01-15T10:30:00Z",
			subscriptionPlan: "Premium",
			nextBilling: "2024-02-15",
			features: [
				"Attendance Management",
				"Report Generation",
				"Parent Portal",
				"Analytics Dashboard",
			],
			recentActivity: [
				{
					action: "Monthly report generated",
					timestamp: "2024-01-15T09:00:00Z",
					status: "success",
				},
				{
					action: "New teacher account created",
					timestamp: "2024-01-14T14:30:00Z",
					status: "success",
				},
				{
					action: "Attendance data synced",
					timestamp: "2024-01-14T08:00:00Z",
					status: "success",
				},
				{
					action: "System backup completed",
					timestamp: "2024-01-13T23:00:00Z",
					status: "success",
				},
			],
		};

		setSchool(mockSchool);
		setLoading(false);
	}, [id]);

	const generateNewCredentials = () => {
		const schoolPrefix = school.name
			.replace(/[^a-zA-Z]/g, "")
			.substring(0, 3)
			.toUpperCase();
		const randomDigits = Math.floor(Math.random() * 900) + 100;
		const username = `${schoolPrefix}${randomDigits}`;

		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
		let password = "";
		for (let i = 0; i < 8; i++) {
			password += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		return { username, password };
	};

	const handleResetCredentials = async () => {
		setResetLoading(true);

		// Simulate API call
		setTimeout(() => {
			const credentials = generateNewCredentials();
			setNewCredentials(credentials);
			setShowResetModal(true);
			setResetLoading(false);
		}, 1000);
	};

	const confirmReset = async () => {
		// Here you would make an API call to update the credentials
		console.log("Resetting credentials for school:", school.id);

		// Simulate API call
		setTimeout(() => {
			alert(
				"Credentials reset successfully! New credentials have been sent to the school's email."
			);
			setShowResetModal(false);
			setNewCredentials(null);
		}, 1000);
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading school details...</p>
				</div>
			</div>
		);
	}

	if (!school) {
		return (
			<div className="text-center py-12">
				<AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
				<h2 className="text-xl font-semibold text-gray-900 mb-2">
					School Not Found
				</h2>
				<p className="text-gray-600 mb-4">
					The school you're looking for doesn't exist.
				</p>
				<Button onClick={() => navigate("/owner/schools")}>
					Back to Schools
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate("/owner/schools")}
					>
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<div>
						<h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>
						<p className="text-gray-600 mt-1">School Code: {school.code}</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<span
						className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
							school.status === "Active"
								? "bg-green-100 text-green-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						{school.status}
					</span>
					<Button
						variant="outline"
						onClick={handleResetCredentials}
						disabled={resetLoading}
						className="flex items-center gap-2"
					>
						{resetLoading ? (
							<RefreshCw className="h-4 w-4 animate-spin" />
						) : (
							<Key className="h-4 w-4" />
						)}
						Reset Credentials
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main School Information */}
				<div className="lg:col-span-2 space-y-6">
					{/* Basic Information */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Building2 className="h-5 w-5" />
								School Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										School Name
									</label>
									<p className="text-gray-900">{school.name}</p>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										School Code
									</label>
									<p className="text-gray-900 font-mono">{school.code}</p>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Contact Person
									</label>
									<p className="text-gray-900">{school.contactPerson}</p>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Subscription Plan
									</label>
									<p className="text-gray-900">{school.subscriptionPlan}</p>
								</div>
							</div>

							<div>
								<label className="text-sm font-medium text-gray-600">
									Address
								</label>
								<p className="text-gray-900 flex items-center gap-2">
									<MapPin className="h-4 w-4 text-gray-500" />
									{school.address}
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										City
									</label>
									<p className="text-gray-900">{school.city}</p>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										State
									</label>
									<p className="text-gray-900">{school.state}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Phone className="h-5 w-5" />
								Contact Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										Mobile
									</label>
									<p className="text-gray-900 flex items-center gap-2">
										<Phone className="h-4 w-4 text-gray-500" />
										{school.mobile}
									</p>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Email
									</label>
									<p className="text-gray-900 flex items-center gap-2">
										<Mail className="h-4 w-4 text-gray-500" />
										{school.email}
									</p>
								</div>
							</div>

							{school.website && (
								<div>
									<label className="text-sm font-medium text-gray-600">
										Website
									</label>
									<p className="text-gray-900 flex items-center gap-2">
										<Globe className="h-4 w-4 text-gray-500" />
										<a
											href={school.website}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:underline"
										>
											{school.website}
										</a>
									</p>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Recent Activity */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Calendar className="h-5 w-5" />
								Recent Activity
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{school.recentActivity.map((activity, index) => (
									<div key={index} className="flex items-center gap-3 text-sm">
										<div
											className={`w-2 h-2 rounded-full ${
												activity.status === "success"
													? "bg-green-500"
													: "bg-yellow-500"
											}`}
										></div>
										<span className="flex-1">{activity.action}</span>
										<span className="text-gray-500 text-xs">
											{new Date(activity.timestamp).toLocaleString()}
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Statistics */}
					<Card>
						<CardHeader>
							<CardTitle>Statistics</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Total Students</span>
								<span className="text-2xl font-bold text-blue-600">
									{school.students}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Total Teachers</span>
								<span className="text-2xl font-bold text-green-600">
									{school.teachers}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Total Classes</span>
								<span className="text-2xl font-bold text-purple-600">
									{school.classes}
								</span>
							</div>
						</CardContent>
					</Card>

					{/* Account Details */}
					<Card>
						<CardHeader>
							<CardTitle>Account Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="text-sm font-medium text-gray-600">
									Joined Date
								</label>
								<p className="text-gray-900">
									{new Date(school.joinedDate).toLocaleDateString()}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-600">
									Last Active
								</label>
								<p className="text-gray-900">
									{new Date(school.lastActive).toLocaleString()}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-600">
									Next Billing
								</label>
								<p className="text-gray-900">
									{new Date(school.nextBilling).toLocaleDateString()}
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Features */}
					<Card>
						<CardHeader>
							<CardTitle>Active Features</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								{school.features.map((feature, index) => (
									<div key={index} className="flex items-center gap-2 text-sm">
										<CheckCircle className="h-4 w-4 text-green-500" />
										<span>{feature}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Reset Credentials Modal */}
			{showResetModal && newCredentials && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							New Login Credentials
						</h3>
						<div className="space-y-4">
							<div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
								<p className="text-sm text-yellow-800 font-medium">
									⚠️ New credentials have been generated. Please save them
									securely.
								</p>
							</div>

							<div className="space-y-3">
								<div>
									<label className="text-sm font-medium text-gray-600">
										New Username
									</label>
									<p className="font-mono bg-gray-100 p-2 rounded">
										{newCredentials.username}
									</p>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										New Password
									</label>
									<p className="font-mono bg-gray-100 p-2 rounded">
										{newCredentials.password}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3 pt-4">
								<Button
									variant="outline"
									onClick={() => setShowResetModal(false)}
									className="flex-1"
								>
									Cancel
								</Button>
								<Button
									onClick={confirmReset}
									className="flex-1 bg-blue-600 hover:bg-blue-700"
								>
									Confirm Reset
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SchoolDetail;



