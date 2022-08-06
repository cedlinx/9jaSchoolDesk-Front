import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./DeleteTask.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { deleteTask, getAllTasks } from "@/redux/Teacher/TeacherSlice";

const DeleteTask = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state?.modalState?.modalData);
  const loading = useSelector((state) => state?.teacher?.loading);
  console.log(modalData);

  const sendRequest = async () => {
    let response = await dispatch(deleteTask({ id: modalData.id }));
    if (response.payload.success) {
      dispatch(getAllTasks());
      dispatch(showModal({ action: "hide", type: "deleteTask" }));
    }
  };

  return (

    <section className={cx(styles.deleteTaskContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "deleteTask" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header, "flexCol")}>
          <p>Delete Task</p>
        </div>

        <div style={{ textAlign: "center" }}>
          Are you sure you want to delete this task?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({ action: "hide", type: "deleteTask" }))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button loading={loading} onClick={() => sendRequest()} type="button" title="Delete" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default DeleteTask;