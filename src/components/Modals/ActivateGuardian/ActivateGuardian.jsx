import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ActivateGuardian.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { guardianStatusUpdate, getAllGuardians, getGuardianStatus, getNewGuardianSignups } from "@/redux/Proprietor/ProprietorSlice";


const ActivateGuardian = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const loading = useSelector((state) => state?.proprietor?.loading);

  const sendRequest = async () => {
    let response = await dispatch(guardianStatusUpdate({ guardian_id: modalData.id, status: "Active" }));
    if(response.payload.success){
      dispatch(getNewGuardianSignups());
      dispatch(showModal({ action: "hide", type: "activateGuardian" }));
      dispatch(getAllGuardians());
      dispatch(getGuardianStatus());
    }
  };

  return (

    <section className={cx(styles.activateGuardianContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "activateGuardian" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Activate Guardian</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to activate this guardian?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "activateGuardian"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
          <Button loading={loading} disabled={loading} onClick={()=>sendRequest()} type title="Activate" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default ActivateGuardian;