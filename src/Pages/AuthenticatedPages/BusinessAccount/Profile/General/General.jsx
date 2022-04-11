import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./General.module.scss";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";

import {showModal} from "@/redux/ModalState/modalState.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";
import { modifyUserValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { modifyProfileInfo } from "@/redux/User/user.action";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

const AccountInformation=()=>{

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const modifiedDetails = useSelector((state) => state.user.modifiedInfoData);
	const userDetails = useSelector((state)=>state?.user.userDetails);
	const modifyUserDetailsResponse = useSelector((state)=>state?.user);
	
	console.log(userDetails);
	const resolver = yupResolver(modifyUserValidationSchema);
	
	const defaultValues = {
		firstName: userDetails.name,
		secondName: userDetails.name,
		lastName: userDetails.name,
		email: userDetails.email,
		phone: userDetails.phone,
		stateOfResidence: "",
		city: "",
		houseAddress: "",
		nearestBusStop: ""
	};

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const modifyUserDetailsFxn = (data)=>{
		
		dispatch(showModal({ action: "show", type: "modifyUserDetails" }));
		dispatch(modifiedInfo(data));
		// let response = await dispatch(modifyUserDetails(rest));

		// console.log(response);

		// response.payload.message === true ? dispatch(showModal({action: "show", type: "assetDetails"})) : null;
		// reset();
	};

	const testState = [
		{label:"State One", value:"State One"},
		{label:"State Two", value:"State Two"},
		{label:"State Three", value:"State Three"},
		{label:"State Four", value:"State Four"},
		{label:"State Five", value:"State Five"}
	];

	const testCity = [
		{label:"City One", value:"City One"},
		{label:"City Two", value:"City Two"},
		{label:"City Three", value:"City Three"},
		{label:"City Four", value:"City Four"},
		{label:"City Five", value:"City Five"}
	];

	const getStateOfResidenceOptions =(data)=>{
		let result = [];
		data.map(element=>{
			result.push({label: element.label, value: element.value});
		});
		return result;
	};

	const getCityOfResidenceOptions =(data)=>{
		let result = [];
		data.map(element=>{
			result.push({label: element.label, value: element.value});
		});
		return result;
	};

	const modifyFxn =()=>{
		const {email, ...rest} = modifiedDetails;
		console.log(rest);
		dispatch(modifyProfileInfo(rest));
	};

	const confirmModifyModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to modify the details ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<div><Button title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
					<div onClick={()=>modifyFxn()} ><Button title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" /></div>
				</div>
			</div>
		);
	};

	return(
		<div className={cx(styles.container)}>
			<ToastContainer />
			<section className={cx(styles.accountInfoWrapper)}>
				<form onSubmit={handleSubmit((data) => modifyUserDetailsFxn(data))} >
					<div className={cx(styles.header, "flexRow")}>
						<h3>Account Information</h3>
						<div onClick={handleSubmit((data) => modifyUserDetailsFxn(data))} className={cx(styles.btnDiv)}>
							<Button title="Edit Information" borderRadiusType="lowRounded" textColor="#fff" bgColor="#2C0085" />
						</div>
					</div>

			
					<div className={cx(styles.body, "row")}>
						<div className="col-md-4 col-xs-12">
							<Controller
								name="firstName"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<InputField
										{...rest}
										placeholder={"First Name"}
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
										error={errors?.lastName && errors?.lastName?.message}
										
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
										
									/>
								)}
							/>
						</div>

						<div className="col-md-4 col-xs-12">
							<Controller
								name="stateOfResidence"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<SelectField
										{...rest}
										type="text"
										defaultSelect={"Select State Of Residence"}
										error={errors?.stateOfResidence && errors?.stateOfResidence?.message}
										options={getStateOfResidenceOptions(testState)}
									/>
								)}
							/>
						</div>

						<div className="col-md-4 col-xs-12">
							<Controller
								name="city"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<SelectField
										{...rest}
										type="text"
										defaultSelect={"Select City"}
										error={errors?.city && errors?.city?.message}
										options={getCityOfResidenceOptions(testCity)}
									/>
								)}
							/>
						</div>

						<div className="col-md-4 col-xs-12">
							<Controller
								name="houseAddress"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<InputField
										{...rest}
										placeholder={"House Address"}
										type="text"
										error={errors?.houseAddress && errors?.houseAddress?.message}
										
									/>
								)}
							/>
						</div>

						<div className="col-md-4 col-xs-12">
							<Controller
								name="nearestBusStop"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<InputField
										{...rest}
										placeholder={"Nearest BusStop"}
										type="text"
										error={errors?.nearestBusStop && errors?.nearestBusStop?.message}
										
									/>
								)}
							/>
						</div>
					</div>

					{modalState === "show" ? <Modal show >{modalType ===  "modifyUserDetails" ? confirmModifyModal() : null}</Modal> : null}
				</form>


			</section>
		</div>
	);
};

export default AccountInformation;