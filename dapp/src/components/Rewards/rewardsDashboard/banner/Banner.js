import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Reward from "../../images/reward/reward.png";

const useStyles = makeStyles({
  div1: {
    backgroundColor: "#2c3e50",
    padding: "40px",
    display: "flex",
  },
  div2: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
  div3: {
    color: "#e67e22",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  div4: {
    marginTop: "40px",
  },
  div5: {
    display: "flex",
    width: "40%",
  },
  anchor: {
    backgroundColor: "#e67e22",
    color: "white",
    borderRadius: "20px",
    padding: "10px",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default function Banner({
  balance,
  reward,
  nextAvailableClaimDate,
  onClaimReward,
}) {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width: 600px)");
  return (
    <div style={matches ? {} : { display: "none" }} className={classes.div1}>
      <div className={classes.div2}>
        <div className={classes.div3}>Invest in AdMonkey</div>
        <div style={{ color: "white", fontSize: "1.75rem", marginTop: "20px" }}>
          Earn <b>BNB</b> and <b>ADMONKEY</b> just by holding
        </div>
        <div className={classes.div4}>
          <a
            className={classes.anchor}
            target="_blank"
            href={`https://exchange.pancakeswap.com/#/swap?outputCurrency=${process.env.REACT_APP_CONTRACT_ADDRESS}`}
          >
            Buy ADMONKEY
          </a>
        </div>
      </div>
      <div className={classes.div5}>
        {/* {/* <img
          alt="Rfi Reward"
          src={Reward}
          style={{ width: "150px", margin: "auto" }}
        /> */}
      </div>
    </div>
  );
}

Banner.propTypes = {};
