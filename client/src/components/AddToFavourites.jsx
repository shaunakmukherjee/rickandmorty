/* 

This component determines the logic of adding each character to the 'Favourites'.

*/

import React, { Component, useState } from "react";
import { favItemsVar } from "../cache";
import { gql, useMutation, useQuery } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MAKE_FAVOURITE = gql `
mutation MakeFavourite($favId: ID!) {
  makeFavourite(favId: $favId) {
    success
    message
  }
}`;


function AddToFavourites (props) {
    //console.log(characterId)
    //console.log(character)
    const characterId = props.charId
    const [clicked, setClicked] = useState(false, favItemsVar());


    // the openAlert checks the status of the snackbar alert to be displayed whenever a character has been favourited,
    // and the handleClose works when the user clicks anywhere else on the screen, or the 'X' button
    const [openAlert, setOpenAlert] = useState(false)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };

    //console.log(favItemsVar)
    const [addtoFavourites, { data, loading, error}] = useMutation(MAKE_FAVOURITE, {
      variables: {
        favId: characterId
      },
      onCompleted: () => {
        if(!favItemsVar().includes(characterId))
          favItemsVar([...favItemsVar(), characterId])
        setClicked(true, favItemsVar())
        console.log("CHARACTER HAS BEEN FAVOURITED!")
        setOpenAlert(true)
        console.log("FAVOURITES NOW ARE: ", favItemsVar())
        
      }
    });
    if (loading) console.log("ADDING...");
    if (error) console.log("ERROR! ", error);
    if(data) console.log("DATA", data)

    return (
      <div><IconButton aria-label="add to favorites" onClick={addtoFavourites}>
              {clicked? <FavoriteIcon /> : <FavoriteBorderIcon/> }
      </IconButton>
       <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         Character has been added to your favourites!
       </Alert>
     </Snackbar>
     </div>
    )

    
}
export default AddToFavourites