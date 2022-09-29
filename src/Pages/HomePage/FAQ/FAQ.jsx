import React from "react";
import cx from "classnames";
import styles from "./FAQ.module.scss";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import FAQComponent from "@/components/FAQ/FAQ";
import faqImage from "@/assets/images/faq-image.jpg";

const FAQ = () => {

  const navigate = useNavigate();

  const faqData = [
    {
      question: "What is 9jaschooldesk?",
      answer: `9jashooldesk is an Edtech software designed to bridge the gap between school administrators, teachers, parents and
      students, by providing school management solution, behavior monitoring and security solution.
      `
    },
    {
      question: "How secure is 9jaschooldesk?",
      answer: "The platform is secured and encrypted through: SSL (Secure Socket Layer), which uses network architecture built to meet the requirements of the most security-sensitive organizations."
    },
    {
      question: "What if there is a system crash in our school, what happens to the school data?" ,
      answer: "Your data is safe because it’s not stored on your system but in the cloud. So, if your system crashes it does not affect the data stored on 9JASCHOOLDESK"
    },
    {
      question: "Can non-tech savvy staff use 9jaschooldesk?",
      answer: "Yes, 9JASCHOOLDESK is very easy to use. It simply requires basic knowledge of a computer to operate. After the staff training, all staff should be able to use 9JASCHOOLDESK easily."
    },
    {
      question: "Can 9jaschooldesk accept data and records from other school portals if we want to migrate",
      answer: "Yes, we will format the records and upload them with ease."
    },
    {
      question: "Can the 9jaschooldesk portal work as a Learning Management System (LMS)?",
      answer: "Yes, the 9jaschooldesk portal has educational videos, online assignments, grading and analysis data."
    },
    {
      question: "Do parents have access to other children data?",
      answer: "NO, Parents only have access to their child/children’s data"
    },
    {
      question: "Is 9jaschooldesk software installed on the computer?",
      answer: "No, 9JASCHOOLDESK is a cloud-based software which makes it accessible from anywhere at any time and with any internet enabled device."
    },
    {
      question: "Can I start using 9jaschooldesk for FREE?",
      answer: "You can use 9JASCHOLDESK for free for one (1) term on a trial basis, after which you will be required to pay for a subscription plan to continue using the system. Every school is entitled to ONLY 1 term free trial."
    },
    {
      question: "Can I use 9jaschooldesk to manage multiple schools/ a chain of schools?",
      answer: "Yes. 9JASCHOOLDESK is a multi-school solution and has been used severally to manage several branches of one school, in different locations."
    }
  ];

  return (
    <div className={cx(styles.faqContainer, "flexCol")}>
      <div className={cx(styles.header, "flexCol")}>
        <h3 className={cx(styles.title)}>Frequently Asked Questions</h3>
      </div>
      <FAQComponent faqData={faqData} faqImage={faqImage} />
    </div>
  );
};

export default FAQ;