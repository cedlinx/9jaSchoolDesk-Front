import React from "react";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./WardProfile.module.scss";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import editIcon from "@/assets/icons/edit-icon.svg";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { titleCase, initialsCase } from "@/helpers/textTransform";


const WardProfile = ({selectedWard}) => {
  const dispatch = useDispatch();


  return (
    <div className={cx(styles.wardProfileContainer)}>  <div className={cx(styles.studentProfileDiv)}>
      <h5>{selectedWard?.firstName && titleCase(titleCase(selectedWard?.firstName))}'s Profile</h5>
      <div className={cx(styles.contentWrapper)}>
        <div className={cx(styles.header)}>
          <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />
          {selectedWard?.avatar ? 
            <img className={cx(styles.profilePic)} src={selectedWard?.avatar} alt="avatar" />
            :
            <span className={cx(styles.profilePic)} style={{ backgroundColor: "#D25B5D" }}>{selectedWard?.firstName && initialsCase(`${selectedWard.firstName} ${selectedWard.lastName}`)}</span>
          }
        </div>
        <div className={cx(styles.body, "flexCol")}>
          <p>{selectedWard?.name && titleCase(selectedWard?.name) || selectedWard?.firstName && titleCase(`${selectedWard.firstName} ${selectedWard.lastName}`)}</p>
          <small>{selectedWard?.class?.name}</small>
          <small>{selectedWard?.email}</small>
          {/* <img  src={editIcon} alt="" /> */}
          <span onClick={()=>dispatch(showModal({ action: "show", type: "editProfile", modalData: selectedWard }))}>View</span>
        </div>
      </div>
    </div></div>
  );
};

export default WardProfile;