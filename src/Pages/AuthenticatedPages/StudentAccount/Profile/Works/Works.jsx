import React from "react";
import cx from "classnames";
import styles from "./Works.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useGetStudentDashboard from "@/utils/useGetStudentDashboard";
import formatDate from "@/helpers/formatDate";
import parse from "html-react-parser";
import { Icon } from "@iconify/react";

const Works = () => {
  const dispatch = useDispatch();
  const studentData = useGetStudentDashboard();

  return (
    <div className={cx(styles.worksContainer)}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>WORKS</h3>
      </div>

      <div className={cx(styles.body, "flexCol")}>
        {Array.isArray(studentData?.graded_tasks) && studentData?.graded_tasks.map((submission, index)=>{
          return(
            <div className={cx(styles.submissionContainer, "flexCol")} key={index}>
              <div className={cx(styles.fileDetails, "flexRow-space-between")}>
                <span>{submission?.name}</span>
                <small>{formatDate(submission?.updated_at)}</small>
              </div>
              <div className={cx(styles.solutionDiv, styles.wrapper)}>
                <label htmlFor="">Solution</label>
                <p>{submission?.pivot?.solution && parse(submission?.pivot?.solution)}</p>
              </div>
              <div className={cx(styles.scoreDiv, styles.wrapper)}>
                <label htmlFor="">Score</label>
                <p>{submission?.pivot?.score}</p>
              </div>
              <div className={cx(styles.feedbackDiv, styles.wrapper)}>
                <label htmlFor="">Feedback</label>
                <p>{submission?.pivot?.feedback && parse(submission?.pivot?.feedback)}</p>
              </div>
              <div className={cx(styles.attachmentDiv, styles.wrapper)}>
                <a target="_blank" href={submission?.pivot?.attachment} rel="noreferrer"> <Icon icon="teenyicons:attachment-solid" color="#22467b" /> Download Solution</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Works;