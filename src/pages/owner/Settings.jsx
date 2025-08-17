import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	Settings as SettingsIcon,
	Bell,
	Shield,
	Globe,
	Save,
	RefreshCw,
} from "lucide-react";

const Settings = () => {
	const [settings, setSettings] = useState({
		notifications: {
			emailAlerts: true,
			smsAlerts: false,
			newSchoolRegistration: true,
			systemMaintenance: true,
			billingReminders: true,
		},
		security: {
			twoFactorAuth: false,
			sessionTimeout: 30,
			passwordPolicy: "strong",
			ipWhitelist: "",
		},
		system: {
			autoBackup: true,
			backupFrequency: "daily",
			maintenanceMode: false,
			debugMode: false,
		},
		appearance: {
			theme: "light",
			language: "en",
			timezone: "Asia/Kolkata",
		},
	});

	const [loading, setLoading] = useState(false);

	const handleSettingChange = (category, key, value) => {
		setSettings((prev) => ({
			...prev,
			[category]: {
				...prev[category],
				[key]: value,
			},
		}));
	};

	const handleSave = async () => {
		setLoading(true);

		// Simulate API call
		setTimeout(() => {
			alert("Settings saved successfully!");
			setLoading(false);
		}, 1000);
	};

	const handleReset = () => {
		if (
			window.confirm("Are you sure you want to reset all settings to default?")
		) {
			// Reset to default values
			setSettings({
				notifications: {
					emailAlerts: true,
					smsAlerts: false,
					newSchoolRegistration: true,
					systemMaintenance: true,
					billingReminders: true,
				},
				security: {
					twoFactorAuth: false,
					sessionTimeout: 30,
					passwordPolicy: "strong",
					ipWhitelist: "",
				},
				system: {
					autoBackup: true,
					backupFrequency: "daily",
					maintenanceMode: false,
					debugMode: false,
				},
				appearance: {
					theme: "light",
					language: "en",
					timezone: "Asia/Kolkata",
				},
			});
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
					<p className="text-gray-600 mt-1">
						Configure your platform settings and preferences
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						onClick={handleReset}
						className="flex items-center gap-2"
					>
						<RefreshCw className="h-4 w-4" />
						Reset to Default
					</Button>
					<Button
						onClick={handleSave}
						disabled={loading}
						className="flex items-center gap-2"
					>
						{loading ? (
							<RefreshCw className="h-4 w-4 animate-spin" />
						) : (
							<Save className="h-4 w-4" />
						)}
						Save Changes
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Notifications */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Bell className="h-5 w-5" />
							Notifications
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="emailAlerts" className="text-sm">
								Email Alerts
							</Label>
							<Switch
								id="emailAlerts"
								checked={settings.notifications.emailAlerts}
								onCheckedChange={(checked) =>
									handleSettingChange("notifications", "emailAlerts", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="smsAlerts" className="text-sm">
								SMS Alerts
							</Label>
							<Switch
								id="smsAlerts"
								checked={settings.notifications.smsAlerts}
								onCheckedChange={(checked) =>
									handleSettingChange("notifications", "smsAlerts", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="newSchoolRegistration" className="text-sm">
								New School Registration
							</Label>
							<Switch
								id="newSchoolRegistration"
								checked={settings.notifications.newSchoolRegistration}
								onCheckedChange={(checked) =>
									handleSettingChange(
										"notifications",
										"newSchoolRegistration",
										checked
									)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="systemMaintenance" className="text-sm">
								System Maintenance
							</Label>
							<Switch
								id="systemMaintenance"
								checked={settings.notifications.systemMaintenance}
								onCheckedChange={(checked) =>
									handleSettingChange(
										"notifications",
										"systemMaintenance",
										checked
									)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="billingReminders" className="text-sm">
								Billing Reminders
							</Label>
							<Switch
								id="billingReminders"
								checked={settings.notifications.billingReminders}
								onCheckedChange={(checked) =>
									handleSettingChange(
										"notifications",
										"billingReminders",
										checked
									)
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Security */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Shield className="h-5 w-5" />
							Security
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="twoFactorAuth" className="text-sm">
								Two-Factor Authentication
							</Label>
							<Switch
								id="twoFactorAuth"
								checked={settings.security.twoFactorAuth}
								onCheckedChange={(checked) =>
									handleSettingChange("security", "twoFactorAuth", checked)
								}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="sessionTimeout" className="text-sm">
								Session Timeout (minutes)
							</Label>
							<Select
								value={settings.security.sessionTimeout.toString()}
								onValueChange={(value) =>
									handleSettingChange(
										"security",
										"sessionTimeout",
										parseInt(value)
									)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="15">15 minutes</SelectItem>
									<SelectItem value="30">30 minutes</SelectItem>
									<SelectItem value="60">1 hour</SelectItem>
									<SelectItem value="120">2 hours</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="passwordPolicy" className="text-sm">
								Password Policy
							</Label>
							<Select
								value={settings.security.passwordPolicy}
								onValueChange={(value) =>
									handleSettingChange("security", "passwordPolicy", value)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="basic">Basic (8+ characters)</SelectItem>
									<SelectItem value="strong">
										Strong (12+ characters, mixed case, symbols)
									</SelectItem>
									<SelectItem value="very-strong">
										Very Strong (16+ characters, mixed case, symbols, numbers)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="ipWhitelist" className="text-sm">
								IP Whitelist (optional)
							</Label>
							<Input
								id="ipWhitelist"
								placeholder="192.168.1.1, 10.0.0.1"
								value={settings.security.ipWhitelist}
								onChange={(e) =>
									handleSettingChange("security", "ipWhitelist", e.target.value)
								}
							/>
							<p className="text-xs text-gray-500">
								Comma-separated IP addresses for restricted access
							</p>
						</div>
					</CardContent>
				</Card>

				{/* System */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<SettingsIcon className="h-5 w-5" />
							System
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="autoBackup" className="text-sm">
								Automatic Backup
							</Label>
							<Switch
								id="autoBackup"
								checked={settings.system.autoBackup}
								onCheckedChange={(checked) =>
									handleSettingChange("system", "autoBackup", checked)
								}
							/>
						</div>

						{settings.system.autoBackup && (
							<div className="space-y-2">
								<Label htmlFor="backupFrequency" className="text-sm">
									Backup Frequency
								</Label>
								<Select
									value={settings.system.backupFrequency}
									onValueChange={(value) =>
										handleSettingChange("system", "backupFrequency", value)
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="daily">Daily</SelectItem>
										<SelectItem value="weekly">Weekly</SelectItem>
										<SelectItem value="monthly">Monthly</SelectItem>
									</SelectContent>
								</Select>
							</div>
						)}

						<div className="flex items-center justify-between">
							<Label htmlFor="maintenanceMode" className="text-sm">
								Maintenance Mode
							</Label>
							<Switch
								id="maintenanceMode"
								checked={settings.system.maintenanceMode}
								onCheckedChange={(checked) =>
									handleSettingChange("system", "maintenanceMode", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="debugMode" className="text-sm">
								Debug Mode
							</Label>
							<Switch
								id="debugMode"
								checked={settings.system.debugMode}
								onCheckedChange={(checked) =>
									handleSettingChange("system", "debugMode", checked)
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Appearance */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Globe className="h-5 w-5" />
							Appearance
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="theme" className="text-sm">
								Theme
							</Label>
							<Select
								value={settings.appearance.theme}
								onValueChange={(value) =>
									handleSettingChange("appearance", "theme", value)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="auto">Auto (System)</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="language" className="text-sm">
								Language
							</Label>
							<Select
								value={settings.appearance.language}
								onValueChange={(value) =>
									handleSettingChange("appearance", "language", value)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="en">English</SelectItem>
									<SelectItem value="hi">Hindi</SelectItem>
									<SelectItem value="bn">Bengali</SelectItem>
									<SelectItem value="ta">Tamil</SelectItem>
									<SelectItem value="te">Telugu</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="timezone" className="text-sm">
								Timezone
							</Label>
							<Select
								value={settings.appearance.timezone}
								onValueChange={(value) =>
									handleSettingChange("appearance", "timezone", value)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
									<SelectItem value="Asia/Dubai">Dubai (GST)</SelectItem>
									<SelectItem value="Asia/Singapore">
										Singapore (SGT)
									</SelectItem>
									<SelectItem value="UTC">UTC</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Danger Zone */}
			<Card className="border-red-200">
				<CardHeader>
					<CardTitle className="text-red-800">Danger Zone</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
						<div>
							<h4 className="font-medium text-red-800">Delete All Data</h4>
							<p className="text-sm text-red-600">
								Permanently delete all schools and data. This action cannot be
								undone.
							</p>
						</div>
						<Button variant="destructive" size="sm">
							Delete All Data
						</Button>
					</div>

					<div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
						<div>
							<h4 className="font-medium text-red-800">Export Data</h4>
							<p className="text-sm text-red-600">
								Export all data in various formats for backup or migration.
							</p>
						</div>
						<Button variant="outline" size="sm">
							Export Data
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Settings;



