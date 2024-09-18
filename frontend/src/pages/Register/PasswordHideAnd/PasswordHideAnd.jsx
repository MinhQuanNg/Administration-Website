import PropTypes from "prop-types";
import React from "react";
import "./password-hide-and.css";
import hide from "./hide.png";

export const PasswordHideAnd = ({ property1, className }) => {
  return <img className={`password-hide-and ${className}`} alt="Property hide" src={hide}/>;
};

PasswordHideAnd.propTypes = {
  property1: PropTypes.oneOf(["hide"]),
};
