import React, {useState, useCallback} from "react";
import cx from "classnames";
import {useDispatch, useSelector} from "react-redux";
import styles from "./SubmitTask.module.scss";
import { useLocation } from "react-router-dom";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import SubmitAssessmentModal from "@/components/Modals/SubmitAssessment/SubmitAssessment";
import { Icon } from "@iconify/react";
import QuillEditor from "@/components/QuillEditor/QuillEditor";
import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";
import { submitTaskValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import parse from "html-react-parser";
import { titleCase } from "@/helpers/textTransform";

// import TextInput from "@/components/TextInput/TextInput";
// import TextArea from "@/components/TextArea";


const SubmitTask = () => {

  const location = useLocation();
  const { data : taskData  } = location.state;
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);

  const sendRequest = (data) => {
    dispatch(showModal({ action: "show", type: "submitAssessment", modalData: {data: data, taskData: taskData, attachment: uploadedFile?.file}}));
  };

  const resolver = yupResolver(submitTaskValidationSchema);

  const defaultValues = {
    solution: ""
  };

  const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });

  const getQuillContent = (data) => {
    setValue("solution", data);
  };

  const [uploadedFile, setUploadedFile] = useState({
    file: "",
    imagePreviewUrl: "", 
    type: ""
  });
  
  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile({file: file, imagePreviewUrl: reader.result, type: file.type.split("/")[0]});
      setValue("uploadedFile", file);
    };
    reader.readAsDataURL(file);
  }, [setValue]);
  
  const { getRootProps } = useDropzone({ onDrop});



  return (
    <div className={cx(styles.submitTaskWrapper, "flexCol")}>
      <div className={cx(styles.header)}>
        <h5>Submit Task</h5>
      </div>

      <div className={cx(styles.body, "row", "g-0")}>
        <div className={cx(styles.leftSection, "flexCol", "col-sm-12", "col-md-5")}>
          <div className={cx(styles.metaDataDiv, "flexCol")}>
            <h6><span>Title: </span>{taskData?.name && titleCase(taskData?.name)}</h6>
            <p><span>Type: </span>{taskData?.type && titleCase(taskData?.type)}</p>
          </div>
          <div className={cx(styles.questionsDiv)}>
            <h5>Questions</h5>
            {taskData?.attachment && <div className={cx(styles.mediaDiv)}>
              {taskData?.format === "video" ?
                <video src={taskData?.attachment} id="myVideo" width="100%" height="240px" controls /> 
                :
                taskData?.format === "image" ?
                  <img src={taskData?.attachment} alt="img" />
                  :
                  <a href={taskData?.attachment} target="_blank" rel="noreferrer"><Icon icon="teenyicons:attachment-solid" color="#eb5757" /> {taskData?.attachment.split("/")[taskData?.attachment.split("/").length - 1]}</a>
              }
            </div>}
          </div>
        </div>
        <div className={cx(styles.rightSection, "col-sm-12", "col-md-7", "flexCol")}>
          <h5>Answers</h5>

          <div className={cx(styles.formWrapper, "flexCol")}>

            <form
              onSubmit={handleSubmit((data) => sendRequest(data))}
              className={cx("flexCol")}
            >
              <div className={cx(styles.quillEditorDiv)}>
                <Controller
                  name="solution"
                  control={control}
                  render={({ field, ref }) => (
                    <QuillEditor
                      {...field}
                      placeholder="Type your answer here"
                      getQuillContent={getQuillContent}
                      className={cx(styles.quillNew)}
                    />
                  )}
                />
              </div>

              <div className={cx(styles.attachmentDiv)}>
                <div className={cx(styles.imageSection, "flexRow")}>
                  <p>Attach File</p>
                  <div {...getRootProps()} className={cx(styles.imageDiv)}>
                    {uploadedFile?.type === "image" ? <img src={uploadedFile?.imagePreviewUrl && uploadedFile?.imagePreviewUrl} alt=""/>
                      : uploadedFile?.file ? <small>{uploadedFile?.file?.name}</small> : 
                        <Icon  icon="bx:upload" color="#d25b5d" width="28" height="28"/>  }        
                  </div>
                </div>
                <span style={{color: "tomato", fontSize: "0.75rem"}} >{errors?.uploadedFile && errors?.uploadedFile?.message}</span>
              </div>

              <div className={cx(styles.btnDiv, "flexRow")}>
                <Button onClick={handleSubmit((data) => sendRequest(data))} title="Submit" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" hoverColor="#000" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {modalState === "show" && modalType === "submitAssessment" && <Modal show ><SubmitAssessmentModal /> </Modal>}
    </div>
  );
};



export default SubmitTask;