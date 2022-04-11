import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./AccountInformation.module.scss";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
import {titleCase} from "@/helpers/textTransform";
import {showModal} from "@/redux/ModalState/modalState.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";
import { modifyUserValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { modifyProfileInfo, getUserInfo } from "@/redux/User/user.action";
import FormSkeleton from "@/components/SkeletonLoader/FormSkeleton";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

const AccountInformation=()=>{

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const userDetails = useSelector((state)=>state?.user?.getUserInfoData?.data);
	const loading = useSelector((state)=> state?.user?.loading);
	const [modifiedDetails, setModifiedDetails] = useState({});
	const [disabledFields, setDisabledFields] = useState(true);
	const [showSaveBtn, setShowSaveBtn] = useState(false);

	useEffect(() => {
		dispatch(getUserInfo());
	},[]);

	const resolver = yupResolver(modifyUserValidationSchema);
	const defaultValues = {
		name: userDetails && titleCase(userDetails?.data?.name),
		email: userDetails && userDetails?.data?.email,
		phone: userDetails && userDetails?.data?.phone,
		address: userDetails && userDetails?.data?.address
	};

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const modifyUserDetailsFxn = (data)=>{
		setModifiedDetails(data);
		dispatch(showModal({ action: "show", type: "modifyUserDetails" }));
	};

	const modifyFxn =()=>{
		dispatch(modifyProfileInfo(modifiedDetails));
		dispatch(showModal({ action: "hide" }));
		dispatch(getUserInfo());
	};

	const confirmModifyModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to modify the details ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={()=>dispatch(showModal({ action: "hide"}))} title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />			
					<Button loading={loading} onClick={()=>modifyFxn()}  title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
				</div>
			</div>
		);
	};

	const enableInputEdit = (e)=>{
		e.preventDefault();
		setDisabledFields(false);
		setShowSaveBtn(true);
	};

	return(
		<div className={cx(styles.container)}>
			<section className={cx(styles.accountInfoWrapper)}>
				<form onSubmit={handleSubmit((data) => modifyUserDetailsFxn(data))} >
					<div className={cx(styles.header, "flexRow")}>
						<h3>Account Information</h3>
						<Button type="button" onClick={(e)=>enableInputEdit(e)} title="Edit Information" borderRadiusType="lowRounded" textColor="#fff" bgColor="#2C0085" />
					</div>

					{loading ? <FormSkeleton /> : 
						<div className={cx(styles.body, "row")}>
							{/* <div className="col-md-4 col-xs-12">
							<Controller
								name="firstName"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<InputField
										{...rest}
										placeholder={"First Name"}
										disabled={disabledFields}
										type="text"
										error={errors?.firstName && errors?.firstName?.message}
										
									/>
								)}
							/>
						</div>
						<div className="col-md-4 col-xs-12">
							<Controller
								name="secondName"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<InputField
										{...rest}
										placeholder={"Second Name"}
										type="text"
										disabled={disabledFields}
										error={errors?.secondName && errors?.secondName?.message}
										
									/>
								)}
							/>
						</div>
						<div className="col-md-4 col-xs-12">
							<Controller
								name="lastName"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<InputField
										{...rest}
										placeholder={"Last Name"}
										type="text"
										disabled={disabledFields}
										error={errors?.lastName && errors?.lastName?.message}
										
									/>
								)}
							/>							
						</div> */}

							<div className="col-md-4 col-xs-12">
								<Controller
									name="name"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											placeholder={"Name"}
											type="text"
											error={errors?.name && errors?.name?.message}
											
											disabled={disabledFields}
										/>
									)}
								/>
							</div>

							<div className="col-md-4 col-xs-12">
								<Controller
									name="email"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											disabled
											placeholder={"Email"}
											type="text"
											error={errors?.email && errors?.email?.message}
											
										/>
									)}
								/>
							</div>

							<div className="col-md-4 col-xs-12">
								<Controller
									name="phone"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											placeholder={"Phone Number"}
											type="text"
											error={errors?.phone && errors?.phone?.message}
											
											disabled={disabledFields}
										/>
									)}
								/>
							</div>

							{/* <div className="col-md-4 col-xs-12">
								<Controller
									name="stateOfResidence"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<SelectField
											{...rest}
											disabled={disabledFields}

											type="text"
											defaultSelect={"Select State Of Residence"}
											error={errors?.stateOfResidence && errors?.stateOfResidence?.message}
											options={getStateOfResidenceOptions(testState)}
										/>
									)}
								/>
							</div> */}

							{/* <div className="col-md-4 col-xs-12">
								<Controller
									name="city"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<SelectField
											{...rest}
											disabled={disabledFields}

											type="text"
											defaultSelect={"Select City"}
											error={errors?.city && errors?.city?.message}
											options={getCityOfResidenceOptions(testCity)}
										/>
									)}
								/>
							</div> */}

							<div className="col-md-4 col-xs-12">
								<Controller
									name="address"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											disabled={disabledFields}
											placeholder={"House Address"}
											type="text"
											error={errors?.address && errors?.address?.message}
											
										/>
									)}
								/>
							</div>

							{/* <div className="col-md-4 col-xs-12">
								<Controller
									name="nearestBusStop"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											placeholder={"Nearest BusStop"}
											type="text"
											disabled={disabledFields}
											error={errors?.nearestBusStop && errors?.nearestBusStop?.message}
											
										/>
									)}
								/>
							</div> */}
						</div>}

					<div className={cx(styles.footer)}>
						{showSaveBtn && <Button onClick={(data)=>modifyUserDetailsFxn(data)} title="Save" borderRadiusType="lowRounded" textColor="#fff" bgColor="#2C0085" />}
					</div>

					{modalState === "show" ? <Modal show >{modalType ===  "modifyUserDetails" ? confirmModifyModal() : null}</Modal> : null}

				
				
				</form>

			
				
			</section>
		</div>
	);
};

export default AccountInformation;