import React from "react";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./WardProfile.module.scss";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import editIcon from "@/assets/icons/edit-icon.svg";
import { showModal } from "@/redux/ModalState/ModalSlice";



const WardProfile = () => {
  const dispatch = useDispatch();

  return (
    <div className={cx(styles.wardProfileContainer)}>  <div className={cx(styles.studentProfileDiv)}>
      <h5>Profile</h5>
      <div className={cx(styles.contentWrapper)}>
        <div className={cx(styles.header)}>
          <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />
          <img className={cx(styles.profilePic)}src={studentProfilePic} alt="profile pic" />
        </div>
        <div className={cx(styles.body, "flexCol")}>
          <p>Chisimdi Coker</p>
          <small>coker@gmail.com</small>
          <img onClick={()=>dispatch(showModal({ action: "show", type: "editProfile" }))} src={editIcon} alt="" />
        </div>
      </div>
    </div></div>
  );
};

export default WardProfile;