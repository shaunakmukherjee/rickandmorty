/* 

This component displays the list of all Character Cards
as fetched efficiently through the GraphQL API exposed in this app.

*/


import React, { Component,  useState } from "react";
import { useQuery, gql } from '@apollo/client';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import  CharacterCards  from './CharacterCards';
import Pagination from '@mui/material/Pagination';

const CHARS_PER_PAGE = gql `
query Query($pageNumber: Int) {
  charactersPerPage(pageNumber: $pageNumber) {
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
          air_date
          name
          episode
        }
  }
}
`;


const CardList = () => {
    //const [CardList, setCardList] = useState([]);

    //setting the user's current page
    const [userPage, setUserPage] = useState(1)

    const { loading, error, data } = useQuery(CHARS_PER_PAGE, {
      variables: {
        pageNumber: userPage,
      }
    });
  
    if (loading) 
    return <CircularProgress />

  if (error || !data || !data.charactersPerPage)
    return <p>Error :( {error} </p>;
    
    //setCardList(data.characters);

 
  return(
    <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
           <Pagination
          count={34} color="primary" page={userPage} hideNextButton={false} hidePrevButton={false}
          onChange={(event, value) => setUserPage(value)}
          />
          </div>
          <Grid container spacing={5}>
          {data.charactersPerPage.map(character => (
            <Grid item  key = {character.id}>
            <CharacterCards character = {character} key = {character.id}/> 
            </Grid>
          )
          )}
          </Grid>
         
          </div>
          
  )
}

export default CardList;