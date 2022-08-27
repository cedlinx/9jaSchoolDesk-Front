import React, {useState, useEffect} from "react";
import cx from "classnames";
import styles from "./Lounge.module.scss";
import  "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {  MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar, AvatarGroup, Button, Conversation, ConversationHeader, StarButton, VoiceCallButton, VideoCallButton, InfoButton, ConversationList, InputToolbox, Loader, TypingIndicator, StatusList, Status, Sidebar, Search, MessageSeparator, ExpansionPanel } from "@chatscope/chat-ui-kit-react";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import { getAllGists, createGist, addComment } from "@/redux/Gist/GistSlice";
import { useDispatch, useSelector } from "react-redux";
import useGetClassID from "@/utils/useGetClassID";
import { Icon } from "@iconify/react";
import studentProfilePic from "@/assets/images/student-profile-pic.png";

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

const Lounge = () => {

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

export default Lounge;