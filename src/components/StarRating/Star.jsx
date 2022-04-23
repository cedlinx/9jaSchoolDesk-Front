import React from "react";
import PropTypes from "prop-types";

const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
  const moreStyle = false;
  let styleClass = "star-rating-default";
  if (rating >= starId) {
    styleClass = "star-rating-filled";
  }
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      role="presentation"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 22 22"
        fill="none"
        className={`star ${styleClass} ${moreStyle ? "loader--small" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z"
          stroke="#FF991F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
Star.propTypes = {
  starId: PropTypes.number,
  rating: PropTypes.number,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

Star.defaultProps = {
  starId: 0,
  rating: 0
};

export default Star;
