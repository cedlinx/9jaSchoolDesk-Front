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
import DashboardIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Home/Home";
import AddAssetIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Assets/AddAsset/AddAsset";
import TransferAssetIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Assets/TransferAsset/TransferAsset";
import AllAssetsIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Assets/AllAssets/AllAssets";
import ProfileIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Profile/Profile";
import AllPaymentsIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Profile/AllPayments/AllPayments";
import BillingsIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Billings/Billings";
import RenewPlanIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Billings/RenewPlan/RenewPlan";
import UpgradePlanIndividual from "../Pages/AuthenticatedPages/IndividualAccount/Billings/UpgradePlan/UpgradePlan";


// Business User Section
import DashboardBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Home/Home";
import AnalysisBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Analysis/Analysis";
import AddAssetBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Assets/AddAsset/AddAsset";
import TransferAssetBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Assets/TransferAsset/TransferAsset";
import BulkAssetTransfer from "../Pages/AuthenticatedPages/BusinessAccount/Assets/TransferAsset/BulkTransfer/BulkTransfer";
import AllAssetsBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Assets/AllAssets/index";
import BatchRegisterAsset from "../Pages/AuthenticatedPages/BusinessAccount/Assets/AddAsset/BatchRegister/BatchRegister";
import ReviewBatchRegisterAsset from "../Pages/AuthenticatedPages/BusinessAccount/Assets/AddAsset/ReviewBatchRegisterAsset/ReviewBatchRegisterAsset";
import UsersBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Users/Users";
import UserActivitiesBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Users/UserActivities/UserActivities";
import ProfileBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Profile/Profile";
import AllPaymentsBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Profile/AllPayments/AllPayments";
import BillingsBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Billings/Billings";
import RenewPlanBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Billings/RenewPlan/RenewPlan";
import UpgradePlanBusiness from "../Pages/AuthenticatedPages/BusinessAccount/Billings/UpgradePlan/UpgradePlan";

// Super Admin Section
import DashboardSuperAdmin from "../Pages/AuthenticatedPages/SuperAdminAccount/Home/Home";
import AllAssetsSuperAdmin from "../Pages/AuthenticatedPages/SuperAdminAccount/Assets/AllAssets/index";
import AssetCategorySuperAdmin from "../Pages/AuthenticatedPages/SuperAdminAccount/Assets/AssetCategory/AssetCategory";
import UserActivitiesSuperAdmin from "../Pages/AuthenticatedPages/SuperAdminAccount/Account/ManageUsers/UserActivities/UserActivities";
import AccountSuperAdmin from "../Pages/AuthenticatedPages/SuperAdminAccount/Account/index";
import AllPaymentsSuperAdmin from "../Pages/AuthenticatedPages/SuperAdminAccount/Account/AllPayments/AllPayments";
import ReportedAssetsSuperAdmin from "../Pages/AuthenticatedPages/SuperAdminAccount/ReportedAssets/index";
import SettingsSuperAdmin from "../Pages/AuthenticatedPages/SuperAdminAccount/Settings/index";


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
				
				<Route path="individual-dashboard" element={<AuthenticatedRoute roles={[Role.Individual, Role.SuperAdmin, Role.Enterprise, Role.Guest]}><DashboardWrapper /></AuthenticatedRoute>}>

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
				</Route>

				<Route path="business-dashboard" element={<AuthenticatedRoute roles={[Role.Enterprise, Role.SuperAdmin]}><DashboardWrapper /></AuthenticatedRoute>}>

					<Route index path="" element={<DashboardBusiness  />} />
					<Route path ="analysis" element={<AnalysisBusiness />} />
					<Route  path="add-new-asset" >
						<Route  index path="" element={<AddAssetBusiness  />} />
						<Route  path="batch-register" >
							<Route  index path="" element={<BatchRegisterAsset  />} />
							<Route  path="review-batch-register" element={<ReviewBatchRegisterAsset  />} />
						</Route>
					</Route>
					<Route  path="transfer-asset">
						<Route index path="" element={<TransferAssetBusiness />} />
						<Route path="bulk-transfer" element={<BulkAssetTransfer />} />
					</Route>
					<Route  path="all-assets" element={<AllAssetsBusiness  />}>
						<Route index path="" element={<AllAssetsBusiness />}/>
					</Route>
					<Route  path="users">
						<Route  index path="" element={<UsersBusiness />} />
						<Route  path="user-activities/:userId" element={<UserActivitiesBusiness />} />
					</Route>
					<Route  path="profile">
						<Route  index path="" element={<ProfileBusiness />} />
						<Route  path="all-payments" element={<AllPaymentsBusiness />} />
					</Route>
					<Route  path="billings">
						<Route  index path="" element={<BillingsBusiness />} />
						<Route  path="renew-plan" element={<RenewPlanBusiness />} />
						<Route  path="upgrade-plan" element={<UpgradePlanBusiness />} />
					</Route>
				</Route>

				<Route path="superAdmin-dashboard" element={<AuthenticatedRoute roles={[Role.SuperAdmin]}><DashboardWrapper /></AuthenticatedRoute>}>

					<Route index path="" element={<DashboardSuperAdmin  />} />
					<Route  path="all-assets" element={<AllAssetsSuperAdmin  />}>
						<Route index path="" element={<AllAssetsSuperAdmin />}/>
					</Route>
					<Route path="asset-category" element={<AssetCategorySuperAdmin />}/>

					<Route  path="settings" element={<SettingsSuperAdmin />} />

					<Route  path="account">
						<Route  index path="" element={<AccountSuperAdmin />} />
						<Route  path="all-payments" element={<AllPaymentsSuperAdmin />} />
						<Route  path="user-activities/:userId" element={<UserActivitiesSuperAdmin />} />

					</Route>
					<Route  path="reported-assets" element={<ReportedAssetsSuperAdmin />} />
						
				</Route>
				
									
				<Route  path="unauthorized-page" element={<UnAuthorizedPage />} />
				<Route  path="*" element={<Page404 />} />
			</Routes>
		</BrowserRouter>

	);
};

export default RoutesComponent;