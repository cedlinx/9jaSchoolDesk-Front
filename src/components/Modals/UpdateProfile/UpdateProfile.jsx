import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./UpdateProfile.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import useGetUser from "@/utils/useGetUser";

import { guardianStatusUpdate, getAllGuardians, getGuardianStatus, getNewGuardianSignups } from "@/redux/Proprietor/ProprietorSlice";
import { getDashboard, updateProfile } from "@/redux/Teacher/TeacherSlice";


const UpdateProfile = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const user = useGetUser();
  
  const loading = useSelector((state) => user === "proprietor" ? state?.proprietor?.loading : user === "teacher" ? state?.teacher?.loading : user === "guardian" ? state?.guardian?.loading : state?.student?.loading);

  const sendRequest = async () => {

    let response = await dispatch(updateProfile(modalData));
    if (response?.payload?.success) {
      dispatch(getDashboard());
      dispatch(showModal({ action: "hide", type: "updateProfile" }));
    }

    // let response = await dispatch(guardianStatusUpdate({ guardian_id: modalData.id, status: "Active" }));
    // if(response.payload.success){
    //   dispatch(getNewGuardianSignups());
    //   dispatch(showModal({ action: "hide", type: "updateProfile" }));
    //   dispatch(getAllGuardians());
    //   dispatch(getGuardianStatus());
    // }
  };

  return (

    <section className={cx(styles.updateProfileContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "updateProfile" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Update Profile</p>
        </div>

        <div style={{textAlign: "center"}}>
          Are you sure you want to update this user profile?
        </div>

        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "hide", type: "updateProfile"}))} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
          <Button loading={loading} disabled={loading} onClick={()=>sendRequest()} type title="Confirm" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>

      </div>

    </section>
  );
};

export default UpdateProfile;