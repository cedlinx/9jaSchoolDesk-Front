import React from "react";
import cx from "classnames";
import styles from "./BehaviouralFeedback.module.scss";
import behaviouralCardImage from "@/assets/images/behavioral-card-image.png";
import { titleCase } from "@/helpers/textTransform";

const BehaviouralFeedback = ({feedbackData}) => {
  console.log(feedbackData);

  const calculateTotalPoints = (feedbackData) => {
    let score = feedbackData.reduce((acc, arr)=>{
      return acc + arr.pivot.score * 1;
    }, 0);
    return score;
  };

  return (
    <div className={cx(styles.behaviouralFeedbackContainer)}>
      <h5>Behavioural Feedback</h5>
      <div className={cx(styles.contentWrapper, "flexCol")}>
        {feedbackData.length > 0 ? 
          <>
            <div className={cx(styles.header, "flexRow")}>
              <div className={cx(styles.imageDiv)}>
                <img src={behaviouralCardImage} alt="img" />
              </div>
              <div className={cx(styles.pointsDiv)}>
                <small>Total points earned</small>
                <p>{calculateTotalPoints(feedbackData)}</p>
              </div>
            </div>

            <div className={cx(styles.body, "flexCol")}>
              {feedbackData.map((data, index) => (
                <div key={index}><span><img src={data?.avatar} alt="" /></span><span>{titleCase(data?.name)}</span><span>{data?.pivot?.score * 1} pts</span></div>
              ))}
            </div>
          </>
          : 
          <div className={cx(styles.noDataDiv)}>
            <p>No data available</p>
          </div>}

     
      </div>
    </div>
  );
};

export default BehaviouralFeedback;