import React, {useState, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./EditProfile.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import { useDropzone } from "react-dropzone";
import submissionImage from "@/assets/images/submissions.png";
import editIcon from "@/assets/icons/edit-icon.svg";

import { modifyStudentProfile } from "@/redux/Student/StudentSlice";

import { useForm, Controller } from "react-hook-form";
import { modifyWardProfileValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetUser from "@/utils/useGetUser";
import { initialsCase } from "@/helpers/textTransform";



const EditProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalData = useSelector((state) => state.modalState.modalData);
  const loading = useSelector((state) => state.student.loading);
  const allTasksData = useSelector((state) => state.guardian.getWardTasksData);
  const user = useGetUser();
  console.log(modalData);

  const sendRequest = async (data) => {
    console.log(data);

    let formData = new FormData();
    formData.append("id", modalData.id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("otherNames", data.otherNames);
    data?.email && formData.append("email", data.email);
    uploadedFile?.file && formData.append("photo", uploadedFile.file);

    let response = await dispatch(modifyStudentProfile(formData));

    console.log(response);
    // if(response.payload.success){
    // dispatch(showModal({ action: "hide" }));
    // }

  };

  const resolver = yupResolver(modifyWardProfileValidationSchema);

  const defaultValues = {
    email: modalData?.email,
    firstName: modalData?.firstName,
    lastName: modalData?.lastName,
    otherNames: modalData?.otherNames
  };

  const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const [uploadedFile, setUploadedFile] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile({file: file, imagePreviewUrl: reader.result});
    };
    reader.readAsDataURL(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop, accept: "image/*" });

  const submissionsArray = [
    {
      name: "Submission One",
      date: "22/5/2022",
      thumbnailUrl: submissionImage
    },
    {
      name: "Submission Two",
      date: "22/5/2022",
      thumbnailUrl: submissionImage
    }
  ];

  return (

    <section className={cx(styles.editProfileContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <p>Edit Profile</p>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "editProfile" }))} icon="carbon:close-filled" color="white" />
        {/* <img src={closeIcon} alt="" /> */}
      </div>

      <div className={cx(styles.wrapper, "row", "g-0")}>

        <div className={cx(styles.formWrapper, "col-sm-12", "col-md-12", user === "student" ?"col-lg-12" : "col-lg-6", "flexCol")}>
	  <div className={cx(styles.header)}>
            <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />

            {modalData?.avatar || uploadedFile?.imagePreviewUrl ? <img {...getRootProps()} className={cx(styles.profilePic)} src={uploadedFile?.imagePreviewUrl ? uploadedFile?.imagePreviewUrl : modalData?.avatar} alt="profile pic" /> : <span {...getRootProps()} className={cx(styles.profilePic)} style={{ backgroundColor: "#D25B5D" }}>{modalData?.firstName && initialsCase(`${modalData.firstName} ${modalData.lastName}`)}</span>}

		  <img {...getRootProps()}  className={cx(styles.editIcon)}  src={editIcon} alt="" />
          </div>
          <form
            onSubmit={handleSubmit((data) => sendRequest(data))}
            className=""
          >

            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label={"First Name"}
                  placeholder=""
                  type="firstName"
                  error={errors?.firstName && errors?.firstName?.message}
                  // innerref={ref}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Last Name"}
                  placeholder=""
                  type="lastName"
                  error={errors?.lastName && errors?.lastName?.message}

                />
              )}
            />

            <Controller
              name="otherNames"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Ohter Names"}
                  placeholder=""
                  type="otherNames"
                  error={errors?.otherNames && errors?.otherNames?.message}

                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, ref }) => (
                <InputField
                  {...field}
                  label={"Email"}
                  placeholder="ward@email.com"
                  type="email"
                  error={errors?.email && errors?.email?.message}

                />
              )}
            />

            <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
              <Button loading={loading} disabled={loading} title="Save Changes" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
            </div>
          </form>
        </div>

        {user !== "student" && <div className={cx(styles.submissionsDiv, "col-sm-12", "col-md-12", "col-lg-6")}>

          <div className={cx(styles.heading, "flexRow-space-between")}>
            <h3 className={cx(styles.title)}>Your Ward's Works</h3>
            <span onClick={() => navigate("/guardian/submissions")}>View All</span>
          </div>

          <div className={cx(styles.body, "flexCol")}>
            {Array.isArray(submissionsArray) && submissionsArray.map((submission, index)=>{
              return(
                <div onClick={() => dispatch(showModal({action: "show", type: "submissionDetails", modalData: submission }))} className={cx(styles.submissionContainer)} key={index}>
                  <div className={cx(styles.fileDetails, "flexRow-space-between")}>
                    <span>{submission?.name}</span><span>{submission?.date}</span>
                  </div>
                  <div className={cx(styles.imageDiv)}>
                    <img src={submission?.thumbnailUrl} alt="image" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>}
      </div>



    </section>
  );
};

export default EditProfile;