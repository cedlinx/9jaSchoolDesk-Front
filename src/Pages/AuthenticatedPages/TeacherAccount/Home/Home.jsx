import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import Button from "@/components/Button/Button";

import { Icon } from "@iconify/react";
import {initialsCase} from "@/helpers/textTransform";
import curiosityIcon from "@/assets/icons/curiosity.svg";
import persistenceIcon from "@/assets/icons/persistence.svg";
import teamworkIcon from "@/assets/icons/teamwork.svg";
import gratitudeIcon from "@/assets/icons/gratitude.svg";
import expandIcon from "@/assets/icons/expand-icon.svg";
import behaviouralCardImage from "@/assets/images/behavioral-card-image.png";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import editIcon from "@/assets/icons/edit-icon.svg";
import addIcon from "@/assets/icons/add-icon.svg";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";

import EditProfileModal from "@/components/Modals/EditProfile/EditProfile";
import AddStudentModal from "@/components/Modals/AddStudent/AddStudent";
import ViewStudentProfileModal from "@/components/Modals/ViewStudentProfile/ViewStudentProfile";
import UploadActivityModal from "@/components/Modals/UploadActivity/UploadActivity";
import SubmitAssessmentModal from "@/components/Modals/SubmitAssessment/SubmitAssessment";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import AttendanceCard from "@/components/Cards/AttendanceCard/AttendanceCard";

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const [takeAttendance, setTakeAttendance] = useState(false);

  const studentsArray = [
    {
      name: "Emenike Chidi Michael",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Emenike Chidi Michael",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      name: "Jane Doe",
      attendanceStatus: "absent",
      profilePic: null
    }
  ];

  const generateColor = () => {
    const letters = "123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  let shortenDate=(value)=>{
    let date = new Date(value);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
    let dateValue = date.toLocaleDateString("en-US", options);
    return `${dateValue}`;
  };

  const editProfileModal = () => {
    return (
      <EditProfileModal />
    );
  };

  const submitAssessmentModal = () => {
    return (
      <SubmitAssessmentModal />
    );
  };

  const uploadActivityModal = () => {
    return (
      <UploadActivityModal />
    );
  };
  
  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <div className={cx(styles.heading, "flexRow")}>
        <h3 className={cx(styles.title)}>Classroom</h3>
        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={()=>setTakeAttendance(true)} type title="Take Attendance" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" />
          <Button onClick={() => dispatch(showModal({action: "show", type: "addStudent"}))} type title="Add Student" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
        </div>
      </div>

      <div className={cx(styles.body)}> 
        {studentsArray.map((student, index) => {
          return(
            <AttendanceCard takeAttendance={takeAttendance} key={index} cardData={student} />
          );
        }
        )}
      </div>

      {takeAttendance && <div className={cx(styles.footer, "flexRow")}>
        <p><span>9 / 24</span> <span>Attendance Today</span></p>
        <div className={cx(styles.btnGroup, "flexRow")}>
        
          <Button onClick={() => setTakeAttendance(false)} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button onClick={() => dispatch(showModal({action: "show"}))} type title="Save Attendance" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" />
        </div>
      </div>}                  
    

      {modalState === "show" ? <Modal show >{modalType === "editProfile" ? editProfileModal() : modalType === "submitAssessment" ? submitAssessmentModal() : modalType === "uploadActivity" ? uploadActivityModal()  :  modalType === "viewStudentProfile" ? <ViewStudentProfileModal /> :  modalType === "addStudent" ? <AddStudentModal /> :  null}</Modal> : null}
            
    </div>
  );
};

Home.propTypes = {
    
};

export default Home;