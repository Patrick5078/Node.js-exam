import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
    popperClose: {
        pointerEvents: 'none',
    },
});

class ProfileDropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };
    }
    handleToggle = () => {
        this.setState({ open: !this.state.open });
    };

    handleClose = event => {
        if (this.target1.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    handleLogout = () => {
        localStorage.removeItem('jwt');
        location.href = '/'
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <Manager>
                    <Target>
                        <div
                            ref={node => {
                                this.target1 = node;
                            }}
                        >
                            <div
                                aria-owns={open ? 'menu-list-grow' : null}
                                aria-haspopup="true"
                                onClick={this.handleToggle}
                            >
                                <div id={'logged-in-profile'}>
                                <p className={'margin-right cursor-pointer'}>{this.props.profileName}</p>
                                <img id={'header__profile-pic'} src={window.location.origin + '/images/' +this.props.profilePicture}/>
                            </div>
                            </div>
                        </div>
                    </Target>
                    <Popper
                        placement="bottom-start"
                        eventsEnabled={open}
                        className={classNames({ [classes.popperClose]: !open })}
                    >
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                                <Paper>
                                    <MenuList role="menu">
                                        <Link to={'/profile'}><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link>
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </Paper>
                            </Grow>
                        </ClickAwayListener>
                    </Popper>
                </Manager>
            </div>
        );
    }
}

ProfileDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileDropdown);