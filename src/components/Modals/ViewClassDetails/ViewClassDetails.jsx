import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ViewClassDetails.module.scss";
import Button from "@/components/Button/Button";
import { titleCase, initialsCase } from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import formatArrayList from "@/helpers/formatArrayList";
import formatDate from "@/helpers/formatDate";


const ViewClassDetails = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.modalState.modalData);
  

  const getSubjectList = (data) => {
    let subjectList = [];
    data?.forEach((subject) => {
      subjectList.push(subject.subject);
    });
    return formatArrayList(subjectList);
  };

  return (
    <div className={cx(styles.ViewClassDetailsContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addPerformanceIndicator" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.header, "flexCol")}>
          <p>Class Details</p>
          {data?.teacher?.avatar ? 
            <img src={data?.teacher?.avatar} alt="" /> 
            : 
            <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "7.5rem", height: "7.5rem", lineHeight: "7.5rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${data?.firstName ? data.firstName : ""} ${data?.lastName ? data?.lastName : ""}`)}</span>
          }
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>NAME</span><span className={cx(styles.value)}>{data?.name && (data?.name)}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>DESCRIPTION</span><span className={cx(styles.value)}>{data?.description}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>CLASS CODE</span><span className={cx(styles.value)}>{data?.code}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>CLASS TEACHER</span><span className={cx(styles.value)}>{`${data?.teacher?.firstName ? data.teacher.firstName : ""} ${data?.teacher?.lastName ? data.teacher.lastName : ""}`}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>SUBJECTS</span><span className={cx(styles.value)}>{getSubjectList(data?.subjects)}</span>
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>CREATED AT</span><span className={cx(styles.value)}>{formatDate(data?.created_at)}</span>
        </div>

        <Button onClick={() => dispatch(showModal({ action: "hide", type: "ViewClassDetails" }))} title="OK" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
      </div>

    </div>
  );
};

export default ViewClassDetails;
