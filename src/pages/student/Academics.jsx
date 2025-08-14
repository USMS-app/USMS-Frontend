import React, { useState } from "react";
import { ArrowLeft, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Academics() {
    const navigate = useNavigate();
    const [selectedExam, setSelectedExam] = useState('all');

	// Mock data for different tests/exams with the 6 subjects
	const examData = [
		{
			id: 'fa1',
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
			id: 'fa2',
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
			id: 'midterm',
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
			id: 'fa4',
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
			id: 'fa5',
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
		navigate("/student");
	
	};

	// Filter exams based on selection
	const filteredExams = selectedExam === 'all' ? examData : examData.filter(exam => exam.id === selectedExam);

	return (
		<div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
			{/* Main Content */}
			<main className="p-2 sm:p-4 md:p-6 lg:p-8 w-full max-w-full">
				<div className="space-y-4 sm:space-y-6">
					{/* Back Button */}
					<div className="flex items-center gap-4">
									<button
										onClick={handleBackToDashboard}
										className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
										<ArrowLeft size={20} />
										<span>Back to Dashboard</span>
									</button>
								</div>

					{/* Report Card Header */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 w-full">
						<div className="text-center mb-3 sm:mb-4 md:mb-6">
							<h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
								Academic Report Card
							</h1>
							<p className="text-xs sm:text-sm md:text-base text-gray-600">
								2024-25 Academic Year
							</p>
						</div>
					</div>

					{/* Exam Selection Dropdown */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 w-full">
						<div className="flex flex-col gap-2 sm:gap-3">
							<label className="text-xs sm:text-sm font-medium text-gray-700">
								Select Exam:
							</label>
							<div className="relative w-full">
								<select
									value={selectedExam}
									onChange={(e) => setSelectedExam(e.target.value)}
									className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
								>
									<option value="all">All Exams</option>
									{examData.map((exam) => (
										<option key={exam.id} value={exam.id}>
											{exam.name} - {exam.date}
										</option>
									))}
								</select>
								<ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
							</div>
						</div>
					</div>

					{/* Individual Test/Exam Tables */}
					{filteredExams.map((exam, examIndex) => (
						<div
							key={examIndex}
							className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full"
						>
							{/* Exam Header */}
							<div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
								<div className="flex justify-between gap-2">
									<div>
										<h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
											{exam.name}
										</h2>
										<p className="text-xs text-gray-600">
											{exam.date}
										</p>
									</div>
									<div className="text-left">
										<p className="text-sm sm:text-base font-semibold text-gray-900">
											{calculateTotal(exam.subjects)}/
											{exam.subjects[0].maxMarks * 6}
										</p>
										<p className="text-xs text-gray-600">
											{calculatePercentage(exam.subjects)}%
										</p>
									</div>
								</div>
							</div>

							{/* Mobile scroll indicator */}
							<div className="px-3 py-2 bg-blue-50 border-b border-blue-200">
								<div className="flex items-center gap-2 text-blue-700">
									<div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
									<span className="text-xs font-medium">
										← Swipe to view all columns →
									</span>
								</div>
							</div>

							{/* Table Container with Horizontal Scroll */}
							<div className="w-full overflow-x-auto overscroll-x-contain" style={{maxWidth: '100vw'}}>
								<div className="inline-block min-w-full">
									<table className="w-full min-w-[480px]">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200 w-10">
													SL
												</th>
												<th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200 w-20">
													SUBJECT
												</th>
												<th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200 w-12">
													MAX
												</th>
												<th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200 w-12">
													MIN
												</th>
												<th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200 w-14">
													SCORE
												</th>
												<th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-r border-gray-200 w-16">
													GRADE
												</th>
												<th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide w-16">
													STATUS
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{exam.subjects.map((subject, index) => (
												<tr
													key={subject.slno}
													className={`${
														index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
													}`}
												>
													<td className="px-2 py-2 text-xs font-medium text-gray-900 border-r border-gray-100">
														{subject.slno}
													</td>
													<td className="px-2 py-2 text-xs font-medium text-gray-900 border-r border-gray-100">
														{subject.subject}
													</td>
													<td className="px-2 py-2 text-xs text-gray-900 border-r border-gray-100">
														{subject.maxMarks}
													</td>
													<td className="px-2 py-2 text-xs text-gray-900 border-r border-gray-100">
														{subject.minMarks}
													</td>
													<td className="px-2 py-2 text-xs font-bold text-gray-900 border-r border-gray-100">
														{subject.marksScored}
													</td>
													<td className="px-2 py-2 border-r border-gray-100">
														<span
															className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded ${getGradeColor(
																subject.letterGrade
															)}`}
														>
															{subject.letterGrade}
														</span>
													</td>
													<td className="px-2 py-2">
														<span
															className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded ${getStatusColor(
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
							</div>

							{/* Mobile footer with scroll hint */}
							<div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
								<div className="flex items-center justify-between text-gray-500">
									<span className="text-xs">Scroll horizontally →</span>
									<span className="text-xs font-medium">
										{exam.subjects.length} subjects
									</span>
								</div>
							</div>
						</div>
					))}

					{/* Overall Performance Summary */}
					{selectedExam === 'all' && (
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 w-full">
							<h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
								Overall Performance Summary
							</h3>

							{/* Mobile-first grid - 2 columns on mobile, more on larger screens */}
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
								{examData.map((exam, index) => (
									<div
										key={index}
										className="text-center p-2 bg-gray-50 rounded-lg"
									>
										<p className="text-xs font-medium text-gray-900 mb-1 truncate">
											{exam.name}
										</p>
										<p className="text-sm sm:text-base font-bold text-blue-600">
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
							<div className="mt-3 pt-3 border-t border-gray-200">
								<div className="grid grid-cols-2 gap-2 text-center">
									<div className="p-2 bg-green-50 rounded-lg">
										<p className="text-sm font-bold text-green-600">
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
									<div className="p-2 bg-blue-50 rounded-lg">
										<p className="text-sm font-bold text-blue-600">
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
					)}
				</div>
			</main>
		</div>
	);
}