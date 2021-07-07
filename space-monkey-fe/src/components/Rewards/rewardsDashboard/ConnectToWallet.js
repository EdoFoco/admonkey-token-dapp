import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Reward from "../images/reward/Reward";
import Title from "./Title";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  messageContainer: {
    width: "90%",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
  },
  titleContainer: {
    justifyContent: "center",
  },
});

export default function ConnectToWallet({ reward, onClaimReward, disabled }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.messageContainer}>
        <div className={classes.titleContainer}>
          <Title>Welcome to</Title>
          <Title>
            <b style={{ color: "#e67e22" }}>Ad</b>Monkey
          </Title>
        </div>
        <div>
          <Button
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
          </Button>
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
