import React from "react";
import cx from "classnames";
import styles from "./Accordion.module.scss";
import "./accordion.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import singleSubmissionIcon from "@/assets/icons/single-submission-icon.svg";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextInput/TextInput";


const AccordionComponent =(props)=>{

  const {accordionArray} = props;

  return (
    <section className="faq section--py">
      <div className="container flex">

        <div className="faq__content">
          <Accordion allowZeroExpanded={true}>
            {accordionArray && accordionArray.map((item, index) => (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <img src={singleSubmissionIcon} alt="icon" />
                    {item.title}
                    <Button bgColor="#D25B5D" textColor="#fff" title="Leave Feedback" />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <TextArea placeholder="Leave a feedback for the student" />
                  <Button title="Send" bgColor="#BDBDBD" textColor="#fff" />
              
                </AccordionItemPanel>
              </AccordionItem>
            ))}
                        
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default AccordionComponent;