import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./BulkTransfer.module.scss";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import {showModal} from "@/redux/ModalState/modalState.action";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import {Card} from "react-bootstrap";
import { Icon } from "@iconify/react";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import { toast } from "react-toastify";
import UploadComponent from "@/components/UploadComponent/UploadComponent";
import CSVReader from "@/components/CSVReader/CSVReader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";
import { bulkTransferAssetValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { allAssetsTypes, transferAsset, bulkAssetTransfer } from "@/redux/Assets/assets.action";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";



const BulkTransfer = props => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const modalState = useSelector((state)=>state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);

	const assetsLoading = useSelector((state) => state.assets.loading);
	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);
	const [displayTable, setDisplayTable] = useState(false);
	const [displayImportBtn, setDisplayImportBtn] = useState(true);

	const allAssetsList = useSelector((state) => state?.assets?.assetsListData?.data?.asset_array);
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData);
	const transferAssetResponse = useSelector((state)=>state?.assets?.addAssetData);
	const [upload, setUploadedFile] = useState(null);

	const resolver = yupResolver(bulkTransferAssetValidationSchema);

	const defaultValues = {
		email: "",
		codeNumber: ""
	};

	useEffect(() => {
		dispatch(allAssetsTypes());
	}, [upload]);

	const displayModal = (action, type) => {
		// if(type === "deleteAsset" && selectedRows.length === 0) {
		// 	toast.error("Kindly select at least one asset to perform this action");
		// 	return;
		// }
		// else if( type === "modifyAsset" && selectedRows.length === 0) {
		// 	toast.error("Kindly select at least one asset to perform this action");
		// 	return;
		// }
		dispatch(showModal({ action, type }));
	};

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const transferNewAsset =async (data)=>{
		
		console.log(data);
		// let response = await dispatch(transferAsset(data));

		// console.log(response);
		// console.log(transferAssetResponse);

		// response.payload.message === true ? dispatch(showModal({action: "show", type: "assetDetails"})) : null;
		// reset();
	};

	const getAssetTypesOptions=(data)=>{
		let result = [];
		data.map(element=>{
			result.push({label: element.type, value: element.id});
		});
		return result;
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
			console.log(selectedDates, dateStr, instance);
		}
	};
	const getUploadedData = (data) =>{
		setUploadedFile(data);
	};
	console.log((upload));

	const showImportedResult=()=>{
		displayModal("hide");
		setDisplayImportBtn(false);
		setDisplayTable(true);
	};

	const getFileDetails=(data)=>{
		console.log(data.data);
		setUploadedFile(data?.data);
	};

	const showCsvImportModal = () => {
		return (
			<div className={cx(styles.modalWrapper, "flexCol-align-center")}>
				{/* <UploadComponent
					getUploadedData={getUploadedData}
					error={errors?.uploadedFile && errors?.uploadedFile?.message}
					accept={["text/csv"]}
					fileDescription="Upload your CSV File with list of emails and serial No"
				/> */}

				<CSVReader getFileDetails={getFileDetails} />

				{upload && <div onClick={() => showImportedResult()} style={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "1rem 0rem 1rem 1rem", width: "fit-content"}}>
					
					<Button title="Proceed To Import" borderRadiusType="lowRounded" textColor="#fff" bordercolor="#D25B5D" bgColor="#D25B5D" />
				</div>}

			</div>
		);
	};

	const transferAssetResult =(data)=>{
		return(
			<AssetSuccessModalContent data={data} />
		);
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
						minWidth: "10rem"
					}}
				>
                           ADDRESS
				</div>
			),
			accessor: "address"
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
                           NUMBER OF USERS
				</div>
			),
			accessor: "numberOfUsers"
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
		}
	];

	let getTableData = (data) => {
		// console.log(data);
		let slicedData = data.slice(1, data.length - 1);
		console.log(slicedData);
		let result =[];

		slicedData  && slicedData.map((item) =>{
			result.push({
				name: item[0],
				address: item[1],
				category: item[2],
				numberOfUsers: item[3],
				phoneNumber: item[4]
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

	const transferAsset=()=>{
		// dispatch(bulkAssetTransfer({"file", fileInput.files[0], "assets1.xlsx"}));
	};

	return (
		<div className={cx(styles.container)}>
			
			<div className={cx(styles.cardWrapper, "flexRow")}>
				<Card onClick={()=> navigate(-1)} className={cx(styles.cardItem)}>
					<Card.Body className={cx(styles.cardBody)}>
						<Icon icon="uis:process" color="#D25B5D" />		
						<p>Single Transfer</p>
					</Card.Body>
				</Card>

				<Card  className={cx(styles.cardItem, styles.active)}>
					<Card.Body className={cx(styles.cardBody)}>
						<Icon icon="uis:process" color="#D25B5D" />		
						<p>Bulk Transfer</p>
					</Card.Body>
				</Card>
			</div>
            
			<div className={cx(styles.sectionWrapper, "row")}>

				{displayImportBtn && <div className={cx(styles.previewDiv, "flexCol", "col-sm-4", "col-md-8", "col-lg-8", "col-xl-8")}>
					<div onClick={() => displayModal("show", "csvImport")} style={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "1rem 0rem 1rem 1rem", width: "fit-content"}}>
					
						<Button title="Bulk CSV Import" borderRadiusType="mediumRounded" textColor="#D25B5D" bordercolor="#D25B5D" bgColor="#fff" />
					</div>
				</div>}

				{displayTable &&
				<div className={cx(styles.previewDiv, "flexCol", "col-sm-4", "col-md-8", "col-lg-8", "col-xl-8")} >
					

					<div className={cx(styles.btnGroup,  "flexRow")}>
						<div><Button onClick={() => displayModal("show", "csvImport")} title="Bulk CSV Import" borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="2C0085" /></div>
						<div><Button title="Edit" checked borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="2C0085" /></div>
						
						<div><Button onClick={()=>transferAssets()} title="Transfer" textColor="#fff" borderRadiusType="lowRounded" bgColor="#3ED7A0" /></div>
					</div>

					<div className={cx(styles.tableWrapper, "flexCol")}>
						{assetsLoading ? <TableSkeleton /> : 
							<TableComponent columnsHeader={columnsHeader} tableData={getTableData(upload)} selectedRowsData={selectedRowsData} />}
					</div>

				</div> }

				<div className={cx(styles.formDiv, "flexCol", "col-sm-4", "col-md-4", "col-lg-4", "col-xl-4")}>
					<form
						className="form flex text-white homepage-mc-form"
						onSubmit={handleSubmit((data) => transferNewAsset(data))} 
					>

						<Controller
							name="codeNumber"
							control={control}
							render={({ field: { ref, ...rest } }) => (
								<InputField
									{...rest}
									placeholder={"Code Number"}
									type="text"
									error={errors?.codeNumber && errors?.codeNumber?.message}
									
								/>
							)}
						/>

						<Controller
							name="email"
							control={control}
							render={({ field: { ref, ...rest } }) => (
								<InputField
									{...rest}
									placeholder={"Email"}
									type="text"
									error={errors?.email && errors?.email?.message}
									
								/>
							)}
						/>

						<div onClick={handleSubmit((data) => transferNewAsset(data))} style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1rem"}}>
					
							<Button title="Enter Email" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
						</div>
					</form>	
				
				</div>
			</div>

			{modalState === "show" ? <Modal show >{modalType === "csvImport" ? showCsvImportModal() : null}</Modal> : null}
			

			{modalState.showModalSuccess ? <Modal show >{transferAssetResult(transferAssetResponse?.data)}</Modal> : null}
		</div>
	);
};

BulkTransfer.propTypes = {
    
};

export default BulkTransfer;
