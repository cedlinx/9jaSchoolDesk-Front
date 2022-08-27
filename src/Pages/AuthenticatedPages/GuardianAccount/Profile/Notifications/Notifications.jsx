import React, {useEffect} from "react";
import cx from "classnames";
import styles from "./Notifications.module.scss";

import { useDispatch, useSelector } from "react-redux";
import InputField from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
// import { saveNotifications } from "@/redux/Guardian/GuardianSlice";

import { useForm, Controller } from "react-hook-form";
import { saveNotificationsValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";

const Notifications = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.teacher?.loading);
  const userDetails = useGetLoggedInUser();
  console.log(userDetails);

  const resolver = yupResolver(saveNotificationsValidationSchema);

  const defaultValues = {
    // email: userDetails?.email,
    // phone: userDetails?.phone ,
    // whatsApp: userDetails?.whatsApp 
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  useEffect(() => {
    reset({
      email: userDetails?.email,
      phone: userDetails?.phone ,
      whatsApp: userDetails?.whatsApp
    });
  }, [dispatch, reset, userDetails?.email, userDetails?.phone, userDetails?.whatsApp]);


  const saveNotification = (data) => {
    console.log(data);
    console.log("saved");
    // dispatch(saveNotifications(data));
  };
    
  return (
    <div className={cx(styles.notificationsContainer)}>
      <div className={cx(styles.panelContent, styles.innerWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <h3>Notification</h3>
          <small>How do you want to be communicated</small>
        </div>
        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => saveNotification(data))}
            className={cx(styles.notificationFormContainer, "flexCol")}
          >    
            <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
              <div className={cx(styles.leftSection, "flexRow-align-center")}>
                <div><Icon icon="logos:google-gmail" color="#1d1e24" width="28" height="28" /></div>
                <span>Email</span>
              </div>
              <div className={cx(styles.rightSection, "flexRow-align-center")}>
                
                <Controller
                  name="email"
                  control={control}
                  render={({ field, ref }) => (
                    <InputField
                      {...field} 
                      placeholder={"johndoe@gmail.com"}
                      type="text"
                      error={errors?.email && errors?.email?.message}
                      border="none"
                      borderradius="0rem"
                      marginbottom="0.5rem"
                    />
                  )}
                />
              </div>
                   
            </div>

            <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
              <div className={cx(styles.leftSection, "flexRow-align-center")}>
                <div><Icon icon="bx:phone-call" color="#1d1e24" width="28" height="28" /></div>
                <span>Phone</span>
              </div>
              <div className={cx(styles.rightSection, "flexRow-align-center")}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, ref }) => (
                    <InputField
                      {...field} 
                      placeholder={"+2348000000000"}
                      type="number"
                      error={errors?.phone && errors?.phone?.message}
                      border="none"
                      borderradius="0rem"
                      marginbottom="0.5rem"
                    />
                  )}
                />
                <small>Setup</small>

              </div>
                   
            </div>
                    
            <div className={cx(styles.inputWrapper, "flexRow-align-center")}>
              <div className={cx(styles.leftSection, "flexRow-align-center")}>
                <div><Icon icon="logos:whatsapp-icon" color="#1d1e24" width="28" height="28" /></div>
                <span>WhatsApp</span>
              </div>
              <div className={cx(styles.rightSection, "flexRow-align-center")}>
                <Controller
                  name="whatsApp"
                  control={control}
                  render={({ field, ref }) => (
                    <InputField
                      {...field} 
                      placeholder={"@--------"}
                      type="text"
                      error={errors?.whatsApp && errors?.whatsApp?.message}
                      border="none"
                      borderradius="0rem"
                      marginbottom="0.5rem"
                      rightPlaceholder={true}
                    />
                  )}
                />
                <small>Setup</small>

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