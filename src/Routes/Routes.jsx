// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Authentication/Login/Login";
import LoginWithClassCode from "../Pages/Authentication/Login/LoginWithClassCode";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import ParentSignUp from "../Pages/Authentication/SignUp/ParentSignUp/ParentSignUp";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword/ResetPassword";
import OtpExpired from "../Pages/Authentication/OTPExpired/OTPExpired";
import OtpVerification from "../Pages/Authentication/OTPVerification/OTPVerification";
import RequestVerificationLink from "../Pages/Authentication/RequestVerificationLink/RequestVerificationLink";
import Page404 from "../Pages/Page404/Page404";
import UnAuthorizedPage from "../Pages/UnAuthorizedPage/UnAuthorizedPage";
import DashboardWrapper from "../Pages/Dashboard/Dashboard";
import VerifyEmail from "../Pages/VerifyEmail/VerifyEmail";
import AuthenticatedRoute from "../components/AuthenticatedRoute/AuthenticatedRoutes";


import {Role} from "@/constants/constants";

// Student Section
import DashboardStudent from "../Pages/AuthenticatedPages/StudentAccount/Home/Home";
import AssessmentFeedbackStudent from "../Pages/AuthenticatedPages/StudentAccount/AssessmentFeedback/AssessmentFeedback";
import MyClassesStudent from "../Pages/AuthenticatedPages/StudentAccount/MyClasses/MyClasses";
import ViewClassStudent from "../Pages/AuthenticatedPages/StudentAccount/MyClasses/ViewClass/ViewClass";
import ProfileStudent from "../Pages/AuthenticatedPages/StudentAccount/Profile/Profile";
import ClassGistStudent from "../Pages/AuthenticatedPages/StudentAccount/ClassGist/ClassGist";

// Parent Section
import DashboardParent from "../Pages/AuthenticatedPages/ParentAccount/Home/Home";
import AssessmentFeedbackParent from "../Pages/AuthenticatedPages/ParentAccount/AssessmentFeedback/AssessmentFeedback";
import ProfileParent from "../Pages/AuthenticatedPages/ParentAccount/Profile/Profile";
import MessagesParent from "../Pages/AuthenticatedPages/ParentAccount/Messages/Messages";


// Teacher Section
import DashboardTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Home/Home";
import TasksAndActivitiesTeacher from "../Pages/AuthenticatedPages/TeacherAccount/TasksAndActivities/TasksAndActivities";
import ProfileTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Profile/Profile";
import LessonsTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Lessons/Lessons";
import LoungeTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Lounge/Lounge";


const RoutesComponent = () => {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route index path="" element={<HomePage  />} />
        <Route path="login" element={<Login />} />
        <Route path="login-with-class-code" element={<LoginWithClassCode />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="parent-signup" element={<ParentSignUp />} />
        <Route path="api/email/verify/:id/:token" element={<VerifyEmail />} />		
        <Route  path="forgot-password" element={<ForgotPassword />} />
        <Route  path="otp-expired" element={<OtpExpired />} />
        <Route  path="otp-verification" element={<OtpVerification />} />
        <Route  path="reset-password/:token" element={<ResetPassword />} />	
        <Route  path="request-verification-link" element={<RequestVerificationLink />} />	
				
        <Route path="student-experience" element={<AuthenticatedRoute roles={[Role.Individual, Role.SuperAdmin, Role.Enterprise, Role.Guest]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardStudent  />} />
          <Route path="profile" element={<ProfileStudent  />} />
          <Route path="dashboard/assessment-feedback" element={<AssessmentFeedbackStudent  />} />
          <Route path="my-classes">
            <Route index path="" element={<MyClassesStudent  />} />
            <Route path="view-class/:id" element={<ViewClassStudent  />} />
          </Route>
          <Route path="class-gist" element={<ClassGistStudent  />} />


        </Route>			


        <Route path="parent-experience" element={<AuthenticatedRoute roles={[Role.Individual, Role.SuperAdmin, Role.Enterprise, Role.Guest]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardParent  />} />
          <Route path="profile" element={<ProfileParent  />} />
          <Route path="messages" element={<MessagesParent  />} />
          <Route path="dashboard/assessment-feedback" element={<AssessmentFeedbackParent  />} />

        </Route>	

        <Route path="teacher-experience" element={<AuthenticatedRoute roles={[Role.Individual, Role.SuperAdmin, Role.Enterprise, Role.Guest]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardTeacher  />} />
          <Route path="profile" element={<ProfileTeacher  />} />
          <Route path="tasks-and-activities" element={<TasksAndActivitiesTeacher  />} />
          <Route path="lessons" element={<LessonsTeacher  />} />
          <Route path="lounge" element={<LoungeTeacher  />} />

        </Route>


        <Route  path="unauthorized-page" element={<UnAuthorizedPage />} />
        <Route  path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>

  );
};

export default RoutesComponent;