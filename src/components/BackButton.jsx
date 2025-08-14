import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({
	to = "/admin",
	onClick,
	className = "",
	children = "Back to Dashboard",
}) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (onClick) {
			onClick();
		} else {
			navigate(to);
		}
	};

	return (
		<button
			onClick={handleClick}
			className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 ${className}`}
		>
			<ArrowLeft size={20} />
			<span>{children}</span>
		</button>
	);
}
