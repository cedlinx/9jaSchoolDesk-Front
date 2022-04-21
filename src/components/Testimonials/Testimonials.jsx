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
      avatar: testimonialsAvatar,
      name: "Edeh Funmi",
      position: "Parent",
      comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
    },

    {
      avatar: testimonialsAvatar,
      name: "Charles Patterson",
      position: "Clergy",
      comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
    },

    {
      avatar: testimonialsAvatar,
      name: "John Doe",
      position: "Lawyer",
      comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
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