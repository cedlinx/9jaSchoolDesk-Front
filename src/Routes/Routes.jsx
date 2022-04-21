// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
// import About from "../Pages/About/About";
import Login from "../Pages/Authentication/Login/Login";
import LoginWithClassCode from "../Pages/Authentication/Login/LoginWithClassCode";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword/ResetPassword";
import OtpExpired from "../Pages/Authentication/OTPExpired/OTPExpired";
import OtpVerification from "../Pages/Authentication/OTPVerification/OTPVerification";
import RequestVerificationLink from "../Pages/Authentication/RequestVerificationLink/RequestVerificationLink";
import Page404 from "../Pages/Page404/Page404";
import UnAuthorizedPage from "../Pages/UnAuthorizedPage/UnAuthorizedPage";
// import Individuals from "../Pages/Individuals/Individuals";
// import Business from "../Pages/Business/Business";
// import Pricing from "../Pages/Pricing/Pricing";
// import Agent from "../Pages/Agent/Agent";
// import Contact from "../Pages/Contact/Contact";
import DashboardWrapper from "../Pages/Dashboard/Dashboard";
import VerifyEmail from "../Pages/VerifyEmail/VerifyEmail";
import AuthenticatedRoute from "../components/AuthenticatedRoute/AuthenticatedRoutes";


import {Role} from "@/constants/constants";

// Individual User Section
// import DashboardIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Home/Home";
// import AddAssetIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Assets/AddAsset/AddAsset";
// import TransferAssetIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Assets/TransferAsset/TransferAsset";
// import AllAssetsIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Assets/AllAssets/AllAssets";
// import ProfileIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Profile/Profile";
// import AllPaymentsIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Profile/AllPayments/AllPayments";
// import BillingsIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Billings/Billings";
// import RenewPlanIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Billings/RenewPlan/RenewPlan";
// import UpgradePlanIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Billings/UpgradePlan/UpgradePlan";


const RoutesComponent = () => {
	return (
		<BrowserRouter className="App">
			<Routes>
				<Route index path="" element={<HomePage  />} />
				{/* <Route path="about" element={<About  />} />
				<Route path="individuals" element={<Individuals />} />
				<Route path="business" element={<Business />} />
				<Route path="agent" element={<Agent />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="contact" element={<Contact />} /> */}
				<Route path="login" element={<Login />} />
				<Route path="login-with-class-code" element={<LoginWithClassCode />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="verify-email/:token" element={<VerifyEmail />} />		
				<Route  path="forgot-password" element={<ForgotPassword />} />
				<Route  path="otp-expired" element={<OtpExpired />} />
				<Route  path="otp-verification" element={<OtpVerification />} />
				<Route  path="reset-password/:token" element={<ResetPassword />} />	
				<Route  path="request-verification-link" element={<RequestVerificationLink />} />	
				
				{/* <Route path="individual-dashboard" element={<AuthenticatedRoute roles={[Role.Individual, Role.SuperAdmin, Role.Enterprise, Role.Guest]}><DashboardWrapper /></AuthenticatedRoute>}>

					<Route index path="" element={<DashboardIndividual  />} />
					<Route  path="add-new-asset" element={<AddAssetIndividual  />} />
					<Route  path="transfer-asset" element={<TransferAssetIndividual  />} />
					<Route  path="all-assets" element={<AllAssetsIndividual  />} />
					<Route  path="profile">
						<Route  index path="" element={<ProfileIndividual />} />
						<Route  path="all-payments" element={<AllPaymentsIndividual />} />
					</Route>
					<Route  path="billings">
						<Route  index path="" element={<BillingsIndividual />} />
						<Route  path="renew-plan" element={<RenewPlanIndividual />} />
						<Route  path="upgrade-plan" element={<UpgradePlanIndividual />} />
					</Route>
				</Route>			 */}
									
				<Route  path="unauthorized-page" element={<UnAuthorizedPage />} />
				<Route  path="*" element={<Page404 />} />
			</Routes>
		</BrowserRouter>

	);
};

export default RoutesComponent;