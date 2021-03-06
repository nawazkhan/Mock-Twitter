// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// * Material-UI components
import { Button, Avatar, Tooltip, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Typography, withStyles } from '@material-ui/core';
import { PersonOutline } from '@material-ui/icons';

// * Components
import DarkModeToggle from './darkmodetoggle';

// * Firebase
import firebaseClass from '../helpers/firebase';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    twitterAvatar: {
        width: 30,
        height: 30,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    profileAvatarTooltip: {
        backgroundColor: '#000'
    },
    profileAvatarButton: {
        color: '#fff',
        padding: '0',
        fontSize: '1em'
    },
    menuHandleTextUpper: {
        wordBreak: 'break-word',
        display: 'block'
    },
    menuHandleTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '1em'
    },
    handleTextUpperDiv: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end'
    },
    menuDivider: {
        borderBottom: '1px solid #80808026'
    },
    menuPersonOutline: {
        color: '#000',
        marginRight: '0.8em'
    },
    profileMenuGrid: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    profileParentGrid: {
        borderBottom: '1px solid #80808026',
        '&:hover': {
            backgroundColor: '#fff'
        }
    },
    profileChildMenuGrid: {
        borderBottom: '1px solid #80808026',
        '&:hover': {
            backgroundColor: '#00acee'
        }
    },
    profileChildMenuGridText: {
        '&:hover': {
            color: '#fff'
        }
    },
    buttonRefClass: {
        paddingTop: '0em'
    },
    popperRootClass: {
        marginTop: '0.5em'
    },
    profileLinkClass: {
        textDecoration: 'none',
        display: 'flex',
        '&:hover': {
            textDecoration: 'none'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

class ProfileAvatarModal extends Component {
    state = {
        open: false
    };

    handleToggle = () => {
        this.setState({ 
            open: true 
        });
    };

    handleClose = () => {
        this.setState({ 
            open: false 
        });
    };

    // ----------------------------------------------------------------------------------------------------- //

    render() {
        const { classes, avatarImg, name, screen_name, screenName, darkModeFont, darkModeComponentBackground } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <Tooltip
                    title={
                        <Button className={classes.profileAvatarButton}>
                            Profile and settings
                        </Button>
                    }
                    classes={{
                        tooltip: classes.profileAvatarTooltip
                    }}
                >
                    <Button 
                        buttonRef={node => {
                                this.anchorEl = node;
                        }}
                        className={classes.buttonRefClass}
                    >
                        <Avatar 
                            alt="twitter avatar" 
                            src={avatarImg} 
                            className={classes.twitterAvatar} 
                            aria-owns={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                        />
                    </Button>
                </Tooltip>
                    <Popper 
                        open={open} 
                        anchorEl={this.anchorEl} 
                        transition 
                        disablePortal
                        className={classes.popperRootClass}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            {/* // ! Inline styles are used for dark mode */}
                            <Paper style={{ backgroundColor: darkModeComponentBackground }}>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={this.handleClose} className={classes.profileChildMenuGrid}>
                                            {/* // ! Inline styles are used for dark mode */}
                                            <Typography variant="subtitle2" style={{ color: darkModeFont }}>
                                                <div className={classes.handleTextUpperDiv}>
                                                    <span className={classes.menuHandleTextUpper}>{name}</span>
                                                    <span className={classes.menuHandleTextLower}>@{screen_name}</span>
                                                </div>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose} className={classNames(classes.menuDivider, classes.profileChildMenuGrid, classes.menuPersonOutline)}>
                                            <Link to={`/userprofile/${screenName}`} className={classes.profileLinkClass}>
                                                <PersonOutline className={classes.menuPersonOutline} style={{ color: darkModeFont }}/>
                                                {/* // ! Inline styles are used for dark mode */}
                                                <Typography variant="subtitle1" className={classes.profileChildMenuGridText} style={{ color: darkModeFont }}>
                                                    Profile
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className={classNames(classes.menuDivider, classes.profileChildMenuGrid)}>
                                            {/* // ! Inline styles are used for dark mode */}
                                            <DarkModeToggle 
                                                darkModeFont={darkModeFont}
                                            />
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose} className={classNames(classes.menuDivider, classes.profileChildMenuGrid)}>
                                            {/* // ! Inline styles are used for dark mode */}
                                            <Typography 
                                                variant="subtitle1" 
                                                className={classes.profileChildMenuGridText}
                                                onClick={() => firebaseClass.signOut()}
                                                style={{ color: darkModeFont }}
                                            >
                                                Log Out @{name}
                                            </Typography>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>
        );

    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileAvatarModal);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
