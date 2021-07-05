import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge'; // deleteFile
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications'; // deleteFile
import { mainListItems } from './listItems';
import PropTypes from 'prop-types';
import ClaimReward from './ClaimReward'; // deleteFile
import Rewards from './Rewards';
import Transactions from './Transactions';
import RfiReward from './RfiReward';
import Balance from './Balance';
import Navbar from './Navbar'; // deleteFile
import WalletButton from './buttons/WalletButton';
import Logo from '../../../assets/admonkey-logo.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        AdMonkey
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(45deg, #000080 20%, #4682b4 90%)",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logo: {
    maxWidth: "150px",
    width: "100%",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 300,
  },
}));

const calculateReflectionReward = (balance, transactions) => {
  const balanceValue = Number(balance * 10 ** 9);
  let investment = 0;
  for (let i = 0; i < transactions.length; i++) {
    const value = Number(transactions[i].value);

    if (transactions[i].direction == "in") investment += value;
    else investment -= value;
  }

  let result = balanceValue - investment;
  (result = (result / 10 ** 9) * 1000), 8 / 1000;
  return Math.round(result);
};

export default function Dashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const {
    initialized,
    reward,
    onClaimReward,
    isClaimButtonDisabled,
    balance,
    nextAvailableClaimDate,
    transactions,
    invalidChain,
    provider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    loading,
  } = props;

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  let rfiReward = 0;

  if (balance && transactions.length > 0) {
    rfiReward = calculateReflectionReward(balance, transactions);
  }
/*

this
is
not
the
fucking
return
you
are
lookinh
for
porcoddio
foco
ti
odio
sposta
questo
cazzo
di
component
fuori
di
qui
*/
  if (invalidChain || !initialized) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        {/* <Navbar
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          provider={provider}
        /> */}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={Logo} className={clsx(classes.logo)} />
          </div>

          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {!initialized ? (
            <h1>You must connect to a wallet</h1>
          ) : (
            <h1>You must be on chain {process.env.REACT_APP_CHAIN_ID}</h1>
        )}
        </main>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Investor Dashboard
          </Typography>
          <WalletButton
            provider={provider}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Logo} className={clsx(classes.logo)} />
        </div>

        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Rewards reward={reward}
                  balance={balance}
                  nextAvailableClaimDate={nextAvailableClaimDate}
                  onClaimReward={onClaimReward}
                  disabled={isClaimButtonDisabled}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Balance balance={balance} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Paper className={fixedHeightPaper}>
                <RfiReward rfiReward={rfiReward} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Transactions transactions={transactions} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  reward: PropTypes.string,
  nextAvailableClaimDate: PropTypes.instanceOf(Date),
  balance: PropTypes.string,
  drizzleContext: PropTypes.object,
  transactions: PropTypes.array,
};
