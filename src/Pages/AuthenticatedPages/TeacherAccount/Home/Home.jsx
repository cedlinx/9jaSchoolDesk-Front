import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import Button from "@/components/Button/Button";

import { Icon } from "@iconify/react";
import { initialsCase } from "@/helpers/textTransform";
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
import { assessmentData } from "@/helpers/sampleData";

import SaveAttendanceModal from "@/components/Modals/SaveAttendance/SaveAttendance";
import AddStudentModal from "@/components/Modals/AddNewStudent/AddNewStudent";
import SendNotificationToParentModal from "@/components/Modals/SendNotificationToParent/SendNotificationToParent";
import ViewStudentProfileModal from "@/components/Modals/ViewStudentProfile/ViewStudentProfile";
import UploadActivityModal from "@/components/Modals/UploadActivity/UploadActivity";
import SubmitAssessmentModal from "@/components/Modals/SubmitAssessment/SubmitAssessment";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import AttendanceCard from "@/components/Cards/AttendanceCard/AttendanceCard";
import useGetAllClassStudents from "@/utils/useGetAllClassStudents";
import { takeAttendance as takeAttendanceFxn } from "@/redux/Teacher/TeacherSlice";
useGetAllClassStudents;


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.teacher.loading);

  const [takeAttendance, setTakeAttendance] = useState(false);
  const [studentAttendanceStatus, setStudentAttendanceStatus] = useState([]);
  let class_id = 4;
  // let studentsArray = useGetAllClassStudents(class_id);
  // console.log(studentsArray);

  const studentsArray = [
    {
      id: 1,
      name: "Emenike Chidi Michael",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 2,
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 3,
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      id: 4,
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 5,
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 6,
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      id: 7,
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 8,
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 9,
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      id: 10,
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 11,
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 12,
      name: "Fred Anderson",
      attendanceStatus: "absent",
      profilePic: studentProfilePic
    },
    {
      id: 13,
      name: "John Doe",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 14,
      name: "Emenike Chidi Michael",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    },
    {
      id: 15,
      name: "George Saim",
      attendanceStatus: "present",
      profilePic: studentProfilePic
    }

  ];

  const attendanceStatus = (status) => {
    console.log(status);
    let studentsArr = [...studentAttendanceStatus];
    let result = studentsArr.find((student) => {
      return student.id === status.id;
    });
    let answer = studentsArr.indexOf(result);
    if (answer === -1) {
      studentsArr.push(status);
    } else {
      studentsArr.splice(answer, 1);
      studentsArr.push(status);
    }
    setStudentAttendanceStatus(studentsArr);
  };

  const handleTakeAttendance = async () => {
    // setTakeAttendance(!takeAttendance);
    setTakeAttendance(true);
    let response = await dispatch(takeAttendanceFxn(1));
    console.log(response);
  };

  const resetTakeAttendance = (data) => {
    setTakeAttendance(data);
  };


  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <div className={cx(styles.heading, "flexRow")}>
        <h3 className={cx(styles.title)}>Classroom</h3>
        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button onClick={() => handleTakeAttendance()} type title="Take Attendance" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" />
          <Button onClick={() => dispatch(showModal({ action: "show", type: "addStudent" }))} type title="Add Student" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
        </div>
      </div>

      <div className={cx(styles.body)}>
        {!takeAttendance && Array.isArray(studentsArray) && studentsArray.map((student, index) => {
          return (
            <AttendanceCard takeAttendance={takeAttendance} key={index} cardData={student} attendanceStatus={attendanceStatus} />
          );
        }
        )}
        {takeAttendance ? loading ? <p>Fetching Data...</p> :  Array.isArray(studentsArray) && studentsArray.map((student, index) => {
          return (
            <AttendanceCard takeAttendance={takeAttendance} key={index} cardData={student} attendanceStatus={attendanceStatus} />
          );
        }
        ) : null}
      </div>

      {takeAttendance && <div className={cx(styles.footer, "flexRow")}>
        <p><span>9 / 24</span> <span>Attendance Today</span></p>
        <div className={cx(styles.btnGroup, "flexRow")}>

          <Button onClick={() => setTakeAttendance(false)} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button onClick={() => dispatch(showModal({ action: "show", type:"saveAttendance", modalData: studentAttendanceStatus }))} type title="Save Attendance" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" />
        </div>
      </div>}

      {modalState === "show" && modalType === "saveAttendance" && <Modal show >{<SaveAttendanceModal resetTakeAttendance={resetTakeAttendance} />}</Modal>}
      {modalState === "show" && modalType === "submitAssessment" && <Modal show >{<SubmitAssessmentModal />}</Modal>}
      {modalState === "show" && modalType === "uploadActivity" && <Modal show >{<UploadActivityModal />}</Modal>}
      {modalState === "show" && modalType === "viewStudentProfile" && <Modal size="lg" show >{<ViewStudentProfileModal />}</Modal>}
      {modalState === "show" && modalType === "addStudent" && <Modal show >{<AddStudentModal />}</Modal>}
      {modalState === "show" && modalType === "sendNotificationToParent" && <Modal show >{<SendNotificationToParentModal />}</Modal>}

    </div>
  );
};

export default Home;