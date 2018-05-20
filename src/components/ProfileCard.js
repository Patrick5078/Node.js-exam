import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    name: {
        fontSize: '18px',
        fontWeight: 'bold'
    }
};

function ImageAvatars(props) {
    const { classes } = props;
    return (
        <div className={classes.row}>
            <Avatar
                alt="Adelle Charles"
                src={window.location.origin + '/images/' +props.profilePicture}
                className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <p className={classes.name}>{props.profileName}</p>
        </div>
    );
}

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);