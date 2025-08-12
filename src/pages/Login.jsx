import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, RefreshCcw, GraduationCap } from "lucide-react";
import logo from "../assets/images/logo.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ROLES = [
	{ key: "admin", label: "Admin", icon: "👨‍💼" },
	{ key: "teacher", label: "Teacher", icon: "👩‍🏫" },
	{ key: "student", label: "Student/Parent", icon: "👨‍🎓" },
];

export default function Login() {
	const navigate = useNavigate();
	const [role, setRole] = useState("student");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [captchaInput, setCaptchaInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const captcha = useMemo(() => generateCaptcha(), [role]);

	function generateCaptcha() {
		return String(Math.floor(100000 + Math.random() * 900000));
	}

	const [captchaValue, setCaptchaValue] = useState(captcha);
	function refreshCaptcha() {
		setCaptchaValue(generateCaptcha());
		setCaptchaInput("");
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		if (captchaInput !== captchaValue) {
			setError("Invalid captcha");
			return;
		}
		setLoading(true);
		try {
			// TODO: Integrate with your auth API
			// await api.post('/auth/login', { username, password, role })
			// Temporary: navigate to dashboard for student/parents
			if (role === "student") {
				navigate("/dashboard");
			} else {
				alert(`Login submitted for ${username} as ${role}`);
			}
		} catch (err) {
			setError(err?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
			<div className="w-full max-w-md">
				{/* Logo and Title */}
				<div className="flex flex-col items-center mb-8">
					<div className="flex flex-col items-center mb-6">
						<img
							src={logo}
							alt="USMS"
							className=" sm:h-20 md:h-24 w-auto max-w-[140px] sm:max-w-[200px] md:max-w-[250px] object-contain"
						/>
					</div>
					<h1 className="text-2xl font-bold text-slate-800 mb-2">
						Welcome Back
					</h1>
					<p className="text-slate-600 text-center">
						Sign in to your account to continue
					</p>
				</div>

				{/* Login Card */}
				<Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="text-xl text-center text-slate-800">
							Sign In
						</CardTitle>
						<CardDescription className="text-center text-slate-600">
							Choose your role and enter your credentials
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Role Selection */}
						<div className="space-y-3">
							<Label className="text-sm font-medium text-slate-700">
								Select Role
							</Label>
							<Tabs value={role} onValueChange={setRole} className="w-full">
								<TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1">
									{ROLES.map((r) => (
										<TabsTrigger
											key={r.key}
											value={r.key}
											className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-slate-600 text-xs py-2"
										>

											{r.label}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
						</div>

						<Separator />

						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Username */}
							<div className="space-y-2">
								<Label
									htmlFor="username"
									className="text-sm font-medium text-slate-700"
								>
									Username
								</Label>
								<Input
									id="username"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
									placeholder="Enter your username"
									required
								/>
							</div>

							{/* Password */}
							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-sm font-medium text-slate-700"
								>
									Password
								</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="h-11 pr-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
										placeholder="Enter your password"
										required
									/>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => setShowPassword((v) => !v)}
										className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 p-0 hover:bg-slate-100"
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</Button>
								</div>
							</div>

							{/* Captcha */}
							<div className="space-y-3">
								<div className="flex items-center justify-start">
									<Label className="text-sm font-medium text-slate-700">
										Enter Captcha
									</Label>
								</div>

								<div className="flex flex-col sm:flex-row sm:items-center gap-3">
									<div className="sm:flex-1 grid grid-cols-[1fr_auto] gap-2">
										<div className="h-11 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 flex items-center w-full justify-center shrink-0">
											<span className="font-mono font-bold text-lg px-6 text-slate-700 tracking-wider select-none">
												{captchaValue}
											</span>
										</div>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={refreshCaptcha}
											className="h-11 w-11 shrink-0 border border-slate-200 rounded-lg hover:bg-slate-100 md:col-start-3"
											aria-label="Refresh captcha"
										>
											<RefreshCcw className="w-4 h-4" />
										</Button>
									</div>

									<Input
										type="text"
										inputMode="numeric"
										pattern="\\d{6}"
										maxLength={6}
										value={captchaInput}
										onChange={(e) => {
											const onlyDigits = e.target.value.replace(/\D/g, "");
											setCaptchaInput(onlyDigits);
										}}
										className="h-11 w-full min-w-0 col-span-2 md:col-span-1 md:col-start-2 text-center font-mono text-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
										placeholder="000000"
										required
										aria-label="Enter the 6-digit verification code"
									/>
								</div>
							</div>

							{/* Error Message */}
							{error && (
								<div className="p-3 rounded-lg bg-red-50 border border-red-200">
									<p className="text-sm text-red-600 flex items-center">
										<span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
										{error}
									</p>
								</div>
							)}

							{/* Submit Button */}
							<Button
								type="submit"
								disabled={loading}
								className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
							>
								{loading ? (
									<div className="flex items-center">
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
										Signing in...
									</div>
								) : (
									"Sign In"
								)}
							</Button>
						</form>

						{/* Footer Links */}
						<div className="text-center space-y-2">
							<Separator />
							<div className="flex items-center justify-center space-x-4 text-sm">
								<Button
									variant="link"
									className="text-slate-600 hover:text-blue-600 p-0 h-auto"
								>
									Forgot password?
								</Button>
								<span className="text-slate-400">•</span>
								<Button
									variant="link"
									className="text-slate-600 hover:text-blue-600 p-0 h-auto"
								>
									Need help?
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Footer */}
				<div className="mt-8 text-center">
					<p className="text-sm text-slate-500">
						© 2025 USMS. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
}
