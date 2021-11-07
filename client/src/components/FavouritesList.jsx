/* 

This component displays the list of all Favourited Cards
as fetched efficiently through the GraphQL API exposed in this app.

*/


import React, { Component,  useState } from "react";
import { useQuery, gql } from '@apollo/client';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import  CharacterCards  from './CharacterCards';
import { useReactiveVar } from '@apollo/client';
import { favItemsVar } from "../cache";

const GET_FAVCHARS = gql `
query FindFavs($ids: [ID!]!){
  charactersByIds(ids: $ids){
        id
        name
        gender
        species
        image
        status
        location {
        id
        dimension
        }
        origin {
        id
        dimension
        }
        episode{
          id
          name
          air_date
          episode
        }
  }
}
`;

const FavouritesList = () => {
    const favCards = favItemsVar()
    console.log(favCards)
    const { loading, error, data } = useQuery(GET_FAVCHARS, {
      variables: {
        ids: favCards
      }
    })
    if (loading) 
    return <CircularProgress />

    if (error)
    return(
    <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> You don't have any favourites yet! Click on the above button and get favouriting :)</h2>
    )

    return(

      <div>
      <Grid container spacing={5}>
      {data.charactersByIds.map(character => (
        <Grid item  key = {character.id}>
        <CharacterCards character = {character} key = {character.id}/> 
        </Grid>
      )
      )}
      </Grid>
      </div>
        
    )
}

export default FavouritesList;