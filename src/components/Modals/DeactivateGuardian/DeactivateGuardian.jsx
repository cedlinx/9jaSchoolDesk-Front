import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./DeactivateGuardian.module.scss";
import Button from "@/components/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { guardianStatusUpdate, getAllGuardians, getGuardianStatus, getNewGuardianSignups } from "@/redux/Proprietor/ProprietorSlice";


const DeactivateGuardian = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);

  const sendRequest = async () => {
    let response = await dispatch(guardianStatusUpdate({ guardian_id: modalData.id, status: "Suspended" }));
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "deactivateGuardian" }));
      dispatch(getAllGuardians());
      dispatch(getGuardianStatus());
      dispatch(getNewGuardianSignups());
    }
  };

  return (

    <section className={cx(styles.deactivateGuardianContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "deactivateGuardian" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Deactivate Guardian</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to deactivate this guardian?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "deactivateGuardian"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
          <Button onClick={()=>sendRequest()} type title="Deactivate" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default DeactivateGuardian;