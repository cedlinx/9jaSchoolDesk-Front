import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {Link} from "react-router-dom";
import styles from "./Testimonials.module.scss";
import { Card} from "react-bootstrap";
import { Icon } from "@iconify/react";
import NormalCarousel from "@/components/Carousels/NormalCarousel/NormalCarousel";


import testimonialsAvatar from "@/assets/images/testimonialsAvatar.png";


import testimonialsIcon from "@/assets/icons/testimonialsIcon.png";


const Testimonials = props => {

	let testimonialData = [
		{
			avatar: testimonialsAvatar,
			name: "Charles Patterson",
			position: "Specialist In Mathematics",
			icon: testimonialsIcon,
			comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
		},

		{
			avatar: testimonialsAvatar,
			name: "Charles Patterson",
			position: "Specialist In Mathematics",
			icon: testimonialsIcon,
			comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
		},

		{
			avatar: testimonialsAvatar,
			name: "Charles Patterson",
			position: "Specialist In Mathematics",
			icon: testimonialsIcon,
			comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
		}
	]; 

	  const testArray = ()=>{
		  return (
			 testimonialData.map((element, index)=>{
				 return(
					<Card key={index} className={cx(styles.cardItem)}>
						<Card.Header className={cx(styles.cardHeader)}>
							<div>
								<p><span>{element.name}</span><span>({element.position}</span></p>
							</div>
							<div>
								<img className={cx(styles.avatar)} src={element.avatar} alt="" />
							</div>
						
							<div>
								<i><img src={element.testimonialIcon} alt="" /></i>
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