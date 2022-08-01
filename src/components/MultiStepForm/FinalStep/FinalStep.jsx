import React, {useState, useEffect} from "react";
import cx from "classnames";
import styles from "./FinalStep.module.scss";
import Button from "@/components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { titleCase } from "@/helpers/textTransform";
import { signUp } from "@/redux/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";



const FinalStep = ({ values }) => {
  const navigate = useNavigate();
  const { user } = useParams();
  const dispatch = useDispatch();
  const signUpSuccess = useSelector((state) => state?.auth?.signUpData?.data?.verified);

  const handleSubmit = () => {
    dispatch(signUp({payload: values, user: user}));
  };

  useEffect(() => {
    if (signUpSuccess) {
      navigate(`/${user}/dashboard`);
    }
  }
  , [navigate, signUpSuccess, user]);


  return (
    <div className={cx(styles.finalStepContainer, "flexCol")}>

      <div className={cx("row", "g-0")}> 

        <div className={cx(styles.leftSection, "col-lg-6", "flexCol")}>
          <div className={cx(styles.wrapper, "flexCol")}>
            <div className={cx(styles.infoItem)}>
              <small>First Name</small>
              <p>{titleCase(values?.firstName)}</p>
            </div>

            <div className={cx(styles.infoItem)}>
              <small>Last Name</small>
              <p>{titleCase(values?.lastName)}</p>
            </div>

            <div className={cx(styles.infoItem)}>
              <small>Other Names</small>
              <p>{titleCase(values?.otherNames)}</p>
            </div>

            <div className={cx(styles.infoItem)}>
              <small>Email Address</small>
              <p>{(values?.email)}</p>
            </div>

            <div className={cx(styles.infoItem)}>
              <small>Phone Number</small>
              <p>{(values?.phone)}</p>
            </div>

           
          </div>
        </div>

        <div className={cx(styles.rightSection, "col-lg-6", "flexCol")}>
          <div className={cx(styles.wrapper, "flexCol")}>

            <div className={cx(styles.infoItem)}>
              <small>Address</small>
              <p>{titleCase(values?.addressLine1)}</p>
            </div>
            
            <div className={cx(styles.infoItem)}>
              <small>Country</small>
              <p>{titleCase(values?.country)}</p>
            </div>    

            <div className={cx(styles.infoItem)}>
              <small>State</small>
              <p>{titleCase(values?.state)}</p>
            </div> 

            <div className={cx(styles.infoItem)}>
              <small>City</small>
              <p>{titleCase(values?.city)}</p>
            </div> 


         
          </div>
        </div>
      </div>


      <div className={cx(styles.btnDiv, "flexRow")}>
        <Button onClick={()=>navigate(`/login/${user}`)} title="Cancel" borderRadiusType="lowRounded" bordercolor="transparent" textColor="#f4f4f4" bgColor="gray" hoverColor="#1A3B4A" hoverBg="#f4f4f4" />

        <Button onClick={()=>handleSubmit()} title="Sign Up" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" hoverColor="#f4f4f4" hoverBg="transparent" bordercolor="transparent" />
      </div>

    </div>
  );
};

export default FinalStep;