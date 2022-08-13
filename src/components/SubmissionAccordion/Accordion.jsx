import React from "react";
import cx from "classnames";
import styles from "./Accordion.module.scss";
import "./accordion.css";
import { Accordion, AccordionItem, AccordionItemHeading,  AccordionItemButton, AccordionItemPanel} from "react-accessible-accordion";
import singleSubmissionIcon from "@/assets/icons/single-submission-icon.svg";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextInput/TextInput";
import { Icon } from "@iconify/react";
import { titleCase } from "@/helpers/textTransform";



const AccordionComponent =(props)=>{

  const {accordionArray} = props;
  console.log(accordionArray);

  return (
    <section className={cx(styles.submissionAccordionContainer, "faq section--py")}>
      <div className="container flex">

        <div className="faq__content">
          <Accordion allowZeroExpanded={true}>
            {accordionArray && accordionArray.map((item, index) => (
              <AccordionItem className={cx(styles.accordionItem)} key={index}>
                <AccordionItemHeading className={cx(styles.accordionHeading)}>
                  <AccordionItemButton>
                    <img src={singleSubmissionIcon} alt="icon" />
                    <span className={cx(styles.title)}>
                      {`${titleCase(item?.firstName)} ${titleCase(item?.lastName)}`}
                    </span>
                   
                    <Button bgColor="#D25B5D" textColor="#fff" title="View" />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className={cx(styles.accordionPanel)}>
                  <div className={cx("row", "g-0")}>
                    <div className={cx("col-sm-12", "col-md-6", "col-lg-6", styles.leftSection)}>
                      <small>
                        Attachment
                      </small>
                      <p>
                        <span>{"document name"}</span>
                       
                        <Icon icon="bi:download" color="#d25b5d" />
                      </p>
                    </div>
                    <div className={cx("col-sm-12", "col-md-6", "col-lg-6", styles.rightSection, "flexCol")}>
                      <TextArea placeholder="Leave a feedback for the student" />
                      <Button title="Send" bgColor="#D25B5D" textColor="#fff" />
                    </div>
                  </div>
                  
              
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