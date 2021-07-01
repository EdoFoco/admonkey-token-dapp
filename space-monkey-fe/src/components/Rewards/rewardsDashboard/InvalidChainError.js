import React from "react";
import Title from "./Title";
import _ from "lodash";

export default function InvalidChainError() {
  return (
    <>
      <Title>
        Invalid chain: The only chain supported is{" "}
        {process.env.REACT_APP_CHAIN_ID}
      </Title>
    </>
  );
}
