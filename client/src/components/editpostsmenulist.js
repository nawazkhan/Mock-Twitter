//* --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

//* Material-UI components
import { MenuItem, MenuList, CircularProgress, withStyles } from '@material-ui/core';

//* Apollo Mutation and Queries
import { DELETE_STATUS, GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    menuListItem: {
        '&:hover': {
            backgroundColor: '#007fec',
            color: '#fff'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const EditPostsMenuList = props => {
    const { id, handleClose, classes, dark_mode } = props;
    return (
        <Mutation
            mutation={DELETE_STATUS}
            refetchQueries={[{ query: GET_AUTHUSER_TWEETS }]}
        >
            {(deleteStatusProp, { loading }) => (
                <MenuList onClick={handleClose}>
                    {loading 
                        ?
                    <CircularProgress />
                        :
                    <MenuItem 
                        onClick={() => deleteStatusProp({
                            variables: {
                                id: id
                            }
                        })}
                        className={classes.menuListItem}
                        // ! Inline styles are used for dark mode
                        style={{ color: dark_mode ? '#fff' : null }}
                    >
                        Delete Tweet
                    </MenuItem>}
                </MenuList>
        
            )}
        </Mutation>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(EditPostsMenuList);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
