import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Reward from "../images/reward/Reward";
import Title from "./Title";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #1f3a93 30%, #9a12b3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  centered: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default function RewardsContainer({ reward, onClaimReward, disabled }) {
  const classes = useStyles();

  // if(this.drizzleState.accounts.length === 0){
  //     return(<div>We couldn't find a valid Wallet. Please create a wallet and come back.</div>)
  // }

  return (
    <>
      <div className={classes.centered}>
        <Title>CLAIM YOUR REWARD</Title>
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
        className={classes.root}
        color="primary"
        size="large"
        disabled={disabled}
        onClick={() => {
          onClaimReward();
        }}
      >
        {`${reward} BNB`}
        {/* {this.state.reward} */}
      </Button>
    </>
  );
}

RewardsContainer.defaultProps = {
  disabled: true,
  reward: null,
};

RewardsContainer.propTypes = {
  reward: PropTypes.string,
  onClaimReward: PropTypes.func.isRequired,
};
