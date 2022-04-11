import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./ReviewBatchRegisterAsset.module.scss";
import Button from "@/components/Button/Button";
import TableComponent from "@/components/Table/Table";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import {showModal} from "@/redux/ModalState/modalState.action";
import pieChart from "@/assets/images/pie-chart.png";
import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";
import { Icon } from "@iconify/react";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";


import { assetsList } from "@/redux/Assets/assets.action";


const ReviewBatchRegisterAsset = props => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allAssetsList = useSelector((state) => state?.assets?.assetsListData?.data?.asset_array);
	const assetsLoading = useSelector((state) => state.assets.loading);
	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);

	useEffect(() => {
		dispatch(assetsList());
	}, [dispatch]);

	const cardArray = [
		{
			heading: "COMPLETED PLAN",
			value: "1",
			description: "ENTERPRISE PLAN"
		},
		{
			heading: "COMPLETED PLAN",
			value: "10"
		},
		{
			heading: "TOTAL COMPLETED",
			value: "215K",
			completionPercent: 84,
			img: pieChart
		}
	];

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

	const testData = [
		{
			nameId: "#0012450",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated",
			actions: ""
		},
		{
			nameId: "#0012451",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091"
			// status: "Generated"
		},
		{
			nameId: "#0012452",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated"
		},
		{
			nameId: "#0012453",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated"
		},
		{
			nameId: "#0012454",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated"
		},
		{
			nameId: "#0012455",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated"
		},
		{
			nameId: "#0012456",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated"
		},
		{
			nameId: "#0012457",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated"
		},
		{
			nameId: "#0012458",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated"
		},
		{
			nameId: "#0012459",
			dateAdded: "21/11/2017",
			category: "Category 3",
			serialNumber: "#001245105KJ30091",
			status: "Generated"
		}
	];

	const getAssetDetails = (data) => {
		return allAssetsList.filter(asset=> asset.id === data)[0];
	};

	const deleteModal=(data)=>{
		return (
			<div className={cx(styles.modalWrapper, "flexCol-align-center")}>				<h2>Are you sure you want to delete the asset ?</h2>
				
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")}title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085"  bgColor="#fff" />
					<Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" />
				</div>
			</div>
			
		);
	};

	const viewAssetResult =(data)=>{
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
                           ASSET NAME
				</div>
			),
			accessor: "assetName"				
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
						minWidth: "10rem"
					}}
				>
                           MODEL NUMBER
				</div>
			),
			accessor: "modelNumber"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           NO
				</div>
			),
			accessor: "no"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "10rem"
					}}
				>
                           DESCRIPTION
				</div>
			),
			accessor: "description"
		},
		{
			Header: "ACTIONS",
			accessor: "actions",
			Cell: (row)=>{
				let assetId = row.cell.row.values.nameId;
				return <div>
					<Icon icon="lucide:edit-2" color="#ff7b31" />
					<Icon icon="ant-design:delete-outlined" color="#2c0085" />					
				</div>;
			}
		}
	];

	const data = [
		{
			assetName: "Samsung",
			category: "phone",
			serialNumber: "11111",
			modelNumber: "44rt6yj",
			no: "0011",
			description: "",
			action: ""
		},
		{
			assetName: "Samsung1",
			category: "phone",
			serialNumber: "11111",
			modelNumber: "44rt6yj",
			no: "0011",
			description: "",
			action: ""
		},
		{
			assetName: "Samsung2",
			category: "phone",
			serialNumber: "11111",
			modelNumber: "44rt6yj",
			no: "0011",
			description: "",
			action: ""
		},
		{
			assetName: "Samsung3",
			category: "phone",
			serialNumber: "11111",
			modelNumber: "44rt6yj",
			no: "0011",
			description: "",
			action: ""
		}			
	];

	let getTableData = (data) => {
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
			<h2>Review Batch Registering</h2>

			<div className={cx(styles.btnGroup, "flexRow")}>	

				<div><Button title="Edit" checked textColor="#2C0085" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#fff" /></div>
				
				<div onClick={()=>displayModal("show", "deleteAsset")}><Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
				
				<div><Button title="Register" textColor="#fff" bordercolor="" borderRadiusType="lowRounded" bgColor="#3ED7A0" /></div>

			</div>
			
			<div className={cx(styles.tableWrapper, "flexCol")}>
				{assetsLoading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allAssetsList)} selectedRowsData={selectedRowsData} />}
			</div>
			
			{modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetResult(modalAssetId) : modalType === "deleteAsset" ? deleteModal() : null}</Modal> : null}            
		</div>
	);
};

ReviewBatchRegisterAsset.propTypes = {
    
};

export default ReviewBatchRegisterAsset;