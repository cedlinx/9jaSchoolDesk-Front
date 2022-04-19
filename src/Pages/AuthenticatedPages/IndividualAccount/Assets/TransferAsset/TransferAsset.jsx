import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./TransferAsset.module.scss";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import {showModal} from "@/redux/ModalState/modalState.action";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";
import { transferAssetValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { allAssetsTypes, transferAsset, assetsList } from "@/redux/Assets/assets.action";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";



const TransferAsset = props => {

	const dispatch = useDispatch();
	const modalState = useSelector((state)=>state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allAssetsList = useSelector((state) => state?.assets?.assetsListData?.data?.asset_array);
	const loading = useSelector((state)=>state?.assets?.loading);
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData);
	const [modalAssetId, setModalAssetId] = useState("");
	const resolver = yupResolver(transferAssetValidationSchema);

	const defaultValues = {
		transferTo: "",
		pin: "",
		id: "",
		transferReason: ""
	};

	useEffect(() => {
		dispatch(assetsList());	
		dispatch(allAssetsTypes());
	}, []);

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const transferNewAsset =async (data)=>{
		setModalAssetId(data.id);
		let response = await dispatch(transferAsset(data));
		response?.payload?.message.toLowerCase().includes("successfully") ? dispatch(showModal({action: "show", type: "assetDetails"})) : null;
		reset();
	};
	
	const getAssetsList=(data)=>{
		let result = [];
		data && data.map(element=>{
			result.push({label: element.name, value: element.id});
		});
		return result;
	};

	const getAssetDetails = (data) => {
		return allAssetsList.filter(asset=> asset.id.toString() === data)[0];
	};

	const viewAssetResult = (data) => {
		let detailsObj = getAssetDetails(data);
		return (
			<AssetSuccessModalContent data={detailsObj} dispatchAction="assetsList" />
		);
	};

	return (
		<div className={cx(styles.container)}>
			<ToastContainer />

			<h2>Transfer Asset</h2>
			
			<div className={cx(styles.formDiv, "flexCol", "col-md-6", "col-lg-6", "col-xl-4")}>
				<form
					className=""
					onSubmit={handleSubmit((data) => transferNewAsset(data))} 
				>

					<Controller
						name="transferTo"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Transfer To"}
								type="text"
								error={errors?.transferTo && errors?.transferTo?.message}
								
							/>
						)}
					/>

					<Controller
						name="id"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<SelectField
								{...rest}
								type="text"
								defaultSelect={"Select Asset"}
								error={errors?.id && errors?.id?.message}
								options={getAssetsList(allAssetsList && allAssetsList)}
							/>
						)}
					/>

					<Controller
						name="pin"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Pin"}
								maxLength={"4"}
								type="number"
								error={errors?.pin && errors?.pin?.message}
								
							/>
						)}
					/>

					<Controller
						name="transferReason"
						control={control}
						render={({ field: { ref, ...rest } }) => (
							<InputField
								{...rest}
								placeholder={"Transfer Reason"}
								type="text"
								error={errors?.transferReason && errors?.transferReason?.message}
								
							/>
						)}
					/>

					<div onClick={handleSubmit((data) => transferNewAsset(data))} style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1rem"}}>
					
						<Button loading={loading} title="Transfer Asset" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
					</div>
				</form>	
				
			</div>

			{modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetResult(modalAssetId) : null}</Modal> : null}

		</div>
	);
};

TransferAsset.propTypes = {
    
};

export default TransferAsset;
