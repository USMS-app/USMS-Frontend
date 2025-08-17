import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	BarChart3,
	TrendingUp,
	Users,
	Building2,
	GraduationCap,
	Activity,
	DollarSign,
	Calendar,
	MapPin,
} from "lucide-react";

const Analytics = () => {
	const [timeRange, setTimeRange] = useState("30d");
	const [analytics, setAnalytics] = useState({
		overview: {
			totalSchools: 24,
			totalStudents: 2847,
			totalTeachers: 156,
			activeUsers: 2653,
			revenue: 125000,
			growthRate: 12.5,
		},
		trends: {
			schoolsGrowth: [18, 20, 22, 24],
			studentsGrowth: [2100, 2300, 2600, 2847],
			teachersGrowth: [120, 130, 145, 156],
			revenueGrowth: [95000, 105000, 115000, 125000],
		},
		regionalData: [
			{ state: "Maharashtra", schools: 8, students: 950, teachers: 52 },
			{ state: "Delhi", schools: 6, students: 720, teachers: 38 },
			{ state: "Karnataka", schools: 4, students: 480, teachers: 28 },
			{ state: "Tamil Nadu", schools: 3, students: 360, teachers: 22 },
			{ state: "West Bengal", schools: 3, students: 337, teachers: 16 },
		],
		performance: {
			reportDeliveryRate: 94.2,
			systemUptime: 99.9,
			averageResponseTime: 1.2,
			userSatisfaction: 4.6,
		},
		recentActivity: [
			{
				action: "New school registered",
				school: "ABC International",
				timestamp: "2 hours ago",
				type: "success",
			},
			{
				action: "Monthly reports generated",
				count: 18,
				timestamp: "1 day ago",
				type: "info",
			},
			{
				action: "System maintenance completed",
				timestamp: "3 days ago",
				type: "warning",
			},
			{
				action: "Payment received",
				school: "St. Mary's High",
				amount: "₹5,000",
				timestamp: "5 days ago",
				type: "success",
			},
		],
	});

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatNumber = (num) => {
		return new Intl.NumberFormat("en-IN").format(num);
	};

	const getGrowthColor = (value) => {
		if (value > 0) return "text-green-600";
		if (value < 0) return "text-red-600";
		return "text-gray-600";
	};

	const getGrowthIcon = (value) => {
		if (value > 0) return "↗";
		if (value < 0) return "↘";
		return "→";
	};

	const StatCard = ({
		title,
		value,
		icon: Icon,
		trend,
		description,
		color = "text-blue-600",
	}) => (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-gray-600">
					{title}
				</CardTitle>
				<Icon className="h-4 w-4 text-gray-400" />
			</CardHeader>
			<CardContent>
				<div className={`text-2xl font-bold ${color}`}>{value}</div>
				{trend && (
					<p
						className={`text-xs ${getGrowthColor(
							trend
						)} mt-1 flex items-center gap-1`}
					>
						<span>{getGrowthIcon(trend)}</span>
						{Math.abs(trend)}% from last month
					</p>
				)}
				{description && (
					<p className="text-xs text-gray-600 mt-1">{description}</p>
				)}
			</CardContent>
		</Card>
	);

	const PerformanceMetric = ({
		label,
		value,
		maxValue,
		color = "bg-blue-600",
	}) => (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-sm text-gray-600">{label}</span>
				<span className="text-sm font-medium">{value}</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-2">
				<div
					className={`${color} h-2 rounded-full transition-all duration-300`}
					style={{ width: `${(value / maxValue) * 100}%` }}
				></div>
			</div>
		</div>
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Analytics Dashboard
					</h1>
					<p className="text-gray-600 mt-1">
						Comprehensive insights into your school management platform
					</p>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="w-32">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7d">Last 7 days</SelectItem>
						<SelectItem value="30d">Last 30 days</SelectItem>
						<SelectItem value="90d">Last 90 days</SelectItem>
						<SelectItem value="1y">Last year</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Overview Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard
					title="Total Schools"
					value={analytics.overview.totalSchools}
					icon={Building2}
					trend={analytics.overview.growthRate}
					color="text-blue-600"
				/>
				<StatCard
					title="Total Students"
					value={formatNumber(analytics.overview.totalStudents)}
					icon={GraduationCap}
					trend={8.5}
					color="text-green-600"
				/>
				<StatCard
					title="Total Teachers"
					value={analytics.overview.totalTeachers}
					icon={Users}
					trend={15.2}
					color="text-purple-600"
				/>
				<StatCard
					title="Monthly Revenue"
					value={formatCurrency(analytics.overview.revenue)}
					icon={DollarSign}
					trend={18.7}
					color="text-emerald-600"
				/>
			</div>

			{/* Performance Metrics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="h-5 w-5" />
							System Performance
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<PerformanceMetric
							label="Report Delivery Rate"
							value={`${analytics.performance.reportDeliveryRate}%`}
							maxValue={100}
							color="bg-green-600"
						/>
						<PerformanceMetric
							label="System Uptime"
							value={`${analytics.performance.systemUptime}%`}
							maxValue={100}
							color="bg-blue-600"
						/>
						<PerformanceMetric
							label="Average Response Time"
							value={`${analytics.performance.averageResponseTime}s`}
							maxValue={5}
							color="bg-yellow-600"
						/>
						<PerformanceMetric
							label="User Satisfaction"
							value={`${analytics.performance.userSatisfaction}/5`}
							maxValue={5}
							color="bg-purple-600"
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5" />
							Growth Trends
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Schools Growth</span>
								<span className="text-sm font-medium text-green-600">
									+33.3%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-green-600 h-2 rounded-full"
									style={{ width: "33.3%" }}
								></div>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Students Growth</span>
								<span className="text-sm font-medium text-green-600">
									+35.6%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full"
									style={{ width: "35.6%" }}
								></div>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Teachers Growth</span>
								<span className="text-sm font-medium text-green-600">
									+30.0%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-purple-600 h-2 rounded-full"
									style={{ width: "30%" }}
								></div>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Revenue Growth</span>
								<span className="text-sm font-medium text-green-600">
									+31.6%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-emerald-600 h-2 rounded-full"
									style={{ width: "31.6%" }}
								></div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Regional Distribution */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<MapPin className="h-5 w-5" />
						Regional Distribution
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										State
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Schools
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Students
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Teachers
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Market Share
									</th>
								</tr>
							</thead>
							<tbody>
								{analytics.regionalData.map((region, index) => {
									const marketShare = (
										(region.schools / analytics.overview.totalSchools) *
										100
									).toFixed(1);
									return (
										<tr key={index} className="border-b hover:bg-gray-50">
											<td className="py-3 px-4 font-medium">{region.state}</td>
											<td className="py-3 px-4 text-gray-600">
												{region.schools}
											</td>
											<td className="py-3 px-4 text-gray-600">
												{formatNumber(region.students)}
											</td>
											<td className="py-3 px-4 text-gray-600">
												{region.teachers}
											</td>
											<td className="py-3 px-4">
												<div className="flex items-center gap-2">
													<div className="w-20 bg-gray-200 rounded-full h-2">
														<div
															className="bg-blue-600 h-2 rounded-full"
															style={{ width: `${marketShare}%` }}
														></div>
													</div>
													<span className="text-sm text-gray-600">
														{marketShare}%
													</span>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
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
					<div className="space-y-4">
						{analytics.recentActivity.map((activity, index) => (
							<div
								key={index}
								className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
							>
								<div
									className={`w-2 h-2 rounded-full ${
										activity.type === "success"
											? "bg-green-500"
											: activity.type === "warning"
											? "bg-yellow-500"
											: "bg-blue-500"
									}`}
								></div>
								<div className="flex-1">
									<p className="text-sm font-medium text-gray-900">
										{activity.action}
									</p>
									{activity.school && (
										<p className="text-xs text-gray-600">{activity.school}</p>
									)}
									{activity.count && (
										<p className="text-xs text-gray-600">
											{activity.count} schools
										</p>
									)}
									{activity.amount && (
										<p className="text-xs text-gray-600">{activity.amount}</p>
									)}
								</div>
								<span className="text-xs text-gray-500">
									{activity.timestamp}
								</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Quick Insights */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="bg-blue-50 border-blue-200">
					<CardContent className="pt-6">
						<div className="text-center">
							<Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
							<h3 className="font-semibold text-blue-900 mb-1">
								Top Performing Region
							</h3>
							<p className="text-blue-700 font-medium">Maharashtra</p>
							<p className="text-sm text-blue-600">8 schools, 950 students</p>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-green-50 border-green-200">
					<CardContent className="pt-6">
						<div className="text-center">
							<TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
							<h3 className="font-semibold text-green-900 mb-1">
								Fastest Growing
							</h3>
							<p className="text-green-700 font-medium">Students</p>
							<p className="text-sm text-green-600">+35.6% this month</p>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-purple-50 border-purple-200">
					<CardContent className="pt-6">
						<div className="text-center">
							<DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
							<h3 className="font-semibold text-purple-900 mb-1">
								Revenue Trend
							</h3>
							<p className="text-purple-700 font-medium">₹125,000</p>
							<p className="text-sm text-purple-600">+31.6% growth</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Analytics;



