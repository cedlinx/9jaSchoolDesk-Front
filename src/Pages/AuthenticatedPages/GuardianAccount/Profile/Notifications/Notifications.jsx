import React, {useEffect} from "react";
import cx from "classnames";
import styles from "./Notifications.module.scss";

import { useDispatch, useSelector } from "react-redux";
import InputField from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
import { preferredChannel } from "@/redux/Guardian/GuardianSlice";

import { useForm, Controller } from "react-hook-form";
import { saveNotificationsValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";

const Notifications = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.teacher?.loading);
  const userDetails = useGetLoggedInUser();

  const resolver = yupResolver(saveNotificationsValidationSchema);

  const defaultValues = {
    Email: userDetails?.notification?.email,
    Call: userDetails?.notification?.call ,
    Whatsapp: userDetails?.notification?.whatsApp,
    Sms: userDetails?.notification?.sms 
  };

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  useEffect(() => {
    reset({
      Email: userDetails?.notification?.email,
      Call: userDetails?.notification?.call ,
      Whatsapp: userDetails?.notification?.whatsApp,
      Sms: userDetails?.notification?.sms 
    });
  }, [dispatch, reset, userDetails.email, userDetails?.notification?.email, userDetails?.notification?.call, userDetails?.notification?.sms, userDetails?.notification?.whatsApp, userDetails.call, userDetails.sms, userDetails.whatsApp]);


  const saveNotification = async (data) => {
    
    // let answer = "";
    // data?.Sms ? answer = "Sms" : data?.Whatsapp ? answer = "Whatsapp"  : data?.Call ? answer = "Call" : "Email" ;

    // let answer = [];
    // data?.Sms && answer.push("Sms");
    // data?.Whatsapp && answer.push("Whatsapp");
    // data?.Call && answer.push("Call");
    // data?.Email && answer.push("Email");

    let response = await dispatch(preferredChannel({channel: data.channel}));
    
  };

  
    
  return (
    <div className={cx(styles.notificationsContainer)}>
      <div className={cx(styles.panelContent, styles.innerWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <h3>Notification</h3>
          <small>Select your preferred channel of communication</small>
        </div>
        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => saveNotification(data))}
            className={cx(styles.notificationFormContainer, "flexCol")}
          >   

            <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
              <div className={cx(styles.leftSection, "flexRow-align-center")}>
                <div><Icon icon="fa-solid:sms" color="#1d1e24" width="28" height="28"/></div>
                <span>SMS</span>
              </div>

              <div className={cx(styles.rightSection, "flexRow-align-center")}>
                {/* <InputField
                  placeholder={"08000000000"}
                  type="text"
                  border="none"
                  borderradius="0rem"
                  marginbottom="0.5rem"
                /> */}
                <input
                  type="radio"
                  name="channel"
                  value="Sms"
                  {...register("channel")}
                />
              </div>
                   
            </div>

            <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
              <div className={cx(styles.leftSection, "flexRow-align-center")}>
                <div><Icon icon="logos:google-gmail" color="#1d1e24" width="28" height="28" /></div>
                <span>Email</span>
              </div>

              <div className={cx(styles.rightSection, "flexRow-align-center")}>
                {/* <InputField
                  placeholder={"johndoe@gmail.com"}
                  type="text"
                  error={errors?.Email && errors?.Email?.message}
                  border="none"
                  borderradius="0rem"
                  marginbottom="0.5rem"
                /> */}
                <input
                  type="radio"
                  name="channel"
                  value="Email"
                  {...register("channel")}
                />
   
              </div>
                   
            </div>

            <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
              <div className={cx(styles.leftSection, "flexRow-align-center")}>
                <div><Icon icon="bx:phone-call" color="#1d1e24" width="28" height="28" /></div>
                <span>Call</span>
              </div>

              <div className={cx(styles.rightSection, "flexRow-align-center")}>

                {/* <InputField
                  placeholder={"+2348000000000"}
                  type="number"
                  error={errors?.Call && errors?.Call?.message}
                  border="none"
                  borderradius="0rem"
                  marginbottom="0.5rem"
                /> */}

                <input
                  type="radio"
                  name="channel"
                  value="Call"
                  {...register("channel")}
                />
       
              </div>
                   
            </div>
                    
            <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
              <div className={cx(styles.leftSection, "flexRow-align-center")}>
                <div><Icon icon="logos:whatsapp-icon" color="#1d1e24" width="28" height="28" /></div>
                <span>WhatsApp</span>
              </div>

              <div className={cx(styles.rightSection, "flexRow-align-center")}>
                {/* <InputField
                  placeholder={"+2348000000000"}
                  type="text"
                  error={errors?.Whatsapp && errors?.Whatsapp?.message}
                  border="none"
                  borderradius="0rem"
                  marginbottom="0.5rem"
                  rightPlaceholder={true}
                /> */}

                <input
                  type="radio"
                  name="channel"
                  value="Whatsapp"
                  {...register("channel")}
                />

              </div>
                   
            </div>

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => saveNotification(data))} type title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" />
            </div>
              
          </form>
        </div>
      </div>
    </div>
  );
};

export default Notifications;