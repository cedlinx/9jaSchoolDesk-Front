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
                    {item.heading}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {item.content}
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