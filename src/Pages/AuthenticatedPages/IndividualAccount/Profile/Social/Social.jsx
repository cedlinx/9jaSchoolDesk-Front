import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./Social.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import {getUserSocial, getUserInfo, addSocialAccount, modifySocialAccount, deleteSocialAccount, linkSocialAccount, unlinkSocialAccount} from "@/redux/User/user.action";

import { useForm, Controller } from "react-hook-form";
import { modifyUserValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import FormSkeleton from "@/components/SkeletonLoader/FormSkeleton";


const Social=()=>{

  const dispatch = useDispatch();
  const loading = useSelector((state)=>state?.user?.loading);
  const userSocialData = useSelector((state)=>state?.user?.getUserSocialData?.data);
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const userDetails = useSelector((state)=>state?.user?.getUserInfoData?.data);
  const [modifiedDetails, setModifiedDetails] = useState({});
  const [disabledFields, setDisabledFields] = useState(true);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(()=>{
    dispatch(getUserSocial());
    dispatch(getUserInfo());
  },[]);

  const resolver = yupResolver(modifyUserValidationSchema);
  const defaultValues = {
    // firstName: userDetails?.data?.name,
    // secondName: userDetails?.data?.name,
    // lastName: userDetails?.data?.name,
    // stateOfResidence: "",
    // city: "",
    // nearestBusStop: ""
    name: userDetails && userDetails?.data?.name,
    email: userDetails && userDetails?.data?.email,
    phone: userDetails && userDetails?.data?.phone,
    address: userDetails && userDetails?.data?.address
  };

  const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  const enableInputEdit = (e)=>{
    e.preventDefault();
    setDisabledFields(false);
    setShowSaveBtn(true);
  };

  console.log(userSocialData);
  return(
    <div className={cx(styles.container)}>
      <section className={cx(styles.socialWrapper)}>

        <form>
          <div className={cx(styles.header, "flexRow")}>
            <h3>Link Social Media Account</h3>
            <div className={cx(styles.btnDiv)}>
              <Button title="Save Changes" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" />
            </div>
          </div>

          <div className={cx(styles.body, "row")}>
            <div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Facebook" /></div>
            <div className="col-md-4 col-xs-12"><InputField type="text" placeholder="LinkedIn" /></div>
            <div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Tiktok" /></div>
            <div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Instagram" /></div>
            <div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Twitter" /></div>
            <div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Youtube" /></div>
          </div>
        </form>
			


      </section>
    </div>
  );
};

export default Social;