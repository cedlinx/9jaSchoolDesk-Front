import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./OTP.module.scss";
import cx from "classnames";

const OTPComponent =({numberOfInputs, handleInputChange})=> {

  const [state, setState] = useState({otp: ""});

  const onChange = (otp) => {
    setState({ otp });
    handleInputChange(otp);
  };    

  return (
    <div className={cx(styles.otpContainer)}>
      <OtpInput
        value={state.otp}
        onChange={onChange}
        numInputs={numberOfInputs}
        separator={<span>{" "}&nbsp;&nbsp;&nbsp;</span>}
      />
    </div>
  
  );

};

export default OTPComponent;