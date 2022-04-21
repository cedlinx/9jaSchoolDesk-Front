import React, { useState } from "react";
import OtpInput from "react-otp-input";

const OTPComponent =({numberOfInputs})=> {

  const [state, setState] = useState({otp: ""});

  const handleChange = (otp) => {
    setState({ otp });
  };

    

  return (
    <OtpInput
      value={state.otp}
      onChange={handleChange}
      numInputs={numberOfInputs}
      separator={<span>-</span>}
    />
  );

};

export default OTPComponent;