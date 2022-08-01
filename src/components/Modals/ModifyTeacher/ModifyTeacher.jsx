import React, {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ModifyTeacher.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { modifyTeacher } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { modifyTeacherValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const ModifyTeacher = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);
  const modalData = useSelector((state) => state.modalState.modalData);
  const sendRequest = async (data) => {
    let response = await dispatch(modifyTeacher(data));
    if(response.payload.success) {
      dispatch(showModal({ action: "hide", type: "modifyTeacher" }));
    }
  };

  const resolver = yupResolver(modifyTeacherValidationSchema);

  const defaultValues = {
    name: modalData?.name
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  return (

    <section className={cx(styles.modifyTeacherContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "modifyTeacher" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Edit Teacher</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label={"TEACHER NAME"}
                placeholder=""
                error={errors?.name && errors?.name?.message}
              />
            )}
          />

          {/* <Controller
            name="class_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={"SELECT CLASS"}
                defaultSelect="Select Class"
                error={errors?.class_id && errors?.class_id?.message}
                options={[{label: "", value: ""}]}
              />
            )}
          />     */}

          <div  className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default ModifyTeacher;