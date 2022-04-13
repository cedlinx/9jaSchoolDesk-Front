import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./AllPayments.module.scss";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";

import Button from "@/components/Button/Button";
Button;
import calendarIcon from "@/assets/icons/calendar-icon.svg";

import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import { toast } from "react-toastify";

import {showModal} from "@/redux/ModalState/modalState.action";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import qrCodeImage from "@/assets/images/qrCodeImage.svg";
import { titleCase } from "@/helpers/textTransform";
import InputField from "@/components/Input/Input";
import TextInput from "@/components/TextInput/TextInput";
import SelectField from "@/components/Select/Select";
import UploadComponent from "@/components/UploadComponent/UploadComponent";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";

import TableComponent from "@/components/Table/Table";
import {getAllPayments} from "@/redux/Billings/billings.action";

import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

import PaymentDetailsModal from "@/components/Modals/PaymentDetails/PaymentDetails";

const AllPayments = props => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);

	const allPaymentsData = useSelector((state) => state?.billings?.allPaymentsData.data);
	const user_id = JSON.parse(localStorage.getItem("userDetails")).data?.id;
	const paymentsLoading = useSelector((state) => state.billings.loading);
	const [modalPaymentId, setModalPaymentId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);

	// Test payment data 

	// let allPaymentsData = [
	// 	{
	// 		id: "123",
	// 		created_at: "2015-01-01",
	// 		plan: "Basic",
	// 		amount: 1000,
	// 		status: "Successful"
	// 	}
	// ];
	
	useEffect(() => {
		dispatch(getAllPayments({user_id: user_id}));
	}, [dispatch, user_id]);
	
	const displayModal = (action, type) => {
		if(type === "deletePayment" && selectedRows.length === 0) {
			toast.error("Kindly select at least one payment to perform this action");
			return;
		}
		else if( type === "modifyPayment" && selectedRows.length === 0) {
			toast.error("Kindly select at least one payment to perform this action");
			return;
		}
	 
		dispatch(showModal({ action, type }));
	};
	
	const handleViewClick =(id)=>{
		setModalPaymentId(id);
		displayModal("show", "paymentDetails");
	};
	
	const getPaymentDetails = (data) => {
		return allPaymentsData.filter(payment=> payment.id === data)[0];
	};

	const deletePaymentFxn = async () => {
		if(selectedRows.length === 1){
			const assetID = selectedRows[0].original.assetID;
			let result =await dispatch(deletePayment({id: assetID}));
			displayModal("hide");
			
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

	const modifyPaymentFxn = () => {
		const assetID = selectedRows[0].original.assetID;
		dispatch(modifyPayment({id: assetID}));
		displayModal("hide");
	};	
	
	const confirmModifyModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to modify the asset ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button  onClick={() => modifyPaymentFxn()} title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
				</div>
			</div>
		);
	};

	const confirmDeleteModal = (data) => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to delete the payment ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button onClick={() => deletePaymentFxn()} title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" />
				</div>
			</div>
		);
	};

	const viewAssetResult = (data) => {
		let detailsObj = getPaymentDetails(data);
		return (
			<PaymentDetailsModal data={detailsObj} />
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
		}
	};


	const columnsHeader = [
		{
			Header: () => (
				<div
					style={{
						width: "4rem"
					}}
				>
	ID
				</div>
			),
			accessor: "id"				
		},
                
		{
			Header: () => (
				<div
					style={{
						minWidth: "5rem"
					}}
				>
                           PAYMENT DATE
				</div>
			),
			accessor: "payment_date"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "4rem"
					}}
				>
                           PLAN
				</div>
			),
			accessor: "plan"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "5rem"
					}}
				>
                           AMOUNT
				</div>
			),
			accessor: "amount"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "6rem"
					}}
				>
                           STATUS
				</div>
			),
			accessor: "status",
			Cell: (row)=>{
				let status = row.cell.row.values.status;
				return <p style={{color: status.toLowerCase() === "successful" ? "green" : "red", marginBottom: "0rem", fontWeight: "bold"}}>
					{titleCase(status)}
				</p>;
			}
		},
		{
			Header: "ACTIONS",
			accessor: "actions",
			Cell: (row)=>{
				let id = row.cell.row.values.id;
				return <div onClick={()=>handleViewClick(id)}>
					<Button  title="View" borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="rgba(44,0,133,0.05)"/>
				</div>;
			}
		}
	];
	
	let getTableData = (data) => {
		let result =[];

		data  && data.map((item) =>{
			result.push({
				id: item?.id && item?.id,
				payment_date: item?.created_at && shortenDate(item?.created_at),
				plan: item?.plan && titleCase(item?.plan),
				amount: item?.amount && item?.amount,
				status: item?.status && item?.status,
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
			<div className={cx(styles.header, "flexRow")}>
				<h2>All Payments</h2>
				<button onClick={() => navigate(-1)}>
					Back
				</button>
			</div>

			<div className={cx(styles.dateSelectorWrapper, "flexRow")}>
				<img src={calendarIcon} alt="calendar" />
				<div className={cx(styles.datePickerWrapper)}>
					<p>Change Period</p>
					<Flatpickr  placeholder= "Select Date Range"
						options={dateOptions} className={cx(styles.datePicker)}
					/>
				</div>
			</div>

			<div className={cx(styles.assetCodeWrapper, "flexRow")}>
				<div>
					<Button title="Subscription" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D"  />
				</div>

				<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<img src={emptyAvatar} alt="avatar" />
					<div>
						<small>Total Payments Made</small>
						<p><span>NGN</span></p>
					</div>
				</div>

				{/* <div className={cx(styles.btnGroup, "flexRow")}>

					<div><Button title="Active" checked textColor="#D25B5D" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#fff" /></div>
					<div><Button title="Edit" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085"  bgColor="#fff" /></div>
					<div onClick={()=>displayModal("show", "deletePayment")}><Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
					
				</div> */}
			</div>

			<div className={cx(styles.tableWrapper, "flexCol")}>
				{paymentsLoading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allPaymentsData)} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState === "show" ? <Modal show >{modalType === "paymentDetails" ? viewAssetResult(modalPaymentId) : modalType === "accessCode" ? viewCodeGenerated() : modalType === "deletePayment" ? confirmDeleteModal() : modalType === "modifyPayment" ? confirmModifyModal() : null}</Modal> : null}
			
		</div>
	);
};

AllPayments.propTypes = {
    
};

export default AllPayments;