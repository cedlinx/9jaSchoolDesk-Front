import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./TransferredAssets.module.scss";
import Button from "@/components/Button/Button";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import TableComponent from "@/components/Table/Table";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { assetsList, modifyAsset, deleteAsset, chartData } from "@/redux/Assets/assets.action";
import { showModal } from "@/redux/ModalState/modalState.action";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import { allAssetsTypes } from "@/redux/Assets/assets.action";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

const TransferredAssets = props => {

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
	const allAssetsList = useSelector((state) => state?.assets?.assetsListData?.data?.asset_array);
	const allTransferredList = useSelector((state) => state?.assets?.chartData?.data?.transferred_assets);
	const assetsLoading = useSelector((state) => state.assets.loading);
	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);
	// const [modalState, setModalState] =useState(modalStateRedux);
	// const [modalType, setModalType] =useState("");

	console.log(allTransferredList);
	useEffect(() => {
		dispatch(chartData());
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

	const getAssetDetails = (data) => {
		return allTransferredList.filter(asset=> asset.id === data)[0];
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
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button  onClick={() => modifyAssetFxn()} title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
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
	                       NEW OWNER
				</div>
			),
			accessor: "newOwner"
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
	                       TRANSFER REASON
				</div>
			),
			accessor: "transferReason"
		},
		{
			Header: "ACTIONS",
			accessor: "actions",
			Cell: (row)=>{
				let assetID = row.cell.row.values.assetID;
				return <div onClick={()=>handleViewClick(assetID)}>
					<Button  title="View" borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="rgba(44,0,133,0.05)"/>
				</div>;
			}
		}
	];

	// let getNewOwner= async (data)=>{
	// 	const response = await dispatch(getUserInfo(id));
	// };

	console.log(assetsTypes);
	// let getAssetType = (data)=>{
		
	// };

	let getTableData = (data) => {
		console.log(data);
		let result =[];

		data  && data.map((item) =>{
			result.push({
				assetID: item?.asset_id && item?.asset_id,
				date: item?.created_at && shortenDate(item?.created_at),
				newOwner: item?.new_owner_details && (item?.new_owner_details?.name),
				assetType: item?.type && item?.type.type,
				transferReason: item?.transferReason && item?.transferReason,
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
					<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allTransferredList)} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetResult(modalAssetId) : modalType === "accessCode" ? viewCodeGenerated() : modalType === "deleteAsset" ? confirmDeleteModal() : modalType === "modifyAsset" ? confirmModifyModal() : null}</Modal> : null}
		</>
	);
};

TransferredAssets.propTypes = {
    
};

export default TransferredAssets;