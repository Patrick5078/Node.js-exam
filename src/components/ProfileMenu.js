import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: theme.palette.background.paper,
    },
});

function ListDividers(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <Link to={'/profile'}>
                <ListItem button>
                    {props.activeItem !== 'subscriptions' && props.activeItem !== 'settings' ? <ListItemText className={'bold-child-text'} primary="Account" /> : <ListItemText primary="Account" /> }
                </ListItem>
                </Link>
                <Link to={'/profile/subscriptions'}>
                <Divider />
                <ListItem button divider>
                    {props.activeItem === 'subscriptions' ? <ListItemText className="bold-child-text" primary="Subscriptions" /> : <ListItemText primary="Subscriptions" />}
                </ListItem>
                </Link>
                <Link to={'/profile/settings'}>
                <ListItem button>
                    {props.activeItem === 'settings' ? <ListItemText className={'bold-child-text'} primary="Settings" /> : <ListItemText primary="Settings" />}
                </ListItem>
                </Link>
            </List>
        </div>
    );
}

ListDividers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers);
