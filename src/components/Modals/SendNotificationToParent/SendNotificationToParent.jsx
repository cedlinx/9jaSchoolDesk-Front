import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./SendNotificationToParent.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import TextInput from "@/components/TextInput/TextInput";
import InputField from "@/components/Input/Input";

// import { sendNotification } from "@/redux/Teacher/TeacherSlice";

import { useForm, Controller } from "react-hook-form";
import { sendNotificationToParentValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const SendNotificationToParent = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  console.log(modalData);

  const sendRequest = async (data) => {
    console.log(data);
    let group = data.user.includes("guardian") ? "guardian" :  data.user.includes("teacher") ? "teacher" : "all";
    // let response = await dispatch(sendNotification({group: group, message: data.message, recipients: convertStringToArray(data.recipients)}));
    // if(response.payload.success){
    //   dispatch(showModal({ action: "hide", type: "sendNotificationToParent" }));
    // }
  };

  const resolver = yupResolver(sendNotificationToParentValidationSchema);

  const defaultValues = {
    message: "",
    user: "",
    recipients: modalData.email
  };

  const { handleSubmit, register, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.sendNotificationToParentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "sendNotificationToParent" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Urgent Info</p>
          <small>*This sends an instant notification to the parent of the ward</small>
        </div>
        
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >

          <Controller
            name="recipients"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label="Guardians Email"
                placeholder="Enter recipient(s) email separated by commas"
                error={errors?.recipients && errors?.recipients?.message}
              />
            )}
          />
            
          <Controller
            name="message"
            control={control}
            render={({ field, ref }) => (
              <TextInput
                {...field}
                placeholder="Enter message"
                error={errors?.message && errors?.message?.message}
              />
            )}
          />
               
          <div  className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} title="Send" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#D25B5D" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

export default SendNotificationToParent;