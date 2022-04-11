import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Notification.module.scss";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import { FormCheck } from "react-bootstrap";

const Notification=()=>{

	
	const dispatch = useDispatch();

	const [assetTransferCheck, setAssetTransferCheck] = useState(false);
	const [rememberLogin, setRememberLogin] = useState(false);
	const [allowDeviceRegisterCheck, setAllowDeviceRegisterCheck] = useState(false);

	// Get all notification initial states

	const toggleChangeFxn=(e)=>{
		console.log(e.target.id, "change");
		const checkedState = e.target.checked;
		const id = e.target.id;
		if(checkedState && id === "assetTransferViaMail"){
			console.log(" checked asset trans got here");
			setAssetTransferCheck(true);
		}
		else if(!checkedState && id === "assetTransferViaMail"){
			console.log(" unchecked ass tra got here");
			setAssetTransferCheck(false);

		}
		else if(checkedState && id === "rememberLoginDetails"){
			console.log(" checked remb log got here");
			setRememberLogin(true);

		}
		else if(!checkedState && id === "rememberLoginDetails"){
			console.log(" unchecked reb log got here");
			setRememberLogin(false);
		}
		if(checkedState && id === "allowDeviceToRegister"){
			console.log(" checked allow got here");
			setAllowDeviceRegisterCheck(true);
		}
		else if(!checkedState && id === "allowDeviceToRegister"){
			console.log(" unchecked allow got here");
			setAllowDeviceRegisterCheck(false);
		}
	};
	return(
		<div className={cx(styles.container)}>
			<section className={cx(styles.notificationWrapper)}>
				<div className={cx(styles.itemWrapper)}>
					<div className={cx(styles.item)}><p>Enable Asset Transfer Notfication Via Email </p></div>
					<div className={cx(styles.togglerDiv)}>
						<FormCheck 
							id="assetTransferViaMail"
							type="switch"
							onChange={(e)=>toggleChangeFxn(e)}
							checked={assetTransferCheck}
						/>						
					</div>
				</div>
				<div className={cx(styles.itemWrapper)}>
					<div className={cx(styles.item)}><p>Remember login details</p></div>
					<div className={cx(styles.togglerDiv)}>
						<FormCheck 
							id="rememberLoginDetails"
							type="switch"
							onChange={(e)=>toggleChangeFxn(e)}
							checked={rememberLogin}

						/>						
					</div>
				</div>
				<div className={cx(styles.itemWrapper)}>
					<div className={cx(styles.item)}><p>Allow Device to register </p></div>
					<div className={cx(styles.togglerDiv)}>
						<FormCheck 
							id="allowDeviceToRegister"
							type="switch"
							onChange={(e)=>toggleChangeFxn(e)}
							checked={allowDeviceRegisterCheck}

						/>						
					</div>
				</div>
				
				
			</section>
		</div>
	);
};

export default Notification;