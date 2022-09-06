import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./DeleteClass.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { deleteClass, getAllClasses } from "@/redux/Proprietor/ProprietorSlice";

const DeleteClass = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state?.modalState?.modalData);
  const loading = useSelector((state) => state?.proprietor?.loading);
  

  const sendRequest = async () => {
    let response = await dispatch(deleteClass({id: modalData.id}));
    if (response.payload.success) {
      dispatch(getAllClasses());
      dispatch(showModal({ action: "hide", type: "deleteClass" }));
    }
  };

  return (

    <section className={cx(styles.deleteClassContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "deleteClass" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Delete Class</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to delete this class?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "deleteClass"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button loading={loading} onClick={()=> sendRequest()} type="button" title="Delete" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default DeleteClass;