import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Reward from "../images/reward/Reward";
import Title from "./Title";
import PropTypes from "prop-types";
import Logo from "../../../assets/admonkey-logo-no-text.png";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  },
  messageContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    justifyItems: "center",
    margin: "40px",
  },
  titleContainer: {
    justifyContent: "center",
    color: "black",
  },
  logo: {
    width: "15%",
  },
});

export default function ConnectToWallet({ reward, onClaimReward, disabled }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.messageContainer}>
        <img src={Logo} className={classes.logo} />

        <div className={classes.titleContainer}>
          <h1>
            Welcome to <b style={{ color: "#e67e22" }}>Ad</b>Monkey
          </h1>
        </div>
        <div>
          {/* <Button
            variant="contained"
            className={classes.root}
            color="primary"
            size="large"
            disabled={disabled}
            onClick={() => {
              onClaimReward();
            }}
          >
            {`${reward} BNB`}
          </Button> */}
        </div>
      </div>
    </div>
  );
}

ConnectToWallet.defaultProps = {
  disabled: true,
  reward: null,
};

ConnectToWallet.propTypes = {
  reward: PropTypes.string,
  onClaimReward: PropTypes.func.isRequired,
};
