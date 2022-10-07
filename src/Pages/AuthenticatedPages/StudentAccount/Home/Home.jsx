import React from "react";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./Home.module.scss";
import Button from "@/components/Button/Button";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";

// import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";

import EditProfileModal from "@/components/Modals/EditProfile/EditProfile";
import ChangePinModal from "@/components/Modals/ChangePin/ChangePin";
import TaskDetailsModal from "@/components/Modals/TaskDetails/TaskDetails";
import UploadActivityModal from "@/components/Modals/UploadActivity/UploadActivity";
import SubmitAssessmentModal from "@/components/Modals/SubmitAssessment/SubmitAssessment";
import RateTeacherModal from "@/components/Modals/RateTeacher/RateTeacher";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";

import Activities from "./Activities/Activities";
import BehaviouralFeedback from "./BehaviouralFeedback/BehaviouralFeedback";
import WardProfile from "./WardProfile/WardProfile";
import TeacherRating from "./TeacherRating/TeacherRating";
import AssessmentFeedback from "./AssessmentFeedback/AssessmentFeedback";

import useGetStudentDashboard from "@/utils/useGetStudentDashboard";

const Home = () => {

  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const studentData = useGetStudentDashboard();
  
  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <section className={cx(styles.heroImageSection)}>
        <img className={cx(styles.bgImage)} src={heroImage} alt="img" />
        <div className={cx(styles.heroImageText, "flexCol")}>
          <h3>Welcome {studentData?.firstName && titleCase(studentData?.firstName)}</h3>
          <p>Where will you like to start off today?</p>
          
        </div>
        {/* <Button onClick={()=> dispatch(showModal({ action: "show", type: "changePin"}))} type title="Set Pin" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#FFF" hoverColor="#000" /> */}
      </section>

      <section className={cx(styles.upperSection, "row")}>

        <div className={cx(styles.upperSectionLeft, "col-md-12", "col-xl-6")}>
          <Activities selectedWard={studentData}/>
        </div>
        
        <div className={cx(styles.upperSectionRight, "col-md-12", "col-xl-6")}>
          <AssessmentFeedback tasksData={studentData} />
        </div>

      </section>
      
      <section className={cx(styles.lowerSection, "row")}>
        <div className={cx(styles.lowerSectionLeft, "col-sm-12", "col-md-12", "col-xl-3")}>
          <BehaviouralFeedback feedbackData={Array.isArray(studentData?.ward_kpis) && studentData?.ward_kpis} />
        </div>

        <div className={cx(styles.lowerSectionMiddle, "col-sm-12", "col-md-6", "col-xl-6")}>
          <TeacherRating teachersData={Array.isArray(studentData?.class?.subjects) && studentData?.class?.subjects} studentID={studentData?.id} />
        </div>

        <div className={cx(styles.lowerSectionRight, "col-sm-12", "col-md-6", "col-xl-3")}>
          <WardProfile selectedWard={studentData} />
        </div>
      </section>   
                                
      {modalState === "show" && modalType === "editProfile" && <Modal show ><EditProfileModal /> </Modal>}
      {modalState === "show" && modalType === "submitAssessment" && <Modal show ><SubmitAssessmentModal /> </Modal>}
      {modalState === "show" && modalType === "uploadActivity" && <Modal show ><UploadActivityModal /> </Modal>}
      {modalState === "show" && modalType === "changePin" && <Modal show ><ChangePinModal /> </Modal>}    
      {modalState === "show" && modalType === "rateTeacher" && <Modal show ><RateTeacherModal /> </Modal>}     
      {modalState === "show" && modalType === "taskDetails" && <Modal show size="lg" ><TaskDetailsModal /> </Modal>}      
    </div>
  );
};

export default Home;