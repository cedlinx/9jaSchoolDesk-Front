import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import {Link, useNavigate} from "react-router-dom";

import styles from "./AssetCategory.module.scss";
import ContactForm from "@//components/ContactForm/ContactForm";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import Button from "@/components/Button/Button";
import calendarIcon from "@/assets/icons/calendar-icon.svg";
import { DateRangePicker } from "rsuite";

import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tabs from "@/components/Tabs/Tabs.jsx";
import { toast } from "react-toastify";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";

import { showModal } from "@/redux/ModalState/modalState.action";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import qrCodeImage from "@/assets/images/qrCodeImage.svg";
import { titleCase } from "@/helpers/textTransform";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
import TableComponent from "@/components/Table/Table";
import styled from "styled-components";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";
import AddCategorySuccessModal from "@/components/Modals/AddAssetCategorySuccess/AddAssetCategorySuccess";

import { assetsList, modifyAssetCategory, deleteAssetCategory, addAssetCategory, chartData, allAssetsTypes } from "@/redux/Assets/assets.action";
import { Icon } from "@iconify/react";

import { useForm, Controller } from "react-hook-form";
import { addAssetCategoryValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const AssetCategory = () => {

	const dispatch = useDispatch();

	// const allAssetsList = useSelector((state) => state.assets.assetsListData);
	// const modalAssetId = useSelector((state) => state.assets.modalAssetId);
	const allSelectedRows = useSelector((state) => state.assets.selectedRowsData);

	const navigate = useNavigate();
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
	const chartValues = useSelector((state)=>state?.assets?.chartData?.data);
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allAssetsList = useSelector((state) => state?.assets?.assetsListData?.data);
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

	console.log(assetsTypes);
	const resolver = yupResolver(addAssetCategoryValidationSchema);

	const defaultValues = {
		type: "",
		slug: "",
		description: "",
		allowEdit: ""
	};

	useEffect(() => {
		dispatch(allAssetsTypes());
		dispatch(chartData());
		dispatch(assetsList());	

		const displayLocationInfo = (position) => {
			const longitude = position.coords.longitude;
			const latitude = position.coords.latitude;
			setUserLocation({
				lng: longitude,
				lat: latitude
			});
		};
		navigator.geolocation.getCurrentPosition(displayLocationInfo);
	}, [dispatch]);

	// const RenderAllAssetsBusiness = () => <AllAssetsBusiness />;
	// const RenderTransferredAssets = () => <TransferredAssets />;
	// const RenderRecoveredAssets = () => <RecoveredAssets />;
	// const RenderMissingAssets = () => <MissingAssets />;
	// const RenderStolenAssets = () => <StolenAssets />;
	
	// const tabsComponents = [
	// 	{ name: "All Assets", component: RenderAllAssetsBusiness },
	// 	{ name: "Transferred Assets", component: RenderTransferredAssets },
	// 	{ name: "Recovered Assets", component: RenderRecoveredAssets },
	// 	{ name: "Missing Assets", component: RenderMissingAssets}, 
	// 	{ name: "Stolen Assets", component: RenderStolenAssets }
	// ];


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
	const displayUncheckedDelete = (action, type, id) => {
		dispatch(showModal({ action, type }));
		setModalAssetId(id);
	};

	const handleViewClick =(id)=>{
		setModalAssetId(id);
		displayModal("show", "assetDetails");
	};

	const getAssetDetails = (data) => {
		return allAssetsList?.asset_array.filter(asset=> asset.id === data)[0];
	};

	const deleteAssetCategoryFxn = async (uncheckedID) => {
		console.log(uncheckedID);
		if(uncheckedID){
			let result =await dispatch(deleteAssetCategory({id: uncheckedID}));
			console.log(result);
			result.payload.status === 200 && dispatch(assetsList());	
			displayModal("hide");
		}
		else if(selectedRows.length === 1){
			console.log(selectedRows[0].original);
			const assetID = selectedRows[0].original.hidden_id;
			let result =await dispatch(deleteAssetCategory({id: assetID}));
			result.payload.status === 200 && dispatch(assetsList());	
			displayModal("hide");
		}
		else{
			const assetIDs = [];
			selectedRows.map(element=>{
				assetIDs.push(element.original.assetID);
			});
			// dispatch(deleteBulkAsset({id: assetIDs}));
			// displayModal("hide");
		}
	};

	const choiceOptions = [
		{label: "Yes", value: "1"},
		{label: "No", value: "0"}
	];
	const getUploadedData = (data) =>{
		setUploadedFile(data);
	};

	const addNewCategoryFxn =async (data)=>{
		console.log(data, "add new cat data");
		const response = await dispatch(addAssetCategory(data));
		console.log(response, "add new cat response");
		if (response?.payload?.data?.success === true ){
			reset();
			dispatch(showModal({action: "show", type: "addCategorySuccess"}));
		}
	};

	const modifyAssetCategoryFxn =async (data)=>{
		const response = await dispatch(modifyAssetCategory(data));
		console.log(response, "update response");
		if (response?.payload?.data?.success === true ){
			dispatch(showModal({action: "hide"}));
			reset();
			dispatch(showModal({action: "show", type: "addCategorySuccess"}));
		}
	};

	const getAssetTypesOptions=(data)=>{
		console.log(data);
		let result = [];
		data?.map(element=>{
			result.push({label: element.type, value: element.id});
		});
	
	};
	const confirmModifyModal = () => {
		return (
			<div style={{ width: "100%", minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center"}} className={cx("")}>
				<form
					onSubmit={handleSubmit((data) => modifyAssetCategoryFxn(data))} 
					className="form flex text-white homepage-mc-form"
				>
					<Controller
						name="id"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Category ID"}
								type="text"
								error={errors?.id && errors?.id?.message}
								
							/>
						)}
					/>

					<Controller
						name="type"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Asset Type"}
								type="text"
								error={errors?.type && errors?.type?.message}
							/>
						)}
					/>

					<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
						<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
						<Button loading={loading}  onClick={handleSubmit((data) => modifyAssetCategoryFxn(data))} title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
					</div>
				</form>	
			</div>
		);
	};


	const confirmDeleteModal = (data) => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to delete the asset category?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<div><Button onClick={() => displayModal("hide")} title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
					<div onClick={() => deleteAssetCategoryFxn(data)} ><Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
				</div>
			</div>
		);
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

	const viewAssetResult = (data) => {
		let detailsObj = getAssetDetails(data);
		return (
			<AssetSuccessModalContent data={detailsObj} />
		);
	};

	const addCategorySuccessModalFxn =()=>{
		
		return (
			<AddCategorySuccessModal data={addAssetCategoryData} dispatchAction="allAssetsTypes" />
		);
	};

	const leftHeader = ()=>{
		return(
			<div onClick={() => displayModal("show", "modifyAssetCategory")}><Button title="Add Asset Category" textColor="#fff" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#2C0085" /></div>
		);
	};

	let shortenDate=(value)=>{
		let date = new Date(value);
		return date.toDateString();
	};

	const columnsHeader = [
		{
			Header: () => (
				<div
					style={{
						width: "10rem"
					}}
				>
                           ID
				</div>
			),
			accessor: "hidden_id"
		},
		{
			Header: () => (
				<div
					style={{
						width: "10rem"
					}}
				>
                           CATEGORY NAME
				</div>
			),
			accessor: "type"				
		},

		{
			Header: () => (
				<div
					style={{
						width: "10rem"
					}}
				>
                           PUBLISHER
				</div>
			),
			accessor: "publisher"				
		},
                
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           DATE CREATED
				</div>
			),
			accessor: "dateCreated"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           ASSET COUNT
				</div>
			),
			accessor: "assetCount"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           STATUS
				</div>
			),
			accessor: "status"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           ACTIONS
				</div>
			),
			accessor: "actions",
			Cell: (row)=>{
				let assetId = row?.cell?.row?.values?.hidden_id;
				console.log(assetId, "asset id here");
				return <div style={{paddingLeft: "1rem"}} onClick={() => displayUncheckedDelete("show", "deleteAssetCategory", assetId)}> 
					<Icon icon="ant-design:delete-outlined" color="#2c0085" />
				</div>; 
			}

			// Cell: (row)=>{
			// 	let assetID = row.cell.row.values.assetID;
			// 	return <div onClick={()=>handleViewClick(assetID)}>
			// 		<Button  title="View" borderRadiusType="lowRounded" textColor="#2C0085" bgColor="rgba(44,0,133,0.05)"/>
			// 	</div>;
			// }
		}
		
			
	];


	let getTableData = (data) => {
		console.log(data);
		let result =[];

		data  && data.map((item) =>{
			result.push({
				hidden_id: item?.id && item.id,
				type: item?.type && item.type,
				publisher: item?.publisher && item.publisher,
				date: item?.created_at && shortenDate(item?.created_at),
				assetCount: item?.asset_count && item.asset_count,
				status: item?.status && titleCase(item?.status),
				action: ""
			});
		});
		return result;
	};

	const selectedRowsData=(data)=>{
		if(data.length === 0){
			setCheckedValue(false);
			setShowBtnGroup(false);
		}
		else{
			setCheckedValue(true);
			setShowBtnGroup(true);
		}
		data.length > 1 ? setDisableModifyBtn(true) : setDisableModifyBtn(false);
		setSelectedRows(data);
	};
    
	return (
		<div className={cx(styles.container)}>
			<h2>All Asset Categories</h2>

			<div className={cx(styles.assetCodeWrapper, "flexRow")}>
				<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<div>
						<small>All Available Categories</small>
						<p>{assetsTypes && assetsTypes[0]?.length}</p>
					</div>
				</div>
			</div>

			<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
				<div onClick={() => displayModal("show", "assetCategory")}>
					<Button title="Add Asset Category" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
				</div>

				{showBtnGroup && 
				<div className={cx(styles.btnGroup, "flexRow")}>
					<div onClick={() => displayModal("show", "modifyAssetCategory")}><Button title="Edit" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
					<div onClick={() => displayModal("show", "deleteAssetCategory")}><Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>

				</div> 
				}
			</div>
			
		
			<div className={cx(styles.tableWrapper, "flexCol")}>
				{loading ? <TableSkeleton /> : 
					assetsTypes && <TableComponent columnsHeader={columnsHeader} tableData={getTableData(assetsTypes[0])} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetResult(modalAssetId) : modalType === "assetCategory" ? addNewCategoryModal() : modalType === "deleteAssetCategory" ? confirmDeleteModal(modalAssetId) : modalType === "modifyAssetCategory" ? confirmModifyModal() : modalType === "addCategorySuccess" ? addCategorySuccessModalFxn() : null}</Modal> : null}

		</div>
	);
};

export default AssetCategory;
