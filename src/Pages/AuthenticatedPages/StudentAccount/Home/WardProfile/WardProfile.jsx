import React from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import cx from "classnames";
import styles from "./WardProfile.module.scss";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { titleCase, initialsCase } from "@/helpers/textTransform";


const WardProfile = ({selectedWard}) => {
  const dispatch = useDispatch();

  return (
    <div className={cx(styles.wardProfileContainer)}>  <div className={cx(styles.studentProfileDiv)}>
      <h5>Profile</h5>
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
          <p>{selectedWard?.firstName && titleCase(`${selectedWard.firstName} ${selectedWard.lastName}`) || selectedWard?.name && titleCase(selectedWard?.name)}</p>
          <small>{selectedWard?.klass?.name}</small>
          <small>{selectedWard?.email}</small>
          {/* <img  src={editIcon} alt="" /> */}
          <span onClick={()=>dispatch(showModal({ action: "show", type: "editProfile", modalData: selectedWard }))}>View</span>
        </div>
      </div>
    </div></div>
  );
};

WardProfile.propTypes = {
  selectedWard: PropTypes.object.isRequired
};

export default WardProfile;