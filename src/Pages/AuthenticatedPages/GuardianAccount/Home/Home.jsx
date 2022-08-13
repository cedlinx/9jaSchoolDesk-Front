import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import heroImage from "@/assets/images/parent-dashboard-hero-image.png";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import { titleCase } from "@/helpers/textTransform";
import EditProfileModal from "@/components/Modals/EditProfile/EditProfile";
import UploadActivityModal from "@/components/Modals/UploadActivity/UploadActivity";
import SubmitAssessmentModal from "@/components/Modals/SubmitAssessment/SubmitAssessment";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { getDashboard } from "@/redux/Guardian/GuardianSlice";
import AssessmentFeedback from "./AssessmentFeedback/AssessmentFeedback";
import NoticeBoard from "./NoticeBoard/NoticeBoard";
import WardProfile from "./WardProfile/WardProfile";
import TeacherRating from "./TeacherRating/TeacherRating";


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const dashboardData = useSelector((state) => state.guardian.getDashboardData);

  console.log(dashboardData);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <div className={cx(styles.heading, "flexRow")}>
        <p>Select ward account to view</p>
        <div className={cx(styles.studentsWrapper, "flexRow")}>

          <div className={cx(styles.studentContainer, "flexRow-align-center")}>
            <img src={studentProfilePic} alt="arrow" />
            <small>Chisimdi</small>
          </div>

          <div className={cx(styles.studentContainer, "flexRow-align-center")}>
            <img src={studentProfilePic} alt="arrow" />
            <small>Tochi</small>
          </div>

        </div>
      </div>

      <div className={cx(styles.body, "row", "g-0")}> 
        <div className={cx(styles.leftSection, "col-sm-12", "col-lg-8", "col-xl-9")}>
          <section className={cx(styles.heroImageSection)}>

            <img className={cx(styles.bgImage)} src={heroImage} alt="img" />
            <div className={cx(styles.heroImageText, "flexCol")}>
              <h3>Welcome Chisimdi</h3>
              <p>Where will you like to start off today?</p>
            </div>

          </section>

          <section className={cx(styles.tablesSection, "row")}>

            <div className={cx(styles.tablesSectionLeft, "col-md-12", "col-xl-6")}>
              <AssessmentFeedback />
            </div>
            <div className={cx(styles.tablesSectionRight, "col-md-12", "col-xl-6")}>
              <NoticeBoard />
            </div>

          </section>
          
        </div>
        <div className={cx(styles.rightSection, "col-sm-12", "col-lg-4", "col-xl-3")}>
          <section className={cx(styles.rightSectionInnerContainer, "row")}>
            <div className={cx("col-sm-6", "col-md-6", "col-lg-12")}>
              <WardProfile />
            </div>
            <div className={cx("col-sm-6", "col-md-6", "col-lg-12")}>
              <TeacherRating />
            </div>
          </section>   
        </div>
      </div>

      {modalState === "show" ? <Modal show >{modalType === "editProfile" ? <EditProfileModal /> : modalType === "submitAssessment" ? <SubmitAssessmentModal /> : modalType === "uploadActivity" ? <UploadActivityModal />  : null}</Modal> : null}
            
    </div>
  );
};

export default Home;