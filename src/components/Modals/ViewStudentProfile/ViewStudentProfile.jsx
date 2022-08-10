import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ViewStudentProfile.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/student-profile-modal-image.png";
import { forgotPassword } from "@/redux/Auth/AuthSlice";

import gratitudeIcon from "@/assets/icons/gratitude-icon.svg";
import curiosityIcon from "@/assets/icons/curiosity-icon.svg";
import teamworkIcon from "@/assets/icons/teamwork-icon.svg";
import persistenceIcon from "@/assets/icons/persistence-icon.svg";
import caretUp from "@/assets/icons/caret-up.svg";
import caretDown from "@/assets/icons/caret-down.svg";
import { viewKPIForClass, getStudentScoreKPI, incrementScoreKPI, decrementScoreKPI } from "@/redux/Teacher/TeacherSlice";
import { debounce } from "debounce";
import { toast } from "react-toastify";



const ViewStudentProfile = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  console.log(modalData);
  let KPIData = useSelector((state) => state.teacher.getStudentScoreKPI);

  console.log(KPIData);
  
  useEffect(() => {
    dispatch(getStudentScoreKPI(modalData.student_id));
  }, [dispatch, modalData.student_id]);

  const sendRequest = (data) => {
    dispatch(forgotPassword(data));
    dispatch(showModal({ action: "show", type: "resetLinkStatus" }));
  };

  const increaseKPI = (e, data) => {
    let valueSpan = e.target.parentElement.parentElement.querySelector("p > span");
    let currentValue = (valueSpan.textContent)*1;
    if(currentValue >=0 && currentValue <5){
      valueSpan.innerText = currentValue + 1;
      // dispatch(incrementScoreKPI(modalData.student_id, modalData.class_id));
      debounce(alert("increase hello"), 4000);

    }
    else{
      toast.warn("Maximum value reached");
    }
  };

  const decreaseKPI = (e, data) => {
    // dispatch(decrementScoreKPI(modalData.student_id, modalData.class_id));
    let valueSpan = e.target.parentElement.parentElement.querySelector("p > span");
    let currentValue = (valueSpan.textContent)*1;
    console.log(currentValue);
    if(currentValue >=1 && currentValue <= 5){
      valueSpan.innerText = currentValue - 1;
      // dispatch(decrementScoreKPI(modalData.student_id, modalData.class_id));
      debounce(alert("decrease hello"), 4000);
    }
    else{
      toast.warn("Minimum value reached");
    }
  };


  let dataArray = [
    { name: "Curiosity",
      icon: curiosityIcon,
      value: "4"
    },
    { name: "Gratitude",
      icon: gratitudeIcon,
      value: "4"
    },
    { name: "Persistence",
      icon: persistenceIcon,
      value: "4"
    },
    { name: "Teamwork",
      icon: teamworkIcon,
      value: "4"
    }
  ];


  return (

    <section className={cx(styles.viewStudentProfileContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "viewStudentProfile" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.content, "flexCol")}>

	      <div className={cx(styles.header)}>
          <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />
          <img className={cx(styles.profilePic)} src={studentProfilePic} alt="profile pic" />
          <Button onClick={() => dispatch(showModal({action: "show", type: "sendNotificationToParent", modalData: modalData}))} title="Send Message" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" hoverColor="#000" />
        </div>

        <div className={cx(styles.body, "flexCol")}>

          <div className={cx(styles.topSection, "flexCol")}>
            <p>{modalData?.name}</p>
            <small>{modalData?.email || "janedoe@gmail.coom"}</small>
          </div>

          <div className={cx(styles.bottomSection, "flexCol")}>
            <p>Behavioural Feedback</p>
            <div className={cx(styles.behavioursDiv, "flexCol")}>
              {dataArray.map((data, index) => (
                <div className={cx(styles.behaviorWrapper, "flexRow")} key={index}>
                  <div className={cx(styles.leftSection)}>
                    <span><img src={data.icon} alt="icon" /></span>
                    <span>{data.name}</span>
                    <p className={cx(styles.valueSpan)}>
                      <span>{data.value}</span>
                      <span>pts</span>
                    </p>
                  </div>
                 
                  <div className={cx(styles.btnGroup, "flexCol")}>
                    <img onClick={(e) =>increaseKPI(e, data)} src={caretUp} alt="icon" />
                    <img onClick={(e) =>decreaseKPI(e, data)} src={caretDown} alt="icon" />
                  </div>
                </div>
              ))}
             
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ViewStudentProfile;