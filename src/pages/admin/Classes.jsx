import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import {
	Eye,
	Search,
	Filter,
	ArrowUp,
	ArrowDown,
	MoreVertical,
	Edit,
	Trash2,
} from "lucide-react";
import { toast } from "sonner";

// Mock data for classes 1-10
const CLASSES = [
	{ id: 1, name: "Class 1", strength: 45, classTeacher: "Mrs. Anita Sharma" },
	{ id: 2, name: "Class 2", strength: 42, classTeacher: "Mr. Rahul Verma" },
	{ id: 3, name: "Class 3", strength: 48, classTeacher: "Ms. Meera Iyer" },
	{ id: 4, name: "Class 4", strength: 44, classTeacher: "Mr. Rajesh Kumar" },
	{ id: 5, name: "Class 5", strength: 46, classTeacher: "Mrs. Priya Singh" },
	{ id: 6, name: "Class 6", strength: 43, classTeacher: "Mr. Amit Patel" },
	{ id: 7, name: "Class 7", strength: 47, classTeacher: "Ms. Neha Gupta" },
	{ id: 8, name: "Class 8", strength: 45, classTeacher: "Mr. Sanjay Reddy" },
	{
		id: 9,
		name: "Class 9",
		strength: 41,
		classTeacher: "Mrs. Kavita Malhotra",
	},
	{
		id: 10,
		name: "Class 10",
		strength: 44,
		classTeacher: "Mr. Deepak Sharma",
	},
];

export default function Classes() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = React.useState("");
	const [sortBy, setSortBy] = React.useState("classNumber");
	const [sortOrder, setSortOrder] = React.useState("asc");
	const [openDropdown, setOpenDropdown] = React.useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(null);

	// Filter and sort classes
	const filteredAndSortedClasses = React.useMemo(() => {
		let filtered = CLASSES.filter(
			(cls) =>
				cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase())
		);

		// Sort classes
		filtered.sort((a, b) => {
			let result = 0;
			switch (sortBy) {
				case "classNumber":
					result = a.id - b.id;
					break;
				case "name":
					result = a.name.localeCompare(b.name);
					break;
				case "strength":
					result = a.strength - b.strength;
					break;
				default:
					result = 0;
			}

			// Apply sort order
			return sortOrder === "asc" ? result : -result;
		});

		return filtered;
	}, [searchTerm, sortBy, sortOrder]);

	const handleViewClass = (classId) => {
		navigate(`/admin/classes/${classId}`);
		setOpenDropdown(null);
	};

	const handleEditClass = (classId) => {
		// TODO: Implement edit functionality
		console.log("Edit class:", classId);
		setOpenDropdown(null);
	};

	const handleDeleteClass = (classId) => {
		// TODO: Implement delete functionality
		console.log("Delete class:", classId);
		setShowDeleteConfirm(null);
		setOpenDropdown(null);

		// Show success toast
		toast.success(`Class ${classId} has been deleted successfully!`);
	};

	// Helper function to get sort indicator
	const getSortIndicator = (column) => {
		if (sortBy !== column) return null;
		return sortOrder === "asc" ? (
			<ArrowUp className="h-3 w-3 text-blue-600 ml-1" />
		) : (
			<ArrowDown className="h-3 w-3 text-blue-600 ml-1" />
		);
	};

	return (
		<div className="space-y-6 overflow-hidden">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div className="flex items-center gap-4">
					<BackButton className="hidden sm:flex" />
					<h2 className="text-xl font-semibold text-gray-900">
						Class Management
					</h2>
				</div>
				<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap transition-colors">
					Add New Class
				</button>
			</div>

			{/* Search and Filter Section */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
				<div className="flex flex-col gap-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<input
							type="text"
							placeholder="Search classes or teachers..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div className="flex flex-col sm:flex-row gap-2">
						<div className="flex items-center gap-2">
							<Filter className="h-4 w-4 text-gray-500" />
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="classNumber">Sort by Class Number</option>
								<option value="name">Sort by Name</option>
								<option value="strength">Sort by Strength</option>
							</select>
						</div>
						<button
							onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
							className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors flex items-center justify-center gap-2"
							title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
						>
							{sortOrder === "asc" ? (
								<>
									<ArrowUp className="h-4 w-4 text-gray-600" />
									<span className="text-xs text-gray-600">Asc</span>
								</>
							) : (
								<>
									<ArrowDown className="h-4 w-4 text-gray-600" />
									<span className="text-xs text-gray-600">Desc</span>
								</>
							)}
						</button>
					</div>
				</div>
				<div className="mt-3 text-sm text-gray-600">
					💡 <strong>Tip:</strong> Click on any column header to sort by that
					column. Click again to reverse the order.
				</div>
			</div>

			{/* Classes Table */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200">
				{/* Mobile scroll hint */}
				<div className="px-3 py-2 bg-blue-50 border-b border-blue-200 block sm:hidden">
					<div className="flex items-center gap-2 text-blue-700">
						<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
						<span className="text-xs font-medium">
							← Swipe to view all columns →
						</span>
					</div>
				</div>

				<div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
					<table className="w-full min-w-[800px] divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 hover:bg-gray-100 transition-colors"
									onClick={() => {
										setSortBy("classNumber");
										if (sortBy === "classNumber") {
											setSortOrder(sortOrder === "asc" ? "desc" : "asc");
										} else {
											setSortOrder("asc");
										}
									}}
								>
									<div className="flex items-center">
										Class Number
										{getSortIndicator("classNumber")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 hover:bg-gray-100 transition-colors"
									onClick={() => {
										setSortBy("name");
										if (sortBy === "name") {
											setSortOrder(sortOrder === "asc" ? "desc" : "asc");
										} else {
											setSortOrder("asc");
										}
									}}
								>
									<div className="flex items-center">
										Class Name
										{getSortIndicator("name")}
									</div>
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 hover:bg-gray-100 transition-colors"
									onClick={() => {
										setSortBy("strength");
										if (sortBy === "strength") {
											setSortOrder(sortOrder === "asc" ? "desc" : "asc");
										} else {
											setSortOrder("asc");
										}
									}}
								>
									<div className="flex items-center">
										Number of Students
										{getSortIndicator("strength")}
									</div>
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Class Teacher
								</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredAndSortedClasses.map((cls, index) => (
								<tr
									key={cls.id}
									className={`${
										index % 2 === 0 ? "bg-white" : "bg-gray-50"
									} hover:bg-gray-100 transition-colors`}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
												<span className="text-blue-600 font-semibold text-sm">
													{cls.id}
												</span>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className="font-medium text-gray-900">
											{cls.name}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<span className="text-gray-900 font-medium">
												{cls.strength}
											</span>
											<span className="text-gray-500 text-sm ml-1">
												students
											</span>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-gray-700">
										{cls.classTeacher}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-center relative">
										<div className="flex items-center justify-center gap-2">
											<button
												onClick={() => handleViewClass(cls.id)}
												className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
											>
												<Eye className="h-4 w-4 mr-1" />
												View
											</button>
											<button
												onClick={() =>
													setOpenDropdown(
														openDropdown === cls.id ? null : cls.id
													)
												}
												className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
												title="More options"
											>
												<MoreVertical className="h-4 w-4" />
											</button>
										</div>

										{/* Dropdown Menu */}
										{openDropdown === cls.id && (
											<div className="absolute right-0 top-12 z-10 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
												<button
													onClick={() => handleEditClass(cls.id)}
													className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
												>
													<Edit className="h-4 w-4" />
													Update
												</button>
												<button
													onClick={() => setShowDeleteConfirm(cls.id)}
													className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
												>
													<Trash2 className="h-4 w-4" />
													Delete
												</button>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Summary Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
					<div className="flex items-center">
						<div className="p-2 bg-blue-100 rounded-lg">
							<div className="w-6 h-6 bg-blue-600 rounded-full"></div>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-600">Total Classes</p>
							<p className="text-2xl font-bold text-gray-900">
								{CLASSES.length}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
					<div className="flex items-center">
						<div className="p-2 bg-green-100 rounded-lg">
							<div className="w-6 h-6 bg-green-600 rounded-full"></div>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-600">
								Total Students
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{CLASSES.reduce((sum, cls) => sum + cls.strength, 0)}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
					<div className="flex items-center">
						<div className="p-2 bg-purple-100 rounded-lg">
							<div className="w-6 h-6 bg-purple-600 rounded-full"></div>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-600">
								Active Teachers
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{new Set(CLASSES.map((cls) => cls.classTeacher)).size}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Delete Confirmation Modal */}
			{showDeleteConfirm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-xl max-w-md w-full">
						<div className="p-6 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900">
								Delete Class
							</h3>
						</div>
						<div className="p-6">
							<p className="text-gray-600 mb-4">
								Are you sure you want to delete{" "}
								<strong>Class {showDeleteConfirm}</strong>? This action cannot
								be undone and will remove all associated data.
							</p>
							<div className="flex gap-3">
								<button
									onClick={() => setShowDeleteConfirm(null)}
									className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => handleDeleteClass(showDeleteConfirm)}
									className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
								>
									Delete Class
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Click outside to close dropdown */}
			{openDropdown && (
				<div
					className="fixed inset-0 z-0"
					onClick={() => setOpenDropdown(null)}
				/>
			)}
		</div>
	);
}
