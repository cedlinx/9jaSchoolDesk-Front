import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import {Card, Tabs, Tab} from "react-bootstrap";
import Button from "@/components/Button/Button";

import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement} from "chart.js";
  
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);
import cardChart from "@/assets/images/card-chart.png";

import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import TableComponent from "@/components/Table/Table";
import {getAllPayments} from "@/redux/Billings/billings.action";

import { Icon } from "@iconify/react";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import calendarIcon from "@/assets/icons/calendar-icon.svg";

import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

import { toast } from "react-toastify";

import { showModal } from "@/redux/ModalState/modalState.action";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import qrCodeImage from "@/assets/images/qrCodeImage.svg";
import { titleCase } from "@/helpers/textTransform";

import moment from "moment";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";

import AssetDetailsModal from "@/components/Modals/AssetDetails/AssetDetailsModal";

import { assetsList, generatedAssetCodes, addAsset, chartData, allAssetsTypes } from "@/redux/Assets/assets.action";

import {deletePayment} from "@/redux/Billings/billings.action";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
import UploadComponent from "@/components/UploadComponent/UploadComponent";

const Home = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
	const chartValues = useSelector((state)=>state?.assets?.chartData?.data);
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);

	const paymentsLoading = useSelector((state) => state.billings.loading);


	const allPaymentsData = useSelector((state) => state?.billings?.allPaymentsData.data);
	const user_id = JSON.parse(localStorage.getItem("userDetails")).data?.id;

	const [modalPaymentId, setModalPaymentId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);

	useEffect(() => {
		dispatch(getAllPayments({user_id: user_id}));
		dispatch(chartData({type : "admin"}));
	}, [dispatch, user_id]);


	const displayModal = (action, type) => {
		if(type === "deletePayment" && selectedRows.length === 0) {
			toast.error("Kindly select at least one asset to perform this action");
			return;
		}
		else if( type === "modifyPayment" && selectedRows.length === 0) {
			toast.error("Kindly select at least one asset to perform this action");
			return;
		}
 
		dispatch(showModal({ action, type }));
	};
	
	const handleViewClick =(id)=>{
		setModalAssetId(id);
		displayModal("show", "paymentDetails");
	};

	const getPaymentDetails = (data) => {
		return allPaymentsData?.filter(payment=> payment.id === data)[0];
	};

	const deletePaymentFxn = async () => {
		if(selectedRows.length === 1){
			const assetID = selectedRows[0].original.assetID;
			let result =await dispatch(deletePayment({id: assetID}));
			result.payload.status === 200 && dispatch(assetsList());	
			displayModal("hide");
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
					<div><Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
					<div onClick={() => deletePaymentFxn()} ><Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
				</div>
			</div>
		);
	};

	const viewAssetDetails = (data) => {
		let detailsObj = getPaymentDetails(data);
		return (
			<AssetDetailsModal data={detailsObj} />
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
						minWidth: "6rem"
					}}
				>
	                       PAYMENT STATUS
				</div>
			),
			accessor: "payment_status",
			Cell: (row)=>{
				let status = row.cell.row.values.payment_status;
				return <p style={{color: status.toLowerCase() === "successful" ? "green" : "red", marginBottom: "0rem", fontWeight: "bold"}}>
					{titleCase(status)}
				</p>;
			}
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
						minWidth: "5rem"
					}}
				>
	                       USER
				</div>
			),
			accessor: "user"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "5rem"
					}}
				>
	                     DATE REGISTERED
				</div>
			),
			accessor: "register_date"
		},
		{
			Header: () => (
				<div
					style={{
						minWidth: "5rem"
					}}
				>
	                     STATUS
				</div>
			),
			accessor: "register_status",
			Cell: (row)=>{
				let status = row.cell.row.values.register_status;
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

	const cardLineChartOptions = {
		responsive: true,
		plugins: {
		  legend: {
				display: false
		  },
		  title: {
				display: false
		  },
		  tooltip: {
			  enabled: false
		  }
		},
		animations: {
			radius: {
			  duration: 400,
			  easing: "linear",
			  loop: (context) => context.active
			}
		  },
		  hoverRadius: 4,
		  hoverBackgroundColor: "#D25B5D",
		  interaction: {
			mode: "nearest",
			intersect: false,
			axis: "x"
		  },
		elements: {
			point:{
				// radius: 0,
				borderWidth: 0,
				radius: 0,
				backgroundColor: "rgba(0,0,0,0)"
			}
		},
		scales: {
			x: {
				display: false
			},
			y: {
				display: false
			}
		}
	  };

	  
	  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	  
	   const recoveredData = {
		labels,
		datasets: [
		  {
				label: "Dataset 1",
				data: [10,12,30,400,50,666, 22, 14, 44, 234, 77],
				borderColor: "#fff",
				borderWidth: 3
		  }
		]
	  };

	  const missingData = {
		labels,
		datasets: [
		  {
				label: "Dataset 1",
				data: [11,20,13,40,15,6, 22, 14, 44, 234, 77],
				borderColor: "#fff",
				borderWidth: 3

		  }
		]
	  };

	  const transferredData = {
		labels,
		datasets: [
		  {
				label: "Dataset 1",
				data: [100,29,300,412,566,66, 22, 14, 44, 234, 77],
				borderColor: "#fff",
				borderWidth: 3

		  }
		]
	  };

	  const stolenData = {
		labels,
		datasets: [
		  {
				label: "Dataset 1",
				data: [11,42,83,34,25,6, 22, 14, 44, 234, 77],
				borderColor: "#fff",
				borderWidth: 3

		  }
		]
	  };

	  const cardArray = [
		{
			heading: "Recovered",
			value: chartValues?.counts?.recovered_assets,
			data: recoveredData,
			backgroundColor: "#D25B5D"
		},
		{
			heading: "Transferred",
			value: chartValues?.counts?.transferred_assets,
			data: transferredData,
			backgroundColor: "#09001B"		  
		},
		{
			heading: "Missing",
			value: chartValues?.counts?.missing_assets,
			data: missingData,
			backgroundColor: "#FF8001"

		}
		// {
		// 	heading: "Stolen",
		// 	value: chartValues?.counts?.missing_assets,
		// 	data: stolenData
		// }
	];

	const downloadData=()=>{
		toast("Downloading");
	};
	return (
		<div className={cx(styles.container)}>

			<div className={cx(styles.headerWrapper, "flexRow")}>
				<h2>Overview</h2>
			</div>

			<div className={cx(styles.cardWrapper, "flexRow")}>
					
				{cardArray.length && cardArray.map((element, index)=>{
					return(
						<Card style={{backgroundColor: element.backgroundColor}} key={index} className={cx(styles.cardItem)}>
							<Card.Header className={cx(styles.cardHeader)}>
								<h3>{element.value}</h3>
								<p>{element.heading}</p>
							</Card.Header>
							<Card.Body className={cx(styles.cardBody)}>
								<Line options={cardLineChartOptions} data={element.data} />
							</Card.Body>
						</Card>
					);
				})}
			</div>  

			<div className={cx(styles.totalSalesWrapper, "flexRow")}>
				<div onClick={() => downloadData()}>
					<Button title="Export" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
				</div>


				<div className={cx(styles.salesDetailsWrapper, "flexRow")}>
					<img src={emptyAvatar} alt="avatar" />
					<div>
						<small>Number of Sales</small>
						<p><span>NGN</span> 129.000</p>
					</div>
				</div>
				{showBtnGroup && 
				<div className={cx(styles.btnGroup, "flexRow")}>
					<div onClick={() => displayModal("show", "modifyPayment")}><Button title="Edit" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
					<div onClick={() => displayModal("show", "deletePayment")}><Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>

				</div> 
				}
			</div>

			<div className={cx(styles.tableWrapper, "flexCol")}>
				{paymentsLoading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allPaymentsData)} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetDetails(modalAssetId) : modalType === "accessCode" ? viewCodeGenerated() : modalType === "deletePayment" ? confirmDeleteModal() : modalType === "modifyPayment" ? confirmModifyModal() : null}</Modal> : null}
          
		</div>
	);
};

Home.propTypes = {
    
};

export default Home;