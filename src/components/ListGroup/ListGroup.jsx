import React from "react";
import PropTypes from "prop-types";
import {ListGroup} from "react-bootstrap";

const ListGroupComponent = ({ children }) => {

	const handleClick=(data)=>{

	};

	return (
		<ListGroup>
			{children.map((element, index) => {
				return(
					<li key={index} className="list-group-item" onClick={() => handleClick(index)}>
						{element}
					</li>
				);
			})}
		</ListGroup>
		
	);
};

ListGroupComponent.propTypes = {
    
};

export default ListGroupComponent;
