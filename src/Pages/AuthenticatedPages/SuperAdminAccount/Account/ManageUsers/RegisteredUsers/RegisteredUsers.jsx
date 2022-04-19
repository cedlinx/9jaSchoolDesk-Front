import React, {useState, useEffect, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./RegisteredUsers.module.scss";
import {useNavigate} from "react-router-dom";

import TableComponent from "@/components/Table/Table";
import cx from "classnames";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import QRCodeSVG from "qrcode.react";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";

// import { modifyUser, deleteUser } from "@/redux/User/user.action";
import { showModal } from "@/redux/ModalState/modalState.action";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";

import UserDetailsModal from "@/components/Modals/UserDetails/UserDetails";

import { useForm, Controller } from "react-hook-form";
import { addAssetCategoryValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const RegisteredUsers = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allUsersList = useSelector((state) => state?.user?.getAllUsersData?.data?.data);
	const loading = useSelector((state) => state?.user.loading);

	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);
	
	const resolver = yupResolver(addAssetCategoryValidationSchema);

	const defaultValues = {
		type: "",
		slug: "",
		description: "",
		allowEdit: ""
	};

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	console.log(allUsersList);

	const displayModal = (action, type) => {
		if(type === "deleteUser" && selectedRows.length === 0) {
			toast.error("Kindly select at least one user to perform this action");
			return;
		}
		else if( type === "modifyUser" && selectedRows.length === 0) {
			toast.error("Kindly select at least one user to perform this action");
			return;
		}
 
		dispatch(showModal({ action, type }));
	};

	let shortenDate=(value)=>{
		let date = new Date(value);
		return date.toDateString();
	};

	const deleteUserFxn = async (uncheckedID) => {
		// console.log(uncheckedID);
		// if(uncheckedID){
		// 	let result =await dispatch(deleteUser({id: uncheckedID}));
		// 	console.log(result);
		// 	result.payload.status === 200 && dispatch(usersList());	
		// 	displayModal("hide");
		// }
		// else if(selectedRows.length === 1){
		// 	const assetID = selectedRows[0].original.assetID;
		// 	let result =await dispatch(deleteUser({id: assetID}));
		// 	result.payload.status === 200 && dispatch(usersList());	
		// 	displayModal("hide");
		// }
		// else{
		// 	const assetIDs = [];
		// 	selectedRows.map(element=>{
		// 		assetIDs.push(element.original.assetID);
		// 	});
		// 	// dispatch(deleteBulkUsers({id: assetIDs}));
		// 	// displayModal("hide");
		// }
	};

	const modifyUserFxn = async () => {
		// const response = await dispatch(modifyUser(data));
		// console.log(response, "update response");
		// if (response?.payload?.data?.success === true ){
		// 	dispatch(showModal({action: "hide"}));
		// 	reset();
		// 	dispatch(showModal({action: "show", type: "modifyUserSuccess"}));
		// }

	};

	const confirmModifyModal = () => {
		return (
			<div style={{ width: "100%", minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center"}} className={cx("")}>
				<form
					onSubmit={handleSubmit((data) => modifyUserFxn(data))} 
					className=""
				>
					<Controller
						name="id"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Category ID"}
								type="text"
								error={errors?.id && errors?.id?.message}
								
							/>
						)}
					/>

					<Controller
						name="type"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Asset Type"}
								type="text"
								error={errors?.type && errors?.type?.message}
							/>
						)}
					/>

					<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
						<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
						<Button loading={loading}  onClick={handleSubmit((data) => modifyUserFxn(data))} title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
					</div>
				</form>	
			</div>
		);
	};

	const confirmDeleteModal = (data) => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to delete the user ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button onClick={() => deleteUserFxn()} title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" />
				</div>
			</div>
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
						width: "5rem"
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
						minWidth: "6rem"
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
						minWidth: "15rem"
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
				return <div onClick={()=>navigate(`user-activities/${userId}`)}>
					<Button  title="View" borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="rgba(44,0,133,0.05)"/>
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
		<>
			{showBtnGroup && <div style={{ justifyContent: "flex-end", gap: "1rem", marginBottom: "1rem"}} className={cx(styles.btnGroup, styles.left,  "flexRow")}>
				<div onClick={() => displayModal("show", "modifyUser")}><Button title="Edit" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
				<div onClick={() => displayModal("show", "deleteUser")}><Button title="Remove" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
			</div> }
			
			
			<div className={cx(styles.tableWrapper, "flexCol")}>
				{loading ? <TableSkeleton /> : 
					<TableComponent columnsHeader={columnsHeader} tableData= {getTableData(allUsersList)} selectedRowsData={selectedRowsData} />}
			</div>

			{modalState === "show" ? <Modal show >{ modalType === "deleteUser" ? confirmDeleteModal() : modalType === "modifyUser" ? confirmModifyModal() : null}</Modal> : null}

		</>
	);
};

RegisteredUsers.propTypes = {
    
};

export default RegisteredUsers;