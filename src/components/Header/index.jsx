import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  header: {
    backgroundColor: "#63bc46",
    color: "#ffffff",
    height: "50px",
    float: "left",
    width: "100%",
    marginBottom: "20px"
  },
  title: {
    position: "relative",
    top: "18px",
    left: "10px",
    float: "left",
    color: "white",
    fontSize: "16px"
  }
};

const Header = ({ classes, title }) => (
  <div className={classes.header}>
    <h1 className={classes.title}>{title}</h1>
    {/* <p className={classes.title}>{title}</p> */}
  </div>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default injectSheet(styles)(Header);
