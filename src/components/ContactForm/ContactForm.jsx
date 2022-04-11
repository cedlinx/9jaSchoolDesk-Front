import React, { useState, useEffect } from "react";
// import MailchimpSubscribe from "react-mailchimp-subscribe";
import { titleCase } from "@/helpers/textTransform";
import InputField from "../Input/Input";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import Select from "../Select/Select";

const ContactForm = (props) => {
	const mailUrl =
    "https://twitter.us20.list-manage.com/subscribe/post?u=792b0edea27e6082159bce2eb&amp;id=fadd08a092";

	const CustomForm = ({ status, message, onValidated }) => {
		const [email, setEmail] = useState("");
		const [firstName, setFirstName] = useState("");
		const [lastName, setLastName] = useState("");
		const [reason, setReason] = useState("");
		const [userMessage, setUserMessage] = useState("");

		useEffect(() => {
			if (status === "success") clearFields();
		}, [status]);

		const clearFields = () => {
			setFirstName("");
			setLastName("");
			setEmail("");
			setUserMessage("");
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			email &&
        firstName &&
        lastName &&
        userMessage &&
        email.indexOf("@") > -1 ;
		};

		return (
			<form
				className="form flex text-white homepage-mc-form"
				onSubmit={(e) => handleSubmit(e)}
			>
				<InputField
					label={"Full Name"}
					onChange={(e) => setFirstName(e.target.value)}
					type="text"
					value={firstName}
					placeholder={""}
					required={true}
					
				/>

				<InputField
					label="Email Address"
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					value={email}
					placeholder=""
					required={true}
					
				/>

				<Select
					label="Reason"
					onChange={(e) => setReason(e.target.value)}
					type="text"
					value={reason}
					placeholder="Select Your Reason For Contacting"
					required={true}
					
				/>

				<TextInput
					description="Text"
					label="Message"
					placeholder=""
					onChange={(e) => setUserMessage(e.target.value)}
					name="message"
					value={userMessage}
					containerClassName="mt-0"
					required={true}
				/>

				<div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
					<Button title="Send Message" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#2C0085" />
				</div>

				<div className="mail-status">
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
				</div>
			</form>
		);
	};

	return (
		<div className="">
	
			<CustomForm
				status={status}
				// message={message}
				// onValidated={(formData) => subscribe(formData)}
			/>
		</div>
	);
};

export default ContactForm;
