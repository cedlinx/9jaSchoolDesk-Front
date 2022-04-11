import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import cx from "classnames";
import styles from "./UserActivities.module.scss";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";

import Button from "@/components/Button/Button";
Button;
import calendarIcon from "@/assets/icons/calendar-icon.svg";
import { DateRangePicker } from "rsuite";
// import "rsuite/dist/styles/rsuite-default.css";
// import "rsuite/dist/rsuite.min.css";
import emptyAvatar from "@/assets/icons/emptyAvatar.svg";

import {showModal} from "@/redux/ModalState/modalState.action";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import qrCodeImage from "@/assets/images/qrCodeImage.svg";
import { titleCase } from "@/helpers/textTransform";
import InputField from "@/components/Input/Input";
import TextInput from "@/components/TextInput/TextInput";
import SelectField from "@/components/Select/Select";
import UploadComponent from "@/components/UploadComponent/UploadComponent";

import TableComponent from "@/components/Table/Table";

import UserDetailsModal from "@/components/Modals/UserDetails/UserDetails";


const AllPayments = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();

	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allUsersList = useSelector((state) => state?.user?.getAllUsersData?.data?.data);
	const loading = useSelector((state) => state?.user.loading);

	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);
	const [userDetails, setUserDetails] = useState({});

	
	useEffect(() => {
	
		let result =  allUsersList.filter(user => user?.id === params?.userId*1)[0];
		setUserDetails(result);

	},[]);


	console.log(allUsersList);
	console.log(params);

	const handleViewClick =(id)=>{
		setModalAssetId(id);
		displayModal("show", "assetDetails");
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

	let shortenDate=(value)=>{
		let date = new Date(value);
		return date.toDateString();
	};

	const getAssetDetails = (data) => {
		return allUsersList?.filter(asset=> asset.id === data)[0];
	};

	const viewAssetResult = (data) => {
		let detailsObj = getAssetDetails(data);
		return (
			<UserDetailsModal data={detailsObj} />
		);
	};

	let getTableData = (data) => {
		console.log(data);
		let result =[];

		data  && data.map((item) =>{
			result.push({
				userId: item.id && item.id,
				date: item?.created_at && shortenDate(item?.created_at),
				name: item?.name && item?.name,
				email: item?.email && item?.email,
				userType: item?.group_id && item?.group_id,
				phoneNumber: item?.phone && item?.phone,
				location: item?.address && item?.address,
				action: ""
			});
		});
		return result;
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
			accessor: "userId"				
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
                           EMAIL
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
			accessor: "phoneNumber"
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
				let userId = row.cell.row.values.userId;
				return <div onClick={()=>handleViewClick(userId)}>
					<Button  title="View" borderRadiusType="lowRounded" textColor="#2C0085" bgColor="rgba(44,0,133,0.05)"/>
				</div>;
			}
		}
			
	];

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
			<div className={cx(styles.header, "flexCol")}>
				<button onClick={() => navigate(-1)}>
					Back
				</button>
				<h2><span>{userDetails?.name}</span> Asset Activities</h2>
				
			</div>

			{/* <div className={cx(styles.assetCodeWrapper, "flexRow")}>

				<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<img src={emptyAvatar} alt="avatar" />
					<div>
						<small>Total Asset Code Generated</small>
						<p>129</p>
					</div>
				</div>

			</div> */}
			
			<div className={cx(styles.tableWrapper, "flexCol")}>
				{loading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData= {getTableData(allUsersList)} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetResult(modalAssetId) : modalType === "accessCode" ? viewCodeGenerated() : modalType === "deleteAsset" ? confirmDeleteModal() : modalType === "modifyAsset" ? confirmModifyModal() : null}</Modal> : null}
			
		</div>
	);
};

AllPayments.propTypes = {
    
};

export default AllPayments;