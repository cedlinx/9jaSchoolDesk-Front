import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ActivateGuardian.module.scss";
import Button from "@/components/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

// import { activateGuardian } from "@/redux/Proprietor/ProprietorSlice";


const ActivateGuardian = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);

  const sendRequest = async () => {
    alert("Activate Guardian");
    // let response = await dispatch(activateGuardian(modalData));
    // if(response.payload.success){
    //   dispatch(showModal({ action: "hide", type: "activateGuardian" }));
    // }
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
          <Button onClick={()=>sendRequest()} type title="Activate" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

ActivateGuardian.propTypes = {
  title: PropTypes.string
};

export default ActivateGuardian;