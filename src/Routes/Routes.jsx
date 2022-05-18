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
import MyLessonsStudent from "../Pages/AuthenticatedPages/StudentAccount/MyLessons/MyLessons";
import ViewLessonStudent from "../Pages/AuthenticatedPages/StudentAccount/MyLessons/ViewLesson/ViewLesson";
import ProfileStudent from "../Pages/AuthenticatedPages/StudentAccount/Profile/Profile";




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
				
        <Route path="student-dashboard" element={<AuthenticatedRoute roles={[Role.Individual, Role.SuperAdmin, Role.Enterprise, Role.Guest]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="" element={<DashboardStudent  />} />
          <Route path="profile" element={<ProfileStudent  />} />
          <Route path="assessment-feedback" element={<AssessmentFeedbackStudent  />} />
          <Route path="my-lessons">
            <Route index path="" element={<MyLessonsStudent  />} />
            <Route path="view-lesson/:id" element={<ViewLessonStudent  />} />
          </Route>


        </Route>			
									
        <Route  path="unauthorized-page" element={<UnAuthorizedPage />} />
        <Route  path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>

  );
};

export default RoutesComponent;