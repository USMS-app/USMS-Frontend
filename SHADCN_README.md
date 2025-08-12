# shadcn/ui Setup Guide

This project has been configured with shadcn/ui, a collection of reusable components built on top of Tailwind CSS.

## What's Been Installed

- **shadcn/ui**: Component library and CLI
- **class-variance-authority**: For component variants
- **clsx**: For conditional class names
- **tailwind-merge**: For merging Tailwind classes without conflicts
- **Radix UI primitives**: For accessible component foundations
- **Additional libraries**: react-day-picker, date-fns, sonner

## Configuration Files

- `components.json`: shadcn/ui configuration
- `src/lib/utils.js`: Utility functions (including the `cn` function)
- `vite.config.js`: Updated with path aliases (`@/` points to `src/`)

## CSS Variables

The project includes a comprehensive set of CSS variables for theming:

- Light and dark theme support
- Primary, secondary, accent, and destructive colors
- Extended color palette for modern design (slate, blue, indigo variants)
- Consistent spacing and border radius

## Using Components

### 1. Import Components

```jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

### 2. Use the `cn` Utility

```jsx
import { cn } from "@/lib/utils";

// Merge classes safely
const className = cn(
	"base-classes",
	conditional && "conditional-classes",
	props.className
);
```

### 3. Component Variants

```jsx
<Button variant="default" size="lg">
	Click me
</Button>
```

## Available Components

### Basic Components

- **Button**: Multiple variants (default, secondary, destructive, outline, ghost, link) and sizes
- **Input**: Form input with focus states
- **Label**: Accessible form labels
- **Textarea**: Multi-line text input
- **Checkbox**: Form checkbox with states
- **Switch**: Toggle switch component

### Data Display

- **Badge**: Status indicators with variants
- **Table**: Data tables with headers, rows, and cells
- **Avatar**: User profile images with fallbacks
- **Skeleton**: Loading placeholders
- **Calendar**: Date picker component

### Layout & Navigation

- **Card**: Content containers with headers, content, and footers
- **Tabs**: Tabbed interface for organizing content
- **Separator**: Visual dividers
- **Pagination**: Page navigation controls

### Interactive Components

- **Dialog**: Modal dialogs for confirmations and forms
- **DropdownMenu**: Context menus and action lists
- **Popover**: Floating content panels
- **Tooltip**: Hover information displays

### Feedback & Notifications

- **Toaster**: Global toast notifications (via sonner)
- **Toast functions**: `toast.success()`, `toast.error()`, `toast.info()`, `toast.warning()`

## Updated Login Page

The Login page has been completely redesigned with a modern, clean interface using shadcn/ui components:

### New Features

- **Modern Design**: Clean, minimalist interface with gradient backgrounds
- **Role Selection**: Elegant tabs for Admin, Teacher, and Student/Parent roles
- **Enhanced UX**: Better form layout, improved captcha design, loading states
- **Responsive**: Mobile-first design that works on all screen sizes
- **Accessibility**: Proper labels, ARIA attributes, and keyboard navigation

### Design Elements

- Gradient background (slate-50 to blue-50 to indigo-100)
- Glass-morphism card effect with backdrop blur
- Modern color scheme using CSS variables
- Smooth transitions and hover effects
- Professional typography and spacing

## Component Showcase

A comprehensive showcase component is available at `src/components/ui/component-showcase.jsx` that demonstrates all available components with examples and usage patterns.

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
│       ├── button.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── card.jsx
│       ├── tabs.jsx
│       ├── badge.jsx
│       ├── table.jsx
│       ├── dialog.jsx
│       ├── dropdown-menu.jsx
│       ├── select.jsx
│       ├── checkbox.jsx
│       ├── switch.jsx
│       ├── textarea.jsx
│       ├── avatar.jsx
│       ├── calendar.jsx
│       ├── pagination.jsx
│       ├── skeleton.jsx
│       ├── separator.jsx
│       ├── popover.jsx
│       ├── tooltip.jsx
│       ├── sonner.jsx
│       ├── demo.jsx
│       └── component-showcase.jsx
├── lib/
│   └── utils.js      # Utility functions
└── index.css         # Global styles with CSS variables
```

## Usage Examples for USMS MVP

### Student Records Management

```jsx
// Table for student list
<Table>
	<TableHeader>
		<TableRow>
			<TableHead>Name</TableHead>
			<TableHead>Grade</TableHead>
			<TableHead>Status</TableHead>
			<TableHead>Actions</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		<TableRow>
			<TableCell>John Doe</TableCell>
			<TableCell>10th Grade</TableCell>
			<TableCell>
				<Badge variant="success">Active</Badge>
			</TableCell>
			<TableCell>
				<Button variant="ghost" size="sm">
					Edit
				</Button>
			</TableCell>
		</TableRow>
	</TableBody>
</Table>
```

### Attendance Marking

```jsx
// Checkbox for attendance
<div className="flex items-center space-x-2">
	<Checkbox id="attendance-1" />
	<Label htmlFor="attendance-1">Present</Label>
</div>
```

### Grade Entry

```jsx
// Select for grade selection
<Select>
	<SelectTrigger>
		<SelectValue placeholder="Select grade" />
	</SelectTrigger>
	<SelectContent>
		<SelectItem value="A">A (90-100)</SelectItem>
		<SelectItem value="B">B (80-89)</SelectItem>
		<SelectItem value="C">C (70-79)</SelectItem>
	</SelectContent>
</Select>
```

### Report Generation

```jsx
// Dialog for confirmation
<Dialog>
	<DialogTrigger asChild>
		<Button>Generate Report</Button>
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Generate Monthly Report</DialogTitle>
			<DialogDescription>
				This will create and send reports to all parents via WhatsApp.
			</DialogDescription>
		</DialogHeader>
		<DialogFooter>
			<Button variant="outline">Cancel</Button>
			<Button onClick={generateReport}>Generate</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
```

### Toast Notifications

```jsx
// Success notification
import { toast } from "@/components/ui/sonner";

const handleSave = async () => {
	try {
		await saveData();
		toast.success("Data saved successfully!");
	} catch (error) {
		toast.error("Failed to save data");
	}
};
```

## Troubleshooting

### Path Alias Issues

If you get import errors with `@/`, ensure:

- `vite.config.js` has the correct alias configuration
- Components use the `@/` prefix for imports

### Missing CSS Variables

If components don't look right, check:

- All required CSS variables are defined in `index.css`
- Both light and dark themes have the same variables

### Component Not Working

- Verify the component file exists in `src/components/ui/`
- Check that all dependencies are imported correctly
- Ensure the `cn` utility is used for class merging

## Next Steps

1. **Test the new Login page** - Navigate to `/` to see the redesigned interface
2. **Explore components** - Use the component showcase for reference
3. **Build your dashboard** - Start implementing admin, teacher, and student views
4. **Add more features** - Implement attendance, grades, and reporting systems
5. **Customize theme** - Modify colors and styles in `index.css`

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Component Examples](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
