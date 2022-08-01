import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./DeleteStudent.module.scss";
import Button from "@/components/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { deleteStudent, getAllStudents } from "@/redux/Proprietor/ProprietorSlice";

const DeleteStudent = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state?.modalState?.modalData);
  const loading = useSelector((state) => state?.proprietor?.loading);
  console.log(modalData);

  const sendRequest = async () => {
    // let formData = new FormData();
    // formData.append("id", `${modalData}`);
    // let response = await dispatch(deleteStudent(formData));
    let response = await dispatch(deleteStudent({id: modalData.id}));
    if (response.payload.success) {
      dispatch(getAllStudents());
      dispatch(showModal({ action: "hide", type: "deleteStudent" }));
    }
  };

  return (

    <section className={cx(styles.deleteStudentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "deleteStudent" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Delete Student</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to delete this student?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "deleteStudent"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button loading={loading} onClick={()=> sendRequest()} type="button" title="Delete" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default DeleteStudent;