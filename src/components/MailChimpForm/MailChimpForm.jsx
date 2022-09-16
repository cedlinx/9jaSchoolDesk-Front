import React, { useState, useEffect } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { titleCase } from "@/helpers/textTransform";
import cx from "classnames";
import styles from "./MailChimpForm.module.scss";
import InputField from "@/components/Input/Input";
import TextInput from "@/components/TextArea/index";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";

const MailchimpFormContainer = (props) => {
  const mailUrl = "https://twitter.us20.list-manage.com/subscribe/post?u=792b0edea27e6082159bce2eb&amp;id=fadd08a092";

  // const mailUrl = "https://gmail.us14.list-manage.com/subscribe/post?u=dea2138b8cce28d08a45c8dbb&amp;id=67ee0ebdb8";

  const CustomForm = ({ status, message, onValidated }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [topic, setTopic] = useState("");
    const [userMessage, setUserMessage] = useState("");

    useEffect(() => {
      if (status === "success"){
        clearFields();
        toast.success(message);
      }
    }, [status]);

    const clearFields = () => {
      setEmail("");
      // setName("");
      // setPhoneNumber("");
      // setTopic("");
      // setUserMessage("");
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      email &&
        // name &&
        // phoneNumber &&
        // userMessage &&
        // topic &&
        email.indexOf("@") > -1 &&
        onValidated({
          MERGE0: email
          // MERGE1: name,
          // MERGE2: phoneNumber,
          // MERGE3: topic,
          // MERGE4: userMessage
        });
    };

    return (
      <form
        className={cx(styles.mailChimpContainer, "flexCol")}
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* <InputField
          label="Name"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          placeholder="Name"
          required={true}
          marginbottom={"0px"}
        />

        <InputField
          label="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
          value={phoneNumber}
          placeholder="Phone Number"
          required={true}
          marginbottom={"0px"}
        /> */}
        <div className={cx(styles.formGroup, "flexRow")}>
          <div className={cx(styles.inputWrapper)}>
            <InputField
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="your@email.com"
              marginbottom={"0px"}
            />
          </div>

          <Button loading={status === "sending"} type="submit" title="Join" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#65BFBB" hoverColor="#65BFBB" hoverBg="#fff" />
        
        </div>
   

        {/* <InputField
          label="Topic / Subject"
          onChange={(e) => setTopic(e.target.value)}
          type="text"
          value={topic}
          placeholder="Topic / Subject"
          required={true}
          marginbottom={"0px"}
        /> */}
      
        {/* <InputField
          label="Phone Number"
          onChange={(e) => setUserMessage(e.target.value)}
          type="tel"
          value={message}
          placeholder="+234 8123 456 718"
          required={true}
          marginbottom={"0px"}
        /> */}

        {/* <TextInput
          description="Text"
          label="Message"
          placeholder=""
          onChange={(e) => setUserMessage(e.target.value)}
          name="message"
          value={userMessage}
          containerClassName="mt-0"
          required={true}
        /> */}

      

     
       

        {/* <div className="mail-status">
          {status === "sending" && (
            <p className="mc__alert sending">Submitting...</p>
          )}
          {status === "error" && (
            <p
              className="mc__alert error"
              dangerouslySetInnerHTML={{ __html: titleCase(message) }}
            />
          )}
          {status === "success" && (
            <p
              className="mc__alert success"
              dangerouslySetInnerHTML={{ __html: titleCase(message) }}
            />
          )}
        </div> */}
      </form>
    );
  };

  return (
    <div className="">
      <MailchimpSubscribe
        url={mailUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default MailchimpFormContainer;
