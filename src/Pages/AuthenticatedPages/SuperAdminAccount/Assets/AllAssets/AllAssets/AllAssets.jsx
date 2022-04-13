import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import TableComponent from "@/components/Table/Table";
import cx from "classnames";
import styles from "./AllAssets.module.scss";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import QRCodeSVG from "qrcode.react";

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

	// useEffect(() => {
	// 	dispatch(assetsList({admin : 1}));
	// }, [dispatch]);

	let shortenDate=(value)=>{
		let date = new Date(value);
		return date.toDateString();
	};

	let getTableData = (data) => {
		console.log(data);
		let result =[];

		data  && data.map((item) =>{
			result.push({
				name: item.name && item.name,
				skydahid: item.skydahid && item.skydahid,
				dateAdded: item?.created_at && shortenDate(item?.created_at),
				category: item?.category && item?.category,
				serialNumber: item?.assetid && item?.assetid,
				qrCode: "",
				status: item?.status && item?.status,
				owner: item?.owner?.name && item?.owner?.name,
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

	const columnsHeader = [
		{
			Header: () => (
				<div
					style={{
						width: "10rem"
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
						width: "9rem"
					}}
				>
                           ID
				</div>
			),
			accessor: "skydahid"				
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
                           CATEGORY
				</div>
			),
			accessor: "category"
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
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem",
						textAlign: "center"
					}}
				>
                           ASSET QR CODE
				</div>
			),
			accessor: "qrCode",
			Cell: (row)=>{
				let skydahid = row.cell.row.values.nameID;
				return <div style={{ textAlign: "center" }}>< QRCodeSVG  value={skydahid} fgColor="#D25B5D" size={32} /></div>; 
			}
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
				let status = row.cell.row.values.status;
				return <div>
					<Icon icon="bi:patch-check" color="#D25B5D" />				<span>{status}</span>	
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
                           OWNER
				</div>
			),
			accessor: "owner"
		}
			
	];

    
	return (
		<div className={cx(styles.tableWrapper, "flexCol")}>
			{assetsLoading ? <TableSkeleton /> : 
				<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allAssetsList)} selectedRowsData={selectedRowsData} />}
		</div>
	);
};

AllAssets.propTypes = {
    
};

export default AllAssets;