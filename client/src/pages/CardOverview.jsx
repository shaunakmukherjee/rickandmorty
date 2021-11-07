/* 
* This page displays all the Cards, along with other functionalities such as 
* Pagination, and the conditional rendering of the 'MY FAVOURITES' component with
* 'ALL CHARACTERS'.
*/

import React, { Component, useEffect, useState } from "react";
import Header from "../components/Header";
import { favItemsVar } from "../cache";
import CardList from "../components/CardList";
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Button, Paper } from "@mui/material";
import FavouritesList from "../components/FavouritesList";
import ForwardIcon from '@mui/icons-material/Forward';
import { CssBaseline } from "@mui/material";


const GET_FAVS = gql`
query FavByUser {
  favsbyUser {
    favId
  }
}`;

const CardOverview  = () => {
    
    const { loading, error, data } = useQuery(GET_FAVS);

    if (loading) console.log("loading...")
    if (error) console.error("error...", error)

    const [showFavs, setShowFavs] = useState(true,
      < CardList />
    )
    function handleClick() {
      setShowFavs(!showFavs, < FavouritesList />)
      console.log(showFavs)
    }
    useEffect(() => {
    if(data){
      favItemsVar([])
      console.log(favItemsVar())
      const favouriteIds= []
      console.log(data.favsbyUser)
      {data.favsbyUser.map(favourite => (
        favouriteIds.push(favourite.favId)
      ))}
      console.log(favouriteIds)
      favItemsVar(favouriteIds)
    }}, [data])

    
    return (
      <CssBaseline>
      <div>
          < Header />
        <p />
        <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> The Rick and Morty API awaits you. </h1>
        


        <div style={{display: 'flex',  justifyContent:'right', alignItems:'right', paddingRight: '100px'}}>
        <Button variant="contained" endIcon={<ForwardIcon />} onClick={handleClick}>
          {showFavs? 'MY FAVOURITES' : 'SHOW ALL CHARACTERS'}
          </Button>
        </div>
        
        <div className="column">
          {showFavs? <CardList /> : <FavouritesList />}
        </div>
      </div>
      </CssBaseline>
      );
}
  
  export default CardOverview;
  