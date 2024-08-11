import React, { useState } from "react";
import classes from "./Lab.module.css";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useErrors } from "../hooks/hooks";
import { useGetLabsQuery } from "../redux/api/api";
import DropdownSubmission from "../Components/DropdownSubmission";
import Performance from "../Components/Performance";

export default function Lab() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const user = useSelector((state) => state.auth.user);
	const batch = user.role === "teacher" ? searchParams.get("batch") : user.batch;

	const [showPerformance, setShowPerformance] = useState(false);
	const [showBatchPerformance, setShowBatchPerformance] = useState(false);
	const [reportData, setReportData] = useState([]);
	const [labQuestions, setLabQuestions] = useState([]);

	const { data, isLoading, isError, error } = useGetLabsQuery(batch);
	useErrors([{ isError, error }]);
	const labs = data?.lab;

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<h2>
					<strong>Batch: </strong>
					<i>{batch}</i>
				</h2>
				{user.role === "teacher" && (
					<div>
						<button onClick={() => setShowBatchPerformance(true)}>Batch Performance</button>
						<button
							className={classes.createLab}
							onClick={() =>
								navigate("/app/createlab", {
									state: { batch: batch },
								})
							}
						>
							Create Lab
						</button>
					</div>
				)}
			</div>
			<div className={classes.labs}>
				{isLoading
					? "Loading..."
					: labs?.map((item, idx) => (
							<DropdownSubmission
								heading={
									item.topic +
									" " +
									(item.isEnd ? (
										"(Completed)"
									) : item.isStart ? (
										""
									) : (
										"( " +
										Math.floor(item.duration / 3600) +
										":" +
										(Math.floor(item.duration / 60) % 60) +
										":" +
										(item.duration % 60) +
										")"
									))
								}
								lab = {item}
								key = {uuid()}
								setLabQuestions = {setLabQuestions}
								setReportData = {setReportData}
								handleShowPerformance = {setShowPerformance}
							>
								<ul className={classes.queList}>
									{item.questions.map((problem, idx) => (
										<li
											key={idx}
											className={classes.listItem}
										>
											<Link
												to = {`/app/question/${problem.id}`}
												state = {{ labId: item._id }}
												className={classes.quesLinks}
											>
												Question {idx + 1}
											</Link>
										</li>
									))}
								</ul>
							</DropdownSubmission>
					  ))}
			</div>
			<div>
				{showPerformance && 
					<Performance 
						show = {showPerformance} 
						handleShowPerformance = {setShowPerformance} 
						report = {reportData} 
						labQuestions = {labQuestions}
					/>
				}
				{showBatchPerformance && 
					<Performance 
						show={showBatchPerformance} 
						handleShowPerformance={setShowBatchPerformance} 
						batch={true}
					/>
				}
			</div>
		</div>
	);
}