import React, { useState } from "react";
import OtpInput from "react-otp-input";

const OTPComponent =({numberOfInputs, handleInputChange})=> {

  const [state, setState] = useState({otp: ""});

  const onChange = (otp) => {
    setState({ otp });
    handleInputChange(otp);
  };    

  return (
    <OtpInput
      value={state.otp}
      onChange={onChange}
      numInputs={numberOfInputs}
      separator={<span>-</span>}
    />
  );

};

export default OTPComponent;