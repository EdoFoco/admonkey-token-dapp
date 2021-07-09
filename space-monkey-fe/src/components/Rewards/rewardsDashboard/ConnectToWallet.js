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
    backgroundColor: "#2c3e50",
    height: "100%",
  },
  messageContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    margin: "40px",
  },
  titleContainer: {
    justifyContent: "center",
    color: "white",
    marginBottom: "40px",
    marginTop: "20px",
  },
  logo: {
    width: "15%",
  },
});

export default function ConnectToWallet({ isInvalidChain }) {
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
        <div style={{ fontSize: "1.75rem", color: "#e67e22" }}>
          {isInvalidChain ? "Are you on BSC" : null}
        </div>
        <div>
          <div style={{ fontSize: "1.75rem", color: "white" }}>
            {isInvalidChain
              ? "You have not connected to Binance Smart Chain network yet"
              : "You are not connected to your wallet"}
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: "1.25rem",
              color: "white",
              width: "100%",
              textAlign: "center",
            }}
          >
            {isInvalidChain
              ? "Please switch to BSC Network on your Metamask or TrustWallet"
              : "Please connect your wallet to access your investor dashboard"}
          </div>
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
  isInvalidChain: PropTypes.bool,
};
