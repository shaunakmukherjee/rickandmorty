import React, { Component, useState } from "react";
import { Route, BrowserRouter as Router} from 'react-router-dom';
import Provider from '../api/Provider';
import LoginForm from "../components/LoginForm";
import CardOverView from "./CardOverview";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { CssBaseline } from "@mui/material";



function App () {

  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode? "dark" : "light",
    }
  });

  const handleDarkMode = () => {
    console.log(darkMode);
        setDarkMode(!darkMode)
  }

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
       <Router>
      <Provider>
        <Route exact path = "/">
          <div style={{display: 'flex',  justifyContent:'center', marginTop: '50px' , alignItems:'center'}}>
          <h1> WELCOME, TRAVELLERS. </h1>
          </div >
          <div style={{display: 'flex',  justifyContent:'center', marginTop: '50px' , alignItems:'center'}}>
            <h3> A different look, perhaps? </h3> <Switch onChange={handleDarkMode} value={darkMode} />         
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
           < LoginForm />
          </div> 
          </Route>
        <Route path = "/overview"> <CardOverView /></Route>
      </Provider>
      </Router>
      </ThemeProvider>
    );
}

export default App;
