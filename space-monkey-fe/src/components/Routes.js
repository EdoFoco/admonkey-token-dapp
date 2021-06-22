import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Rewards/rewardsDashboard/Dashboard';

// other pages and layout
import RewardsContainer from './Rewards/RewardsContainer';

function Routes(props) {
  return (
    <Router>
      <Route path="/" exact render={props =>
        <RewardsContainer />
        //<Dashboard />
      } />
      {/* <Route path="/pots" exact render={ props =>
        // <MainLayout><Pots /></MainLayout>
      }/> */}

    </Router>
  )
}

export default Routes;
