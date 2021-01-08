import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const AuthWrapper = ({ headline, children }) => {
  return (
    <div className="authWrapper">
      <div className="wrap">
        {headline && <h2>{headline}</h2>}
        <div className="children">{children && children}</div>
      </div>
    </div>
  );
};

AuthWrapper.propTypes = {};

export default AuthWrapper;
