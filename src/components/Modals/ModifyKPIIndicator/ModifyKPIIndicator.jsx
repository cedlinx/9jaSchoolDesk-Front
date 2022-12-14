import React, {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ModifyKPIIndicator.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import { modifyKPI, getAllKPIs } from "@/redux/Proprietor/ProprietorSlice";
import { modifyKPI as modifyTeacherKPI, viewKPIForClass } from "@/redux/Teacher/TeacherSlice";

import { useForm, Controller } from "react-hook-form";
import { modifyKPIIndicatorValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import useGetUser from "@/utils/useGetUser";
import useGetClassID from "@/utils/useGetClassID";


const ModifyKPIIndicator = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);
  const modalData = useSelector((state) => state.modalState.modalData);
  const user = useGetUser();
  const classID = useGetClassID();

  const sendRequest = async (data) => {
    let formData = new FormData();
    uploadedFile.file && formData.append("photo", uploadedFile.file);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("type", data.type);
    formData.append("min_score", data.min_score);
    formData.append("max_score", data.max_score);
    formData.append("weight", data.weight);
    formData.append("id", modalData.id);

    let response = user === "proprietor" ? await dispatch(modifyKPI(formData)) : await dispatch(modifyTeacherKPI(formData));
    if(response.payload.success){
      dispatch(showModal({ action: "hide", type: "modifyKPIIndicator" }));
      user === "proprietor" ? dispatch(getAllKPIs()) : dispatch(viewKPIForClass(classID));
    }
  };

  const resolver = yupResolver(modifyKPIIndicatorValidationSchema);

  const defaultValues = {
    name: modalData.name,
    category: modalData.category,
    type: modalData.type,
    weight: modalData.weight,
    min_score: modalData.min_score,
    max_score: modalData.max_score,
    uploadedFile: modalData.avatar
  };

  const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });

  const [uploadedFile, setUploadedFile] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile({file: file, imagePreviewUrl: reader.result});
      setValue("uploadedFile", file);
    };
    reader.readAsDataURL(file);
  }, [setValue]);

  const { getInputProps, getRootProps } = useDropzone({ onDrop, accept: "image/*" });

  return (

    <section className={cx(styles.modifyKPIIndicatorContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "modifyKPIIndicator" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
	  <div className={cx(styles.header)}>
          <p>Modify KPI Indicator</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
        >

          <Controller
            name="name"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"INDICATOR NAME"}
                placeholder="Name"
                error={errors?.name && errors?.name?.message}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field, ref }) => (
              <Select
                {...field}
                label={"CATEGORY"}
                defaultSelect="Select"
                options={[
                  { value: "Non-academic", label: "Non-academic" },
                  { value: "Academic", label: "Academic" }
                ]}
                error={errors?.category && errors?.category?.message}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field, ref }) => (
              <Select
                {...field}
                label={"TYPE"}
                defaultSelect="Select"
                options={[
                  { value: "Positive", label: "Positive" },
                  { value: "Negative", label: "Negative" }
                ]}
                error={errors?.type && errors?.type?.message}
              />
            )}
          />

          <Controller
            name="weight"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"WEIGHT"}
                placeholder="Weight"
                error={errors?.weight && errors?.weight?.message}
              />
            )}
          />

          <Controller
            name="min_score"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"MINIMUM SCORE"}
                placeholder="Minimum Score"
                error={errors?.min_score && errors?.min_score?.message}
              />
            )}
          />

          <Controller
            name="max_score"
            control={control}
            render={({ field, ref }) => (
              <InputField
                {...field}
                label={"MAXIMUM SCORE"}
                placeholder="Maximum Score"
                error={errors?.max_score && errors?.max_score?.message}
              />
            )}
          />

          <Controller 
            name="uploadedFile"
            control={control}
            render={({ field, ref }) => (
              <>
                <div className={cx(styles.imageSection, "flexRow")}>
                  <p>Upload Image</p>
                  <div {...getRootProps()}   {...field} className={cx(styles.imageDiv)}>
                    {uploadedFile?.imagePreviewUrl ? <img src={uploadedFile?.imagePreviewUrl && uploadedFile?.imagePreviewUrl} alt=""/>
                      :
                      modalData?.avatar ? <img src={modalData?.avatar && modalData?.avatar} alt=""/> :  <Icon  icon="bx:upload" color="#d25b5d" width="28" height="28"/>  }        
                    
                  </div>
                </div>
                <span style={{color: "tomato", fontSize: "0.75rem"}} >{errors?.uploadedFile && errors?.uploadedFile?.message}</span>
              </>
            )}
          />
          
          <small style={{color: "#D25B5D"}}>*Only upload png, jpg, jpeg files</small>
  
    
          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} title="Save" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>

        </form>
      </div>

    </section>
  );
};

export default ModifyKPIIndicator;