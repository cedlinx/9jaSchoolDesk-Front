import React from "react";
import cx from "classnames";
import { useLocation } from "react-router-dom";
import styles from "./SelectAccount.module.scss";
import Logo from "@/assets/images/Logo.svg";
import {allStudentsData} from "@/helpers/sampleData";
import { useDispatch, useSelector } from "react-redux";
import {initialsCase, titleCase} from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import StudentLoginModal from "@/components/Modals/StudentLogin/StudentLogin";
import generateColor from "@/helpers/generateColor";


const SelectAccount = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const allStudentsData = location?.state?.payload;

  console.log(allStudentsData);

  const handleLogin = (student) => {
    dispatch(showModal({action: "show", type: "studentLogin", modalData: student}));
  };

  return (
    <div className={cx(styles.selectAccountWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <img src={Logo} alt="" />
        <p>Select your account to continue</p>
      </div>
      <div className={cx(styles.body)}>
        {allStudentsData.map((element, index) => {
          return (
            <div key={index}  onClick={()=> handleLogin(element)} className={cx(styles.studentContainer, "flexCol")}>

              <div className={cx(styles.imageDiv)}>
            
                {element?.studentImage ? <img className={cx(styles.profileImage)} src={element?.studentImage} alt="" /> : 
                  <span style={{backgroundColor: generateColor()}}>{initialsCase(`${element.firstName} ${element.lastName}`)}</span>
                }
              </div>
    
              <p>{`${titleCase(element.firstName)} ${titleCase(element.lastName)}`}</p>
            </div>
          );
        }
        )}

      </div>

      {modalState === "show" ? <Modal show >{modalType === "studentLogin" ? <StudentLoginModal /> :  null}</Modal> : null}
    </div>
  );
};

export default SelectAccount;