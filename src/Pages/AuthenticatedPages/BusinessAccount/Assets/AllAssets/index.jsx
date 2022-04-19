import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./index.module.scss";
import ContactForm from "@//components/ContactForm/ContactForm";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import Button from "@/components/Button/Button";
import calendarIcon from "@/assets/icons/calendar-icon.svg";
import SelectField from "@/components/Select/Select";

import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tabs from "@/components/Tabs/Tabs.jsx";

import { showModal } from "@/redux/ModalState/modalState.action";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import qrCodeImage from "@/assets/images/qrCodeImage.svg";
import { titleCase } from "@/helpers/textTransform";
import InputField from "@/components/Input/Input";
import TextArea from "@/components/TextArea/index";
import TableComponent from "@/components/Table/Table";
import styled from "styled-components";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

import { useForm, Controller } from "react-hook-form";
import { reportAssetValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";



import { assetsList, allAssetsTypes, modifyAsset, deleteAsset, generatedAssetCodes } from "@/redux/Assets/assets.action";

import AllAssetsBusiness from "./AllAssets/AllAssets";
import TransferredAssets from "./TransferredAssets/TransferredAssets";
import MissingAssets from "./MissingAssets/MissingAssets";
import StolenAssets from "./StolenAssets/StolenAssets";
import RecoveredAssets from "./RecoveredAssets/RecoveredAssets";


const AllAssets = () => {

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
	const [selectedAsset, setSelectedAsset] = useState("");

	const generatedCodes = useSelector((state) => state?.assets?.generatedAssetCodesData?.data);

	useEffect(() => {
		dispatch(generatedAssetCodes());
		dispatch(allAssetsTypes());
	}, [dispatch]);

	const RenderAllAssetsBusiness = () => <AllAssetsBusiness />;
	const RenderTransferredAssets = () => <TransferredAssets />;
	const RenderRecoveredAssets = () => <RecoveredAssets />;
	const RenderMissingAssets = () => <MissingAssets />;
	const RenderStolenAssets = () => <StolenAssets />;
	
	const tabsComponents = [
		{ name: "All Assets", component: RenderAllAssetsBusiness },
		{ name: "Transferred Assets", component: RenderTransferredAssets },
		{ name: "Recovered Assets", component: RenderRecoveredAssets },
		{ name: "Missing Assets", component: RenderMissingAssets} 
		// { name: "Stolen Assets", component: RenderStolenAssets }
	];

	const resolver = yupResolver(reportAssetValidationSchema);
	const defaultValues = {
		assetId: "",
		message: ""
	};

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const reportAssetFxn =async (data)=>{
		// const response = await dispatch(addAsset({...data, uploadedFile : upload[0]}));

		// if (response?.payload?.data?.success === true ){
		// 	dispatch(showModal("show"));
		// 	reset();
		// }
	};

	const addAssetResult =(data)=>{
		return(
			<AssetSuccessModalContent data={data} />
		);
	};

	const displayModal = (action, type) => {
		dispatch(showModal({ action, type }));
	};


	const deleteAssetFxn = () => {
		// let assetId = 
		// console.log(allSelectedRows);
		dispatch(deleteAsset({id: "131"}));
	};

	const modifyAssetFxn = () => {
		// let assetId = 
		// console.log(allSelectedRows);
		dispatch(modifyAsset({id: "11"}));

	};	
	
	const confirmModifyModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to modify the asset ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<div><Button title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
					<div onClick={() => modifyAssetFxn()} ><Button title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" /></div>
				</div>
			</div>
		);
	};



	const confirmDeleteModal = (data) => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to delete the asset ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<div><Button title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
					<div onClick={() => deleteAssetFxn()} ><Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
				</div>
			</div>
		);
	};

	const viewCodeGenerated = (data) => {
		return (
			<div className={cx(styles.modalWrapper, "flexCol-align-center")}>
				<img src={successCheckIcon} alt="" />
				<p>Code Generated Successfully</p>
				<img src={qrCodeImage} alt="" />
				<p>#001245105KJ30091</p>
				<Button title="OK" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
			</div>
		);
	};

	const getAssetTypesOptions=(data)=>{
		let result = [];
		data?.map(element=>{
			result.push({label: element.type, value: element.id});
		});
		return result;
	};

	console.log(selectedAsset);
	const showReportModal = () => {
		return (
			<div className={cx(styles.modalWrapper, "flexCol-align-center")}>

				<form
					onSubmit={handleSubmit((data) => reportAssetFxn(data))} 
					className=""
				>
					<Controller
						name="assetId"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<SelectField
								{...rest}
								type="text"
								defaultSelect={"Select Asset Type"}
								error={errors?.assetId && errors?.assetId?.message}
								options={getAssetTypesOptions(assetsTypes && assetsTypes[0])}
							/>
						)}
					/>

					<Controller
						name="name"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<TextArea
								{...rest}
								placeholder={"Name"}
								type="text"
								error={errors?.name && errors?.name?.message}
								
							/>
						)}
					/>
					
					<div onClick={handleSubmit((data) => reportAssetFxn(data))} style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1rem"}}>
						
						<Button title="Report Asset" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
					</div>
				</form>	
				
			</div>
		);
	};
	const getDateValues = (e)=>{
		console.log(e.target.value);
	};

	const dateOptions = {
		maxDate: new Date(),
		mode: "range",
		dateFormat: "F J 'y",
		onChange: function(selectedDates, dateStr, instance) {
			console.log(selectedDates, dateStr, instance);
		}
	};

	const midSlot = ()=>{
		return(
			<div style={{margin: "0rem auto 0rem 0rem"}} className={cx(styles.dateSelectorWrapper, "flexRow")}>
				<img src={calendarIcon} alt="calendar" />
				<div className={cx(styles.datePickerWrapper)}>
					<p>Change Date</p>
					<Flatpickr  placeholder= "Select Date Range"
						options={dateOptions} className={cx(styles.datePicker)}
					/>
				</div>
			</div>
		);
	};
	return (
		<div className={cx(styles.container)}>
			<ToastContainer />
			<div className={cx(styles.assetCodeWrapper, "flexRow")}>
				{/* <div className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<img src={emptyAvatar} alt="avatar" />
					<div>
						<small>Total Asset Code Generated</small>
						<p>{generatedCodes?.total_codes}</p>
					</div>
				</div> */}

				<div className={cx(styles.btnGroup, "flexRow")}>

					<div onClick={() => displayModal("show", "reportAsset")}><Button title="Report Asset" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>

				</div>
			</div>
		
			<section className={cx(styles.tablistWrapper)}>
				<Tabs midSlot={midSlot()} background="#FFFFFF" tabs={tabsComponents}/>
			</section>

			{modalState === "show" ? <Modal show >{ modalType === "reportAsset" ? showReportModal() : null}</Modal> : null}

		</div>
	);
};

AllAssets.propTypes = {

};

export default AllAssets;
