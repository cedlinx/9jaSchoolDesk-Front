import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./MultiStepForm.module.scss";
import {useNavigate} from "react-router-dom";
import Button from "@/components/Button/Button";

import { Icon } from "@iconify/react";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import FinalStep from "./FinalStep/FinalStep";




const MultiStepForm = () => {

  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    email: "",
    password: "",
    password_confirmation: "",
    country: "",
    state: "",
    city: ""    
  });

  const nextStep = () => {
    setStep(step + 1);
  };
    
  const prevStep = () => {
    setStep(step - 1);
  };
  const handleInputData = (data) => {
    console.log(data);
    console.log(formData);

    for (const item in formData) {
      formData[item] = data[item];
    }
    console.log(formData, "new form data");
  };

  const stepComponent = () => {
    switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} />
      );
      // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
      );

      // case 3:
      //   return (
      //     <StepThree nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
      //   );

      // Only formData is passed as prop to show the final value at form submit
    case 3:
      return (
        <FinalStep values={formData}  />
      );

    default:
      return (
        <div className="App" />
      );
    }
  }; 

  return (
    <div className={cx(styles.multiStepFormContainer, "flexCol")}>
      <div className={cx(styles.stepIndicator, "flexRow")}>
        <div className={cx(styles.wrapper, step === 1 && styles.activeStep, "flexRow-fully-centered")}>
          <Icon icon="fluent:number-circle-1-24-filled"  width="24" height="24"/>
          <span>Personal Information</span>
        </div>

        <div className={cx(styles.wrapper, step === 2 && styles.activeStep, "flexRow-fully-centered")}>
          <Icon icon="mdi:numeric-2-circle"  width="24" height="24" />
          <span>Residential Information</span>
        </div>

        {/* <div className={cx(styles.wrapper, step === 3 && styles.activeStep,  "flexRow-fully-centered")}>
          <Icon icon="mdi:numeric-3-circle"  width="24" height="24" />
          <span>Profile Picture</span>
        </div> */}

        <div className={cx(styles.wrapper, step === 3 && styles.activeStep, "flexRow-fully-centered")}>
          <Icon icon="mdi:numeric-3-circle" width="24" height="24" />
          <span>Complete</span>
        </div>

      </div>

      <div className={cx(styles.body)}>
        {stepComponent()}
      </div>
    </div>
  );
};

export default MultiStepForm;