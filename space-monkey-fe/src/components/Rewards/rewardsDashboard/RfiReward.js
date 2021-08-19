import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Title from "./Title";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Reward from "../images/reward/RfiReward";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  centered: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default function RfiReward(props) {
  const { rfiReward } = props;
  const classes = useStyles();
  return (
    <>
      <div className={classes.centered}>
        <Title>YOUR REFLECTION REWARDS</Title>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Reward />
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Typography component="p" variant="h5" className={classes.centered}>
        {rfiReward.toFixed(4)}
      </Typography>
      <Typography color="textSecondary" className={classes.centered}>
        $ADMONKEY earned by holding
      </Typography>
    </>
  );
}

RfiReward.propTypes = {
  rfiReward: PropTypes.number,
};
