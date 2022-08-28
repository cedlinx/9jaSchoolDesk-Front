import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./TaskDetails.module.scss";
import Button from "@/components/Button/Button";
import {titleCase} from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import formatDate from "@/helpers/formatDate";
import useGetUser from "@/utils/useGetUser";
import parse from "html-react-parser";

const TaskDetails = () => {
  
  const dispatch = useDispatch();
  const data = useSelector((state) => state.modalState.modalData);
  const user = useGetUser();
  console.log(data);

  return (
    <div className={cx(styles.taskDetailsContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "taskDetails" }))} icon="carbon:close-filled" color="white" />
      </div>
      
      <div className={cx(styles.body, "flexCol")}>

	      <div className={cx(styles.header)}>
          <p>Task Details</p>
        </div>

        {user !== "student" && 
          <>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>TITLE</span><span className={cx(styles.value)}>{data?.title}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>SUBJECT</span><span className={cx(styles.value)}>{data?.subject}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>ATTACHMENT</span><span className={cx(styles.value)}>{data?.attachment}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>SOLUTION</span><span className={cx(styles.value)}>{data?.solution}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>FEEDBACK</span><span className={cx(styles.value)}>{data?.feedback}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>SCORE</span><span className={cx(styles.value)}>{data?.score}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>TYPE</span><span className={cx(styles.value)}>{data?.type}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>CLASS</span><span className={cx(styles.value)}>{data?.class}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>CREATED DATE</span><span className={cx(styles.value)}>{formatDate(data?.created_date)}</span>
            </div>
            <div className={cx(styles.modalItem)}>
              <span className={cx(styles.title)}>DUE DATE</span><span className={cx(styles.value)}>{formatDate(data?.due_date)}</span>
            </div>
          </>
        }

        {user === "student" && 
<>
  <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>TITLE</span><span className={cx(styles.value)}>{data?.name}</span>
  </div>
  {data?.description && <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>DESCRIPTION</span><span className={cx(styles.value)}>{data?.description}</span>
  </div>}
  <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>SUBJECT</span><span className={cx(styles.value)}>{data?.subject?.subject}</span>
  </div>
  {data?.pivot?.attachment && <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>ATTACHMENT</span><span className={cx(styles.value)}><a href={data?.pivot?.attachment} target="_blank" rel="noreferrer">{data?.pivot?.attachment.split("/").pop()}</a></span>
  </div>}
  { data?.pivot?.solution && <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>SOLUTION</span><span className={cx(styles.value)}>{data?.pivot?.solution && parse(data?.pivot?.solution)}</span>
  </div>}
  {data?.pivot?.feedback &&  <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>FEEDBACK</span><span className={cx(styles.value)}>{data?.pivot?.feedback}</span>
  </div>}
  {data?.pivot?.score &&  <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>SCORE</span><span className={cx(styles.value)}>{data?.pivot?.score}</span>
  </div>}
  <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>TYPE</span><span className={cx(styles.value)}>{titleCase(data?.type)}</span>
  </div>
  <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>CLASS</span><span className={cx(styles.value)}>{data?.class?.name}</span>
  </div>
  {data?.pivot?.status && <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>STATUS</span><span className={cx(styles.value)}>{data?.pivot?.status && titleCase(data?.pivot?.status)}</span>
  </div>}
  <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>CREATED DATE</span><span className={cx(styles.value)}>{formatDate(data?.created_at)}</span>
  </div>
  <div className={cx(styles.modalItem)}>
    <span className={cx(styles.title)}>DUE DATE</span><span className={cx(styles.value)}>{formatDate(data?.due_date)}</span>
  </div>
</>}
		
        <Button onClick={()=>dispatch(showModal({ action: "hide", type: "taskDetails" }))} title="OK" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
      </div> 
			
    </div>
  );
};

export default TaskDetails;
