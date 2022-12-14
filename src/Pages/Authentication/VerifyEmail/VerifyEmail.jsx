import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./VerifyEmail.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {verifyEmail} from "@/redux/Auth/AuthSlice";

import siteLogo from "@/assets/images/logo.png";
import { urlParameters } from "@/helpers/urlParameters";
import useGetUser from "@/utils/useGetUser";


const VerifyEmail = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationResponse, setVerificationResponse] = useState("");
  const token = params.token;
  const expires = urlParameters("expires");
  const signature = urlParameters("signature");
  const user = useGetUser();

  const id = location.pathname.split("/")[5];

  const verifyEmailData = useSelector((state) => state.auth.verifyEmailData);

  useEffect(() => {
    dispatch(verifyEmail({token, expires, signature, user, id}));
  }, [dispatch, token, expires, signature, user, id]);

  return (
    <AuthPageContainer>
      <section className={cx(styles.verifyEmailContainer, "flexCol")}>

        <div>
          <img src={siteLogo} alt="" />
        </div>

        <h3>Email Verification</h3>

        <div className={cx(styles.formWrapper, "flexCol")}>
    ...verifying...
        </div>

      </section>
    </AuthPageContainer>
  );
};

export default VerifyEmail;