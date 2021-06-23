import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import PropTypes from 'prop-types';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function RfiReward(props) {
    const { rfiReward } = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Your Reflection Rewards</Title>
            <Typography component="p" variant="h4">
                {rfiReward}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                $ADMONKEY earned just by holding
            </Typography>
        </React.Fragment>
    );
}

RfiReward.propTypes = {
    rfiReward: PropTypes.Number
};