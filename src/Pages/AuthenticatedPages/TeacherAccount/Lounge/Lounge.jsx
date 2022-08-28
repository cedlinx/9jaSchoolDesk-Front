import React, { useState, useEffect, useCallback, useRef } from "react";
import cx from "classnames";
import styles from "./Lounge.module.scss";
import  "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {  MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar, AvatarGroup, Button, Conversation, ConversationHeader, StarButton, VoiceCallButton, VideoCallButton, InfoButton, ConversationList, InputToolbox, Loader, TypingIndicator, StatusList, Status, Sidebar, Search, MessageSeparator, ExpansionPanel } from "@chatscope/chat-ui-kit-react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import { useForm, Controller } from "react-hook-form";
import { createGistValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllGists, createGist, addComment, getGistConversations } from "@/redux/Gist/GistSlice";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import TextInput from "@/components/TextInput/TextInput";
import formatDate from "@/helpers/formatDate";
import TextArea from "@/components/TextArea";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import useGetClassID from "@/utils/useGetClassID";
const conversationListData = [
  {
    id: "1",
    name: "John Doe",
    avatar: studentProfilePic,
    status: "online",
    lastSenderName: "John Doe",
    info: "John doe for you",
    unreadCnt: "3",
    active: true
    

  },
  {
    id: "2",
    name: "Jane Doe",
    avatar: studentProfilePic,
    status: "dnd",
    lastSenderName: "Jane Doe",
    info: "Jane doe for you",
    unreadCnt: "3",
    active: null
  },
  {
    id: "3",
    name: "John Jane",
    avatar: studentProfilePic,
    status: "offline",
    lastSenderName: "John Jane",
    info: "Yes i can do it for you",
    unreadCnt: "",
    unreadDot: true,
    active: null
  }
];

const Lounge1 = () => {

  const dispatch = useDispatch();
  const [messageInputValue, setMessageInputValue] = useState("");
  const allGistsData = useSelector((state) => state.gist.getAllGistsData.gist);
  const userDetails = useGetLoggedInUser();
  const class_id = useGetClassID();
  const [conversationList, setConversationList] = useState(conversationListData);
  const [selectedConversation, setSelectedConversation] = useState(null);

  console.log(class_id);

  console.log(allGistsData);

  useEffect(() => {
    dispatch(getAllGists({author: userDetails?.id, role: userDetails?.role.toLowerCase()}));
  },[dispatch, userDetails?.id, userDetails?.role, userDetails?.role.toLowerCase]);

  const createNewGists = async (content) => {
    console.log("create new gists");
    let data = {
      title: "Sports Building",
      body: content,
      published_at: "2022-08-14 00:27",
      author: userDetails?.id,
      class_id: class_id
      // gist_id: 1
    };

    let response = await dispatch(addComment(data));
    console.log(response);
  };


  console.log(userDetails);

  const sendMessage =(data) => {
    console.log(messageInputValue);
    alert(data);
    setMessageInputValue("");
    createNewGists(data);
  };



  const handleConversationClick = (id) => {
    console.log(id);

    setSelectedConversation(id);

    const newConversationList = conversationList.map((conversation) => {
      if (conversation.id === id) {
        return {
          ...conversation,
          unreadCnt: "",
          unreadDot: false,
          active: true
        };
      }
      return {
        ...conversation,
        active: null
      };
    });

    setConversationList(newConversationList);


  };


  return (
    <div style={{ position:"relative", height: "100%" }}>
      <div responsive style={{ position:"absolute", height: "100%", width: "100%"}}>
        <MainContainer responsive>
          <Sidebar position="left" scrollable={true}>
            <Search placeholder="Search..." />
            <ConversationList>
              {conversationList.map((item, index) => (
                <Conversation
                  key={index}
                  name={item?.name}
                  lastSenderName={item?.name}
                  info={item?.info}
                  unreadCnt={item?.unreadCnt}
                  unreadDot={item?.unreadDot}
                  active={item?.active}
                  onClick={()=> handleConversationClick(item?.id)}
                >
                  <Avatar src={item?.avatar} name={item?.name} status={item?.status} />
                </Conversation>
              ))}
              
            </ConversationList>
          </Sidebar>

          <ChatContainer scrollable={true}>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={studentProfilePic} name="Zoe" />
              <ConversationHeader.Content
                userName="Zoe"
                info="Active 10 mins ago"
              />
              <ConversationHeader.Actions>
                <VoiceCallButton />
                <VideoCallButton />
                <InfoButton />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              typingIndicator={<TypingIndicator content="Zoe is typing" />}
              scrollable={true}
            >
              <MessageSeparator content="Saturday, 30 November 2019" />

              <Message
                model={{
                  message: "Hello my friend12wq",
                  sentTime: "15 mins ago",
                  sender: "ttt",
                  direction: "incoming",
                  position: "single"
                }}
              >
                <Avatar src={studentProfilePic} name="Zoe" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "single"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend 2",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "normal"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "normal"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar src={studentProfilePic} name="Zoe" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "first"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "normal"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "normal"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "last"
                }}
              />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar src={studentProfilePic} name="Zoe" />
              </Message>
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onChange={(val) => setMessageInputValue(val)}
              onSend={() => sendMessage(messageInputValue)}
            />
          </ChatContainer>

          <Sidebar position="right">
            <ExpansionPanel open title="INFO">
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
            </ExpansionPanel>
            <ExpansionPanel title="LOCALIZATION">
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
            </ExpansionPanel>
            <ExpansionPanel title="MEDIA">
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
            </ExpansionPanel>
            <ExpansionPanel title="SURVEY">
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
            </ExpansionPanel>
            <ExpansionPanel title="OPTIONS">
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
            </ExpansionPanel>
          </Sidebar>
        </MainContainer>
      </div>
    </div>
  );
};

const Lounge = () => {

  const dispatch = useDispatch();
  const userDetails = useGetLoggedInUser();
  const loading = useSelector((state) => state?.gist?.loading);
  // const allGistsData = useSelector((state) => state.gist.getAllGistsData.gist);
  const allGistConversationsData = useSelector((state) => state?.gist?.getGistConversationsData?.gist);
  const [loadingStatus, setLoadingStatus] = useState({
    loading: loading,
    index: ""
  });
  const classID = useGetClassID();

  console.log(allGistConversationsData);
  console.log(userDetails);
  console.log(loading);

  useEffect(() => {
    dispatch(getAllGists({author: userDetails?.id, role: userDetails?.role.toLowerCase()}));
    dispatch(getGistConversations({user: userDetails?.role.toLowerCase(), class_id: classID}));
  },[classID, dispatch, userDetails?.id, userDetails?.role]);

  const addNewComment = async (e, gist, index) => {
    setLoadingStatus({
      loading: true,
      index: index
    });

    let inputElement = e.target.parentElement.querySelector("input");

    let inputValue = inputElement.value;

    console.log(gist);
    let payload = {
      body: inputValue,
      author: gist?.author,
      gist_id: gist.id
    };

    let response = await dispatch(addComment({payload, user: userDetails?.role.toLowerCase()}));
    console.log(response);
    if(response?.payload?.success){
      dispatch(getGistConversations({user: userDetails?.role.toLowerCase(), class_id: userDetails?.klass_id}));
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

    let response = await dispatch(createGist({user: userDetails?.role.toLowerCase(), payload: formData}));
    console.log(response);
    if (response.payload.success) {
      dispatch(getGistConversations({user: userDetails?.role.toLowerCase(), class_id: userDetails?.klass_id}));
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
    imagePreviewUrl: ""
  });

  console.log(errors);

  const onDrop = useCallback(acceptedFiles => {
    let file = (acceptedFiles[0]);
    const reader = new FileReader();
    console.log(file.type.split("/")[0]);
    reader.onloadend = () => {
      setUploadedFile({file: file, imagePreviewUrl: reader.result, type: file.type.split("/")[0]});
      setValue("uploadedFile", file);
    };
    reader.readAsDataURL(file);
  }, [setValue]);

  const { getRootProps } = useDropzone({ onDrop });
  console.log(uploadedFile?.file?.name);
  console.log(uploadedFile?.type);
  return (
    <div className={cx(styles.loungeContainer, "flexCol")}>
    
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
                  {post?.type === "video" ?
                    <video src={post?.attachment} id="myVideo" width="100%" height="240px" controls /> 
                    :
                    post?.type === "image" ?
                      <img src={post?.attachment} alt="img" />
                      :
                      <a href={post?.attachment} target="_blank" rel="noreferrer"><Icon icon="teenyicons:attachment-solid" color="#eb5757" /> {post?.attachment.split("/")[post?.attachment.split("/").length - 1]}</a>
                  }
                </div>}

                <InputField
                  placeholder={" "}
                  label={"Leave a comment"}
                  type="text"
                  marginbottom="0"
                  // error={errors?.name && errors?.name?.message}
                />

                <Button loading={loadingStatus?.index === index ? loadingStatus?.loading : false} disabled={loadingStatus?.index === index ? loadingStatus?.loading : false}  onClick={(e)=> addNewComment(e, post, index)} title="Reply" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />

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
                              <img src={studentProfilePic} alt="thumbnail" />
                            </div>
                            <div className={cx(styles.body, "flexCol")}>
                              <div className={cx(styles.top, "flexRow-space-between")}>
                                <p>John Doe</p>
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
              </div>);
          }) 
          : 
          <div className={cx(styles.emptyDataDiv)}><p>No posts yet</p></div>}

      </div>

    </div>
  );
};

export default Lounge;