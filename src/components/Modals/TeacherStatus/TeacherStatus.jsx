import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./TeacherStatus.module.scss";
import Button from "@/components/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";


const TeacherStatus = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  let action = modalData.action;

  return (

    <section className={cx(styles.teacherStatusContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "teacherStatus" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>{action} Teacher</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to {action} this teacher?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "teacherStatus"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
          <Button type title={action} borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

TeacherStatus.propTypes = {
  title: PropTypes.string
};

export default TeacherStatus;