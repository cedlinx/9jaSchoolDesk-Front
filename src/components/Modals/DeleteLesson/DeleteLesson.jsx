import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./DeleteLesson.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import useGetClassID from "@/utils/useGetClassID";

import { deleteLesson, getClassLessons } from "@/redux/Teacher/TeacherSlice";

const DeleteLesson = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state?.modalState?.modalData);
  const loading = useSelector((state) => state?.teacher?.loading);
  const class_id = useGetClassID();

  console.log(modalData);

  const sendRequest = async () => {
    let response = await dispatch(deleteLesson({ id: modalData }));
    if (response.payload.success) {
      dispatch(getClassLessons({class_id}));
      dispatch(showModal({ action: "hide", type: "deleteLesson" }));
    }
  };

  return (

    <section className={cx(styles.deleteLessonContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "deleteLesson" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header, "flexCol")}>
          <p>Delete Lesson</p>
        </div>

        <div style={{ textAlign: "center" }}>
          Are you sure you want to delete this lesson?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({ action: "hide", type: "deleteLesson" }))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button loading={loading} disabled={loading}  onClick={() => sendRequest()} type="button" title="Delete" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default DeleteLesson;