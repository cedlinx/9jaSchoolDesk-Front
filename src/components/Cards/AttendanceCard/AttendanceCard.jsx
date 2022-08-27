import React, { useState, useEffect } from "react";
import cx from "classnames";
import styles from "./AttendanceCard.module.scss";
import presentIcon from "@/assets/icons/present-icon.svg";
import absentIcon from "@/assets/icons/absent-icon.svg";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { useDispatch } from "react-redux";
import generateColor from "@/helpers/generateColor";


const AttendanceCard = ({ cardData, takeAttendance, attendanceStatus }) => {
  console.log(cardData, "inside card");
  const dispatch = useDispatch();

  const [status, setStatus] = useState(cardData?.status);

  const handleClick = () => {
    if (takeAttendance) {
      setStatus((prev) => (prev === 1 ? 0 : 1));
      attendanceStatus({ status: status === 1 ? 0 : 1, id: cardData.id });
    } else {
      dispatch(showModal({ action: "show", type: "viewStudentProfile", modalData: cardData }));
    }
  };


  return (
    <div onClick={() => handleClick()} className={cx(styles.attendanceCardContainer, "flexCol")}>

      <div className={cx(styles.imageDiv)}>
        {takeAttendance && <img className={cx(styles.statusIcon)} src={status === 1 ? presentIcon : absentIcon} alt="" />}
        {cardData?.avatar ? <img className={cx(styles.profileImage)} src={cardData?.avatar} alt="" /> :
          <span style={{ backgroundColor: generateColor() }}>{initialsCase(`${cardData.firstName} ${cardData.lastName}`)}</span>
        }
      </div>

      <p>{titleCase(`${cardData.firstName} ${cardData.lastName}`)}</p>
    </div>
  );
};

export default AttendanceCard;