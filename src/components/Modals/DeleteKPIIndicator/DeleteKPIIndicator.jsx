import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./DeleteKPIIndicator.module.scss";
import Button from "@/components/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { deleteKPI, getAllKPIs } from "@/redux/Proprietor/ProprietorSlice";

const DeleteIndicator = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state?.modalState?.modalData);
  const loading = useSelector((state) => state?.proprietor?.loading);
  console.log(modalData);

  const sendRequest = async () => {
    // let formData = new FormData();
    // formData.append("id", `${modalData}`);
    // let response = await dispatch(deleteKPI(formData));
    let response = await dispatch(deleteKPI({id: modalData}));
    console.log(response);
    if (response.payload.success) {
      dispatch(getAllKPIs());
      dispatch(showModal({ action: "hide", type: "deleteIndicator" }));
    }
  };

  return (

    <section className={cx(styles.deleteIndicatorContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "deleteIndicator" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Delete Indicator</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to delete this indicator?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "deleteIndicator"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button loading={loading} onClick={(e)=> sendRequest(e)} type="button" title="Delete" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default DeleteIndicator;