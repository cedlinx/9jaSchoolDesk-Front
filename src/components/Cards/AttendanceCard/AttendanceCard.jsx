import React, { useState } from "react";
import cx from "classnames";
import styles from "./AttendanceCard.module.scss";
import presentIcon from "@/assets/icons/present-icon.svg";
import absentIcon from "@/assets/icons/absent-icon.svg";
import { initialsCase } from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { useDispatch } from "react-redux";


const AttendanceCard = ({ cardData, takeAttendance, attendanceStatus }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(cardData?.attendanceStatus);

  const generateColor = () => {
    const letters = "123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleClick = () => {
    if (takeAttendance) {
      setStatus(status === "present" ? "absent" : "present");
      attendanceStatus({ status, cardData });
    } else {
      dispatch(showModal({ action: "show", type: "viewStudentProfile", modalData: cardData }));
    }
  };


  return (
    <div onClick={() => handleClick()} className={cx(styles.attendanceCardContainer, "flexCol")}>

      <div className={cx(styles.imageDiv)}>
        {takeAttendance && <img className={cx(styles.statusIcon)} src={status === "present" ? presentIcon : absentIcon} alt="" />}
        {cardData?.profilePic ? <img className={cx(styles.profileImage)} src={cardData?.profilePic} alt="" /> :
          <span style={{ backgroundColor: generateColor() }}>{initialsCase(cardData.name)}</span>
        }
      </div>

      <p>{cardData?.name}</p>
    </div>
  );
};

export default AttendanceCard;