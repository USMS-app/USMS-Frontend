import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
	ArrowLeft,
	Building2,
	User,
	Lock,
	Copy,
	CheckCircle,
} from "lucide-react";

const AddSchool = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		city: undefined,
		state: undefined,
		contactPerson: "",
		mobile: "",
		email: "",
		website: "",
	});

	const [generatedCredentials, setGeneratedCredentials] = useState({
		username: "",
		password: "",
	});

	const [showCredentials, setShowCredentials] = useState(false);
	const [copied, setCopied] = useState({ username: false, password: false });

	const states = [
		"Andhra Pradesh",
		"Arunachal Pradesh",
		"Assam",
		"Bihar",
		"Chhattisgarh",
		"Goa",
		"Gujarat",
		"Haryana",
		"Himachal Pradesh",
		"Jharkhand",
		"Karnataka",
		"Kerala",
		"Madhya Pradesh",
		"Maharashtra",
		"Manipur",
		"Meghalaya",
		"Mizoram",
		"Nagaland",
		"Odisha",
		"Punjab",
		"Rajasthan",
		"Sikkim",
		"Tamil Nadu",
		"Telangana",
		"Tripura",
		"Uttar Pradesh",
		"Uttarakhand",
		"West Bengal",
		"Delhi",
		"Jammu & Kashmir",
	];

	const cities = {
		Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
		Delhi: ["New Delhi", "Delhi", "North Delhi", "South Delhi"],
		Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
		"Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
		"West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
		Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
		"Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
		Telangana: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"],
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => {
			const newData = { ...prev, [field]: value };
			// Reset city when state changes
			if (field === "state") {
				newData.city = undefined;
			}
			return newData;
		});
	};

	const generateCredentials = () => {
		// Generate username: first 3 letters of school name + random 3 digits
		const schoolPrefix = formData.name
			.replace(/[^a-zA-Z]/g, "")
			.substring(0, 3)
			.toUpperCase();
		const randomDigits = Math.floor(Math.random() * 900) + 100;
		const username = `${schoolPrefix}${randomDigits}`;

		// Generate password: 8 characters with mix of letters, numbers, and symbols
		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
		let password = "";
		for (let i = 0; i < 8; i++) {
			password += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		setGeneratedCredentials({ username, password });
		setShowCredentials(true);
	};

	const copyToClipboard = async (text, field) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied((prev) => ({ ...prev, [field]: true }));
			setTimeout(
				() => setCopied((prev) => ({ ...prev, [field]: false })),
				2000
			);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!showCredentials) {
			generateCredentials();
			return;
		}

		// Here you would typically make an API call to create the school
		const schoolData = {
			...formData,
			...generatedCredentials,
			status: "Active",
			joinedDate: new Date().toISOString(),
			students: 0,
			teachers: 0,
			classes: 0,
		};

		console.log("Creating school:", schoolData);

		// Simulate API call
		setTimeout(() => {
			alert("School created successfully! Please save the credentials.");
			navigate("/owner/schools");
		}, 1000);
	};

	const isFormValid = () => {
		return (
			formData.name &&
			formData.address &&
			formData.city &&
			formData.state &&
			formData.contactPerson &&
			formData.mobile &&
			formData.email
		);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => navigate("/owner/schools")}
				>
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Add New School</h1>
					<p className="text-gray-600 mt-1">
						Create a new school account with automatic credentials
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* School Information Form */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Building2 className="h-5 w-5" />
							School Information
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">School Name *</Label>
								<Input
									id="name"
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									placeholder="Enter school name"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="address">Address *</Label>
								<Textarea
									id="address"
									value={formData.address}
									onChange={(e) => handleInputChange("address", e.target.value)}
									placeholder="Enter complete address"
									rows={3}
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="state">State *</Label>
									<Select
										value={formData.state || ""}
										onValueChange={(value) => handleInputChange("state", value)}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select state" />
										</SelectTrigger>
										<SelectContent>
											{states.map((state) => (
												<SelectItem key={state} value={state}>
													{state}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="city">City *</Label>
									<Select
										value={formData.city || ""}
										onValueChange={(value) => handleInputChange("city", value)}
										disabled={!formData.state}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select city" />
										</SelectTrigger>
										<SelectContent>
											{formData.state && cities[formData.state] ? (
												cities[formData.state].map((city) => (
													<SelectItem key={city} value={city}>
														{city}
													</SelectItem>
												))
											) : (
												<SelectItem value="select-state-first" disabled>
													Select state first
												</SelectItem>
											)}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="website">Website (Optional)</Label>
								<Input
									id="website"
									type="url"
									value={formData.website}
									onChange={(e) => handleInputChange("website", e.target.value)}
									placeholder="https://www.schoolname.edu"
								/>
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={!isFormValid()}
							>
								{showCredentials ? "Create School" : "Generate Credentials"}
							</Button>
						</form>
					</CardContent>
				</Card>

				{/* Contact Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Contact Information
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="contactPerson">Contact Person *</Label>
								<Input
									id="contactPerson"
									value={formData.contactPerson}
									onChange={(e) =>
										handleInputChange("contactPerson", e.target.value)
									}
									placeholder="Enter contact person name"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="mobile">Mobile Number *</Label>
								<Input
									id="mobile"
									value={formData.mobile}
									onChange={(e) => handleInputChange("mobile", e.target.value)}
									placeholder="+91 98765 43210"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email Address *</Label>
								<Input
									id="email"
									type="email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									placeholder="admin@schoolname.edu"
									required
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Generated Credentials */}
			{showCredentials && (
				<Card className="border-green-200 bg-green-50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-green-800">
							<CheckCircle className="h-5 w-5" />
							Generated Login Credentials
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
								<p className="text-sm text-yellow-800 font-medium">
									⚠️ Please save these credentials securely. They will be sent
									to the school's email address.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label className="text-green-800 font-medium">Username</Label>
									<div className="flex items-center gap-2">
										<Input
											value={generatedCredentials.username}
											readOnly
											className="bg-white font-mono"
										/>
										<Button
											type="button"
											variant="outline"
											size="icon"
											onClick={() =>
												copyToClipboard(
													generatedCredentials.username,
													"username"
												)
											}
										>
											{copied.username ? (
												<CheckCircle className="h-4 w-4 text-green-600" />
											) : (
												<Copy className="h-4 w-4" />
											)}
										</Button>
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-green-800 font-medium">Password</Label>
									<div className="flex items-center gap-2">
										<Input
											value={generatedCredentials.password}
											readOnly
											className="bg-white font-mono"
										/>
										<Button
											type="button"
											variant="outline"
											size="icon"
											onClick={() =>
												copyToClipboard(
													generatedCredentials.password,
													"password"
												)
											}
										>
											{copied.password ? (
												<CheckCircle className="h-4 w-4 text-green-600" />
											) : (
												<Copy className="h-4 w-4" />
											)}
										</Button>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-4 pt-4">
								<Button
									type="button"
									onClick={() => setShowCredentials(false)}
									variant="outline"
								>
									Back to Form
								</Button>
								<Button
									type="submit"
									onClick={handleSubmit}
									className="bg-green-600 hover:bg-green-700"
								>
									Create School Account
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default AddSchool;
