import React from "react";
import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Academics() {
	const navigate = useNavigate();

	// Mock data for different tests/exams with the 6 subjects
	const examData = [
		{
			name: "FA1 Test",
			date: "August 2024",
			subjects: [
				{
					slno: 1,
					subject: "Kannada",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 17,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 2,
					subject: "English",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 18,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 3,
					subject: "Hindi",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 15,
					letterGrade: "B+",
					status: "Pass",
				},
				{
					slno: 4,
					subject: "Social",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 16,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 5,
					subject: "Science",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 19,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 6,
					subject: "Maths",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 16,
					letterGrade: "A",
					status: "Pass",
				},
			],
		},
		{
			name: "FA2 Test",
			date: "September 2024",
			subjects: [
				{
					slno: 1,
					subject: "Kannada",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 18,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 2,
					subject: "English",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 19,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 3,
					subject: "Hindi",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 16,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 4,
					subject: "Social",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 17,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 5,
					subject: "Science",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 20,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 6,
					subject: "Maths",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 17,
					letterGrade: "A",
					status: "Pass",
				},
			],
		},
		{
			name: "MID-TERM",
			date: "October 2024",
			subjects: [
				{
					slno: 1,
					subject: "Kannada",
					maxMarks: 100,
					minMarks: 35,
					marksScored: 85,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 2,
					subject: "English",
					maxMarks: 100,
					minMarks: 35,
					marksScored: 92,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 3,
					subject: "Hindi",
					maxMarks: 100,
					minMarks: 35,
					marksScored: 78,
					letterGrade: "B+",
					status: "Pass",
				},
				{
					slno: 4,
					subject: "Social",
					maxMarks: 100,
					minMarks: 35,
					marksScored: 88,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 5,
					subject: "Science",
					maxMarks: 100,
					minMarks: 35,
					marksScored: 95,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 6,
					subject: "Maths",
					maxMarks: 100,
					minMarks: 35,
					marksScored: 82,
					letterGrade: "A",
					status: "Pass",
				},
			],
		},
		{
			name: "FA4 Test",
			date: "November 2024",
			subjects: [
				{
					slno: 1,
					subject: "Kannada",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 19,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 2,
					subject: "English",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 20,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 3,
					subject: "Hindi",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 17,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 4,
					subject: "Social",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 18,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 5,
					subject: "Science",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 19,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 6,
					subject: "Maths",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 18,
					letterGrade: "A",
					status: "Pass",
				},
			],
		},
		{
			name: "FA5 Test",
			date: "December 2024",
			subjects: [
				{
					slno: 1,
					subject: "Kannada",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 18,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 2,
					subject: "English",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 19,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 3,
					subject: "Hindi",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 16,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 4,
					subject: "Social",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 17,
					letterGrade: "A",
					status: "Pass",
				},
				{
					slno: 5,
					subject: "Science",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 20,
					letterGrade: "A+",
					status: "Pass",
				},
				{
					slno: 6,
					subject: "Maths",
					maxMarks: 20,
					minMarks: 7,
					marksScored: 19,
					letterGrade: "A+",
					status: "Pass",
				},
			],
		},
	];

	const calculateTotal = (subjects) => {
		return subjects.reduce((total, subject) => total + subject.marksScored, 0);
	};

	const calculatePercentage = (subjects) => {
		const totalMarks = subjects.reduce(
			(total, subject) => total + subject.maxMarks,
			0
		);
		return ((calculateTotal(subjects) / totalMarks) * 100).toFixed(2);
	};

	const getGradeColor = (grade) => {
		switch (grade) {
			case "A+":
				return "text-green-600 bg-green-100";
			case "A":
				return "text-blue-600 bg-blue-100";
			case "B+":
				return "text-yellow-600 bg-yellow-100";
			case "B":
				return "text-orange-600 bg-orange-100";
			case "C":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Pass":
				return "text-green-600 bg-green-100";
			case "Fail":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const handleBackToDashboard = () => {
		navigate("/student-dashboard");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile Header */}
			<div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
				<button
					onClick={handleBackToDashboard}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
				>
					<ArrowLeft size={20} />
				</button>
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">U</span>
					</div>
					<span className="text-gray-900 font-semibold">USMS</span>
				</div>
				<button
					onClick={() => navigate("/")}
					className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
				>
					<User size={20} />
				</button>
			</div>

			{/* Main Content */}
			<main className="p-4 sm:p-6 lg:p-8">
				<div className="space-y-4 sm:space-y-6">
					{/* Back Button */}
					<div className="flex items-center gap-2 sm:gap-4">
						<button
							onClick={handleBackToDashboard}
							className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 text-sm sm:text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
						>
							<ArrowLeft size={16} className="sm:w-5 sm:h-5" />
							<span className="hidden xs:inline">Back to Dashboard</span>
							<span className="xs:hidden">Back</span>
						</button>
					</div>

					{/* Report Card Header */}
					<div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
						<div className="text-center mb-4 sm:mb-6">
							<h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
								Academic Report Card
							</h1>
							<p className="text-sm sm:text-base text-gray-600">
								2024-25 Academic Year
							</p>
						</div>
					</div>

					{/* Individual Test/Exam Tables */}
					{examData.map((exam, examIndex) => (
						<div
							key={examIndex}
							className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden"
						>
							{/* Exam Header */}
							<div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 bg-gray-50">
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
									<div>
										<h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
											{exam.name}
										</h2>
										<p className="text-xs sm:text-sm text-gray-600">
											{exam.date}
										</p>
									</div>
									<div className="text-left sm:text-right">
										<p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
											{calculateTotal(exam.subjects)}/
											{exam.subjects[0].maxMarks * 6}
										</p>
										<p className="text-xs sm:text-sm text-gray-600">
											{calculatePercentage(exam.subjects)}%
										</p>
									</div>
								</div>
							</div>

							{/* Mobile-First Table Container */}
							<div className="w-full">
								{/* Mobile scroll indicator - always visible on mobile */}
								<div className="px-3 py-2 bg-blue-50 border-b border-blue-200 block sm:hidden">
									<div className="flex items-center gap-2 text-blue-700">
										<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
										<span className="text-xs font-medium">
											← Swipe to view all columns →
										</span>
									</div>
								</div>

								{/* Horizontally Scrollable Table Container */}
								<div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
									<table className="w-full min-w-[480px] text-left">
										<thead className="bg-gray-50 sticky top-0 z-10">
											<tr>
												<th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200">
													SL
												</th>
												<th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200 min-w-[80px]">
													Subject
												</th>
												<th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200">
													Max
												</th>
												<th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200">
													Min
												</th>
												<th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200">
													Score
												</th>
												<th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200">
													Grade
												</th>
												<th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
													Status
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{exam.subjects.map((subject, index) => (
												<tr
													key={subject.slno}
													className={`hover:bg-gray-50 ${
														index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
													}`}
												>
													<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-100">
														{subject.slno}
													</td>
													<td className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-100 min-w-[80px]">
														{subject.subject}
													</td>
													<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 border-r border-gray-100">
														{subject.maxMarks}
													</td>
													<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 border-r border-gray-100">
														{subject.minMarks}
													</td>
													<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold text-gray-900 border-r border-gray-100">
														{subject.marksScored}
													</td>
													<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border-r border-gray-100">
														<span
															className={`inline-flex px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold rounded-full ${getGradeColor(
																subject.letterGrade
															)}`}
														>
															{subject.letterGrade}
														</span>
													</td>
													<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
														<span
															className={`inline-flex px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold rounded-full ${getStatusColor(
																subject.status
															)}`}
														>
															{subject.status}
														</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								{/* Mobile footer with scroll hint */}
								<div className="px-3 py-2 bg-gray-50 border-t border-gray-200 block sm:hidden">
									<div className="flex items-center justify-between text-gray-500">
										<span className="text-xs">Scroll horizontally →</span>
										<span className="text-xs font-medium">
											{exam.subjects.length} subjects
										</span>
									</div>
								</div>
							</div>
						</div>
					))}

					{/* Overall Performance Summary */}
					<div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
						<h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
							Overall Performance Summary
						</h3>

						{/* Mobile-first grid - 2 columns on mobile, more on larger screens */}
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
							{examData.map((exam, index) => (
								<div
									key={index}
									className="text-center p-2 sm:p-3 lg:p-4 bg-gray-50 rounded-lg"
								>
									<p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2 truncate">
										{exam.name}
									</p>
									<p className="text-base sm:text-lg lg:text-2xl font-bold text-blue-600">
										{calculatePercentage(exam.subjects)}%
									</p>
									<p className="text-xs text-gray-600">
										{calculateTotal(exam.subjects)}/
										{exam.subjects[0].maxMarks * 6}
									</p>
								</div>
							))}
						</div>

						{/* Additional stats for mobile */}
						<div className="mt-4 pt-4 border-t border-gray-200 block sm:hidden">
							<div className="grid grid-cols-2 gap-3 text-center">
								<div className="p-3 bg-green-50 rounded-lg">
									<p className="text-lg font-bold text-green-600">
										{Math.round(
											examData.reduce(
												(acc, exam) =>
													acc + parseFloat(calculatePercentage(exam.subjects)),
												0
											) / examData.length
										)}
										%
									</p>
									<p className="text-xs text-gray-600">Average</p>
								</div>
								<div className="p-3 bg-blue-50 rounded-lg">
									<p className="text-lg font-bold text-blue-600">
										{Math.max(
											...examData.map((exam) =>
												parseFloat(calculatePercentage(exam.subjects))
											)
										)}
										%
									</p>
									<p className="text-xs text-gray-600">Best Score</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
