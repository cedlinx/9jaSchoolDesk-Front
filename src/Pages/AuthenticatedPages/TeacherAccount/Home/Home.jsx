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
import AddStudentModal from "@/components/Modals/AddNewStudentByTeacher/AddNewStudentByTeacher";
import SendNotificationToParentModal from "@/components/Modals/SendNotificationToParent/SendNotificationToParent";
import ViewStudentProfileModal from "@/components/Modals/ViewStudentProfile/ViewStudentProfile";
import UploadActivityModal from "@/components/Modals/UploadActivity/UploadActivity";
import SubmitAssessmentModal from "@/components/Modals/SubmitAssessment/SubmitAssessment";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import AttendanceCard from "@/components/Cards/AttendanceCard/AttendanceCard";
import { takeAttendance as takeAttendanceFxn, getClassDetails, getAllStudents } from "@/redux/Teacher/TeacherSlice";
import useGetClassID from "@/utils/useGetClassID";


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.teacher.loading);
  let class_id = useGetClassID();

  const dataArray = useSelector((state) => state?.teacher?.getAllStudentsData?.wards);

  console.log(dataArray);
  const [attendanceDataArray, setAttendanceDataArray] = useState([]);

  const [takeAttendance, setTakeAttendance] = useState(false);
  const [studentAttendanceStatus, setStudentAttendanceStatus] = useState([]);
  const [presentStudents, setPresentStudents] = useState(0);

  useEffect(() => {
    dispatch(getAllStudents(class_id));
  }, [dispatch, class_id]);

  const attendanceStatus = (status) => {
    console.log(status);
    let studentsArr = [...studentAttendanceStatus];
    let result = studentsArr.find((student) => {
      return student.id === status.id;
    });
    let answer = studentsArr.indexOf(result);
    if (answer === -1) {
      studentsArr.push(status);
      status.status === 1 ? setPresentStudents(presentStudents + 1) : setPresentStudents(presentStudents - 1);
    } else {
      studentsArr.splice(answer, 1);
      studentsArr.push(status);
      status.status === 1 ? setPresentStudents(presentStudents + 1) : setPresentStudents(presentStudents - 1);
    }
    setStudentAttendanceStatus(studentsArr);
  };

  const handleTakeAttendance = async () => {

    setTakeAttendance(true);
    let response = await dispatch(takeAttendanceFxn({class_id: class_id}));
    console.log(response);
    if (response.payload.success) {
      console.log(response.payload.students);
      setAttendanceDataArray(response.payload.students);
      let presentStudents = response?.payload?.students.filter((student) => {
        return student.status === 1;
      });
      setPresentStudents(presentStudents.length);

      let status = [];
      response.payload.students.forEach((student) => {
        status.push({ id: student.id, status: student.status });
      });
      console.log(status);
      setStudentAttendanceStatus(status);
    }
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
          <Button onClick={() => dispatch(showModal({ action: "show", type: "addNewStudentByTeacher" }))} type title="Add Student" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
        </div>
      </div>

      <div className={cx(styles.body)}>
        {!takeAttendance ? loading ? <>Fetching Data</> : Array.isArray(dataArray) && dataArray.length === 0 ? <div>No Student Added To This Class. Kindly Add New Students</div> : Array.isArray(dataArray) && dataArray.map((student, index) => {
          return (
            <AttendanceCard takeAttendance={takeAttendance} key={index} cardData={student} attendanceStatus={attendanceStatus} />
          );
        }
        ) : null}
        {takeAttendance ? loading ? <p>Fetching Data...</p> :  Array.isArray(attendanceDataArray) && attendanceDataArray.map((student, index) => {
          return (
            <AttendanceCard takeAttendance={takeAttendance} key={index} cardData={student} attendanceStatus={attendanceStatus} />
          );
        }
        ) : null}
      </div>

      {takeAttendance && <div className={cx(styles.footer, "flexRow")}>
        <p><span>{presentStudents} / {Array.isArray(dataArray) && dataArray.length}</span> <span>Attendance Today</span></p>
        <div className={cx(styles.btnGroup, "flexRow")}>

          <Button onClick={() => setTakeAttendance(false)} type title="Cancel" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />

          <Button onClick={() => dispatch(showModal({ action: "show", type:"saveAttendance", modalData: studentAttendanceStatus }))} type title="Save Attendance" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" />
        </div>
      </div>}

      {modalState === "show" && modalType === "saveAttendance" && <Modal show >{<SaveAttendanceModal resetTakeAttendance={resetTakeAttendance} />}</Modal>}
      {modalState === "show" && modalType === "submitAssessment" && <Modal show >{<SubmitAssessmentModal />}</Modal>}
      {modalState === "show" && modalType === "uploadActivity" && <Modal show >{<UploadActivityModal />}</Modal>}
      {modalState === "show" && modalType === "viewStudentProfile" && <Modal size="lg" show >{<ViewStudentProfileModal />}</Modal>}
      {modalState === "show" && modalType === "addNewStudentByTeacher" && <Modal show >{<AddStudentModal />}</Modal>}
      {modalState === "show" && modalType === "sendNotificationToParent" && <Modal show >{<SendNotificationToParentModal />}</Modal>}

    </div>
  );
};

export default Home;