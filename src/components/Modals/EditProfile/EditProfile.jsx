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
import editIcon from "@/assets/icons/edit-icon.svg";

import { modifyWardProfile } from "@/redux/Guardian/GuardianSlice";

import { useForm, Controller } from "react-hook-form";
import { modifyWardProfileValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import useGetUser from "@/utils/useGetUser";
import { initialsCase } from "@/helpers/textTransform";
import formatDate from "@/helpers/formatDate";
import parse from "html-react-parser";


const EditProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalData = useSelector((state) => state.modalState.modalData);
  const loading = useSelector((state) => state.student.loading);
  const allTasksData = useSelector((state) => state.guardian.getWardTasksData.task);
  const user = useGetUser();
  console.log(modalData);
  console.log(allTasksData);

  const sendRequest = async (data) => {
    console.log(data);

    let formData = new FormData();
    formData.append("id", modalData.id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("otherNames", data.otherNames);
    data?.email && formData.append("email", data.email);
    uploadedFile?.file && formData.append("photo", uploadedFile.file);

    let response = await dispatch(modifyWardProfile(formData));

    console.log(response);
    if(response.payload.success){
      dispatch(showModal({ action: "hide" }));
    }
  };

  const resolver = yupResolver(modifyWardProfileValidationSchema);

  const defaultValues = {
    email: modalData?.email,
    firstName: modalData?.firstName,
    lastName: modalData?.lastName,
    otherNames: modalData?.otherNames
  };

  const { handleSubmit, formState: { errors }, control } = useForm({ defaultValues, resolver, mode: "all" });

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

  const { getRootProps } = useDropzone({ onDrop, accept: "image/*" });

  const handleViewAll = () => {
    navigate("/guardian/submissions");
    dispatch(showModal({ action: "hide" }));
  };

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

            {user !== "student" ? modalData?.avatar || uploadedFile?.imagePreviewUrl ? <img {...getRootProps()} className={cx(styles.profilePic)} src={uploadedFile?.imagePreviewUrl ? uploadedFile?.imagePreviewUrl : modalData?.avatar} alt="profile pic" /> : <span {...getRootProps()} className={cx(styles.profilePic)} style={{ backgroundColor: "#D25B5D" }}>{modalData?.firstName && initialsCase(`${modalData.firstName} ${modalData.lastName}`)}</span>
              :

              modalData?.avatar ? <img className={cx(styles.profilePic)} src={modalData?.avatar} alt="profile pic" /> : <span className={cx(styles.profilePic)} style={{ backgroundColor: "#D25B5D" }}>{modalData?.firstName && initialsCase(`${modalData.firstName} ${modalData.lastName}`)}</span>}

		  {user !== "student" && <img {...getRootProps()}  className={cx(styles.editIcon)}  src={editIcon} alt="" />}
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
                  readOnly = {user === "student"}
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
                  readOnly = {user === "student"}

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
                  readOnly = {user === "student"}

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
                  readOnly = {user === "student"}

                />
              )}
            />

            {user !== "student" && <div className={cx(styles.btnDiv, "flexRow")}>
              <Button onClick={handleSubmit((data) => sendRequest(data))} loading={loading} disabled={loading} title="Save Changes" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
            </div>}
          </form>
        </div>

        {user !== "student" && <div className={cx(styles.submissionsDiv, "col-sm-12", "col-md-12", "col-lg-6")}>

          <div className={cx(styles.heading, "flexRow-space-between")}>
            <h3 className={cx(styles.title)}>Your Ward&apos;s Works</h3>
            <span onClick={() => handleViewAll()}>View All</span>
          </div>

          <div className={cx(styles.body, "flexCol")}>
            {Array.isArray(modalData?.submitted_tasks) && modalData.submitted_tasks.length > 0 ? modalData?.submitted_tasks.map((submission, index)=>{
              return(
                <div onClick={() => dispatch(showModal({action: "show", type: "submissionDetails", modalData: submission }))} className={cx(styles.submissionContainer, "flexCol")} key={index}>
                  <div className={cx(styles.fileDetails, "flexRow-space-between")}>
                    <span>{submission?.name}</span>
                    <small>{formatDate(submission?.pivot?.updated_at)}</small>
                  </div>
                  <div className={cx(styles.solutionDiv, styles.wrapper)}>
                    <label htmlFor="">Solution</label>
                    <p>{submission?.pivot?.solution && parse(submission?.pivot?.solution)}</p>
                  </div>
                  <div className={cx(styles.scoreDiv, styles.wrapper)}>
                    <label htmlFor="">Score</label>
                    <p>{submission?.pivot?.score}</p>
                  </div>
                  <div className={cx(styles.feedbackDiv, styles.wrapper)}>
                    <label htmlFor="">Feedback</label>
                    <p>{submission?.pivot?.feedback && parse(submission?.pivot?.feedback)}</p>
                  </div>
                  <div className={cx(styles.attachmentDiv, styles.wrapper)}>
                    <a target="_blank" href={submission?.pivot?.attachment} rel="noreferrer"> <Icon icon="teenyicons:attachment-solid" color="#22467b" /> Download Solution</a>
                  </div>
                </div>
              );
            }) : <p>There is currently no submitted task</p> }
          </div>
        </div>}
      </div>
    </section>
  );
};

export default EditProfile;