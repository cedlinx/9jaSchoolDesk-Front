import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AssignBulkWardsToParent.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";

import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { assignGuardianToBulkStudents, getAllGuardians, getGuardianStatus } from "@/redux/Proprietor/ProprietorSlice";

import { useForm, Controller } from "react-hook-form";
import { assignBulkWardsToParentValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetAllStudents from "@/utils/useGetAllStudents";
import SelectAutoComplete from "@/components/SelectAutoComplete";


const AssignBulkWardsToParent = () => {

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalState.modalData);
  const allStudentsData = useGetAllStudents();
  

  const sendRequest = async (data) => {
    let studentArray = [];
    Array.isArray(data.student_ids) && data.student_ids.map((student, index) => {
      studentArray.push(student.value);
    });

    const {student_ids, ...rest} = data;
        
    let response = await dispatch(assignGuardianToBulkStudents({...rest, student_ids: studentArray, guardian_id: modalData.id}));
    
    // if (response.payload.success) {
    //   dispatch(showModal({ action: "hide", type: "assignBulkWardsToParent" }));
    //   dispatch(getAllGuardians());
    //   dispatch(getGuardianStatus());
    // }
  };

  const resolver = yupResolver(assignBulkWardsToParentValidationSchema);

  const defaultValues = {
    email: modalData.email,
    student_ids: ""
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const getWardsOptions = (data) => {
    
    let options = [];
    Array.isArray(data) && data.map((studentData) => {
      options.push({
        value: studentData.id,
        label: studentData.name
      });
    });
    return options;
  };


  return (

    <section className={cx(styles.assignBulkWardsToParentContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "assignBulkWardsToParent" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Add New Ward(s)</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >


          <Controller
            name="email"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"GUARDIAN EMAIL"}
                placeholder="Email"
                readOnly={true}
                error={errors?.email && errors?.email?.message}
              />
            )}
          />

          <label className={cx(styles.outsideLabel)}>SELECT WARD(S)</label>
          <Controller
            name="student_ids"
            control={control}
            render={({ field, ref }) => (
              <SelectAutoComplete
                {...field}
                // label={"Select Student"}
                isMulti={true}
                isClearable={true}
                isCreatable={false}
                marginbottom="1.5rem"
                placeholder=""
                options={getWardsOptions(allStudentsData)}
                error={errors?.student_ids && errors?.student_ids?.message}
              />
            )}
          />


          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button title="Attach" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

AssignBulkWardsToParent.propTypes = {
  title: PropTypes.string
};

export default AssignBulkWardsToParent;