import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({ className, ...props }) {
	return (
		<DialogPrimitive.Overlay
			className={cn(
				"fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
				className
			)}
			{...props}
		/>
	);
}

export function DialogContent({ className, ...props }) {
	return (
		<DialogPrimitive.Portal>
			<DialogOverlay />
			<DialogPrimitive.Content
				className={cn(
					"fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow focus:outline-none",
					className
				)}
				{...props}
			/>
		</DialogPrimitive.Portal>
	);
}

export function DialogHeader({ className, ...props }) {
	return (
		<div
			className={cn(
				"flex flex-col space-y-1.5 text-center sm:text-left",
				className
			)}
			{...props}
		/>
	);
}

export function DialogTitle({ className, ...props }) {
	return (
		<h2
			className={cn(
				"text-lg font-semibold leading-none tracking-tight",
				className
			)}
			{...props}
		/>
	);
}

export function DialogDescription({ className, ...props }) {
	return (
		<p className={cn("text-sm text-muted-foreground", className)} {...props} />
	);
}

export function DialogFooter({ className, ...props }) {
	return (
		<div
			className={cn(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				className
			)}
			{...props}
		/>
	);
}











