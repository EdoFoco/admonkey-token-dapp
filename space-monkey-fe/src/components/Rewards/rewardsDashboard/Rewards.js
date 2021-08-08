import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Title from "./Title";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Button from "@material-ui/core/Button";
import Reward from "../images/reward/Reward";
import { BigNumber } from "ethers";
import { isObject } from "lodash";

const useStyles = makeStyles({
  button: {
    marginTop: "1rem",
  },
  centered: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  depositContext: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "1em",
  },
});

export default function Rewards(props) {
  const { reward, nextAvailableClaimDate, disabled, onClaimReward } = props;
  const classes = useStyles();

  const rewardDisabled =
    !nextAvailableClaimDate || nextAvailableClaimDate >= Date.now();

  return (
    <>
      <div className={classes.centered}>
        <Title>YOUR REWARDS</Title>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Reward />
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Button
        variant="contained"
        className={classes.button}
        color="primary"
        size="large"
        disabled={rewardDisabled}
        onClick={() => {
          onClaimReward();
        }}
      >
        {`${reward ? reward.toFixed(9) : ""} BNB`}
      </Button>

      <Typography color="textSecondary" className={classes.depositContext}>
        {nextAvailableClaimDate
          ? "Claimable from: " +
            format(nextAvailableClaimDate, "do MMM yyyy HH:mm:ss")
          : "Buy ADMONKEY to earn rewards"}
      </Typography>
    </>
  );
}

Rewards.propTypes = {
  rewards: PropTypes.number,
  nextAvailableClaimDate: PropTypes.instanceOf(Date),
  balance: PropTypes.number,
  onClaimReward: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
