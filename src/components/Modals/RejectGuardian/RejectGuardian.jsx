import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./RejectGuardian.module.scss";
import Button from "@/components/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

// import { rejectGuardian } from "@/redux/Proprietor/ProprietorSlice";

const RejectGuardian = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);

  const sendRequest = async () => {
    alert("Reject Guardian Application");
    // let response = await dispatch(rejectGuardian(modalData));
    // if(response.payload.success){
    //   dispatch(showModal({ action: "hide", type: "rejectGuardian" }));
    // }
  };

  return (

    <section className={cx(styles.rejectGuardianContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "rejectGuardian" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Reject Guardian Application</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to reject this guardian application?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "rejectGuardian"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
          <Button onClick={()=>sendRequest()} type title="Reject Application" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default RejectGuardian;