import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import reward from "./reward.png";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%",
    padding: "1 rem",
  },
});

export default function Reward({}) {
  const classes = useStyles();
  return (
    <div className="image-wrapper">
      <img className={classes.root} alt="" src={reward} />
    </div>
  );
}

Reward.defaultProps = {};

Reward.propTypes = {};
