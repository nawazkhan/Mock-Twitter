// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import ProfileHandle from '../../components/profilehandle';
import SubmitTweet from '../../components/submittweet';
import Recommended from '../../components/recommended';
import Trending from '../../components/trending';
import Error from '../../components/error';

// Apollo Query
import { VERIFY_USER } from '../../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    containerStyle: {
        marginTop: '3.5em',
        justifyContent: 'center'
    },
    profileHandlerGrid: {
        width: 'auto'
    }
});

// ----------------------------------------------------------------------------------------------------- //

class Main extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Navbar />
                <Grid container className={classes.containerStyle}>
                    <Grid item xs={8} sm={8} md={2} className={classes.profileHandlerGrid}>
                        <ProfileHandle />
                        <Trending />
                    </Grid>
                    <SubmitTweet />
                    <Grid item xs={8} sm={8} md={2} className={classes.profileHandlerGrid}>
                        <Query query={VERIFY_USER}>
                            {({ loading, error, data }) => {
                                if (loading) return <div><CircularProgress /></div>;
                                if (error) return <div><Error /></div>;
                                
                                return(
                                    <Recommended 
                                        currentUser={data.currentUser.verifyCredentials.screen_name}
                                    />
                                );
                            }}
                        </Query>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(withStyles(styles)(Main));

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //