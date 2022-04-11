import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import PropTypes from "prop-types";
import TableComponent from "@/components/Table/Table";
import cx from "classnames";
import styles from "./AllAssets.module.scss";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import Button from "@/components/Button/Button";
import { assetsList, modifyAsset, deleteAsset } from "@/redux/Assets/assets.action";
import { showModal } from "@/redux/ModalState/modalState.action";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

const AllAssets = () => {

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allAssetsList = useSelector((state) => state?.assets?.assetsListData?.data?.asset_array);
	const assetsLoading = useSelector((state) => state.assets.loading);
	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);
	// const [modalState, setModalState] =useState(modalStateRedux);
	// const [modalType, setModalType] =useState("");

	useEffect(() => {
		dispatch(assetsList());
	}, [dispatch]);


	const displayModal = (action, type) => {
		if(type === "deleteAsset" && selectedRows.length === 0) {
			toast.error("Kindly select at least one asset to perform this action");
			return;
		}
		else if( type === "modifyAsset" && selectedRows.length === 0) {
			toast.error("Kindly select at least one asset to perform this action");
			return;
		}
		dispatch(showModal({ action, type }));
		// setModalState(action);
		// setModalType(type);
	};
	
	const handleViewClick =(id)=>{
		console.log(id);
		setModalAssetId(id);
		displayModal("show", "assetDetails");
	};

	console.log(modalAssetId);
	const getAssetDetails = (data) => {
		console.log(data, "asset id");
		// actual code to be used
		let resp = allAssetsList;
		console.log(resp);
		return resp.filter(asset=> asset.id === data)[0];
	};

	const deleteAssetFxn = async () => {
		if(selectedRows.length === 1){
			const assetID = selectedRows[0].original.assetID;
			let result =await dispatch(deleteAsset({id: assetID}));
			displayModal("hide");
			console.log(result);
			
			result.payload.status === 200 && dispatch(assetsList());	
		}
		else{
			const assetIDs = [];
			selectedRows.map(element=>{
				assetIDs.push(element.original.assetID);
			});
			// dispatch(deleteBulkAsset({id: assetIDs}));
			displayModal("hide");
		}
	};

	const modifyAssetFxn = () => {
		const assetID = selectedRows[0].original.assetID;
		dispatch(modifyAsset({id: assetID}));
		displayModal("hide");
	};	
	
	const confirmModifyModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to modify the asset ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button  onClick={() => modifyAssetFxn()} title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
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

	const viewAssetResult = (data) => {
		console.log(data);
		let detailsObj = getAssetDetails(data);
		return (
			<AssetSuccessModalContent data={detailsObj} />
		);
	};

	let shortenDate=(value)=>{
		let date = new Date(value);
		return date.toDateString();
	};

	const dateOptions = {
		maxDate: new Date(),
		mode: "range",
		dateFormat: "F J 'y",
		onChange: function(selectedDates, dateStr, instance) {
			console.log(selectedDates, dateStr, instance);
		}
	};

	const columnsHeader = [
		{
			Header: () => (
				<div
					style={{
						width: "5rem"
					}}
				>
	ASSET ID
				</div>
			),
			accessor: "assetID"				
		},
                
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
	                       DATE
				</div>
			),
			accessor: "date"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
	                       NAME
				</div>
			),
			accessor: "name"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
	                       ASSET TYPE
				</div>
			),
			accessor: "assetType"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
	                       LOCATION
				</div>
			),
			accessor: "location"
		},
		{
			Header: "ACTIONS",
			accessor: "actions",
			Cell: (row)=>{
				let assetID = row.cell.row.values.assetID;
				return <div onClick={()=>handleViewClick(assetID)}>
					<Button  title="View" borderRadiusType="lowRounded" textColor="#2C0085" bgColor="rgba(44,0,133,0.05)"/>
				</div>;
			}
		}
	];

	let getTableData = (data) => {
		console.log(data);
		let result =[];

		data  && data.map((item) =>{
			result.push({
				assetID: item?.id && item?.id,
				date: item?.created_at && shortenDate(item?.created_at),
				name: item?.name && titleCase(item?.name),
				assetType: item?.type && item?.type.type,
				location: item?.location && item?.location,
				action: ""
			});
		});
		return result;
	};

	const selectedRowsData=(data)=>{
		console.log(data);
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
		<>
			<div className={cx(styles.tableWrapper, "flexCol")}>
				{assetsLoading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allAssetsList)} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetResult(modalAssetId) : modalType === "accessCode" ? viewCodeGenerated() : modalType === "deleteAsset" ? confirmDeleteModal() : modalType === "modifyAsset" ? confirmModifyModal() : null}</Modal> : null}
		</>
	);
};

AllAssets.propTypes = {
    
};

export default AllAssets;