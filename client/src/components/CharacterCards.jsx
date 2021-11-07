import React, { Component } from "react";
import { useQuery, gql, useMutation } from '@apollo/client';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddToFavourites from "./AddToFavourites";

/* 

This component displays each Character Card in a 'Card' with various data being parsed through it.
Also contains logic for animated transitions of each card.

*/
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const CharacterCards = ({ character }) => {

    
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
      setExpanded(!expanded);
    }
    const epLength = character.episode.length;
    const all_episodes = character.episode
    const latestEpisodes = []

    /* this function sorts the episodes, and returns the 3 latest episodes ONLY WHEN 
    * the number of episodes for that character is more than 3. Otherwise, it
    * just displays all of the episodes for that character, in reverse chronological order,
    * i.e. latest first, and so on.
    */
    const getLatestEpisodes = () => {
      let i = epLength-1;
      let j = epLength>3? epLength-3 : 0;
      while(i>=j){
        latestEpisodes.push(all_episodes[i].name);
        i=i-1;
        }
      console.log(latestEpisodes)
      return latestEpisodes
    }

  
  return (
    <div>
      <Card sx={{ width: 400 }}>
        <CardHeader
          action={
            
            < AddToFavourites charId = {character.id} />
          }
          title={character.name}
          subheader={character.species}
        />
        <CardMedia
          component="img"
          height="190"
          image={character.image}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Gender: {character.gender}
            <br />
            Status: {character.status}
            <br />
            Dimension: {character.location.dimension}
            <br />
            Origin: {character.origin.dimension}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1">Latest episode/s: </Typography>
            <br />
            <Typography variant="body2">
              {getLatestEpisodes().map(episodeName => (
                <li key = {episodeName}> {episodeName} </li>
              ))}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )


}

export default CharacterCards;