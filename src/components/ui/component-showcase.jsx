import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Badge } from "./badge";
import { Separator } from "./separator";
import { Checkbox } from "./checkbox";
import { Switch } from "./switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import { Textarea } from "./textarea";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip";
import { Calendar } from "./calendar";
import { Skeleton } from "./skeleton";
import { Pagination } from "./pagination";
import { toast } from "./sonner";
import {
	Eye,
	Settings,
	User,
	Mail,
	Phone,
	Calendar as CalendarIcon,
	Search,
	Plus,
	Download,
	Upload,
	Trash2,
	Edit,
	MoreHorizontal,
} from "lucide-react";

export function ComponentShowcase() {
	const [date, setDate] = useState(new Date());
	const [currentPage, setCurrentPage] = useState(1);

	const handleToast = (type) => {
		switch (type) {
			case "success":
				toast.success("Operation completed successfully!");
				break;
			case "error":
				toast.error("Something went wrong!");
				break;
			case "info":
				toast.info("Here is some information for you.");
				break;
			case "warning":
				toast.warning("Please be careful with this action.");
				break;
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 p-6">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Header */}
				<div className="text-center">
					<h1 className="text-4xl font-bold text-slate-900 mb-4">
						shadcn/ui Component Showcase
					</h1>
					<p className="text-lg text-slate-600">
						All available components for your USMS project
					</p>
				</div>

				{/* Basic Components */}
				<Card>
					<CardHeader>
						<CardTitle>Basic Components</CardTitle>
						<CardDescription>
							Essential UI elements for forms and interactions
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Buttons */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Buttons</h3>
							<div className="flex flex-wrap gap-2">
								<Button>Default</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="destructive">Destructive</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="link">Link</Button>
								<Button size="sm">Small</Button>
								<Button size="lg">Large</Button>
								<Button disabled>Disabled</Button>
							</div>
						</div>

						{/* Inputs */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Inputs</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Enter password"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="textarea">Message</Label>
									<Textarea id="textarea" placeholder="Enter your message" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="select">Role</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="teacher">Teacher</SelectItem>
											<SelectItem value="student">Student</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>

						{/* Checkboxes and Switches */}
						<div>
							<h3 className="text-lg font-semibold mb-3">
								Checkboxes & Switches
							</h3>
							<div className="flex items-center gap-6">
								<div className="flex items-center space-x-2">
									<Checkbox id="terms" />
									<Label htmlFor="terms">Accept terms and conditions</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch id="notifications" />
									<Label htmlFor="notifications">Enable notifications</Label>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Data Display */}
				<Card>
					<CardHeader>
						<CardTitle>Data Display</CardTitle>
						<CardDescription>
							Components for showing information and data
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Badges */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Badges</h3>
							<div className="flex flex-wrap gap-2">
								<Badge>Default</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<Badge variant="destructive">Destructive</Badge>
								<Badge variant="outline">Outline</Badge>
								<Badge variant="success">Success</Badge>
								<Badge variant="warning">Warning</Badge>
							</div>
						</div>

						{/* Table */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Table</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">John Doe</TableCell>
										<TableCell>Student</TableCell>
										<TableCell>
											<Badge variant="success">Active</Badge>
										</TableCell>
										<TableCell>
											<Button variant="ghost" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">Jane Smith</TableCell>
										<TableCell>Teacher</TableCell>
										<TableCell>
											<Badge variant="warning">Pending</Badge>
										</TableCell>
										<TableCell>
											<Button variant="ghost" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>

						{/* Pagination */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Pagination</h3>
							<Pagination
								page={currentPage}
								pageSize={10}
								total={100}
								onPageChange={setCurrentPage}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Navigation & Layout */}
				<Card>
					<CardHeader>
						<CardTitle>Navigation & Layout</CardTitle>
						<CardDescription>
							Components for organizing content and navigation
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Tabs */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Tabs</h3>
							<Tabs defaultValue="overview" className="w-full">
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="overview">Overview</TabsTrigger>
									<TabsTrigger value="analytics">Analytics</TabsTrigger>
									<TabsTrigger value="reports">Reports</TabsTrigger>
								</TabsList>
								<TabsContent value="overview" className="mt-4">
									<p className="text-sm text-slate-600">
										This is the overview content.
									</p>
								</TabsContent>
								<TabsContent value="analytics" className="mt-4">
									<p className="text-sm text-slate-600">
										Analytics data goes here.
									</p>
								</TabsContent>
								<TabsContent value="reports" className="mt-4">
									<p className="text-sm text-slate-600">
										Reports and insights.
									</p>
								</TabsContent>
							</Tabs>
						</div>

						{/* Dropdown Menu */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Dropdown Menu</h3>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline">
										<MoreHorizontal className="h-4 w-4 mr-2" />
										Actions
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>
										<Edit className="h-4 w-4 mr-2" />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Download className="h-4 w-4 mr-2" />
										Download
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="text-red-600">
										<Trash2 className="h-4 w-4 mr-2" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</CardContent>
				</Card>

				{/* Interactive Components */}
				<Card>
					<CardHeader>
						<CardTitle>Interactive Components</CardTitle>
						<CardDescription>
							Components for user interactions and feedback
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Dialog */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Dialog</h3>
							<Dialog>
								<DialogTrigger asChild>
									<Button>Open Dialog</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Are you sure?</DialogTitle>
										<DialogDescription>
											This action cannot be undone. This will permanently delete
											your account.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter>
										<Button variant="outline">Cancel</Button>
										<Button variant="destructive">Delete</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>

						{/* Tooltip */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Tooltip</h3>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="outline">Hover me</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>This is a helpful tooltip!</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>

						{/* Toast Buttons */}
						<div>
							<h3 className="text-lg font-semibold mb-3">
								Toast Notifications
							</h3>
							<div className="flex gap-2">
								<Button
									onClick={() => handleToast("success")}
									variant="outline"
								>
									Success Toast
								</Button>
								<Button onClick={() => handleToast("error")} variant="outline">
									Error Toast
								</Button>
								<Button onClick={() => handleToast("info")} variant="outline">
									Info Toast
								</Button>
								<Button
									onClick={() => handleToast("warning")}
									variant="outline"
								>
									Warning Toast
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Utility Components */}
				<Card>
					<CardHeader>
						<CardTitle>Utility Components</CardTitle>
						<CardDescription>Helper components for better UX</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Avatar */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Avatar</h3>
							<div className="flex items-center gap-4">
								<Avatar>
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<Avatar>
									<AvatarFallback>JS</AvatarFallback>
								</Avatar>
							</div>
						</div>

						{/* Skeleton */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Skeleton Loading</h3>
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
								<Skeleton className="h-4 w-[300px]" />
							</div>
						</div>

						{/* Calendar */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Calendar</h3>
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								className="rounded-md border"
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

