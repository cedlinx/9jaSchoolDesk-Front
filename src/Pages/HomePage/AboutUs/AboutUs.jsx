import React from "react";
import cx from "classnames";
import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={cx(styles.aboutUsContainer, "flexCol")}>

      <div className={cx(styles.heading, "flexCol")}>
        <h3>About Us</h3>
      </div>
      <div className={cx(styles.body, "flexCol")}>
        <section>
          <h4>Who We Are</h4>
          <p>
       9JASCHOOLDESK is an edtech company that is focused primarily on k-12 Education and “bridging the gap between demand for and access to quality education through the process of decentralizing the traditional method of learning”. 
          </p>

          <p>
        We’re on a Mission to encourage positive student behavior and to provide a means for schools, teachers, parents and students to communicate frequently and effectively towards student’s development.
          </p>

          <p>
Our vision is to bridge the gap between demand for and access to quality education through the process of decentralizing the traditional method of learning
          </p>
   
        </section>

        <section>
          <h4>Our Value Proposition</h4>
          <p>9JASCHOOLDESK software focuses on reducing manual labor, giving school staff member more time on their hands and reducing the need for a large number of staff. As a result, you are able to achieve the following;</p>
          <ul>
            <li>Cost efficiency</li>
            <li>People Management</li>
            <li>Improve staff efficiency</li>
            <li>Productivity</li>
            <li>Profitability</li>
          </ul>
        </section>
      </div>
  

    </div >
  );
};

export default AboutUs;