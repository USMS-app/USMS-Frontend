import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: true, // listen on all addresses so tunnels work
		port: 5173,
		// Allow ngrok host(s)
		allowedHosts: [
			process.env.NGROK_HOST || "",
			"7f80749c3139.ngrok-free.app",
		].filter(Boolean),
		// Improve HMR over tunnels
		hmr: process.env.NGROK_HOST
			? { host: process.env.NGROK_HOST, protocol: "https" }
			: undefined,
	},
});
