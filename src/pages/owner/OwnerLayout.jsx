import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Building2,
	BarChart3,
	Users,
	GraduationCap,
	Settings,
	Menu,
	X,
	LogOut,
} from "lucide-react";

const OwnerLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation();

	const navigation = [
		{ name: "Dashboard", href: "/owner", icon: BarChart3 },
		{ name: "Schools", href: "/owner/schools", icon: Building2 },
		{ name: "Analytics", href: "/owner/analytics", icon: BarChart3 },
		{ name: "Settings", href: "/owner/settings", icon: Settings },
	];

	const isActive = (href) => {
		if (href === "/owner") {
			return location.pathname === "/owner";
		}
		return location.pathname.startsWith(href);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile sidebar */}
			<div
				className={`fixed inset-0 z-50 lg:hidden ${
					sidebarOpen ? "block" : "hidden"
				}`}
			>
				<div
					className="fixed inset-0 bg-gray-600 bg-opacity-75"
					onClick={() => setSidebarOpen(false)}
				/>
				<div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
					<div className="flex h-16 items-center justify-between px-4">
						<h1 className="text-xl font-bold text-gray-900">Owner Dashboard</h1>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setSidebarOpen(false)}
						>
							<X className="h-6 w-6" />
						</Button>
					</div>
					<nav className="flex-1 space-y-1 px-2 py-4">
						{navigation.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.name}
									to={item.href}
									className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
										isActive(item.href)
											? "bg-blue-100 text-blue-700"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									}`}
									onClick={() => setSidebarOpen(false)}
								>
									<Icon className="mr-3 h-5 w-5" />
									{item.name}
								</Link>
							);
						})}
					</nav>
				</div>
			</div>

			{/* Desktop sidebar */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
				<div className="flex flex-col flex-grow bg-white border-r border-gray-200">
					<div className="flex items-center h-16 px-4 border-b border-gray-200">
						<h1 className="text-xl font-bold text-gray-900">Owner Dashboard</h1>
					</div>
					<nav className="flex-1 space-y-1 px-2 py-4">
						{navigation.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.name}
									to={item.href}
									className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
										isActive(item.href)
											? "bg-blue-100 text-blue-700"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									}`}
								>
									<Icon className="mr-3 h-5 w-5" />
									{item.name}
								</Link>
							);
						})}
					</nav>
					<div className="border-t border-gray-200 p-4">
						<Button
							variant="ghost"
							className="w-full justify-start text-gray-600 hover:text-gray-900"
						>
							<LogOut className="mr-3 h-5 w-5" />
							Logout
						</Button>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="lg:pl-64">
				{/* Mobile header */}
				<div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setSidebarOpen(true)}
					>
						<Menu className="h-6 w-6" />
					</Button>
					<h1 className="text-lg font-semibold text-gray-900">
						Owner Dashboard
					</h1>
				</div>

				{/* Page content */}
				<main className="py-6">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default OwnerLayout;



