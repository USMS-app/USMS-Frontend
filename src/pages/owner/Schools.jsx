import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Plus,
	Search,
	Filter,
	Eye,
	Edit,
	Trash2,
	Building2,
	MapPin,
	Phone,
	Mail,
} from "lucide-react";

const Schools = () => {
	const [schools, setSchools] = useState([]);
	const [filteredSchools, setFilteredSchools] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [cityFilter, setCityFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	useEffect(() => {
		// Mock data - replace with actual API calls
		const mockSchools = [
			{
				id: 1,
				name: "St. Mary's High School",
				code: "SMHS001",
				address: "123 Church Street, Mumbai, Maharashtra",
				contactPerson: "Mrs. Sarah Johnson",
				mobile: "+91 98765 43210",
				email: "admin@stmarys.edu",
				city: "Mumbai",
				state: "Maharashtra",
				status: "Active",
				students: 450,
				teachers: 28,
				classes: 15,
				joinedDate: "2023-01-15",
			},
			{
				id: 2,
				name: "Delhi Public School",
				code: "DPS002",
				address: "456 Connaught Place, Delhi",
				contactPerson: "Mr. Rajesh Kumar",
				mobile: "+91 98765 43211",
				email: "principal@dpsdelhi.edu",
				city: "Delhi",
				state: "Delhi",
				status: "Active",
				students: 380,
				teachers: 25,
				classes: 12,
				joinedDate: "2023-02-20",
			},
			{
				id: 3,
				name: "Bangalore International School",
				code: "BIS003",
				address: "789 MG Road, Bangalore, Karnataka",
				contactPerson: "Dr. Priya Sharma",
				mobile: "+91 98765 43212",
				email: "director@bisbangalore.edu",
				city: "Bangalore",
				state: "Karnataka",
				status: "Active",
				students: 320,
				teachers: 22,
				classes: 10,
				joinedDate: "2023-03-10",
			},
			{
				id: 4,
				name: "Chennai Central School",
				code: "CCS004",
				address: "321 Anna Salai, Chennai, Tamil Nadu",
				contactPerson: "Mr. Venkatesh Iyer",
				mobile: "+91 98765 43213",
				email: "admin@ccschennai.edu",
				city: "Chennai",
				state: "Tamil Nadu",
				status: "Inactive",
				students: 280,
				teachers: 18,
				classes: 8,
				joinedDate: "2023-04-05",
			},
			{
				id: 5,
				name: "Kolkata Modern School",
				code: "KMS005",
				address: "654 Park Street, Kolkata, West Bengal",
				contactPerson: "Mrs. Anjali Das",
				mobile: "+91 98765 43214",
				email: "principal@kmskolkata.edu",
				city: "Kolkata",
				state: "West Bengal",
				status: "Active",
				students: 420,
				teachers: 26,
				classes: 14,
				joinedDate: "2023-05-12",
			},
		];
		setSchools(mockSchools);
		setFilteredSchools(mockSchools);
	}, []);

	useEffect(() => {
		let filtered = schools;

		// Apply search filter
		if (searchTerm) {
			filtered = filtered.filter(
				(school) =>
					school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					school.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
					school.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Apply status filter
		if (statusFilter !== "all") {
			filtered = filtered.filter((school) => school.status === statusFilter);
		}

		// Apply city filter
		if (cityFilter !== "all") {
			filtered = filtered.filter((school) => school.city === cityFilter);
		}

		setFilteredSchools(filtered);
		setCurrentPage(1);
	}, [searchTerm, statusFilter, cityFilter, schools]);

	const getCities = () => {
		const cities = [...new Set(schools.map((school) => school.city))];
		return cities.sort();
	};

	const getStates = () => {
		const states = [...new Set(schools.map((school) => school.state))];
		return states.sort();
	};

	const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentSchools = filteredSchools.slice(startIndex, endIndex);

	const handleDelete = (schoolId) => {
		if (window.confirm("Are you sure you want to delete this school?")) {
			setSchools(schools.filter((school) => school.id !== schoolId));
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Schools Management
					</h1>
					<p className="text-gray-600 mt-1">
						Manage all registered schools and their accounts
					</p>
				</div>
				<Link to="/owner/schools/new">
					<Button className="flex items-center gap-2">
						<Plus className="h-4 w-4" />
						Add New School
					</Button>
				</Link>
			</div>

			{/* Filters */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Filter className="h-5 w-5" />
						Search & Filters
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search schools..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>

						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="Active">Active</SelectItem>
								<SelectItem value="Inactive">Inactive</SelectItem>
							</SelectContent>
						</Select>

						<Select value={cityFilter} onValueChange={setCityFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Filter by city" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Cities</SelectItem>
								{getCities().map((city) => (
									<SelectItem key={city} value={city}>
										{city}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<div className="text-sm text-gray-600 flex items-center">
							{filteredSchools.length} of {schools.length} schools
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Schools Table */}
			<Card>
				<CardHeader>
					<CardTitle>All Schools</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										School Details
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Contact Info
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Location
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Status
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Statistics
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-600">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{currentSchools.map((school) => (
									<tr key={school.id} className="border-b hover:bg-gray-50">
										<td className="py-4 px-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
													<Building2 className="h-5 w-5 text-blue-600" />
												</div>
												<div>
													<div className="font-medium text-gray-900">
														{school.name}
													</div>
													<div className="text-sm text-gray-600">
														Code: {school.code}
													</div>
													<div className="text-xs text-gray-500">
														Joined:{" "}
														{new Date(school.joinedDate).toLocaleDateString()}
													</div>
												</div>
											</div>
										</td>

										<td className="py-4 px-4">
											<div className="space-y-1">
												<div className="text-sm font-medium">
													{school.contactPerson}
												</div>
												<div className="text-sm text-gray-600 flex items-center gap-1">
													<Phone className="h-3 w-3" />
													{school.mobile}
												</div>
												<div className="text-sm text-gray-600 flex items-center gap-1">
													<Mail className="h-3 w-3" />
													{school.email}
												</div>
											</div>
										</td>

										<td className="py-4 px-4">
											<div className="text-sm text-gray-600">
												<div className="flex items-center gap-1">
													<MapPin className="h-3 w-3" />
													{school.city}, {school.state}
												</div>
											</div>
										</td>

										<td className="py-4 px-4">
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

										<td className="py-4 px-4">
											<div className="text-sm text-gray-600">
												<div>Students: {school.students}</div>
												<div>Teachers: {school.teachers}</div>
												<div>Classes: {school.classes}</div>
											</div>
										</td>

										<td className="py-4 px-4">
											<div className="flex items-center gap-2">
												<Link to={`/owner/schools/${school.id}`}>
													<Button
														variant="outline"
														size="sm"
														className="flex items-center gap-1"
													>
														<Eye className="h-3 w-3" />
														View
													</Button>
												</Link>
												<Link to={`/owner/schools/${school.id}/edit`}>
													<Button
														variant="outline"
														size="sm"
														className="flex items-center gap-1"
													>
														<Edit className="h-3 w-3" />
														Edit
													</Button>
												</Link>
												<Button
													variant="outline"
													size="sm"
													className="flex items-center gap-1 text-red-600 hover:text-red-700"
													onClick={() => handleDelete(school.id)}
												>
													<Trash2 className="h-3 w-3" />
													Delete
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-between mt-6">
							<div className="text-sm text-gray-600">
								Showing {startIndex + 1} to{" "}
								{Math.min(endIndex, filteredSchools.length)} of{" "}
								{filteredSchools.length} results
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage(currentPage - 1)}
									disabled={currentPage === 1}
								>
									Previous
								</Button>
								<span className="text-sm text-gray-600">
									Page {currentPage} of {totalPages}
								</span>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage(currentPage + 1)}
									disabled={currentPage === totalPages}
								>
									Next
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Schools;

