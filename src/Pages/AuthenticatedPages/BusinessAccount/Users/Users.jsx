import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./Users.module.scss";
import ContactForm from "@//components/ContactForm/ContactForm";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import Button from "@/components/Button/Button";
import qrCodeIcon from "@/assets/icons/qrcode-icon.svg";
import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { showModal } from "@/redux/ModalState/modalState.action";

import InputField from "@/components/Input/Input";

import SelectField from "@/components/Select/Select";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

import { addUser, userRoles } from "@/redux/ExternalUsers/externalUsers.action";
import { assetsList, allAssetsTypes, modifyAsset, deleteAsset, generatedAssetCodes } from "@/redux/Assets/assets.action";

import Tabs from "@/components/Tabs/Tabs.jsx";

import Staff from "./Staff/Staff";
import Customers from "./Customers/Customers";

import { useForm, Controller } from "react-hook-form";
import { addUserValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const Users = props => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const userRolesData = useSelector((state) => state.externalUsers.userRolesData);

	console.log(userRolesData);
	const modalAssetId = useSelector((state) => state.assets.modalAssetId);
	const allSelectedRows = useSelector((state) => state.assets.selectedRowsData);

	const resolver = yupResolver(addUserValidationSchema);

	const defaultValues = {
		group_id: "",
		name: "",
		email: "",
		phone: "",
		role: ""
	};

	useEffect(() => {
		dispatch(userRoles());
	}, []);

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });
    
	const addNewUser =async (data)=>{
		console.log(data, "payload");
		let response = await dispatch(addUser(data));

		// response.payload.message === true ? dispatch(showModal("show")) : null;
		// reset();
	};

	const getRolesOptions=(data)=>{
		let result = [];
		data[0].map(element=>{
			result.push({label: element.role, value: element.id});
		});
		return result;
	};

	const addUserResult =(data)=>{
		return(
			<AssetSuccessModalContent data={data} />
		);
	};

	const RenderStaff = () => <Staff />;
	const RenderCustomers = () => <Customers />;
	
	const tabsComponents = [
		{ name: "Staff", component: RenderStaff },
		{ name: "Customers", component: RenderCustomers }
	];

	const displayModal = (action, type) => {
		dispatch(showModal({ action, type }));
	};

	// const showDetails =(data)=>{
	// 	console.log(data, "asset id");
	// 	// dispatch(modalAssetId(data));
	// 	dispatch(showModal({action: "show", type: "assetDetails"}));
	// };

	const codeDetailsWrapper =()=>{
		return(
			<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
				<img src={emptyAvatar} alt="avatar" />
				<div>
					<small>Total Users</small>
					<p>129</p>
				</div>
			</div>
		);
	};

	const btnGroup = ()=>{
		return (
			<div className={cx(styles.btnGroup, styles.right,  "flexRow")}>
				<div><Button title="Active" checked textColor="#D25B5D" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#fff" /></div>
				<div onClick={() => displayModal("show", "modifyAsset")}><Button title="Edit" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
				<div onClick={() => displayModal("show", "deleteAsset")}><Button title="Remove" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
			</div>
		);
	};

	const getUserDetails = (data) => {
		// actual code to be used
		// return allAssetsList.filter(asset=> asset.id === data)

		// Test code
		return testData.filter(asset => asset.nameId === data)[0];
	};

	const deleteUserFxn = () => {
		// let assetId = 
		// console.log(allSelectedRows);
		dispatch(deleteUser({id: "131"}));
	};

	const modifyUserFxn = () => {
		// let assetId = 
		// console.log(allSelectedRows);
		dispatch(modifyUser({id: "11"}));
	};	
    
	const confirmModifyModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to edit the asset ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button onClick={() => modifyUserFxn()} title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
				</div>
			</div>
		);
	};



	const confirmDeleteModal = (data) => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to delete the user profile ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button onClick={() => deleteUserFxn()} title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" />
				</div>
			</div>
		);
	};

	const addUserModal = (data) => {
		return (
			<div style={{width: "100%"}} className={cx(styles.modalWrapper, "flexCol-align-center")}>
				
				<h2>Add User</h2>
			
				<div style={{width: "100%"}} className={cx(styles.formDiv, "flexCol", "col-md-6", "col-lg-6", "col-xl-4")}>
					<form
						onSubmit={handleSubmit((data) => addNewUser(data))} 
						className="form flex text-white homepage-mc-form"
					>
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

						<Controller
							name="name"
							control={control}
							render={({ field: { ref, ...rest } }) => (
								<InputField
									{...rest}
									placeholder={"Name"}
									type="text"
									error={errors?.name && errors?.name?.message}
								/>
							)}
						/>

						<Controller
							name="group_id"
							control={control}
							render={({ field: { ref, ...rest } }) => (
								<InputField
									{...rest}
									placeholder={"Group ID"}
									type="number"
									error={errors?.group_id && errors?.group_id?.message}
								/>
							)}
						/>

						<Controller
							name="role"
							control={control}
							render={({ field: { ref, ...rest } }) => (
								<SelectField
									{...rest}
									type="text"
									defaultSelect={"Select Role"}
									error={errors?.role && errors?.role?.message}
									options={getRolesOptions(userRolesData)}
								/>
							)}
						/>

						<Controller
							name="phone"
							control={control}
							render={({ field: { ref, ...rest } }) => (
								<InputField
									{...rest}
									placeholder={"Phone Number"}
									type="text"
									error={errors?.phone && errors?.phone?.message}
									marginbottom={"0px"}
								/>
							)}
						/>
					
						<div onClick={handleSubmit((data) => addNewUser(data))} style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1rem"}}>
						
							<Button title="Add User" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
						</div>
					</form>	
				</div>
			</div>
		);
	};

	const addUserSuccessModal = (data) => {
		let detailsObj = getUserDetails(data);
		return (
			<AssetSuccessModalContent data={detailsObj} />
		);
	};

	const handleInputChange = (e)=>{
		console.log(e.target.value);
	};

	return (
		<div className={cx(styles.container)}>
			<ToastContainer />

			<div className={cx(styles.headerWrapper, "flexRow")}>
				<div onClick={() => displayModal("show", "addUser")}>
					<Button title="+Add User" textColor="#D25B5D" borderRadiusType="lowRounded" bgColor="#fff" />
				</div>

				<InputField icon onChange={(e)=>handleInputChange(e)} 
					placeholder={"Search User Here"}
					border={"#eee"}
				/>

			</div>

			<div className={cx(styles.assetCodeWrapper, "flexRow")}>
				<Tabs leftHeader={codeDetailsWrapper()} rightHeader={btnGroup()} background="#FFFFFF" tabs={tabsComponents}/>
			</div>

			{modalState === "show" ? <Modal show >{modalType === "addUserSuccess" ? addUserSuccessModal(modalAssetId) : modalType === "addUser" ? addUserModal() : modalType === "deleteAsset" ? confirmDeleteModal() : modalType === "modifyAsset" ? confirmModifyModal() : null}</Modal> : null}

		</div>
	);  
};

Users.propTypes = {

};

export default Users;
