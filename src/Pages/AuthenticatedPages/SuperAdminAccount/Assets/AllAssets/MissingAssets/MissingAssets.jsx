import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MissingAssets.module.scss";

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

const MissingAssets = () => {

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allMissingList = useSelector((state) => state?.assets?.chartData?.data?.missing_assets);
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
	console.log(allMissingList);
	let getTableData = (data) => {
		console.log(data);
		let result =[];

		data  && data.map((item) =>{
			result.push({
				name: item.name && item.name,
				owner: item?.user_id && item?.user_id,
				dateMissing: item?.flagged_as_lost_at && shortenDate(item?.flagged_as_lost_at),
				status: item?.status && item?.status,
				serialNumber: item?.assetid && item?.assetid
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
						minWidth: "10rem",
						textAlign: "center"
					}}
				>
                           ASSET CODE
				</div>
			),
			accessor: "assetCode",
			Cell: (row)=>{
				let skydahid = row.cell.row.values.serialNumber;
				return <div style={{ textAlign: "center" }}>< QRCodeSVG  value={skydahid} fgColor="#2C0085" size={32} /></div>; 
			}
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           DATE MISSING
				</div>
			),
			accessor: "dateMissing"
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
				return <div>
					<span>Missing</span>	
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
				<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allMissingList)} selectedRowsData={selectedRowsData} />}
		</div>

	);
};

MissingAssets.propTypes = {
    
};

export default MissingAssets;