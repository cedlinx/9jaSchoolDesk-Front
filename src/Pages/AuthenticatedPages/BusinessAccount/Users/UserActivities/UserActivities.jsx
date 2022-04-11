import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import TableComponent from "@/components/Table/Table";
import cx from "classnames";
import styles from "./UserActivities.module.scss";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { assetsList, modifyAsset, deleteAsset } from "@/redux/Assets/assets.action";
import { showModal } from "@/redux/ModalState/modalState.action";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import emptyAvatar from "@/assets/icons/emptyAvatar.svg";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

const UserActivities = () => {

	const navigate = useNavigate();
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

	const getAssetDetails = (data) => {
		console.log(data, "asset id");
		// actual code to be used
		let resp = allAssetsList;
		console.log(resp);
		return resp.filter(asset=> asset.id === data)[0];
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

	const columnsHeader = [
		{
			Header: () => (
				<div
					style={{
						width: "10rem"
					}}
				>
                           USER ID
				</div>
			),
			accessor: "userID"				
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
                           EMAIL ADDRESS
				</div>
			),
			accessor: "email"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           USER TYPE
				</div>
			),
			accessor: "userType"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           PHONE NUMBER
				</div>
			),
			accessor: "phone"
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
				let assetId = row.cell.row.values.nameId;
				return <div onClick={() => handleViewClick(assetId)} >
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
		<div className={cx(styles.container)}>
			<div className={cx(styles.header, "flexCol")}>
				<button onClick={() => navigate(-1)}>
					Back
				</button>
				<h2><span>Susan Roe</span> Asset Activities</h2>
				
			</div>

			<div className={cx(styles.assetCodeWrapper, "flexRow")}>

				<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<img src={emptyAvatar} alt="avatar" />
					<div>
						<small>Total Asset Code Generated</small>
						<p>129</p>
					</div>
				</div>

			</div>
			
			<div className={cx(styles.tableWrapper, "flexCol")}>
				{assetsLoading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allAssetsList)} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState.showModalSuccess ? <Modal show >{modalType === "assetDetails" ? viewAssetResult() : null}</Modal> : null}
			
		</div>
	);
};

UserActivities.propTypes = {
    
};

export default UserActivities;