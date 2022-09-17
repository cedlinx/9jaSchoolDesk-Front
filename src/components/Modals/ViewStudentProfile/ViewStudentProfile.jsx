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
import { toast } from "react-toastify";
import useDebounce from "@/utils/useDebounce";
import {initialsCase} from "@/helpers/textTransform";
import generateColor from "@/helpers/generateColor";


const ViewStudentProfile = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  
  let KPIData = useSelector((state) => state?.teacher?.getStudentScoreKPIData?.kpi);
  const dataArray = useSelector((state) => state?.teacher?.viewKPIForClassData?.kpis);
  const [increaseValue, setIncreaseValue] = useState(0);
  const [decreaseValue, setDecreaseValue] = useState(0);

  const debouncedIncreaseValue = useDebounce(increaseValue, 1500);
  const debouncedDecreaseValue = useDebounce(decreaseValue, 1500);
  
  useEffect(() => {
    dispatch(getStudentScoreKPI({student_id: modalData.id}));
   
  }, [ dispatch,  modalData.id]);

  const sendRequest = (data) => {
    dispatch(forgotPassword(data));
    dispatch(showModal({ action: "show", type: "resetLinkStatus" }));
  };
    

  const increaseKPI = (e, data) => {
    let valueSpan = e.target.parentElement.parentElement.querySelector("p > span");
    let currentValue = (valueSpan.textContent)*1;
    if(currentValue >= data?.min_score && currentValue < data?.max_score){
      valueSpan.innerText = currentValue + 1;
      setIncreaseValue(currentValue + 1);
      // debounce(displayAlert(), 5000);
      dispatch(incrementScoreKPI({student_id: modalData.id, kpi_id: data.id, score: currentValue + 1}));

    }
    else{
      toast.warn("Maximum value reached");
    }
  };

  const decreaseKPI = (e, data) => {
    let valueSpan = e.target.parentElement.parentElement.querySelector("p > span");
    let currentValue = (valueSpan.textContent)*1;
    if(currentValue >= data?.min_score + 1 && currentValue <= data?.max_score){
      valueSpan.innerText = currentValue - 1;
      setDecreaseValue(currentValue - 1);
      dispatch(decrementScoreKPI({student_id: modalData.id, kpi_id: data.id, score: currentValue - 1}));
      // debounce(alert("decrease hello"), 4000);
    }
    else{
      toast.warn("Minimum value reached");
    }
  };

  const getKPIValue = (id) => {
    if (Array.isArray(KPIData) && KPIData.length > 0 ){
      return KPIData.map((indicator, index) => {
        if(indicator.id === id){
          return indicator.pivot.score * 1;
        }
      });    
    }
    else{
      return 0;
    }
  };

  return (

    <section className={cx(styles.viewStudentProfileContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "viewStudentProfile" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.content, "flexCol")}>

	      <div className={cx(styles.header)}>
          <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />
          {modalData.avatar ? <img className={cx(styles.profilePic)} src={modalData.avatar} alt="img" /> : <span className={cx(styles.profileSpan)} style={{backgroundColor: generateColor()}}>{initialsCase(`${modalData.firstName} ${modalData.lastName}`)}</span> }
          <Button onClick={() => dispatch(showModal({action: "show", type: "sendNotificationToParent", modalData: modalData}))} title="Send Message" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" hoverColor="#000" />
        </div>

        <div className={cx(styles.body, "flexCol")}>

          <div className={cx(styles.topSection, "flexCol")}>
            <p>{modalData?.name}</p>
          </div>

          <div className={cx(styles.bottomSection, "flexCol")}>
            <p>Behavioural Feedback</p>
            {Array.isArray(dataArray) && dataArray.length > 0 ? <div className={cx(styles.behavioursDiv, "flexCol")}>
              {dataArray.map((data, index) => (
                <div className={cx(styles.behaviorWrapper, "flexRow")} key={index}>
                  <div className={cx(styles.leftSection)}>
                    <span><img src={data.avatar} alt="icon" /></span>
                    <span>{data.name}</span>
                    <p className={cx(styles.valueSpan)}>
                      <span>{getKPIValue(data?.id)}</span>
                      <span>pts</span>
                    </p>
                  </div>
                 
                  <div className={cx(styles.btnGroup, "flexCol")}>
                    <img onClick={(e) =>increaseKPI(e, data)} src={caretUp} alt="icon" />
                    <img onClick={(e) =>decreaseKPI(e, data)} src={caretDown} alt="icon" />
                  </div>
                </div>
              ))}
             
            </div> : <small>There are no behavioural feedbacks yet. Kindly add them</small> }
          </div>
        </div>
      </div>

    </section>
  );
};

export default ViewStudentProfile;