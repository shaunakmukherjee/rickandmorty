const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utilfunctions.jsx')


  
async function login (_, { username }, { dataSources }) {
  const user = await dataSources.userAPI.findOrCreateUser({ username });
  console.log("USER IS ==>", user)
  if (user) {
    user.token = Buffer.from(username).toString('base64');
    return user
  }
};

/* this mutation is responsible for creating a new favourite for the particular user through their context */
async function makeFavourite (_, { favId }, { dataSources })  {
  const results = await dataSources.userAPI.makeFavourite({ favId }); 
  console.log(results)
  const favourite = await dataSources.ricknmortyapi.getCharacterById(favId);
  console.log("FAVOURITE IS =>", results)
  console.log("Result", results.length, "\nFav", favId.length)
  return {
    
    success: results? true : false,
    message:
      results
        ? 'character favourited successfully!'
        : `the character could not be favourited :(`,
    favourite,
  };
}


  
module.exports = {
    login,
    makeFavourite
  }