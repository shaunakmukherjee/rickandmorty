import React, { useState } from 'react'
import { Button, FormControl, Box, Divider } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { useHistory } from 'react-router-dom';
import { favItemsVar } from '../cache.jsx';

/* 

This component displays the form for each user to log in/sign up,
and is the first component to be displayed at '/'

*/
function LoginForm() {

    const history = useHistory();
    const [userInfo, setUserInfo] = useState({
        loggedIn: true,
        username: ''
    })

    // executing the login mutation as described in the backend
    
    const [login] = useMutation(LOGIN_USER, {
    variables: userInfo,
    onCompleted: ({ login }) => {
        localStorage.setItem('token', login.token);
      console.log("USER IS IN THE SYSTEM!");
      //console.log(login.user)
      history.push({
        pathname: '/overview',
        state: login
    })
      favItemsVar([])
      console.log(favItemsVar())
    },
    onError: (err) => {
        console.log(err.graphQLErrors);
    },
  });

    return (      
    <Box 
    component="form"
    sx={{
        bgcolor: 'background.paper',
        boxShadow: 2,
        borderRadius: 2,
        mt: 20,
        p: 1,
        display: 'flex',
        width: 300,
        height: 100
      }}
      noValidate
      >
        <FormControl>
        <InputLabel htmlFor="component-outlined">Your username</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={userInfo.username}
          type = "text"
          onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
          label="username"
            />
        </FormControl>
            <Divider variant='middle'/>
            <Button variant="contained" color="primary" onClick={login}>GET ME IN!</Button>
        
    </Box>
    );
}

const SIGNUP_USER = gql `
mutation SignupUser(
    $username: String!
){
    signup(
        username: $username
    ){
        token
    }
}
`;

const LOGIN_USER = gql`
mutation LoginUser(
    $username: String!
){
    login(
        username: $username
    ){
        token
    }
}
`;

export default LoginForm
