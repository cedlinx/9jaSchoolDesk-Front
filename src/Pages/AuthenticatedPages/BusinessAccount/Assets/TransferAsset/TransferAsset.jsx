import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./TransferAsset.module.scss";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import {showModal} from "@/redux/ModalState/modalState.action";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import {Card} from "react-bootstrap";
import { Icon } from "@iconify/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";
import { transferAssetValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { allAssetsTypes, transferAsset } from "@/redux/Assets/assets.action";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";



const TransferAsset = props => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const modalState = useSelector((state)=>state.modalState);
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData);
	const transferAssetResponse = useSelector((state)=>state?.assets?.addAssetData);

	const resolver = yupResolver(transferAssetValidationSchema);

	const defaultValues = {
		assetType: "",
		transferTo: "",
		pin: "",
		id: "",
		transferReason: ""
	};

	useEffect(() => {
		dispatch(allAssetsTypes());
	}, []);

	const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

	const transferNewAsset =async (data)=>{
		let {assetType, ...rest} = data;
		console.log(rest);
		let response = await dispatch(transferAsset(rest));

		console.log(response);
		console.log(transferAssetResponse);

		response.payload.message === true ? dispatch(showModal({action: "show", type: "assetDetails"})) : null;
		// reset();
	};

	const getAssetTypesOptions=(data)=>{
		let result = [];
		data.map(element=>{
			result.push({label: element.type, value: element.id});
		});
		return result;
	};


	const transferAssetResult =(data)=>{
		return(
			<AssetSuccessModalContent data={data} />
		);
	};

	return (
		<div className={cx(styles.container)}>
			<ToastContainer />

			<div className={cx(styles.cardWrapper, "flexRow")}>
				<Card className={cx(styles.cardItem, styles.active)}>
					<Card.Body className={cx(styles.cardBody)}>
						<Icon icon="uis:process" color="#D25B5D" />		
						<p>Single Transfer</p>
					</Card.Body>
				</Card>

				<Card onClick={()=> navigate("bulk-transfer")} className={cx(styles.cardItem)}>
					<Card.Body className={cx(styles.cardBody)}>
						<Icon icon="uis:process" color="#D25B5D" />		
						<p>Bulk Transfer</p>
					</Card.Body>
				</Card>
			</div>
			
			<div className={cx(styles.formDiv, "flexCol", "col-md-6", "col-lg-6", "col-xl-4")}>
				<form
					className="form flex text-white homepage-mc-form"
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
							<InputField
								{...rest}
								placeholder={"Asset ID"}
								type="text"
								error={errors?.id && errors?.id?.message}
								
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
								type="password"
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
					
						<Button title="Transfer Asset" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
					</div>
				</form>	
				
			</div>

			{modalState.showModalSuccess ? <Modal show >{transferAssetResult(transferAssetResponse?.data)}</Modal> : null}
		</div>
	);
};

TransferAsset.propTypes = {
    
};

export default TransferAsset;
