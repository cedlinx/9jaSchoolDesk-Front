import React from "react";
import cx from "classnames";
import styles from "./FAQ.module.scss";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import "./faq.css";
import "./accordion.css";
import parse from "html-react-parser";


const FAQ = ({faqData, faqImage}) => {

  const navigate = useNavigate();

  return (
    <div className={cx(styles.FAQWrapper, "flexCol")}>      
      <div className={cx(styles.body, "flexCol")}>
        <div className={cx(styles.faqContainer, "flexCol")}>
          <div className={cx(styles.body)}>
            <section className="faq section--py">
              <div className={cx(styles.container, "container", "flex")}>
                <div className="faq__content">
                  <Accordion allowZeroExpanded={true}>
                    {faqData && faqData.map((element, index) => (
                      <AccordionItem className={cx(styles.accordionItem)} key={index}>
                        <AccordionItemHeading>
                          <AccordionItemButton className={cx(styles.itemButton)}>
                            {element.question && parse(element.question)}
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className={cx(styles.accordionPanelDiv)}>
                          <div className={cx(styles.contentDiv, "flexRow")}>
                            <p> {element.answer && parse(element.answer)} </p>
                            <div className={cx(styles.imageDiv, "flexRow-fully-centered")}>
                              <img src={faqImage} alt="" />
                            </div>

                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>

                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;