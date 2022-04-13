import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./GeneralSettings.module.scss";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";

import {showModal} from "@/redux/ModalState/modalState.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { modifyWebsiteInfo, getWebsiteInfo } from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { modifyWebsiteDetailsValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";
import FormSkeleton from "@/components/SkeletonLoader/FormSkeleton";

const AccountInformation=()=>{

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const userDetails = useSelector((state)=>state?.user?.getWebsiteInfoData?.data);
	const loading = useSelector((state)=> state?.user?.loading);
	const [modifiedDetails, setModifiedDetails] = useState({});
	const [disabledFields, setDisabledFields] = useState(true);
	const [showSaveBtn, setShowSaveBtn] = useState(false);
	
	useEffect(() => {
		dispatch(getWebsiteInfo());
	},[dispatch]);

	const resolver = yupResolver(modifyWebsiteDetailsValidationSchema);
	
	const defaultValues = {
		websiteName: userDetails?.name ,
		email: userDetails?.email,
		tagline: userDetails?.tagline,
		copyright: userDetails?.copyright,
		phone: userDetails?.phone
	};

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const modifyUserDetailsFxn = (data)=>{
		setModifiedDetails(data);
		dispatch(showModal({ action: "show", type: "modifyUserDetails" }));
	};

	const modifyFxn =()=>{
		dispatch(modifyWebsiteInfo(modifiedDetails));
		dispatch(showModal({ action: "hide" }));
		dispatch(getWebsiteInfo());
	};

	const confirmModifyModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to modify the details ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={()=>dispatch(showModal({ action: "hide"}))} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />			
					<Button loading={loading} onClick={()=>modifyFxn()}  title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
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
			<ToastContainer />

			<section className={cx(styles.accountInfoWrapper)}>
				<form onSubmit={handleSubmit((data) => modifyUserDetailsFxn(data))} >
					<div className={cx(styles.header, "flexRow")}>
						<h3>Website Information</h3>
						
						<Button type="button" onClick={(e)=>enableInputEdit(e)}  title="Edit Information" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" />
					
					</div>

					{loading ? <FormSkeleton /> : 
						<div className={cx(styles.body, "row")}>
							<div className="col-md-4 col-xs-12">
								<Controller
									name="websiteName"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											placeholder={"Website Name"}
											type="text"
											error={errors?.websiteName && errors?.websiteName?.message}
											disabled={disabledFields}
										
										/>
									)}
								/>
							</div>
			
							<div className="col-md-4 col-xs-12">
								<Controller
									name="tagline"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											placeholder={"Tagline"}
											type="text"
											error={errors?.tagline && errors?.tagline?.message}
											disabled={disabledFields}
										
										/>
									)}
								/>							
							</div>

							<div className="col-md-4 col-xs-12">
								<Controller
									name="copyright"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											placeholder={"Copyright"}
											type="text"
											error={errors?.copyright && errors?.copyright?.message}
											disabled={disabledFields}
										
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

							<div className="col-md-4 col-xs-12">
								<Controller
									name="email"
									control={control}
									render={({ field: { ref, ...rest } }) => (
										<InputField
											{...rest}
											placeholder={"Email"}
											type="text"
											error={errors?.email && errors?.email?.message}
											disabled={disabledFields}
										
										/>
									)}
								/>
							</div>

						</div>
					}

					<div className={cx(styles.footer)}>
						{showSaveBtn && <Button onClick={(data)=>modifyUserDetailsFxn(data)} title="Save" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" disabled={Object.keys(errors).length === 0 ? false : true} />}
					</div>


					{modalState === "show" ? <Modal show >{modalType ===  "modifyUserDetails" ? confirmModifyModal() : null}</Modal> : null}
				</form>


			</section>
		</div>
	);
};

export default AccountInformation;