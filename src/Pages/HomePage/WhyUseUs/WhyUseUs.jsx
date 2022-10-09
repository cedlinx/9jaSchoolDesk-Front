import React from "react";
import cx from "classnames";
import styles from "./WhyUseUs.module.scss";

const WhyUseUs = () => {

  const dataArray = [
    {
      title: "CLOUD DATABASE AND DATA PROTECTION",
      description: "You don’t have to worry about losing your students or school records and data. With 9JASCHOOLDESK your data and school records are safe and available from anywhere forever."
    },
    {
      title: "Innovation & Artificial Intelligence(AI)",
      description: "9JASCHOOLDESK uses AI to deliver a top innovative product that solves all your school needs."
    },
    {
      title: "ZERO PAPER WORK",
      description: "Efficiently record, manage and analyze all school and student information on a single platform thereby reducing workload and saving time spent on paperwork."
    },
    {
      title: "REFINED CUSTOMER SUPPORT",
      description: "Our customer care representatives and tech support are ever ready to assist you and your school through an exciting journey."
    }
  ];


  return (
    <div className={cx(styles.whyUseUsContainer, "flexCol")}>
      <h3>WHY USE 9JASCHOOLDESK?</h3>
       
      <section className={cx("flexCol")}>
        {
          dataArray.map((data, index) => {
            return(
              <div key={index}>
                <p className={cx(styles.title)}>{data.title}</p>
                <span className={cx(styles.description)}>{data.description}</span>
              </div>
            );
          })
        }
      </section>
    </div>
  );
};

export default WhyUseUs;