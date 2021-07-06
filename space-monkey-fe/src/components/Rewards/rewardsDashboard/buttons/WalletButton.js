import React from "react";
import Button from "@material-ui/core/Button";

export default function WalletButton({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}) {
  return (
    <Button
      variant="primary"
      style={{
        backgroundColor: "#e67e22",
        color: "white",
        borderRadius: "20px",
      }}
      className="ml-1"
      onClick={() => {
        if (!provider) {
          loadWeb3Modal().catch((e) => {
            console.log(e);
          });
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect" : "Disconnect"}
    </Button>
  );
}
