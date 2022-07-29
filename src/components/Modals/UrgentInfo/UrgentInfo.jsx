import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./UrgentInfo.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import TextInput from "@/components/TextInput/TextInput";

// import { urgentInfo } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { urgentInfoValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const UrgentInfo = () => {

  const dispatch = useDispatch();

  const sendRequest = async (data) => {
    console.log(data);
    // let response = dispatch(urgentInfo(data));
    // if(response.payload.success){
    //   dispatch(showModal({ action: "hide", type: "urgentInfo" }));
    // }
  };

  const resolver = yupResolver(urgentInfoValidationSchema);

  const defaultValues = {
    message: "",
    user: ""
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
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Enter message"
                error={errors?.message && errors?.message?.message}
              />
            )}
          />

          <small>Will be received by</small>

          <div>
            <div className={cx(styles.checkboxDiv)}>
              <input type="checkbox" value="guardians" {...register("user")} /> <label htmlFor="user">Parents</label>
              <input type="checkbox" value="students" {...register("user")} /> <label htmlFor="user">Students</label>
              <input type="checkbox" value="teachers" {...register("user")} /> <label htmlFor="user">Teachers</label>
            </div>
            {errors?.user && <span style={{color: "red", fontSize: "0.875rem"}}>{errors?.user?.message}</span>}
          </div>
               
          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Send" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#D25B5D" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

export default UrgentInfo;