import React from "react";
import { useLocation } from "react-router-dom";
import cx from "classnames";
import styles from "./SignUp.module.scss";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import TopDivWave from "@/components/WaveSvg/TopDivWave";

import MultiStepForm from "@/components/MultiStepForm/MultiStepForm";

const SignUp = () => {

  const location = useLocation();
  const signUpEmail = location?.state?.email;

  return (
    <AuthPageContainer showTopDivWave={false}>
      <div className={cx(styles.signUpWrapper)} >
        <TopDivWave />
        <MultiStepForm signUpEmail={signUpEmail} />			
      </div>
			
    </AuthPageContainer>
  );
};

export default SignUp;