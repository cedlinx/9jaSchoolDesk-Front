import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ViewLessonDetails.module.scss";
import Button from "@/components/Button/Button";
import { titleCase } from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import formatDate from "@/helpers/formatDate";
import useGetClassDetails from "@/utils/useGetClassDetails";



const ViewLessonDetails = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.modalState.modalData);
  
  const classSubjects = useGetClassDetails(data.class_id)?.subjects;

  const getSubjectName = (id) => {
    const subjectName = classSubjects?.find((item) => item.id === id)?.subject;
    return subjectName;
  };

  return (
    <div className={cx(styles.ViewLessonDetailsContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addPerformanceIndicator" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.header)}>
          <p>Lesson Details</p>
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>TITLE</span><span className={cx(styles.value)}>{data?.topic && (data?.topic)}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>SUBJECT</span><span className={cx(styles.value)}>{getSubjectName(data?.subject_id)}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>DESCRIPTION</span><span className={cx(styles.value)}>{data?.description}</span>
        </div>
        {/* <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>THUMBNAIL</span><span className={cx(styles.value)}><img src={data?.thumbnail_url} alt="" /></span>
        </div> */}
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>STATUS</span><span className={cx(styles.value)}>{data?.status}</span>
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>ATTACHMENT</span><span className={cx(styles.value)}><a href={data?.document_url} target="_blank" rel="noreferrer">Download File</a></span>
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>DUE DATE</span><span className={cx(styles.value)}>{formatDate(data?.date)}</span>
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>CREATED AT</span><span className={cx(styles.value)}>{formatDate(data?.created_at)}</span>
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>

          <Button onClick={() => dispatch(showModal({ action: "show", type: "modifyLesson", modalData: data }))} title="Modify" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#22467B" />

          <Button onClick={() => dispatch(showModal({ action: "show", type: "deleteLesson", modalData: data?.id }))} title="Delete" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />

          <Button onClick={() => dispatch(showModal({ action: "hide" }))} title="Close" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />

        </div>

      </div>

    </div>
  );
};

export default ViewLessonDetails;
