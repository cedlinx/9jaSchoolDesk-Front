import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./index.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import Tabs from "@/components/Tabs/Tabs.jsx";
import { toast } from "react-toastify";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import SelectField from "@/components/Select/Select";

import AdminUsers from "./AdminUsers/AdminUsers";
import RegisteredUsers from "./RegisteredUsers/RegisteredUsers";
import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import { showModal } from "@/redux/ModalState/modalState.action";
import {getAllUsers, getAllAdminUsers} from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { addAssetCategoryValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";


const ManageUsers = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);

	const loading = useSelector((state)=>state?.assets?.loading);

	const allRegisteredUsersList = useSelector((state) => state?.user?.getAllUsersData?.data?.data);
	const allAdminUsersList = useSelector((state) => state?.user?.getAllAdminUsersData?.data?.data);


	const [modalAssetId, setModalAssetId] = useState("");
	const [selectedRows, setSelectedRows] = useState("");
	const [checkedValue, setCheckedValue] = useState(false);
	const [disableModifyBtn, setDisableModifyBtn] = useState(false);
	const [showBtnGroup, setShowBtnGroup] = useState(false);
	const allAssetsList = useSelector((state) => state?.assets?.assetsListData?.data);

	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getAllAdminUsers());
	},[dispatch]);

	const RenderAdminUsers = () => <AdminUsers />;
	const RenderRegisteredUsers = () => <RegisteredUsers />;
	
	const tabsComponents = [
		{ name: "Registered Users", component: RenderRegisteredUsers },
		{ name: "Admins", component: RenderAdminUsers }
	];

	const resolver = yupResolver(addAssetCategoryValidationSchema);

	const defaultValues = {
		categoryName: "",
		slug: "",
		description: "",
		allowEdit: ""
	};

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const getAssetDetails = (data) => {
		return allAssetsList?.asset_array.filter(asset=> asset.id === data)[0];
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

	const choiceOptions = [
		{label: "Yes", value: "1"},
		{label: "No", value: "0"}
	];

	const viewAssetResult = (data) => {
		let detailsObj = getAssetDetails(data);
		return (
			<AssetSuccessModalContent data={detailsObj} />
		);
	};

	const addNewUserFxn =async (data)=>{
		console.log(data, "add new cat data");
		// const response = await dispatch(addCategory(data));
		// console.log(response, "add new cat response");
		// if (response?.payload?.data?.success === true ){
		// 	dispatch(showModal({action: "hide"}));
		// 	reset();
		// 	dispatch(assetsList());
		// }
	};

	const addNewUserModal = () => {
		return (
			<div style={{ width: "100%", minHeight: "50vh" }} className={cx("")}>
				<h2 style={{ marginBottom: "2rem"}}>Add New Admin</h2>
				<form
					onSubmit={handleSubmit((data) => addNewUserFxn(data))} 
					className="form flex text-white homepage-mc-form"
				>
					<Controller
						name="name"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Full Name"}
								type="text"
								error={errors?.name && errors?.name?.message}
								
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

					<Controller
						name="phone"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Phone Number"}
								type="text"
								error={errors?.phone && errors?.phone?.message}
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
								defaultSelect={"User Category"}
								error={errors?.role && errors?.role?.message}
								options={choiceOptions}
							/>
						)}
					/>

					<Controller
						name="group_id"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Group"}
								type="text"
								error={errors?.group_id && errors?.group_id?.message}
							/>
						)}
					/>

					<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
						<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
						<Button loading={loading}  onClick={handleSubmit((data) => addNewUserFxn(data))} title="Add User" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
					</div>
				</form>	
			</div>
		);
	};

	const leftHeader = ()=>{
		return(
			<div className={cx("flexRow", styles.assetCodeWrapper)}>
				<div onClick={() => displayModal("show", "assetCategory")}><Button title="Add Admin" textColor="#fff" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#2C0085" /></div>

				<div style={{ paddingRight: "1rem" }} className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<img src={emptyAvatar} alt="avatar" />
					<div>
						<small>Total Users</small>
						<p>{(allRegisteredUsersList && allRegisteredUsersList.length) + (allAdminUsersList && allAdminUsersList.length)}</p>
					</div>
				</div>
					
			</div>
		
		);
	};

	const btnGroup = ()=>{
		return (
			<div className={cx(styles.btnGroup, styles.right,  "flexRow")}>
				<div onClick={() => displayModal("show", "modifyAsset")}><Button title="Edit" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
				<div onClick={() => displayModal("show", "deleteAsset")}><Button title="Remove" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
			</div>
		);
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
		<>  
			<div className={cx(styles.container)}>
				<div className={cx(styles.tablistWrapper)}>
					<Tabs leftHeader={leftHeader()} rightHeader={showBtnGroup && btnGroup()} background="#FFFFFF" tabs={tabsComponents}/>
				</div>
			</div>
		</>
	);
};

ManageUsers.propTypes = {
    
};

export default ManageUsers;