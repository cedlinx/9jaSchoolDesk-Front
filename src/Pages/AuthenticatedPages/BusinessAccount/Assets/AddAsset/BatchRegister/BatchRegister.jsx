import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./BatchRegisterAsset.module.scss";
import styled from "styled-components";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import {showModal} from "@/redux/ModalState/modalState.action";
import Button from "@/components/Button/Button";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import { titleCase } from "@/helpers/textTransform";
import InputField from "@/components/Input/Input";
import TextInput from "@/components/TextInput/TextInput";
import SelectField from "@/components/Select/Select";
import UploadComponent from "@/components/UploadComponent/UploadComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";
import { addAssetValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { allAssetsTypes, addAsset } from "@/redux/Assets/assets.action";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

const BatchRegisterAsset = props => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const modalState = useSelector((state)=>state.modalState);
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
	const addAssetResponse = useSelector((state)=>state?.assets?.addAssetData);
	const resolver = yupResolver(addAssetValidationSchema);

	const defaultValues = {
		type_id: "",
		name: "",
		pin: "",
		assetid: "",
		transferable: "",
		lng: "",
		lat: ""
		// uploadedFile: ""
	};

	useEffect(() => {
		dispatch(allAssetsTypes());
	}, [dispatch]);

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const addNewAsset =async (data)=>{
		const {uploadedFile, ...rest} = data;
		const response = await dispatch(addAsset(rest));

		if (response?.payload?.data?.success === true ){
			dispatch(showModal("show"));
			reset();
		}
	};

	const getAssetTypesOptions=(data)=>{
		let result = [];
		data?.map(element=>{
			result.push({label: element.type, value: element.id});
		});
		return result;
	};

	const choiceOptions = [
		{label: "Yes", value: "1"},
		{label: "No", value: "0"}
	];

	const addAssetResult =(data)=>{
		return(
			<AssetSuccessModalContent data={data} />
		);
	};
	return (
		<div className={cx(styles.container)}>

			<ToastContainer />
			<h2>Batch Register</h2>
			
			<div className={cx(styles.formDiv, "flexCol", "col-md-6", "col-lg-6", "col-xl-4")}>
				<form
					onSubmit={handleSubmit((data) => addNewAsset(data))} 
					className="form flex text-white homepage-mc-form"
				>
					<Controller
						name="type_id"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<SelectField
								{...rest}
								type="text"
								defaultSelect={"Select Asset Type"}
								error={errors?.type_id && errors?.type_id?.message}
								options={getAssetTypesOptions(assetsTypes && assetsTypes[0])}
							/>
						)}
					/>

					<Controller
						name="name"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Name"}
								type="text"
								error={errors?.name && errors?.name?.message}
								
							/>
						)}
					/>

					<Controller
						name="pin"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Pin"}
								type="password"
								error={errors?.pin && errors?.pin?.message}
								
							/>
						)}
					/>

					<Controller
						name="assetid"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Asset ID"}
								type="text"
								error={errors?.assetId && errors?.assetId?.message}
								
							/>
						)}
					/>

					<Controller
						name="transferable"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<SelectField
								{...rest}
								type="text"
								defaultSelect={"Transferable?"}
								error={errors?.transferable && errors?.transferable?.message}
								options={choiceOptions}
							/>
						)}
					/>

					<Controller
						name="lng"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Longitude"}
								type="text"
								error={errors?.lng && errors?.lng?.message}
								
							/>
						)}
					/>

					<Controller
						name="lat"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Latitude"}
								type="text"
								error={errors?.lat && errors?.lat?.message}
								
							/>
						)}
					/>
					
					<Controller
						name="uploadedFile"
						control={control}
						render={({ field: { ref, ...rest } }) => (

							<UploadComponent
								{...rest}
								error={errors?.uploadedFile && errors?.uploadedFile?.message}
								
								accept={[
									"application/pdf",
									"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
									"application / msword"
								]}
							/>
						)}
					/>
					
					<div onClick={()=> navigate("review-batch-register")} style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1rem"}}>
						
						<Button title="Next" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#2C0085" />
					</div>
				</form>	
				
			</div>

			{modalState.showModalSuccess ? <Modal show >{addAssetResult(addAssetResponse?.data)}</Modal> : null}
		</div>
	);
};

BatchRegisterAsset.propTypes = {
    
};

export default BatchRegisterAsset;
