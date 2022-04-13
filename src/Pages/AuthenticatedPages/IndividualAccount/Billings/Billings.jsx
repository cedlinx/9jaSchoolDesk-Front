import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate, Outlet} from "react-router-dom";
import cx from "classnames";
import styles from "./Billings.module.scss";
import {Card} from "react-bootstrap";
import Button from "@/components/Button/Button";
import TableComponent from "@/components/Table/Table";
import calendarIcon from "@/assets/icons/calendar-icon.svg";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";

import {showModal} from "@/redux/ModalState/modalState.action";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import { titleCase } from "@/helpers/textTransform";

import pieChart from "@/assets/images/pie-chart.png";
import PaymentDetailsModal from "@/components/PaymentDetailsModal/PaymentDetailsModal";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";

import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

import { assetsList } from "@/redux/Assets/assets.action";
import {getAllPayments, deletePayment} from "@/redux/Billings/billings.action";


const Billings = props => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const modalState = useSelector((state)=>state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);

	// const allPaymentsData = useSelector((state) => state?.billings?.allPaymentsData.data);
	const loginData = JSON.parse(localStorage.getItem("loginData"));
	const user_id = JSON.parse(localStorage.getItem("userDetails")).data?.id;
	const paymentsLoading = useSelector((state) => state.billings.loading);
	const [modalPaymentId, setModalPaymentId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);

	// Test payment data 
	console.log(loginData);
	let allPaymentsData = [
		{
			id: "123",
			created_at: "2015-01-01",
			plan: "Basic",
			amount: 1000,
			status: "Completed"
		},
		{
			id: "124",
			created_at: "2015-01-02",
			plan: "Gold",
			amount: 1000000,
			status: "Pending"
		}
	];
		
	useEffect(() => {
		dispatch(getAllPayments({user_id: user_id}));
	}, [dispatch, user_id]);

	const cardArray = [
		{
			heading: "CURRENT PLAN",
			// value: titleCase(loginData?.plan?.name),
			value: titleCase(loginData?.active_plan),
			description: ""
		},
		{
			heading: "COMPLETED PLANS",
			value: loginData?.subscription_count
		},
		{
			heading: "TOTAL AMOUNT",
			value: loginData?.total_subscription_amount
			// completionPercent: 84,
			// img: pieChart
		}
	];

	const displayModal = (action, type) => {
		if(type === "deletePayment" && selectedRows.length === 0) {
			toast.error("Kindly select at least one asset to perform this action");
			return;
		}
		else if( type === "modifyAsset" && selectedRows.length === 0) {
			toast.error("Kindly select at least one asset to perform this action");
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
			const id = selectedRows[0].original.id;
			// let result =await dispatch(deletePayment({id: id}));
			displayModal("hide");
			
			// result?.payload?.status === 200 && dispatch(getAllPayments({user_id: user_id}));	
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
				return <p style={{color: status.toLowerCase() === "completed" ? "green" : "red", marginBottom: "0rem", fontWeight: "bold"}}>
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
			<h2>Bills</h2>

			<div className={cx(styles.dateSelectorWrapper, "flexRow")}>
				<img src={calendarIcon} alt="calendar" />
				<div className={cx(styles.datePickerWrapper)}>
					<p>Change Period</p>
					<Flatpickr  placeholder= "Select Date Range"
						options={dateOptions} className={cx(styles.datePicker)}
					/>
				</div>
			</div>

			<div className={cx(styles.cardWrapper, "flexRow")}>
					
				{cardArray.length && cardArray.map((element, index)=>{
					return(
						<Card key={index} className={cx(styles.cardItem)}>
							<Card.Body className={cx(styles.cardBody)}>
								<div className={cx(styles.textContent)}>
									<p>{element.heading}</p>
									<h3>{element.value}</h3>
									<small>{element?.description}</small>  
								</div>
								{element.completionPercent && <div className={cx(styles.chartDiv)}>
									<img src={element.img} alt="pie-chart" />
									{/* {element.completionPercent} */}
								</div>}
								
							</Card.Body>
						</Card>
					);
				})}
			</div>

			<div className={cx(styles.btnGroup, "flexRow")}>

				<div className={cx(styles.leftGroup, "flexRow")}>

					<div onClick={()=> navigate("upgrade-plan")}><Button title="Upgrade Plan"  textColor="#fff" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#D25B5D" /></div>

					<div onClick={()=> navigate("renew-plan")}><Button title="Renew Plan"  textColor="#D25B5D" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#fff" /></div>

				</div>
				<div className={cx(styles.rightGroup, "flexRow")}>
					
					<Button title="Download Sample" textColor="#fff" bordercolor="" borderRadiusType="lowRounded" bgColor="#3ED7A0" />

					{/* <Button title="Active" checkedBtn checked={checkedValue} textColor="#D25B5D" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#fff" /> */}

					<Button onClick={()=>displayModal("show", "deletePayment")} title="Remove" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" />
				</div>
			</div>
			
			<div className={cx(styles.tableWrapper, "flexCol")}>
				{paymentsLoading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allPaymentsData)} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState === "show" ? <Modal show >{modalType === "paymentDetails" ? viewAssetResult(modalPaymentId) : modalType === "deletePayment" ? confirmDeleteModal() :  null}</Modal> : null}    
    
		</div>
	);
};

Billings.propTypes = {
    
};

export default Billings;