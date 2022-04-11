import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TransferredAssets.module.scss";

import TableComponent from "@/components/Table/Table";
import cx from "classnames";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import QRCodeSVG from "qrcode.react";

import { assetsList, modifyAsset, deleteAsset, chartData } from "@/redux/Assets/assets.action";
import { showModal } from "@/redux/ModalState/modalState.action";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

const TransferredAssets = () => {

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allTransferredList = useSelector((state) => state?.assets?.chartData?.data?.transferred_assets);
	const assetsLoading = useSelector((state) => state.assets.loading);
	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);

	let shortenDate=(value)=>{
		let date = new Date(value);
		return date.toDateString();
	};
	console.log(allTransferredList);
	let getTableData = (data) => {
		console.log(data);
		let result =[];

		data  && data.map((item) =>{
			result.push({
				name: item.asset_id && item.asset_id,
				owner: item?.previous_owner_details?.name && item?.previous_owner_details?.name,
				dateAdded: item?.created_at && shortenDate(item?.created_at),
				receiver: item?.new_owner_details && item?.new_owner_details?.name,
				transferredDate: item?.updated_at && item?.updated_at,
				status: item?.status && item?.status,
				serialNumber: item?.asset_id && item?.asset_id
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
	const columnsHeader = [
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
						minWidth: "10rem"
					}}
				>
                           OWNER
				</div>
			),
			accessor: "owner"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           DATE ADDED
				</div>
			),
			accessor: "dateAdded"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           RECEIVER
				</div>
			),
			accessor: "receiver"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           TRANSFERRED DATE
				</div>
			),
			accessor: "transferredDate"
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
			Cell: (row)=>{
				let assetId = row.cell.row.values.nameId;
				return <div>
					<span>Successful</span>	
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
                           SERIAL NUMBER
				</div>
			),
			accessor: "serialNumber"
		}
			
	];


    
	return (
		<div className={cx(styles.tableWrapper, "flexCol")}>
			{assetsLoading ? <TableSkeleton /> : 
				<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allTransferredList)} selectedRowsData={selectedRowsData} />}
		</div>

	);
};

TransferredAssets.propTypes = {
    
};

export default TransferredAssets;