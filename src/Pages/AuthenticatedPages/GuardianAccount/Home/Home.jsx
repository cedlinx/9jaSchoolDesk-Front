import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import heroImage from "@/assets/images/parent-dashboard-hero-image.png";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import { titleCase, initialsCase } from "@/helpers/textTransform";
import EditProfileModal from "@/components/Modals/EditProfile/EditProfile";
import UploadActivityModal from "@/components/Modals/UploadActivity/UploadActivity";
import SubmitAssessmentModal from "@/components/Modals/SubmitAssessment/SubmitAssessment";
import SubmissionDetailsModal from "@/components/Modals/SubmissionDetails/SubmissionDetails";
import TaskDetailsModal from "@/components/Modals/TaskDetails/TaskDetails";
import RateTeacherModal from "@/components/Modals/RateTeacher/RateTeacher";
import ChangePinModal from "@/components/Modals/ChangePin/ChangePin";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { getDashboard, getWardTasks } from "@/redux/Guardian/GuardianSlice";
import AssessmentFeedback from "./AssessmentFeedback/AssessmentFeedback";
import NoticeBoard from "./NoticeBoard/NoticeBoard";
import WardProfile from "./WardProfile/WardProfile";
import TeacherRating from "./TeacherRating/TeacherRating";
import useGetSelectedWard from "@/utils/useGetSelectedWard";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";



const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useGetLoggedInUser();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const dashboardData = useSelector((state) => state.guardian.getDashboardData);
  const selectedWard = useGetSelectedWard();
  const { comments_and_replies, gists, parent, ratings, wards, notices, subscription_status } = dashboardData;

  console.log(dashboardData, "dashboard data");
  console.log(selectedWard, "selected Ward");
  
  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getWardTasks({student_id: selectedWard?.id}));
  }, [dispatch, selectedWard?.id]);

  const switchWard = (ward_id) => {
    localStorage.setItem("selectedWardID", ward_id);
    dispatch(getDashboard());
  };

  return (
    <div className={cx(styles.dashboardHomeContainer, "flexCol")}>

      <div className={cx(styles.heading, "flexRow")}>
        <p>Select ward account to view</p>
        <div className={cx(styles.studentsWrapper, "flexRow")}>
          {!Array.isArray(dashboardData?.wards) ? <small>Fetching Data...</small> : Array.isArray(dashboardData?.wards) && dashboardData?.wards.length > 0 ? dashboardData.wards && dashboardData.wards.map((student, index) => (

            <div style={{borderBottom: `4px solid ${student?.id*1 === selectedWard?.id*1 ? "#2AC769" : "transparent"}`, paddingBottom: "0.25rem"}} onClick={() => switchWard(student?.id)} key={index} className={cx(styles.studentContainer, "flexRow-align-center")}>
              {student?.avatar ? 
                <img src={student?.avatar} alt="avatar" />
                :
                <span style={{ backgroundColor: "#D25B5D" }}>{initialsCase(`${student.firstName} ${student.lastName}`)}</span>
              }
              <small>{`${titleCase(student?.firstName)}`}</small>
            </div>

          )) : <p>You have no ward registered</p>}

        </div>
      </div>

      {!Array.isArray(dashboardData?.wards) ? <TableSkeleton /> : 
        Array.isArray(dashboardData?.wards) && dashboardData?.wards.length > 0 ?
          <div className={cx(styles.body, "row", "g-0")}> 
            <div className={cx(styles.leftSection, "col-sm-12", "col-lg-8", "col-xl-9")}>
              <section className={cx(styles.heroImageSection)}>

                <img className={cx(styles.bgImage)} src={heroImage} alt="img" />
                <div className={cx(styles.heroImageText, "flexCol")}>
                  <h3>Welcome {titleCase(loggedInUser?.firstName) || titleCase(loggedInUser?.name)}</h3>
                  <p>Where will you like to start off today?</p>
                </div>

              </section>

              <section className={cx(styles.tablesSection, "row")}>

                <div className={cx(styles.tablesSectionLeft, "col-md-12", "col-xl-6")}>
                  <AssessmentFeedback selectedWard={selectedWard} tasksData={selectedWard?.graded_tasks} />
                </div>
                <div className={cx(styles.tablesSectionRight, "col-md-12", "col-xl-6")}>
                  <NoticeBoard selectedWard={selectedWard} />
                </div>
              </section>
          
            </div>

            <div className={cx(styles.rightSection, "col-sm-12", "col-lg-4", "col-xl-3")}>
              <section className={cx(styles.rightSectionInnerContainer, "row")}>
                <div className={cx("col-sm-6", "col-md-6", "col-lg-12")}>
                  <WardProfile selectedWard={selectedWard} />
                </div>
                <div className={cx("col-sm-6", "col-md-6", "col-lg-12")}>
                  <TeacherRating teachersData={selectedWard?.subjects} guardianID={loggedInUser?.id} />
                </div>
              </section>   
            </div>
          </div> : <p>You have no ward registered</p>}

      {modalState === "show" && modalType === "editProfile" && <Modal show size="xl" ><EditProfileModal /> </Modal>}
      {modalState === "show" && modalType === "submitAssessment" && <Modal show ><SubmitAssessmentModal /> </Modal>}
      {modalState === "show" && modalType === "submissionDetails" && <Modal show size="lg" ><SubmissionDetailsModal /> </Modal>}
      {modalState === "show" && modalType === "changePin" && <Modal show ><ChangePinModal /> </Modal>}    
      {modalState === "show" && modalType === "rateTeacher" && <Modal show ><RateTeacherModal /> </Modal>}     
      {modalState === "show" && modalType === "uploadActivity" && <Modal show size="lg" ><UploadActivityModal /> </Modal>} 
      {modalState === "show" && modalType === "taskDetails" && <Modal show size="lg" ><TaskDetailsModal /> </Modal>} 
    </div>
  );
};

export default Home;