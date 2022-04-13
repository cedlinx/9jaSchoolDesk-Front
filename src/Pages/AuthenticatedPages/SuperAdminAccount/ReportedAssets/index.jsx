import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./index.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import Tabs from "@/components/Tabs/Tabs.jsx";
import {Card} from "react-bootstrap";

import ReportedFound from "./ReportedFound/ReportedFound";
import ReportedStolen from "./ReportedStolen/ReportedStolen";
import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import { Icon } from "@iconify/react";

import { assetsList, modifyAssetCategory, deleteAssetCategory, addAssetCategory, chartData, allAssetsTypes, lostButFoundAssets } from "@/redux/Assets/assets.action";


const ReportedAssets = props => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector((state)=>state?.assets?.loading);
	const allGraphData = useSelector((state) => state?.assets?.chartData?.data);

	useEffect(() => {
		dispatch(assetsList({admin : 1}));
		dispatch(chartData({type : "admin"}));
		dispatch(lostButFoundAssets());
	}, [dispatch]);

	console.log(allGraphData);

	const RenderReportedFound = () => <ReportedFound />;
	const RenderReportedStolen = () => <ReportedStolen />;
	
	const tabsComponents = [
		{ name: "Reported Stolen", component: RenderReportedStolen },
		{ name: "Reported Found", component: RenderReportedFound }
	];

	const leftHeader = ()=>{
		return(
			<div className={cx("flexRow")}>
				<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<Icon icon="bi:patch-check" color="#D25B5D" />	
					<div>
						<small>Total Reported Stolen Assets</small>
						<p>129</p>
					</div>
				</div>
					
			</div>
		
		);
	};

	const btnGroup = ()=>{
		return (
			<div style={{ gap: "1rem"}} className={cx(styles.btnGroup, styles.right,  "flexRow")}>
				{/* <div><Button title="Active" checked textColor="#D25B5D" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#fff" /></div> */}
				<div onClick={() => displayModal("show", "modifyAsset")}><Button title="Edit" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
				<div onClick={() => displayModal("show", "deleteAsset")}><Button title="Remove" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
			</div>
		);
	};

	const cardArray = [
		{
			heading: "Total Reported Stolen",
			value: allGraphData?.counts?.missing_assets
		},
		{
			heading: "Total Reported Found",
			value: allGraphData?.counts?.recovered_assets
		},
		{
			heading: "Total Assets Onboard",
			value: allGraphData?.counts?.all_assets
		}
	];

	return (
		<div className={cx(styles.container)}>

			<div className={cx(styles.cardWrapper, "flexRow")}>
					
				{cardArray.length && cardArray.map((element, index)=>{
					return(
						<Card key={index} className={cx(styles.cardItem)}>
							<Card.Header className={cx(styles.cardHeader)}>
								<p>{element.heading}</p>
							</Card.Header>
							<Card.Body className={cx(styles.cardBody)}>
								<Icon icon="bi:patch-check" color="#D25B5D" />
								<h3>{element.value}</h3>
							</Card.Body>
						</Card>
					);
				})}
			</div>
                
			<div className={cx(styles.tablistWrapper)}>
				<Tabs rightHeader={btnGroup()} background="#FFFFFF" tabs={tabsComponents}/>
			</div>
		</div>
	);
};

ReportedAssets.propTypes = {
    
};

export default ReportedAssets;