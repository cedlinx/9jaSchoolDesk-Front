import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./index.module.scss";
import ContactForm from "@//components/ContactForm/ContactForm";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import Button from "@/components/Button/Button";
import calendarIcon from "@/assets/icons/calendar-icon.svg";

import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tabs from "@/components/Tabs/Tabs.jsx";

import { showModal } from "@/redux/ModalState/modalState.action";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import qrCodeImage from "@/assets/images/qrCodeImage.svg";
import { titleCase } from "@/helpers/textTransform";
import InputField from "@/components/Input/Input";
import TextInput from "@/components/TextInput/TextInput";
import SelectField from "@/components/Select/Select";
import TableComponent from "@/components/Table/Table";
import styled from "styled-components";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";
import AddCategorySuccessModal from "@/components/Modals/AddAssetCategorySuccess/AddAssetCategorySuccess";


import { useForm, Controller } from "react-hook-form";
import { addAssetCategoryValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { assetsList, modifyAssetCategory, deleteAssetCategory, addAssetCategory, chartData, allAssetsTypes, lostButFoundAssets } from "@/redux/Assets/assets.action";


import AllAssetsBusiness from "./AllAssets/AllAssets";
import TransferredAssets from "./TransferredAssets/TransferredAssets";
import MissingAssets from "./MissingAssets/MissingAssets";
import StolenAssets from "./StolenAssets/StolenAssets";
import RecoveredAssets from "./RecoveredAssets/RecoveredAssets";


const AllAssetsIndex = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);

	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);

	const addAssetCategoryData = useSelector((state) => state?.assets?.addAssetCategoryData?.data);

	const loading = useSelector((state)=>state?.assets?.loading);

	const assetsLoading = useSelector((state) => state.assets.loading);
	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);
	const [upload, setUploadedFile] = useState(null);
	const [userLocation, setUserLocation] = useState({
		lng: "",
		lat: ""
	});

	const [selectedAsset, setSelectedAsset] = useState("");

	const allSelectedRows = useSelector((state) => state.assets.selectedRowsData);
	const allGraphData = useSelector((state) => state?.assets?.chartData?.data);

	useEffect(() => {
		// dispatch(allAssetsTypes());
		dispatch(assetsList({admin : 1}));
		dispatch(chartData({type : "admin"}));
		dispatch(lostButFoundAssets());
	}, [dispatch]);

	console.log(allGraphData, "second");

	const RenderAllAssetsBusiness = () => <AllAssetsBusiness />;
	const RenderTransferredAssets = () => <TransferredAssets />;
	const RenderRecoveredAssets = () => <RecoveredAssets />;
	const RenderMissingAssets = () => <MissingAssets />;
	// const RenderStolenAssets = () => <StolenAssets />;
	
	const tabsComponents = [
		{ name: "All Assets", component: RenderAllAssetsBusiness },
		{ name: "Transferred Assets", component: RenderTransferredAssets },
		{ name: "Recovered Assets", component: RenderRecoveredAssets },
		{ name: "Missing Assets", component: RenderMissingAssets} 
		// { name: "Stolen Assets", component: RenderStolenAssets }
	];

	const resolver = yupResolver(addAssetCategoryValidationSchema);
	const defaultValues = {
		type: "",
		slug: "",
		description: "",
		allowEdit: ""
	};

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const displayModal = (action, type) => {
		if(type === "deleteAssetCategory" && selectedRows.length === 0) {
			toast.error("Kindly select at least one asset to perform this action");
			return;
		}
		else if( type === "modifyAssetCategory" && selectedRows.length === 0) {
			toast.error("Kindly select at least one asset to perform this action");
			return;
		}
 
		dispatch(showModal({ action, type }));
	};

	const choiceOptions = [
		{label: "Yes", value: "1"},
		{label: "No", value: "0"}
	];

	const getAssetDetails = (data) => {
		// actual code to be used
		// return allAssetsList.filter(asset=> asset.id === data)

		// Test code
		return testData.filter(asset => asset.nameId === data)[0];
	};

	const addNewCategoryFxn =async (data)=>{
		const response = await dispatch(addAssetCategory(data));
		if (response?.payload?.data?.success === true ){
			reset();
			dispatch(showModal({action: "show", type: "addCategorySuccess"}));
		}
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
	

	const addNewCategoryModal = () => {
		return (
			<div style={{ width: "100%", minHeight: "50vh" }} className={cx("")}>
				<h2 style={{ marginBottom: "2rem"}}>Add New Category</h2>
				<form
					onSubmit={handleSubmit((data) => addNewCategoryFxn(data))} 
					className="form flex text-white homepage-mc-form"
				>
					<Controller
						name="type"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Type"}
								type="text"
								error={errors?.type && errors?.type?.message}
								
							/>
						)}
					/>

					<Controller
						name="slug"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Slug"}
								type="text"
								error={errors?.slug && errors?.slug?.message}
								
							/>
						)}
					/>

					<Controller
						name="description"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Description"}
								type="text"
								error={errors?.description && errors?.description?.message}
							/>
						)}
					/>

					<Controller
						name="allowEdit"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<SelectField
								{...rest}
								type="text"
								defaultSelect={"Allow admin to edit?"}
								error={errors?.allowEdit && errors?.allowEdit?.message}
								options={choiceOptions}
							/>
						)}
					/>

					<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
						<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
						<Button loading={loading}  onClick={handleSubmit((data) => addNewCategoryFxn(data))} title="Add Category" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
					</div>
				</form>	
			</div>
		);
	};

	const confirmModifyModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to modify the asset ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<div><Button title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
					<div onClick={() => modifyAssetFxn()} ><Button title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" /></div>
				</div>
			</div>
		);
	};

	const confirmDeleteModal = (data) => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to delete the asset ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<div><Button title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
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
				<Button title="OK" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
			</div>
		);
	};

	// const viewAssetResult = (data) => {
	// 	let detailsObj = getAssetDetails(data);
	// 	return (
	// 		<AssetSuccessModalContent data={detailsObj} />
	// 	);
	// };

	const addCategorySuccessModalFxn =()=>{
		
		return (
			<AddCategorySuccessModal data={addAssetCategoryData} dispatchAction="allAssetsTypes" />
		);
	};

	const leftHeader = ()=>{
		return(
			<Button onClick={() => displayModal("show", "assetCategory")} title="Add Asset Category" textColor="#fff" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#2C0085" />
		);
	};


	let shortenDate=(value)=>{
		let date = new Date(value);
		return date.toDateString();
	};


	return (
		<div className={cx(styles.container)}>
			<ToastContainer />
			<h2>All Assets</h2>

			<div className={cx(styles.assetCodeWrapper, "flexRow")}>
				<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<div>
						<small>All Available Assets</small>
						<p>{allGraphData?.counts?.all_assets}</p>
					</div>
				</div>
			</div>
		
			<section className={cx(styles.tablistWrapper)}>
				<Tabs leftHeader={leftHeader()} background="#FFFFFF" tabs={tabsComponents}/>
			</section>

			{modalState === "show" ? <Modal show >{ modalType === "assetCategory" ? addNewCategoryModal() : modalType === "addCategorySuccess" ? addCategorySuccessModalFxn() : null}</Modal> : null}

		</div>
	);
};

AllAssetsIndex.propTypes = {

};

export default AllAssetsIndex;
