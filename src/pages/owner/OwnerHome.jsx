import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Building2,
	Users,
	GraduationCap,
	Plus,
	TrendingUp,
	Activity,
	BarChart3,
} from "lucide-react";

const OwnerHome = () => {
	const [stats, setStats] = useState({
		totalSchools: 0,
		totalStudents: 0,
		totalTeachers: 0,
		activeUsers: 0,
		reportDeliveryRate: 0,
	});

	const [recentSchools, setRecentSchools] = useState([]);

	useEffect(() => {
		// Mock data - replace with actual API calls
		setStats({
			totalSchools: 24,
			totalStudents: 2847,
			totalTeachers: 156,
			activeUsers: 2653,
			reportDeliveryRate: 94.2,
		});

		setRecentSchools([
			{
				id: 1,
				name: "St. Mary's High School",
				code: "SMHS001",
				city: "Mumbai",
				status: "Active",
				students: 450,
				teachers: 28,
			},
			{
				id: 2,
				name: "Delhi Public School",
				code: "DPS002",
				city: "Delhi",
				status: "Active",
				students: 380,
				teachers: 25,
			},
			{
				id: 3,
				name: "Bangalore International School",
				code: "BIS003",
				city: "Bangalore",
				status: "Active",
				students: 320,
				teachers: 22,
			},
		]);
	}, []);

	const StatCard = ({ title, value, icon: Icon, trend, description }) => (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-gray-600">
					{title}
				</CardTitle>
				<Icon className="h-4 w-4 text-gray-400" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-gray-900">{value}</div>
				{trend && (
					<p className="text-xs text-gray-600 mt-1">
						{trend > 0 ? "+" : ""}
						{trend}% from last month
					</p>
				)}
				{description && (
					<p className="text-xs text-gray-600 mt-1">{description}</p>
				)}
			</CardContent>
		</Card>
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Dashboard Overview
					</h1>
					<p className="text-gray-600 mt-1">
						Monitor and manage all your schools from one place
					</p>
				</div>
				<Link to="/owner/schools/new">
					<Button className="flex items-center gap-2">
						<Plus className="h-4 w-4" />
						Add New School
					</Button>
				</Link>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard
					title="Total Schools"
					value={stats.totalSchools}
					icon={Building2}
					trend={12}
				/>
				<StatCard
					title="Total Students"
					value={stats.totalStudents.toLocaleString()}
					icon={GraduationCap}
					trend={8}
				/>
				<StatCard
					title="Total Teachers"
					value={stats.totalTeachers}
					icon={Users}
					trend={15}
				/>
				<StatCard
					title="Active Users"
					value={stats.activeUsers.toLocaleString()}
					icon={Activity}
					trend={5}
				/>
			</div>

			{/* Performance Metrics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BarChart3 className="h-5 w-5" />
							Performance Metrics
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-600">
								Report Delivery Rate
							</span>
							<span className="text-lg font-semibold text-green-600">
								{stats.reportDeliveryRate}%
							</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-green-600 h-2 rounded-full"
								style={{ width: `${stats.reportDeliveryRate}%` }}
							></div>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-600">System Uptime</span>
							<span className="text-lg font-semibold text-blue-600">99.9%</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full"
								style={{ width: "99.9%" }}
							></div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5" />
							Recent Activity
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div className="flex items-center gap-3 text-sm">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span>New school "ABC International" registered</span>
								<span className="text-gray-500 text-xs">2 hours ago</span>
							</div>
							<div className="flex items-center gap-3 text-sm">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								<span>Monthly reports generated for 18 schools</span>
								<span className="text-gray-500 text-xs">1 day ago</span>
							</div>
							<div className="flex items-center gap-3 text-sm">
								<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
								<span>System maintenance completed</span>
								<span className="text-gray-500 text-xs">3 days ago</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Schools */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Recent Schools</span>
						<Link to="/owner/schools">
							<Button variant="outline" size="sm">
								View All
							</Button>
						</Link>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										School Name
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Code
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										City
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Status
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Students
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Teachers
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{recentSchools.map((school) => (
									<tr key={school.id} className="border-b hover:bg-gray-50">
										<td className="py-3 px-4 font-medium">{school.name}</td>
										<td className="py-3 px-4 text-gray-600">{school.code}</td>
										<td className="py-3 px-4 text-gray-600">{school.city}</td>
										<td className="py-3 px-4">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													school.status === "Active"
														? "bg-green-100 text-green-800"
														: "bg-red-100 text-red-800"
												}`}
											>
												{school.status}
											</span>
										</td>
										<td className="py-3 px-4 text-gray-600">
											{school.students}
										</td>
										<td className="py-3 px-4 text-gray-600">
											{school.teachers}
										</td>
										<td className="py-3 px-4">
											<Link to={`/owner/schools/${school.id}`}>
												<Button variant="outline" size="sm">
													View
												</Button>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default OwnerHome;



