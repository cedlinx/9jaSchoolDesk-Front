import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./UrgentInfo.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import TextInput from "@/components/TextInput/TextInput";

import { sendNotification } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { urgentInfoValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const UrgentInfo = () => {

  const dispatch = useDispatch();

  const sendRequest = async (data) => {
    console.log(data);
    let group = data.user.includes("guardian") ? "guardian" :  data.user.includes("teacher") ? "teacher" : "all";
    let response = await dispatch(sendNotification({group: group, message: data.message, recipients: convertStringToArray(data.recipients)}));
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "urgentInfo" }));
    }
  };

  const convertStringToArray =(data)=>{
    let arr = [];
    let strArr = data.split(",");
    strArr.forEach(element => {
      arr.push(element.trim());
    }
    );
    return arr;
  };

  const resolver = yupResolver(urgentInfoValidationSchema);

  const defaultValues = {
    message: "",
    user: "",
    recipients: ""
  };

  const { handleSubmit, register, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.urgentInfoContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "urgentInfo" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header, "flexCol")}>
          <p>Urgent Info</p>
          <small>*This sends an instant notification to the selected types of users</small>
        </div>
        
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >
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

          <small>Will be received by</small>

          <div>
            {/* <div className={cx("flexRow", styles.recipientsWrapper)}>
              <div className={cx(styles.radioWrapper)}>
                <input type="radio" name="group" id="group" />
                <label htmlFor="group">Group</label>
              </div>
           
            </div> */}

            {/* <div className={cx("flexRow",  styles.recipientsWrapper)}>
              <div className={cx(styles.radioWrapper)}>
                <input type="radio" name="group" id="individuals" />
                <label htmlFor="individuals">Individuals</label>
              </div>
              <div className={cx(styles.recipientsDiv)}>
                recipients here
              </div>
            </div> */}

            <div className={cx(styles.checkboxDiv)}>
              <input type="radio" value="guardian" {...register("user")} /> <label htmlFor="user">Parents</label>
              <input type="radio" value="teacher" {...register("user")} /> <label htmlFor="user">Teachers</label>
              <input type="checkbox" value="recipients" {...register("user")} /> <label htmlFor="user">Recipients</label>
            </div>
            {errors?.user && <span style={{color: "red", fontSize: "0.875rem"}}>{errors?.user?.message}</span>}

            <Controller
              name="recipients"
              control={control}
              render={({ field, ref }) => (
                <TextInput
                  {...field}
                  label="Recipients Email"
                  placeholder="Enter recipient(s) email separated by commas"
                  error={errors?.recipients && errors?.recipients?.message}
                />
              )}
            />
          
           
          </div>
               
          <div  className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} title="Send" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#D25B5D" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

export default UrgentInfo;