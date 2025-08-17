import { cn } from "@/lib/utils";

const variants = {
	default: "bg-secondary text-secondary-foreground",
	outline: "text-foreground border border-border",
	success: "bg-emerald-500/15 text-emerald-700",
	warning: "bg-amber-500/15 text-amber-700",
	destructive: "bg-destructive/15 text-destructive",
};

export function Badge({ className, variant = "default", ...props }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
				variants[variant] || variants.default,
				className
			)}
			{...props}
		/>
	);
}











