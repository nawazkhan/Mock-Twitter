// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// * Material-UI components
import { CircularProgress, withStyles, Grid } from '@material-ui/core';

// * Components
import Navbar from '../../components/navbar';
import SearchAppBar from '../../components/searchappbar';
import Trending from '../../components/trending';
import SearchQueryTimeline from '../../components/searchquerytimeline';

// * Pages
import NotFound from './notfound';

// * Apollo Query
import { VERIFY_USER } from '../../apolloclient/apolloqueries';

// * Helper function
import { changeGridBackground, fontColorChange, changeComponentBackground, changeBorder } from '../../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    errorAndLoadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    searchTrendingGrid: {
        paddingLeft: '6em',
        [theme.breakpoints.up('sm')]: {
            paddingRight: '2em'    
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: '6em'
        }
    },
    searchPageContainerStyle: {
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: '1em',
        [theme.breakpoints.up('sm')]: {
            padding: '0.7em 0em 4em 0em',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'initial'    
        }
    },
    searchQueryTimelineGrid: {
        marginTop: '1em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let SearchPage = props => {
    const { classes, dark_mode } = props;
    const param = props.match.params.params; 
    return (
        <Query query={VERIFY_USER}>
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                if (error) return <div><NotFound /></div>;
                return (
                    <React.Fragment>
                        <Navbar 
                            profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                            avatarImg={data.currentUser.verifyCredentials.profile_image_url_https}
                            name={data.currentUser.verifyCredentials.name}
                            screenName={data.currentUser.verifyCredentials.screen_name}
                            darkModeBorder={changeBorder(dark_mode)}
                            darkModeFont={fontColorChange(dark_mode)}
                            darkModeComponentBackground={changeComponentBackground(dark_mode)}                   
                        />
                        <SearchAppBar
                            searchQuery={param}
                            profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                            dark_mode={dark_mode}
                        />
                        <Grid container className={classes.searchPageContainerStyle} style={{ backgroundColor: changeGridBackground(dark_mode) }}>
                            <Grid item xs={10} sm={5} md={4} lg={3} className={classes.searchTrendingGrid}>
                                <Trending 
                                    profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                    darkModeBorder={changeBorder(dark_mode)}
                                    darkModeFont={fontColorChange(dark_mode)}
                                    darkModeComponentBackground={changeComponentBackground(dark_mode)}            
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.searchQueryTimelineGrid}>
                                <SearchQueryTimeline
                                    profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                    screenName={data.currentUser.verifyCredentials.screen_name}
                                    searchQuery={param}
                                    dark_mode={dark_mode}
                                    darkModeBorder={changeBorder(dark_mode)}
                                    darkModeFont={fontColorChange(dark_mode)}
                                    darkModeComponentBackground={changeComponentBackground(dark_mode)}            
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
    };
};

// ----------------------------------------------------------------------------------------------------- //

SearchPage = connect(
    mapStateToProps
)(SearchPage);

// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SearchPage);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
