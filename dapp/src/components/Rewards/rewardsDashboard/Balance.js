import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Title from "./Title";
import BalanceImg from "../images/balance/Balance";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%",
    padding: "1 rem",
  },
  centered: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default function Balance({ balance }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.centered}>
        <Title>YOUR BALANCE</Title>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <BalanceImg />
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Typography component="p" variant="h5" className={classes.centered}>
        {`${balance ? balance : 0}`}
      </Typography>
      <Typography color="textSecondary" className={classes.centered}>
        $ADMONKEY
      </Typography>
    </>
  );
}

Balance.propTypes = {
  balance: PropTypes.number,
};
