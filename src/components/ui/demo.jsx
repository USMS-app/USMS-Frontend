import { Button } from "./button";

export function ButtonDemo() {
	return (
		<div className="p-8 space-y-4">
			<h2 className="text-2xl font-bold text-foreground">
				shadcn/ui Button Demo
			</h2>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Variants</h3>
				<div className="flex flex-wrap gap-2">
					<Button variant="default">Default</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Sizes</h3>
				<div className="flex flex-wrap items-center gap-2">
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
					<Button size="icon">🔍</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">States</h3>
				<div className="flex flex-wrap gap-2">
					<Button>Normal</Button>
					<Button disabled>Disabled</Button>
					<Button className="opacity-50">Custom Style</Button>
				</div>
			</div>
		</div>
	);
}

