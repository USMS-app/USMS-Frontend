import { cn } from "@/lib/utils";

export function Pagination({ page, pageSize, total, onPageChange }) {
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const prev = () => onPageChange(Math.max(1, page - 1));
	const next = () => onPageChange(Math.min(totalPages, page + 1));

	return (
		<div className="flex items-center gap-2">
			<button
				className={cn(
					"h-9 rounded border px-3 text-sm",
					page === 1 && "opacity-50 cursor-not-allowed"
				)}
				onClick={prev}
				disabled={page === 1}
			>
				Prev
			</button>
			<span className="text-sm text-muted-foreground">
				Page {page} of {totalPages}
			</span>
			<button
				className={cn(
					"h-9 rounded border px-3 text-sm",
					page === totalPages && "opacity-50 cursor-not-allowed"
				)}
				onClick={next}
				disabled={page === totalPages}
			>
				Next
			</button>
		</div>
	);
}

