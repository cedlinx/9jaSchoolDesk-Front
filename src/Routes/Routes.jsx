// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Authentication/Login/Login";
import LoginWithClassCode from "../Pages/Authentication/Login/LoginWithClassCode";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import PreSignUp from "../Pages/Authentication/PreSignUp/PreSignUp";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword/ResetPassword";
import OtpExpired from "../Pages/Authentication/OTPExpired/OTPExpired";
import OtpVerification from "../Pages/Authentication/OTPVerification/OTPVerification";
// import RequestVerificationLink from "../Pages/Authentication/RequestVerificationLink/RequestVerificationLink";
import Page404 from "../Pages/Page404/Page404";
import UnAuthorizedPage from "../Pages/UnAuthorizedPage/UnAuthorizedPage";
import DashboardWrapper from "../Pages/Dashboard/Dashboard";
// import VerifyEmail from "../Pages/VerifyEmail/VerifyEmail";
import AuthenticatedRoute from "../components/AuthenticatedRoute/AuthenticatedRoutes";


import {Role} from "@/constants/constants";

// Student Section
import DashboardStudent from "../Pages/AuthenticatedPages/StudentAccount/Home/Home";
import AssessmentFeedbackStudent from "../Pages/AuthenticatedPages/StudentAccount/AssessmentFeedback/AssessmentFeedback";
import MyClassesStudent from "../Pages/AuthenticatedPages/StudentAccount/MyClasses/MyClasses";
import ViewClassStudent from "../Pages/AuthenticatedPages/StudentAccount/MyClasses/ViewClass/ViewClass";
import ProfileStudent from "../Pages/AuthenticatedPages/StudentAccount/Profile/Profile";
import ClassGistStudent from "../Pages/AuthenticatedPages/StudentAccount/ClassGist/ClassGist";

// Guardian Section
import DashboardGuardian from "../Pages/AuthenticatedPages/GuardianAccount/Home/Home";
import AssessmentFeedbackGuardian from "../Pages/AuthenticatedPages/GuardianAccount/AssessmentFeedback/AssessmentFeedback";
import ProfileGuardian from "../Pages/AuthenticatedPages/GuardianAccount/Profile/Profile";
import MessagesGuardian from "../Pages/AuthenticatedPages/GuardianAccount/Messages/Messages";


// Teacher Section
import DashboardTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Home/Home";
import TasksAndActivitiesTeacher from "../Pages/AuthenticatedPages/TeacherAccount/TasksAndActivities/TasksAndActivities";
import ProfileTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Profile/Profile";
import LessonsTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Lessons/Lessons";
import LoungeTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Lounge/Lounge";

// Proprietor Section
import DashboardProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Home/Home";
import ClassesProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Classes/Classes";
import SubjectsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Subjects/Subjects";
import ParentsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Parents/Parents";
import TeachersProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Teachers/Teachers";
import StudentsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Students/Students";
import StudentReportProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Students/StudentReport/StudentReport";
import SettingsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Settings/Settings";
import ProfileProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Profile/Profile";

const RoutesComponent = () => {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route index path="" element={<HomePage  />} />
        <Route path="login/:user" element={<Login />} />
        <Route path="login-with-class-code" element={<LoginWithClassCode />} />
        <Route path="pre-signup/:user" element={<PreSignUp />} />
        <Route path="signup/:user" element={<SignUp />} />
        {/* <Route path="api/email/verify/:id/:token" element={<VerifyEmail />} />		 */}
        <Route  path="forgot-password" element={<ForgotPassword />} />
        <Route  path="otp-expired" element={<OtpExpired />} />
        <Route  path="login/:user/otp-verification" element={<OtpVerification />} />
        <Route  path="reset-password/:token" element={<ResetPassword />} />	
        {/* <Route  path="request-verification-link" element={<RequestVerificationLink />} />	 */}
				
        <Route path="student" element={<AuthenticatedRoute roles={[Role.Student]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardStudent  />} />
          <Route path="profile" element={<ProfileStudent  />} />
          <Route path="dashboard/assessment-feedback" element={<AssessmentFeedbackStudent  />} />
          <Route path="my-classes">
            <Route index path="" element={<MyClassesStudent  />} />
            <Route path="view-class/:id" element={<ViewClassStudent  />} />
          </Route>
          <Route path="class-gist" element={<ClassGistStudent  />} />
        </Route>			


        <Route path="guardian" element={<AuthenticatedRoute roles={[Role.Guardian]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardGuardian  />} />
          <Route path="profile" element={<ProfileGuardian  />} />
          <Route path="messages" element={<MessagesGuardian  />} />
          <Route path="dashboard/assessment-feedback" element={<AssessmentFeedbackGuardian  />} />

        </Route>	

        <Route path="teacher" element={<AuthenticatedRoute roles={[Role.Teacher]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardTeacher  />} />
          <Route path="profile" element={<ProfileTeacher  />} />
          <Route path="tasks-and-activities" element={<TasksAndActivitiesTeacher  />} />
          <Route path="lessons" element={<LessonsTeacher  />} />
          <Route path="lounge" element={<LoungeTeacher  />} />

        </Route>

        <Route path="proprietor" element={<AuthenticatedRoute roles={[Role.Student, Role.Teacher, Role.Guardian, Role.Proprietor]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardProprietor  />} />
          <Route path="classes" element={<ClassesProprietor  />} />
          <Route  path="students" >
            <Route index path="" element={<StudentsProprietor  />} />
            <Route path="student-report/:studentId" element={<StudentReportProprietor  />} />
          </Route>
          <Route path="teachers" element={<TeachersProprietor  />} />
          <Route path="parents" element={<ParentsProprietor  />} />
          <Route path="settings" element={<SettingsProprietor  />} />
          <Route path="subjects" element={<SubjectsProprietor  />} />
          <Route path="profile" element={<ProfileProprietor  />} />

        </Route>


        <Route  path="unauthorized-page" element={<UnAuthorizedPage />} />
        <Route  path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>

  );
};

export default RoutesComponent;