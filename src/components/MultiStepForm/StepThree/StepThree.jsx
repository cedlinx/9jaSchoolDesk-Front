import React, {useEffect, useState, useCallback} from "react";
import cx from "classnames";
import styles from "./StepThree.module.scss";
import Button from "@/components/Button/Button";
import UploadComponent from "@/components/UploadComponent/UploadComponent";
import { useForm, Controller } from "react-hook-form";
import { stepThreeValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
// import imagePlaceholder from "@/assets/images/upload-image-placeholder.svg";

const StepThree = ({nextStep, handleFormData, values, prevStep}) => {

  const [imgData, setImgData] = useState({
    file: "",
    imagePreviewUrl: ""
  });
  
  const resolver = yupResolver(stepThreeValidationSchema);

  const defaultValues = {
    uploadedImage: imgData.file
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  const register = (data) => {
    // for (const item in data) {
    //   values[item] = data[item];
    // }
    values.uploadedImage = imgData.file;
    values.imagePreviewUrl = imgData.imagePreviewUrl;
    handleFormData(values);
    nextStep();
  }; 

  
 

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgData({file: file, imagePreviewUrl: reader.result});
    };
    reader.readAsDataURL(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <div className={cx(styles.stepThreeContainer, "flexCol")}>
      <form onSubmit={handleSubmit((data) => register(data))} 
        className={cx("flexCol")}
      >
        <div className={cx(styles.body)}>
        
          <div className={cx(styles.imageDiv)}>
            <Controller
              name="uploadedImage"
              control={control}
              render={({field }) => (
                <img {...field} {...getRootProps()} src={imgData?.imagePreviewUrl ? imgData?.imagePreviewUrl : ""} alt="" />
              )}
            />
          </div>
          <div className={cx(styles.nameDiv)}>
            {imgData?.file?.name}
          </div>

        </div>

        <div className={cx(styles.btnDiv, "flexRow-space-between")}>

          <Button onClick={prevStep} title="Back" borderRadiusType="lowRounded" bordercolor="#f4f4f4" textColor="#f4f4f4" bgColor="transparent" hoverColor="#1A3B4A" hoverBg="#f4f4f4"   />

          <Button onClick={handleSubmit((data) => register(data))} title="Continue" borderRadiusType="lowRounded" textColor="#1A3B4A" bgColor="#F4F4F499" bordercolor="transparent" hoverColor="#000"   />
        </div>
      </form>
    </div>
  );
};

export default StepThree;