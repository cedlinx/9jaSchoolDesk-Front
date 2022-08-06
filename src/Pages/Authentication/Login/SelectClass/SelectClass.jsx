import React from "react";
import cx from "classnames";
import styles from "./SelectClass.module.scss";
import Logo from "@/assets/images/Logo.svg";
import { allStudentsData } from "@/helpers/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import StudentLoginModal from "@/components/Modals/StudentLogin/StudentLogin";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const SelectClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);

  const generateColor = () => {
    const letters = "123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className={cx(styles.selectClassWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <img src={Logo} alt="" />
        <p>Select a class to continue</p>
      </div>
      <div className={cx(styles.body)}>
        {allStudentsData.map((element, index) => {
          return (
            <div key={index} onClick={() => navigate("/teacher/dashboard")} className={cx(styles.studentContainer, "flexCol")}>

              <div className={cx(styles.imageDiv)}>
                <Icon icon="healthicons:i-training-class" color="#d25b5d" width="72" />

                {/* {element?.studentImage ? <Icon icon="healthicons:i-training-class" color="#d25b5d" width="72" /> :
                  <span style={{ backgroundColor: generateColor() }}>{initialsCase(`${element.firstName} ${element.lastName}`)}</span>
                } */}

                {/* {element?.studentImage ? <img className={cx(styles.profileImage)} src={element?.studentImage} alt="" /> :
                  <span style={{ backgroundColor: generateColor() }}>{initialsCase(`${element.firstName} ${element.lastName}`)}</span>
                } */}
              </div>

              {/* <p>{`${titleCase(element.firstName)} ${titleCase(element.lastName)}`}</p> */}
              <p>JSS 1 A</p>
            </div>
          );
        }
        )}

      </div>

      {modalState === "show" ? <Modal show >{modalType === "studentLogin" ? <StudentLoginModal /> : null}</Modal> : null}
    </div>
  );
};

export default SelectClass;