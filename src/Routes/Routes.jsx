// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Authentication/Login/Login";
import LoginWithClassCode from "../Pages/Authentication/Login/LoginWithClassCode";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import AddInstitution from "../Pages/Authentication/AddInstitution/AddInstitution";
import PreSignUp from "../Pages/Authentication/PreSignUp/PreSignUp";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword/ResetPassword";
import OtpExpired from "../Pages/Authentication/OTPExpired/OTPExpired";
import OtpVerification from "../Pages/Authentication/OTPVerification/OTPVerification";
// import RequestVerificationLink from "../Pages/Authentication/RequestVerificationLink/RequestVerificationLink";
import Page404 from "../Pages/Page404/Page404";
import UnAuthorizedPage from "../Pages/UnAuthorizedPage/UnAuthorizedPage";
import DashboardWrapper from "../Pages/Dashboard/Dashboard";
import VerifyEmail from "../Pages/Authentication/VerifyEmail/VerifyEmail";
import AuthenticatedRoute from "../components/AuthenticatedRoute/AuthenticatedRoutes";


import { Role } from "@/constants/constants";

// Student Section
import DashboardStudent from "../Pages/AuthenticatedPages/StudentAccount/Home/Home";
import DashboardCompletedTasks from "../Pages/AuthenticatedPages/StudentAccount/Home/Activities/CompletedTasks/CompletedTasks";
import DashboardPendingTasks from "../Pages/AuthenticatedPages/StudentAccount/Home/Activities/PendingTasks/PendingTasks";
import DashboardAllTasks from "../Pages/AuthenticatedPages/StudentAccount/Home/Activities/AllTasks/AllTasks";
import AssessmentFeedbackStudent from "../Pages/AuthenticatedPages/StudentAccount/AssessmentFeedback/AssessmentFeedback";
import MyClassesStudent from "../Pages/AuthenticatedPages/StudentAccount/MyClasses/MyClasses";
import SelectAccountStudent from "../Pages/Authentication/Login/SelectAccount/SelectAccount";
import ViewClassStudent from "../Pages/AuthenticatedPages/StudentAccount/MyClasses/ViewClass/ViewClass";
import ProfileStudent from "../Pages/AuthenticatedPages/StudentAccount/Profile/Profile";
import ClassGistStudent from "../Pages/AuthenticatedPages/StudentAccount/ClassGist/ClassGist";
import TasksStudent from "../Pages/AuthenticatedPages/StudentAccount/Tasks/Tasks";
import Student_Tasks_Submitted from "../Pages/AuthenticatedPages/StudentAccount/Tasks/Submitted/Submitted";
import Student_Tasks_Overdue from "../Pages/AuthenticatedPages/StudentAccount/Tasks/Overdue/Overdue";
import Student_Tasks_Active from "../Pages/AuthenticatedPages/StudentAccount/Tasks/Active/Active";
import Student_Tasks_All from "../Pages/AuthenticatedPages/StudentAccount/Tasks/All/All";
import SubmitTaskStudent from "../Pages/AuthenticatedPages/StudentAccount/SubmitTask/SubmitTask";


// Guardian Section
import DashboardGuardian from "../Pages/AuthenticatedPages/GuardianAccount/Home/Home";
import AssessmentFeedbackGuardian from "../Pages/AuthenticatedPages/GuardianAccount/AssessmentFeedback/AssessmentFeedback";
import SubmissionsGuardian from "../Pages/AuthenticatedPages/GuardianAccount/Submissions/Submissions";
import TasksGuardian from "../Pages/AuthenticatedPages/GuardianAccount/Tasks/Tasks";
import Guardian_Tasks_Submitted from "../Pages/AuthenticatedPages/GuardianAccount/Tasks/Submitted/Submitted";
import Guardian_Tasks_Overdue from "../Pages/AuthenticatedPages/GuardianAccount/Tasks/Overdue/Overdue";
import Guardian_Tasks_Active from "../Pages/AuthenticatedPages/GuardianAccount/Tasks/Active/Active";
import Guardian_Tasks_All from "../Pages/AuthenticatedPages/GuardianAccount/Tasks/All/All";
import ProfileGuardian from "../Pages/AuthenticatedPages/GuardianAccount/Profile/Profile";
import MessagesGuardian from "../Pages/AuthenticatedPages/GuardianAccount/Messages/Messages";
import SelectWardGuardian from "../Pages/Authentication/Login/SelectWard/SelectWard";


// Teacher Section
import DashboardTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Home/Home";
import TasksAndActivitiesTeacher from "../Pages/AuthenticatedPages/TeacherAccount/TasksAndActivities/TasksAndActivities";
import AttendanceTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Attendance/Attendance";
import ProfileTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Profile/Profile";
import LessonsTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Lessons/Lessons";
import LoungeTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Lounge/Lounge";
import ClassGistTeacher from "../Pages/AuthenticatedPages/TeacherAccount/ClassGist/ClassGist";
import SelectClassTeacher from "../Pages/Authentication/Login/SelectClass/SelectClass";
import SettingsTeacher from "../Pages/AuthenticatedPages/TeacherAccount/Settings/Settings";
import Teacher_Settings_Account from "../Pages/AuthenticatedPages/TeacherAccount/Settings/Account/Account";
import Teacher_Settings_Password from "../Pages/AuthenticatedPages/TeacherAccount/Settings/Password/Password";
import Teacher_Settings_PerformanceIndicator from "../Pages/AuthenticatedPages/TeacherAccount/Settings/PerformanceIndicator/PerformanceIndicator";



// Proprietor Section
import DashboardProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Home/Home";
import ClassesProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/AllClasses/AllClasses";
import SubjectsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Subjects/Subjects";
import ParentsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Parents/Parents";
import ParentsProprietor_ApprovedAccounts from "../Pages/AuthenticatedPages/ProprietorAccount/Parents/ApprovedAccounts/ApprovedAccounts";
import ParentsProprietor_RejectedAccounts from "../Pages/AuthenticatedPages/ProprietorAccount/Parents/RejectedAccounts/RejectedAccounts";
import ParentsProprietor_PendingAccounts from "../Pages/AuthenticatedPages/ProprietorAccount/Parents/PendingAccounts/PendingAccounts";
import TeachersProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Teachers/Teachers";
import InstitutionsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Institutions/Institutions";
import StudentsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Students/Students";
import StudentReportProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Students/StudentReport/StudentReport";
import SettingsProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Settings/Settings";
import Proprietor_Settings_Account from "../Pages/AuthenticatedPages/ProprietorAccount/Settings/Account/Account";
import Proprietor_Settings_Password from "../Pages/AuthenticatedPages/ProprietorAccount/Settings/Password/Password";
import Proprietor_Settings_PerformanceIndicator from "../Pages/AuthenticatedPages/ProprietorAccount/Settings/PerformanceIndicator/PerformanceIndicator";
import SelectInstitutionProprietor from "../Pages/Authentication/Login/SelectInstitution/SelectInstitution";
import LoungeProprietor from "../Pages/AuthenticatedPages/ProprietorAccount/Lounge/Lounge";


const RoutesComponent = () => {
  return (
    <BrowserRouter className="App">
      <Routes>
        {/* <Route index path="" element={<HomePage />} /> */}
        <Route index path="" element={<PreSignUp />} />
        <Route path="login/:user" element={<Login />} />
        <Route path="login-with-class-code" element={<LoginWithClassCode />} />
        <Route path="pre-signup/:user" element={<PreSignUp />} />
        <Route path="signup/:user" element={<SignUp />} />
        <Route path=":user/auth/email/verify/:id/:token/*" element={<VerifyEmail />} />
        <Route path="/:user/forgot-password" element={<ForgotPassword />} />
        <Route path="otp-expired" element={<OtpExpired />} />
        <Route path="login/:user/otp-verification" element={<OtpVerification />} />
        <Route path="/:user/reset/password/:token" element={<ResetPassword />} />
        <Route path="/:user/select-account" element={<SelectAccountStudent />} />
        <Route path="/:user/select-class" element={<SelectClassTeacher />} />
        {/* <Route path="/:user/select-class" element={<AuthenticatedRoute roles={[Role.Teacher]}><SelectClassTeacher /></AuthenticatedRoute>} /> */}
        <Route path="/:user/select-institution" element={<SelectInstitutionProprietor />} />
        <Route path="/:user/select-ward" element={<SelectWardGuardian />} />
        <Route path=":user/add-institution" element={<AddInstitution />} />

        {/* <Route  path="request-verification-link" element={<RequestVerificationLink />} />	 */}

        <Route path="student" element={<AuthenticatedRoute roles={[Role.Student]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route path="dashboard" element={<DashboardStudent />} >
            <Route path="pending-tasks" element={<DashboardPendingTasks />} />
            <Route path="completed-tasks" element={<DashboardCompletedTasks />} />
            <Route path="all-tasks" element={<DashboardAllTasks />} />
          </Route>
          <Route path="profile" element={<ProfileStudent />} />
          <Route path="assessment-feedback" element={<AssessmentFeedbackStudent />} />
          <Route path="my-classes">
            <Route index path="" element={<MyClassesStudent />} />
            <Route path="view-class/:id" element={<ViewClassStudent />} />
          </Route>
          <Route path="class-gist" element={<ClassGistStudent />} />
          <Route path="tasks" element={<TasksStudent />}>
            <Route path="all-tasks" element={<Student_Tasks_All />} />
            <Route path="active-tasks" element={<Student_Tasks_Active />} />
            <Route path="submitted-tasks" element={<Student_Tasks_Submitted />} />
            <Route path="overdue-tasks" element={<Student_Tasks_Overdue />} />
          </Route>
          <Route path="submit-task" element={<SubmitTaskStudent />} />
        </Route>


        <Route path="guardian" element={<AuthenticatedRoute roles={[Role.Guardian]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardGuardian />} />
          <Route path="profile" element={<ProfileGuardian />} />
          <Route path="messages" element={<MessagesGuardian />} />
          <Route path="submissions" element={<SubmissionsGuardian />} />
          <Route path="tasks" element={<TasksGuardian />}>
            <Route path="all-tasks" element={<Guardian_Tasks_All />} />
            <Route path="active-tasks" element={<Guardian_Tasks_Active />} />
            <Route path="submitted-tasks" element={<Guardian_Tasks_Submitted />} />
            <Route path="overdue-tasks" element={<Guardian_Tasks_Overdue />} />
          </Route>
          <Route path="dashboard/assessment-feedback" element={<AssessmentFeedbackGuardian />} />

        </Route>

        <Route path="teacher" element={<AuthenticatedRoute roles={[Role.Teacher, Role.Proprietor]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardTeacher />} />
          <Route path="profile" element={<ProfileTeacher />} />
          <Route path="tasks-and-activities" element={<TasksAndActivitiesTeacher />} />
          <Route path="attendance" element={<AttendanceTeacher />} />
          <Route path="lessons" element={<LessonsTeacher />} />
          <Route path="lounge" element={<LoungeTeacher />} />
          <Route path="class-gist" element={<ClassGistTeacher />} />
          <Route path="settings" element={<SettingsTeacher />} />
          <Route path="settings" element={<SettingsTeacher />}>
            <Route path="account" element={<Teacher_Settings_Account />} />
            <Route path="password" element={<Teacher_Settings_Password />} />
            <Route path="behavior-monitor" element={<Teacher_Settings_PerformanceIndicator />} />
          </Route>

        </Route>

        <Route path="proprietor" element={<AuthenticatedRoute roles={[Role.Proprietor]}><DashboardWrapper /></AuthenticatedRoute>}>

          <Route index path="dashboard" element={<DashboardProprietor />} />
          <Route path="classes" element={<ClassesProprietor />} />
          <Route path="students" >
            <Route index path="" element={<StudentsProprietor />} />
            <Route path="student-report/:studentId" element={<StudentReportProprietor />} />
          </Route>
          <Route path="teachers" element={<TeachersProprietor />} />
          <Route path="institutions" element={<InstitutionsProprietor />} />
          <Route path="parents" element={<ParentsProprietor />}>
            <Route path="active-accounts" element={<ParentsProprietor_ApprovedAccounts />} />
            <Route path="suspended-accounts" element={<ParentsProprietor_PendingAccounts />} />
            <Route path="terminated-accounts" element={<ParentsProprietor_RejectedAccounts />} />
          </Route>

          <Route path="settings" element={<SettingsProprietor />}>
            <Route path="account" element={<Proprietor_Settings_Account />} />
            <Route path="password" element={<Proprietor_Settings_Password />} />
            <Route path="behavior-monitor" element={<Proprietor_Settings_PerformanceIndicator />} />
          </Route>
          <Route path="subjects" element={<SubjectsProprietor />} />
          <Route path="lounge" element={<LoungeProprietor />} />

        </Route>


        <Route path="unauthorized-page" element={<UnAuthorizedPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>

  );
};

export default RoutesComponent;