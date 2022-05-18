import React,{useEffect, useState} from "react";
import cx from "classnames";
import {useDispatch, useSelector} from "react-redux";
import styles from "./VerifyEmail.module.scss";
import {useParams, useNavigate, useSearchParams} from "react-router-dom";
import Button from "@/components/Button/Button";
import MenuBar from "@/components/MenuBar/MenuBar";
import { Icon } from "@iconify/react";
import {emailVerification} from "@/redux/User/user.action";
import { CirclesWithBar } from  "react-loader-spinner";
import { urlParameters } from "@/helpers/urlParameters";


const VerifyEmail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("signature"));
  const [verificationResponse, setVerificationResponse] = useState("");
  const [defaultDisplay, setDefaultDisplay] = useState(true);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayVerified, setDisplayVerified] = useState(false);
  const [displayFailed, setDisplayFailed] = useState(false);
  const [displayUserNotFound, setDisplayUserNotFound] = useState(false);
	
  useEffect(() => {

    
    (async()=>{
      const data = {
        signature: searchParams.get("signature"),
        token: params.token,
        expires: searchParams.get("expires"),
        id: params.id
      };
      console.log(data);
      const response = await dispatch(emailVerification(data));
      console.log(response);
      console.log(response.payload);
      console.log(response.payload.data);

      // if(response.type.toLowerCase().includes("failure")){
      //   setVerificationResponse(response?.payload);
      //   if(response?.payload.includes("verified")){
      //     setDisplayVerified(true);
      //     setTimeout(() => {
      //       navigate("/login");
      //     }, 5000);
      //   }else if(response?.payload.includes("expired")){
      //     setDisplayFailed(true);
      //   }else{
      //     setDisplayUserNotFound(true);
      //   }
      //   setDefaultDisplay(false);
      // }
      if(response.status === 200){
        setVerificationResponse(response?.payload);
        if(response?.payload.includes("verified")){
          setDisplayVerified(true);
          setTimeout(() => {
            // navigate("/login");
          }, 5000);
        }else if(response?.payload.includes("expired")){
          setDisplayFailed(true);
        }else{
          setDisplayUserNotFound(true);
        }
        setDefaultDisplay(false);
      }
      else{
        setVerificationResponse(response?.payload?.data?.message);
        setDisplaySuccess(true);
        setTimeout(() => {
          // navigate("/login");
        }, 5000);
        setDefaultDisplay(false);
      }

			
    })();

  },[dispatch, navigate, params.id, params.token, searchParams]);
		
  return (
    <section className={cx(styles["error-page-container"])}>

      <MenuBar />

      <div className={cx(styles["error-card"])}>

        {defaultDisplay && 
				<div className={cx(styles.wrapper)}>
				  <CirclesWithBar
				    color="red"
				    outerCircleColor="#007bff"
				    innerCircleColor="#007bff"
				    barColor="#007bff"
				    height="75"
				    width="75"
				  />
				  <p className="">...Email Verification In Progress...</p>
				</div> }

        {
          displaySuccess && 
					<div className={cx(styles.wrapper)}>
					  <Icon icon="fluent:mail-checkmark-20-regular" color="green" />

					  <p>{verificationResponse}</p>
					  <small>You will be automatically redirected to the login page shortly.<br /> You can also click the button below to go to the login page</small>
					  <Button onClick={() => navigate("/login")} title="Login" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
					</div> }

        { displayVerified &&  
							<div className={cx(styles.wrapper)}>
							  <Icon icon="codicon:verified-filled" color="#28a745" />
							  <p>{verificationResponse}</p>
							  <small>You will be automatically redirected to the login page shortly.<br /> You can also click the button below to go to the login page</small>
							  <Button onClick={() => navigate("/login")} title="Login" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
							</div>
        }
							
        { displayFailed && 
				<div className={cx(styles.wrapper)}>
				  <Icon icon="icon-park-outline:email-fail" color="#dc3545" />
				  <p>{verificationResponse}</p>
				  <Button onClick={() => navigate("/request-verification-link")} title="Request New Link" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
				</div>
							
        }

        { displayUserNotFound && 
				<div className={cx(styles.wrapper)}>
				  <Icon icon="bxs:user-x" color="#ffc107" />
				  <p>{verificationResponse}<br />Kindly create an account.</p>
				  <Button onClick={() => navigate("/signup")} title="Sign Up" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
				</div>
							
        }
			
      </div>
    </section>
  );
};

export default VerifyEmail;