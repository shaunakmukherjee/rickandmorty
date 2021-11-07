import React, { Component,  useState } from "react";
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants.jsx';
import { Button, AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material';
import { favItemsVar } from "../cache.jsx";
import { useApolloClient } from "@apollo/client";

/* 

This component displays the Header, containing a greeting for each logged-in user,
and a logout button.
*/
const Header = (props) => {
  
    const client = useApolloClient();
    const history = useHistory();
    const authUser = atob(localStorage.getItem('token'));
    //const userAuth = localStorage.getItem('userId');
    console.log(authUser)
    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="button" component="div"  sx={{ flexGrow: 1, fontWeight: 'bold'}}>
            Welcome, {authUser}
          </Typography>
          <Button color="inherit" sx={{ fontWeight: 'bold'}} onClick={() => {
              localStorage.removeItem(authUser);
              favItemsVar([])
              client.clearStore();
              history.push(`/`);
            }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
        
      );
}
  
  export default Header;
  