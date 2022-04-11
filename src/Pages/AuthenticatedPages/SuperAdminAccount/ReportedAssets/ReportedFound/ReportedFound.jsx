import React, {useMemo, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import TableComponent from "@/components/Table/Table";
import cx from "classnames";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";

import { assetsList, modifyAssetCategory, deleteAssetCategory, addAssetCategory, chartData, allAssetsTypes, lostButFoundAssets } from "@/redux/Assets/assets.action";

import {showModal} from "@/redux/ModalState/modalState.action";

import AssetDetailsModal from "@/components/Modals/AssetDetails/AssetDetailsModal";


const ReportedFound = props => {

	const dispatch = useDispatch();

	const loading = useSelector((state)=>state?.assets?.loading);
	const allFoundAssets = useSelector((state) => state?.assets?.chartData?.data?.recovered_assets);

	const [modalPaymentId, setModalPaymentId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);

	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);

	const [modalAssetId, setModalAssetId] = useState("");

	console.log(allFoundAssets);

	let shortenDate=(value)=>{
		let date = new Date(value);
		return date.toDateString();
	};

	const handleViewClick =(id)=>{
		setModalAssetId(id);
		displayModal("show", "assetDetails");
	};

	const getAssetDetails = (data) => {
		return allFoundAssets?.filter(asset=> asset.id === data)[0];
	};

	const viewAssetResult = (data) => {
		let detailsObj = getAssetDetails(data);
		return (
			<AssetDetailsModal data={detailsObj} />
		);
	};

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
                           ASSET NAME
				</div>
			),
			accessor: "name"				
		},

		{
			Header: () => (
				<div
					style={{
						width: "10rem"
					}}
				>
                           ASSET ID
				</div>
			),
			accessor: "assetid"				
		},
		{
			Header: () => (
				<div
					style={{
						width: "10rem"
					}}
				>
                           DATE REGISTERED
				</div>
			),
			accessor: "dateRegistered"				
		},
		{
			Header: () => (
				<div
					style={{
						width: "10rem"
					}}
				>
                           DESCRIPTION
				</div>
			),
			accessor: "description"				
		},
		{
			Header: () => (
				<div
					style={{
						width: "10rem"
					}}
				>
                           REGISTERED BY
				</div>
			),
			accessor: "registeredBy"				
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
			accessor: "status",
			Cell: ()=>{
				return <div>
					<Icon icon="bi:patch-check" color="#2c0085" />
					{" "}
					<span style={{ color: "#2c0085"}}>Found</span>	
				</div>;
			}
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           ACTION
				</div>
			),
			accessor: "action",
			Cell: (row)=>{
				let assetId = row.cell.row.values.hidden_id;
				console.log(assetId);
				return <div onClick={()=>handleViewClick(assetId)}>
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
				hidden_id: item.id && item.id,
				name: item.name && item.name,
				assetid: item.assetid && item.assetid,
				dateRegistered: item?.created_at && shortenDate(item?.created_at),
				description: item?.description && item?.description,
				registeredBy: "",
				status: "",
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
		<>
		
			<div className={cx("flexCol")}>
				{loading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allFoundAssets)} selectedRowsData={selectedRowsData} />}
			</div>
			{modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetResult(modalAssetId) :  null}</Modal> : null}
		</>
	);
};

ReportedFound.propTypes = {
    
};

export default ReportedFound;