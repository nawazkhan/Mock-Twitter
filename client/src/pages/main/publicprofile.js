// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import PublicProfileBanner from '../../components/publicprofilebanner';
import ProfileBannerBar from '../../components/profilebannerbar';
import PublicProfileHandle from '../../components/publicprofilehandle';
import Recommended from '../../components/recommended';
import Trending from '../../components/trending';
import PublicProfileTimeline from '../../components/publicprofiletimeline';
import Error from '../../components/error';

// Apollo Query
import { VERIFY_USER } from '../../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicProfileContainerStyle: {
        marginTop: '0.7em',
        display: 'flex',
        justifyContent: 'center'
    },
    publicProfileHandlerGrid: {
        width: 'auto',
        paddingRight: '0em'
    },
    publicProfileTimelineItem: {
        marginRight: '0.6em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let PublicProfile = props => {
    const param = props.match.params.params; 
    const { classes } = props;
    return (
        <React.Fragment>
            <Navbar /> 
            <PublicProfileBanner
                URLparam={param}
            />
            <Query query={VERIFY_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) return <div><Error /></div>; 
                    
                    return (
                        <React.Fragment>
                            <ProfileBannerBar 
                                URLparam={param}
                                currentUser={data.currentUser.verifyCredentials.screen_name}
                            />
                            <Grid container className={classes.publicProfileContainerStyle}>
                                <Grid item xs={8} sm={8} md={2} className={classes.publicProfileHandlerGrid}>
                                    <PublicProfileHandle 
                                        URLparam={param}
                                    />
                                </Grid>
                                <Grid item md={4} className={classes.publicProfileTimelineItem}>
                                    <PublicProfileTimeline
                                        URLparam={param}
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <Recommended />
                                    <Trending />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    );
                }}
            </Query>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

PublicProfile = withStyles(styles)(PublicProfile);

export default withRouter(PublicProfile);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
