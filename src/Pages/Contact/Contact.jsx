import React from "react";
import cx from "classnames";
import styles from "./Contact.module.scss";
import PageContainer from "@/components/PageContainer/PageContainer";
import PageHeader from "@/components/PageHeader/PageHeader";
import Accordion from "@/components/Accordion/Accordion";
import ContactForm from "@/components/ContactForm/ContactForm";
import headerBgImage from "@/assets/images/pageHeaderBg1.png";


const Contact = () => {

	const accordionArray = [
		{
			heading: "What is the subscription plan for ?",
			content: "“consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.”"
		},
		{
			heading: "What is the subscription plan for ?",
			content: "“consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.”"
		},
		{
			heading: "What is the subscription plan for ?",
			content: "“consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.”"
		},
		{
			heading: "What is the subscription plan for ?",
			content: "“consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.”"
		}
	];

	return (
		<PageContainer>

			<PageHeader alignment="center" headerTitle="Have A Message For Us" headerCaption="We are available to respond to you for your enquiries and question fill the form below with your queries" btnThreeText='Subscribe Now'  btnThreeTextColor="#FF8001" 
				btnThreePath="/pricing" btnThreeBgColor="#ff800110" btnThreeBorderColor = "" lightTheme bgImage={headerBgImage}
				hoverBgThree="#FF8001" hoverColorThree="#fff"
			/>

			<section className={cx(styles.container, "row")}>
				<div className={cx(styles.contentDiv, "col-md-6")}>
					<h2>Get In Touch</h2>
					<p className="main-caption">We are available to respond to you for your enquiries and question fill the form below with your queries </p>

					<div className="row">
						<div className={cx(styles.emailWrapper, "col-md-6")}>
							<h3>Available Email</h3>
							<p className="main-caption">info@skydah.com</p>
						</div>

						<div className="col-md-6">
							<h3>Contact Line</h3>
							<p className="main-caption">09026507900, 08032499776, 08066829665</p>
						</div>

						<div className="col-md-12">
							<h3>Lagos Nigeria Office</h3>
							<p className="main-caption">63, Akowonjo Road, Akowonjo- Lagos </p>
						</div>
						
					</div>
				</div>
				<div className={cx(styles.formDiv, "col-md-6")}>
					<ContactForm />
				</div>
			</section>

			<section className={cx(styles.container, styles.faq, "flexCol")}>
				<div className={cx(styles.wrapper, "flexCol")}>
					<h2>Frequently Asked Questions</h2>
					<Accordion accordionArray={accordionArray}/>
				</div>
			</section>

		</PageContainer>
	);
};

export default Contact;