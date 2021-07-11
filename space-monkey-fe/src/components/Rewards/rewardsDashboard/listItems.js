import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import InfoIcon from "@material-ui/icons/Info";
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";

function UnstyledAnchor({ children, url }) {
  return (
    <div
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      {children}
    </div>
  );
}

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <UnstyledAnchor
      url={`https://exchange.pancakeswap.com/#/swap?outputCurrency=${process.env.REACT_APP_CONTRACT_ADDRESS}`}
    >
      <ListItem button>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Buy" />
      </ListItem>
    </UnstyledAnchor>
    <UnstyledAnchor
      url={`https://poocoin.app/tokens/${process.env.REACT_APP_CONTRACT_ADDRESS}`}
    >
      <ListItem button>
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="Charts" />
      </ListItem>
    </UnstyledAnchor>
    <UnstyledAnchor
      url={`https://bscscan.com/token/${process.env.REACT_APP_CONTRACT_ADDRESS}`}
    >
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Contract Details" />
      </ListItem>
    </UnstyledAnchor>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Social Media</ListSubheader>
    <UnstyledAnchor url="https://t.me/admonkeytoken">
      <ListItem button>
        <ListItemIcon>
          <TelegramIcon />
        </ListItemIcon>
        <ListItemText primary="Telegram" />
      </ListItem>
    </UnstyledAnchor>
    <UnstyledAnchor url="https://twitter.com/AdMonkeyToken">
      <ListItem button>
        <ListItemIcon>
          <TwitterIcon />
        </ListItemIcon>
        <ListItemText primary="Twitter" />
      </ListItem>
    </UnstyledAnchor>
    <UnstyledAnchor url="https://www.facebook.com/AdMonkeyNetwork">
      <ListItem button>
        <ListItemIcon>
          <FacebookIcon />
        </ListItemIcon>
        <ListItemText primary="Facebook" />
      </ListItem>
    </UnstyledAnchor>
  </div>
);
