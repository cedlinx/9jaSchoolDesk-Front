import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {Link} from "react-router-dom";
import styles from "./Testimonials.module.scss";
import { Card} from "react-bootstrap";
import { Icon } from "@iconify/react";
import NormalCarousel from "@/components/Carousels/NormalCarousel/NormalCarousel";

import testimonialsAvatar from "@/assets/images/testimonialsAvatar.png";


const Testimonials = props => {

  let testimonialData = [
    {
      avatar: "",
      name: "Rev. Fr. John Eze",
      position: "Proprietor",
      comment: "9JASCHOOLDESK has enhanced our ability to understand that students have different behaviors at home and a different behavior in school. We now have a single basic understanding of each student behavior which has helped us to help students at their weakness and improve their strength."
    },

    {
      avatar: "",
      name: "Mrs. Uba Mary Chika",
      position: "School Administrator",
      comment: "9JASCHOOLDESK has decrease the work load on our teachers and Admin, giving us more time to the students"
    },

    {
      avatar: "",
      name: "Mr. Rufia Yusuf",
      position: "Class Teacher",
      comment: "With my tab or mobile phone, I can submit like ten lesson notes. Work out assessments and results after exams and test on the go and with ease. It was time saving and quick because the calculation was done automatically"
    }
  ]; 

	  const testArray = ()=>{
		  return (
			 testimonialData.map((element, index)=>{
				 return(
          <Card key={index} className={cx(styles.cardItem)}>
            <Card.Header className={cx(styles.cardHeader)}>
              <div className={cx(styles.userInfo)}>
                <p><span>{element.name}</span><span>({element.position})</span></p>
              </div>
              <div className={cx(styles.avatarDiv)}>
                <img className={cx(styles.avatar)} src={element.avatar} alt="" />
              </div>
						
							
            </Card.Header>
            <Card.Body className={cx(styles.cardBody)}>{element.comment}</Card.Body>	
          </Card>
				 );
			 })


		  );
	  };

  return (

		
    <section>
            
      <div className={cx(styles.testimonialsContainer)}>
				
        <div className={cx(styles.header)}>
          <h3>Here’s what people are <br /> saying about us</h3>
        </div>
			

        <div className={cx(styles.cardWrapper)}>
          <NormalCarousel carouselArray={testArray()} />		
        </div> 

				
      </div>
    </section>
  );
};

Testimonials.propTypes = {

};

export default Testimonials;