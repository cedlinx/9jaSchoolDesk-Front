import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./UpgradePlan.module.scss";
import Button from "@/components/Button/Button";
import PriceCard from "@/components/PriceCard/PriceCard";
import { showModal } from "@/redux/ModalState/modalState.action";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";
import {getAllPlans, upgradePlan} from "@/redux/Billings/billings.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ListGroup from "@/components/ListGroup/ListGroup";

const UpgradePlan = props => {

	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modalState.action);
	const modalType = useSelector((state) => state.modalState.type);
	const allSubscriptionPlans = useSelector((state) => state.billings.allPlansData);

	const [selectedPlan, setSelectedPlan] = useState({
		index: 0,
		data: ""
	});

	console.log(allSubscriptionPlans);

	useEffect(() => {
		dispatch(getAllPlans());
	},[]);

	const benefitsArray = [
		"Single User Account", "10 Max Assets", "Asset Verification", "Asset Location Tracking", "Transfer Ownership", "Report Emmergencies"
	];

	const displayModal = (action, type) => {
		dispatch(showModal({ action, type }));
	};

	const upgradePlanFxn=()=>{
		console.log(selectedPlan, "selected plan id");
		dispatch(upgradePlan({id: selectedPlan}));
	};

	const handleCardClick=(data, index)=>{
		console.log(data);
		console.log(index);
		setSelectedPlan({data:data.id, index:index});
	};
	console.log(selectedPlan);
	const viewUpgradeSuccess = (data) => {
		// let detailsObj = getAssetDetails(data);
		return (
			<AssetSuccessModalContent />
		);
	};
	
	const confirmUpgradeModal = () => {
		return (
			<div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
				<h2>Are you sure you want to upgrade your plan ?</h2>
				<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
					<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#2C0085" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
					<Button onClick={() => upgradePlanFxn()} title="Yes Upgrade" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
				</div>
			</div>
		);
	};


	return (
		<div className={cx(styles.UpgradePlanContainer)}>
			<ToastContainer />
			<div className={cx(styles.header, "flexCol")}>
				<h2>Upgrade Plan</h2>
				<p className={cx("main-caption")}>
                Select the plan of your choice that you will like to upgrade to and see the available payment for the plan. Please use your card and not bank transfer
				</p>

				<p>Kindly select any plan to continue the upgrade</p>
			</div>


			<div className={cx(styles.cardWrapper, "flexRow")}>

				{allSubscriptionPlans && allSubscriptionPlans.map((element, index) => {
					return <div className={cx(styles.innerWrapper)} onClick={()=>handleCardClick(element, index)} key={index} style={{border: selectedPlan.index === index ? "2px solid #2C0085" : "", borderRadius: "1rem"}}>
						<PriceCard  pricingPage title={element.name} amount={element.amount} benefitsArray={benefitsArray} />
					</div>;
				})}
			</div>

			{/* <div className={cx(styles.cardWrapper, "flexRow")}>
				<ListGroup> 
					{allSubscriptionPlans && allSubscriptionPlans.map((element, index) => {
						return <div className={cx(styles.innerWrapper)} key={index}>
							<PriceCard  pricingPage title={element.name} amount={element.amount} benefitsArray={benefitsArray} />
						</div>;
					})}
				</ListGroup>			
			</div> */}

			{selectedPlan && <div onClick={()=>displayModal("show", "upgradePlanConfirmation" )} style={{marginTop: "2rem"}}>
				<Button title="Continue With The Selected Plan?" textColor="#fff" borderRadiusType="lowRounded" bgColor="#2C0085" />
			</div>}
			
		
			{modalState === "show" ? <Modal show >{modalType === "upgradePlanConfirmation" ? confirmUpgradeModal() : modalType === "upgradeSuccess" ? viewUpgradeSuccess() :  null}</Modal> : null}
            
		</div>
	);
};

UpgradePlan.propTypes = {
    
};

export default UpgradePlan;