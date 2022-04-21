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

  const [enableNotificationCheck, setEnableNotificationCheck] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);
  const [allowDeviceRegisterCheck, setAllowDeviceRegisterCheck] = useState(false);

  // Get all notification initial states

  const toggleChangeFxn=(e)=>{
    const checkedState = e.target.checked;
    const id = e.target.id;
    if(checkedState && id === "enableNotifications"){
      setEnableNotificationCheck(true);
    }
    else if(!checkedState && id === "enableNotifications"){
      setEnableNotificationCheck(false);

    }
    else if(checkedState && id === "rememberLoginDetails"){
      setRememberLogin(true);

    }
    else if(!checkedState && id === "rememberLoginDetails"){
      setRememberLogin(false);
    }
    if(checkedState && id === "allowDeviceToRegister"){
      setAllowDeviceRegisterCheck(true);
    }
    else if(!checkedState && id === "allowDeviceToRegister"){
      setAllowDeviceRegisterCheck(false);
    }
  };
  return(
    <div className={cx(styles.container)}>
      <section className={cx(styles.notificationWrapper)}>
        <div className={cx(styles.itemWrapper)}>
          <div className={cx(styles.item)}><p>Enable Notifications </p></div>
          <div className={cx(styles.togglerDiv)}>
            <FormCheck 
              id="enableNotifications"
              type="switch"
              onChange={(e)=>toggleChangeFxn(e)}
              checked={enableNotificationCheck}
            />						
          </div>
        </div>
        {/* <div className={cx(styles.itemWrapper)}>
					<div className={cx(styles.item)}><p>Remember login details</p></div>
					<div className={cx(styles.togglerDiv)}>
						<FormCheck 
							id="rememberLoginDetails"
							type="switch"
							onChange={(e)=>toggleChangeFxn(e)}
							checked={rememberLogin}

						/>						
					</div>
				</div> */}
        {/* <div className={cx(styles.itemWrapper)}>
					<div className={cx(styles.item)}><p>Allow Device to register </p></div>
					<div className={cx(styles.togglerDiv)}>
						<FormCheck 
							id="allowDeviceToRegister"
							type="switch"
							onChange={(e)=>toggleChangeFxn(e)}
							checked={allowDeviceRegisterCheck}

						/>						
					</div>
				</div> */}
				
				
      </section>
    </div>
  );
};

export default Notification;