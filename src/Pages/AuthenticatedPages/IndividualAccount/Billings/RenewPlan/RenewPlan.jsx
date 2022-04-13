import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./RenewPlan.module.scss";
import Button from "@/components/Button/Button";
import PriceCard from "@/components/PriceCard/PriceCard";

import { showModal } from "@/redux/ModalState/modalState.action";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";
import {getAllPlans, getCurrentPlan, renewPlan} from "@/redux/Billings/billings.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RenewPlan = props => {

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allSubscriptionPlans = useSelector((state) => state.billings.allPlansData);

	const currentPlan = useSelector((state) => state.billings.currentPlanData);

	useEffect(() => {
		dispatch(getAllPlans());
		// dispatch(getCurrentPlan());
	},[]);

	const benefitsArray = [
		"Single User Account", "10 Max Assets", "Asset Verification", "Asset Location Tracking", "Transfer Ownership", "Report Emmergencies"
	];

	const displayModal = (action, type) => {
		dispatch(showModal({ action, type }));
	};

	const renewPlanFxn=()=>{
		dispatch(renewPlan({id: currentPlan.id}));
	};

	const viewRenewSuccess = (data) => {
		// let detailsObj = getAssetDetails(data);
		return (
			<AssetSuccessModalContent />
		);
	};
	
	const confirmRenewModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to renew your plan ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button onClick={() => renewPlanFxn()} title="Yes Renew" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
				</div>
			</div>
		);
	};

	return (
		<div className={cx(styles.container)}>

			<ToastContainer />

			<div className={cx(styles.header, "flexCol")}>
				<h2>Renewal</h2>
				<div className={cx(styles.lowerLevel, "flexRow")}>
					<div className={cx(styles.dateDiv, "flexCol")}>
						<p>Renewal Date</p>
						<small>Date Value</small>
					</div>
					<div onClick={()=>displayModal("show", "renewPlanConfirmation" )}>
						<Button title="Renew Plan" textColor="#fff" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
					</div>
					
				</div>
				
			</div>

			<div className={cx(styles.cardWrapper)}>
				<div className={cx(styles.innerWrapper)}>
					<PriceCard pricingPage title={allSubscriptionPlans[0]?.name} amount={allSubscriptionPlans[0]?.amount} benefitsArray={benefitsArray} />
				</div>
				
			</div>

			{modalState === "show" ? <Modal show >{modalType === "renewPlanConfirmation" ? confirmRenewModal() : modalType === "renewSuccess" ? viewRenewSuccess() :  null}</Modal> : null}
            
		</div>
	);
};

RenewPlan.propTypes = {
    
};

export default RenewPlan;