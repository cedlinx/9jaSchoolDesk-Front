import React, { useState, useEffect } from "react";
import cx from "classnames";
import styles from "./Chat.module.scss";

import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelHeader, ChannelList, MessageInput, MessageList, Thread, Window, LoadingIndicator, useMessageContext, Attachment } from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };



const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel } = props;
  
  const { messages } = channel.state;
  const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);
  
  return (
    <div onClick={() => setActiveChannel(channel)} style={{ margin: "12px" }}>
      <div>{channel.data.name || "Unnamed Channel"}</div>
      <div style={{ fontSize: "14px" }}>{messagePreview}</div>
    </div>
  );
};
  
const CustomMessage = () => {
  const { message } = useMessageContext();
  
  return (
    <div>
      <b style={{ marginRight: "4px", color: "#D25B5D" }}>{message.user.name}</b> {message.text}
    </div>
  );
};
  


const ChatComponent = () => {

  const [client, setClient] = useState(null);
  const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGFtc2F5In0.cUTZw9tZitQ7GxDhOJtQqfEKqdl9WN-rlpxXvgki1xY";

  useEffect(() => {
    const newClient = new StreamChat("babcbtug6y9q");

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    newClient.connectUser(
      {
        id: "tamsay",
        name: "Temitope"
      },
      userToken
    );

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) {
    return <LoadingIndicator />;
  }
  const channel = client.channel("messaging", {
    image: "dave.png",
    name: "Create a Messaging Channel",
    members: ["dave-matthews", "trey-anastasio"]
    // option to add custom fields
  });

  return (
    <>
      <Chat  client={client} theme='messaging light'>
        <ChannelList filters={filters} sort={sort} options={options} Preview={CustomChannelPreview} />
        <Channel >
          <Window>
            <ChannelHeader />
            <MessageList Message={CustomMessage} />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </>
  );
};

export default ChatComponent;