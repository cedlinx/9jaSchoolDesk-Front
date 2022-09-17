import React, { useState, useEffect, useCallback, useRef } from "react";
import cx from "classnames";
import styles from "./Lounge.module.scss";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { createGistValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllGists, createGist, addComment, getGistConversations } from "@/redux/Gist/GistSlice";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import formatDate from "@/helpers/formatDate";
import TextArea from "@/components/TextArea";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import useGetClassID from "@/utils/useGetClassID";

const Lounge = () => {

  const dispatch = useDispatch();
  const userDetails = useGetLoggedInUser();
  const loading = useSelector((state) => state?.gist?.loading);
  const allGistConversationsData = useSelector((state) => state?.gist?.getGistConversationsData?.gist);
  const [loadingStatus, setLoadingStatus] = useState({
    loading: loading,
    index: ""
  });
  const classID = useGetClassID();

  useEffect(() => {
    classID && dispatch(getAllGists({author: userDetails?.id, role: userDetails?.role.toLowerCase()}));
    classID && dispatch(getGistConversations({user: userDetails?.role.toLowerCase(), class_id: classID}));
  },[classID, dispatch, userDetails?.id, userDetails?.role]);

  const addNewComment = async (e, gist, index) => {
    setLoadingStatus({
      loading: true,
      index: index
    });

    let inputElement = e.target.parentElement.querySelector("input");
    let inputValue = inputElement.value;

    let payload = {
      body: inputValue,
      author: gist?.author?.id,
      gist_id: gist.id
    };

    let formData = new FormData();
    formData.append("body", inputValue);
    formData.append("author", gist?.author?.id);
    formData.append("gist_id", gist.id);
    // uploadedFile?.imagePreviewUrl && formData.append("attachment", uploadedFile?.file);
    // uploadedFile?.imagePreviewUrl && formData.append("attachment_type", uploadedFile?.type);

    let response = await dispatch(addComment({payload, user: userDetails?.role.toLowerCase()}));
    
    if(response?.payload?.success){
      dispatch(getGistConversations({user: userDetails?.role.toLowerCase(), class_id: classID}));
      inputElement.value = "";
      setLoadingStatus({
        loading: false,
        index: index
      });
    }
  };

  const createNewGist = async (data) => {

    let formData = new FormData();
    formData.append("body", data.body);
    formData.append("author", userDetails?.id);
    formData.append("class_id", classID);
    formData.append("institution_id", userDetails?.institution_id);
    uploadedFile?.imagePreviewUrl && formData.append("attachment", uploadedFile?.file);
    uploadedFile?.imagePreviewUrl && formData.append("attachment_type", uploadedFile?.type);


    let response = await dispatch(createGist({user: userDetails?.role.toLowerCase(), payload: formData}));
    
    if (response.payload.success) {
      dispatch(getGistConversations({user: userDetails?.role.toLowerCase(), class_id: classID}));
      reset();
      setUploadedFile({file: "", imagePreviewUrl: "", type: ""});
    }
  };

  const toggleCommentDiv = (e) => {
    let commentDiv = e.target.parentElement.parentElement.querySelector(".commentBody");
    if(commentDiv.className.includes("hide")){
      commentDiv.classList.remove("hide");
      commentDiv.classList.add("show");
    }else{
      commentDiv.classList.add("hide");
      commentDiv.classList.remove("show");
    }
    e.target.textContent = e.target.innerText === "Show" ? "Hide" : "Show";
  };

  const resolver = yupResolver(createGistValidationSchema);

  const defaultValues = {
    body: ""
  };
  
  const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });

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

  const { getRootProps } = useDropzone({ onDrop });

  return (
    <div className={cx(styles.loungeContainer, "flexCol")}>
    
      {
        classID ?
          <>
            <div className={cx(styles.formWrapper, "flexCol")}>

              <form
                onSubmit={handleSubmit((data) => createNewGist(data))}
                className={cx("flexCol")}
              >
                <Controller
                  name="body"
                  control={control}
                  render={({ field, ref }) => (
                    <TextArea 
                      {...field}
                      placeholder="Tell us what is happening"
                      error={errors?.body?.message}
                    />
                  )}
                />

                <Controller 
                  name="uploadedFile"
                  control={control}
                  render={({ field, ref }) => (
                    <>
                      <div className={cx(styles.imageSection, "flexRow")}>
                        <p>Add Attachment</p>
                        <div {...getRootProps()}   {...field} className={cx(styles.imageDiv)}>
                          {uploadedFile?.type === "image" ? <img src={uploadedFile?.imagePreviewUrl && uploadedFile?.imagePreviewUrl} alt=""/>
                            : uploadedFile?.type ? <small>{uploadedFile?.file?.name}</small> : 
                              <Icon  icon="bx:upload" color="#d25b5d" width="28" height="28"/>  }        
                    
                        </div>
                      </div>
                      <span style={{color: "tomato", fontSize: "0.75rem"}} >{errors?.uploadedFile && errors?.uploadedFile?.message}</span>
                    </>
                  )}
                />

                <div  className={cx(styles.btnDiv, "flexRow")}>
                  <Button loading={loading} disabled={loading} onClick={handleSubmit((data) => createNewGist(data))} title="Post" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
                </div>
              </form>
            </div>
            <div className={cx(styles.body, "flexCol")}>

              { Array.isArray(allGistConversationsData) && allGistConversationsData.length > 0 ? 
                [...allGistConversationsData].reverse().map((post, index) => {
                  return (
                    <div key={index} className={cx(styles.postContainer, "flexCol")}>
                      <div className={cx(styles.header, "flexRow")}>
                        <div className={cx(styles.userImageDiv)}>
                          {post?.author?.avatar ? 
                            <img src={post?.author?.avatar} alt="img" />
                            :
                            <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "3rem", height: "3rem", lineHeight: "3rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${post?.author?.firstName ? post?.author?.firstName : ""} ${post?.author?.lastName
                              ? post?.author?.lastName : ""}`)}</span>
                          }
                        </div>
                        <p>{`${post?.author?.firstName ? titleCase(post?.author?.firstName) : ""} ${post?.author?.lastName ? titleCase(post?.author?.lastName) : ""}`}</p>
                        <small>{formatDate(post?.created_at)}</small>
                      </div>

                      <p className={cx(styles.introText)}>{post?.body}</p>

                      {post?.attachment && <div className={cx(styles.mediaDiv)}>
                        {post?.attachment_type === "video" ?
                          <video src={post?.attachment} id="myVideo" width="100%" height="240px" controls /> 
                          :
                          post?.attachment_type === "image" ?
                            <img src={post?.attachment} alt="img" />
                            :
                            <a href={post?.attachment} target="_blank" rel="noreferrer"><Icon icon="teenyicons:attachment-solid" color="#eb5757" /> {post?.attachment.split("/")[post?.attachment.split("/").length - 1]}</a>
                        }
                      </div>}

                      {Array.isArray(post?.comments) && post?.comments.length > 0 && 
                <div className={cx(styles.commentsDiv)}>
                  <div className={cx(styles.heading, "flexRow-space-between")}>
                    <h5>Comments</h5>
                    <small onClick={(e) => toggleCommentDiv(e)}>Show</small>
                  </div>
                  <div className={cx(styles.body, "flexCol", "commentBody", "hide")}>
                    {
                      post?.comments.map((comment, index) => {
                        return (
                          <div key={index} className={cx(styles.commentContainer, "flexRow")}>
                            <div className={cx(styles.userImageDiv)}>
                              {comment?.author?.avatar ? 
                                <img src={comment?.author?.avatar} alt="img" />
                                :
                                <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "3rem", height: "3rem", lineHeight: "3rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${comment?.author?.firstName ? comment?.author?.firstName : ""} ${comment?.author?.lastName
                                  ? comment?.author?.lastName : ""}`)}</span>
                              }
                            </div>
                            <div className={cx(styles.body, "flexCol")}>
                              <div className={cx(styles.top, "flexRow-space-between")}>
                                <p>{`${comment?.author?.firstName ? titleCase(comment?.author?.firstName) : ""} ${comment?.author?.lastName ? titleCase(comment?.author?.lastName) : ""}`}</p>
                                <small>{formatDate(comment?.created_at)}</small>
                              </div>
                              <p className={cx(styles.comment)}>{comment?.body}</p>
                            </div>
                        
                          </div>
                        );
                      })
                    }
                  </div>
                </div>}

                      <InputField
                        placeholder={" "}
                        label={"Leave a comment"}
                        type="text"
                        marginbottom="0"
                        // error={errors?.name && errors?.name?.message}
                      />

                      <Button loading={loadingStatus?.index === index ? loadingStatus?.loading : false} disabled={loadingStatus?.index === index ? loadingStatus?.loading : false}  onClick={(e)=> addNewComment(e, post, index)} title="Reply" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />              
                    </div>);
                }) 
                : 
                <div className={cx(styles.emptyDataDiv)}><p>No posts yet</p></div>}

            </div>

          </>
         
          :
          <div className={cx(styles.noDataDiv)}>
            <p>You have no class assigned to you. You can only create gists and interact with gists when you have at least one (1) class assigned to you. Kindly contact your administrator.</p>
          </div>
      }
     

 

    </div>
  );
};

export default Lounge;