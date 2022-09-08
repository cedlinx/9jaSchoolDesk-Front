import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AddInstitution.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";

import { addInstitution, getAllInstitutions } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { addInstitutionValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./PhoneInput.scss";

const AddInstitution = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);

  const resolver = yupResolver(addInstitutionValidationSchema);

  const defaultValues = {
    email: "",
    name: "",
    address: "",
    type: "",
    phone: "",
    website: ""
  };

  const { handleSubmit, formState: { errors }, control } = useForm({ defaultValues, resolver, mode: "all" });

  const sendRequest = async (data) => {
    let response = await dispatch(addInstitution(data));
    
    if (response?.payload?.message.includes("successfully")) {
      dispatch(getAllInstitutions());
      dispatch(showModal({ action: "hide" }));
    }
  };

  let institutionsCategory = [
    {
      value: "school",
      label: "School"
    }, 
    {
      value: "church",
      label: "Church"
    },
    {
      value: "mosque",
      label: "Mosque"
    }
  ];
  const getInstitutionType =(data)=>{
    let result =  data.map((item) => {
      return {value: item.value, label: item.label};
    });
    return result;
  };

  return (

    <section className={cx(styles.addInstitutionContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addInstitution" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Add New Institution</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <div className={cx(styles.inputsWrapper, "flexRow")}>

            <div className={cx(styles.emailWrapper)} style={{ width: "100%" }}>
              <Controller
                name="name"
                control={control}
                render={({ field, ref }) => (
                  <InputField
                    {...field}
                    label={"NAME"}
                    placeholder="Name"
                    error={errors?.name && errors?.name?.message}
                  />
                )}
              />
            </div>

            <div className={cx(styles.emailWrapper)} style={{ width: "100%" }}>
              <Controller
                name="address"
                control={control}
                render={({ field, ref }) => (
                  <InputField
                    {...field}
                    label={"ADDRESS"}
                    placeholder="Address"
                    error={errors?.address && errors?.address?.message}
                  />
                )}
              />
            </div>

            <Controller
              name="type"
              control={control}
              render={({ field, ref }) => (
                <Select 
                  {...field}
                  options={getInstitutionType(institutionsCategory)} 
                  label={"Institution Type"}
                  error={errors?.type && errors?.type?.message}
                  marginbottom="1.625rem"
                />
              )}
            />        

            <Controller
              name="email"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Institution Email"}
                  type="text"
                  error={errors?.email && errors?.email?.message}

                />
              )}
            />

            <Controller
              name="website"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field} 
                  placeholder={" "}
                  label={"Website"}
                  type="text"
                  error={errors?.website && errors?.website?.message}

                />
              )}
            />

            <div className={cx(styles.inputWrapper, "PhoneInputWrapper")}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Controller
                name="phone"
                control={control}
                render={({ field, ref }) => (
                  <PhoneInput
                    placeholder="Enter phone number"
                    {...field}
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="NG"
                  />
                )}
              />
              {errors?.phoneNumber && <small>{errors?.phoneNumber?.message}</small> }
            </div>

          </div>

          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Add Institution" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>



        </form>
      </div>

    </section>
  );
};

export default AddInstitution;