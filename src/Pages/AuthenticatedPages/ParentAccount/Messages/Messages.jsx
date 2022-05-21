import React from "react";
import cx from "classnames";
import styles from "./Messages.module.scss";

const Messages = () => {
  return (
    <div className={cx(styles.messagesContainer, "flexRow")}>

      <div className={cx(styles.chatListSection)}>Chat List Section</div>
      <div className={cx(styles.mainChatArea)}>Main Chat Section</div>
    </div>
  );
};

export default Messages;