import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./SaveAttendance.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { saveAttendance } from "@/redux/Teacher/TeacherSlice";
import useGetClassID from "@/utils/useGetClassID";


const SaveAttendance = ({resetTakeAttendance}) => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state?.modalState?.modalData);
  const loading = useSelector((state) => state?.proprietor?.loading);
  let class_id = useGetClassID();

  

  const sendRequest = async () => {
    const studentIds = [];
    modalData.map((student) => {
      student.status === 1 ? studentIds.push(student.id) : null;
    });
    let response = await dispatch(saveAttendance({class_id: class_id, students: studentIds}));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "saveAttendance" }));
      resetTakeAttendance(false);
    }
  };

  return (

    <section className={cx(styles.saveAttendanceContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "saveAttendance" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Save Attendance</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to save the current attendance?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "saveAttendance"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button loading={loading} onClick={()=> sendRequest()} type="button" title="Save" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default SaveAttendance;