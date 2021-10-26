const { GraphQLDataSource } = require('apollo-datasource-graphql');

const { gql } = require('apollo-server-express');

//this query gets each character based on their IDs
const EACH_CHARACTER = gql `
 query EachChar($id: ID!) { 
  character(id: $id){
    id
    name
    status
  }
}
`;
//this is an extension of the previous query, getting a list of characters from a list of IDs
// which we'll use in the adding of favourites.
const CHARACTERS_BY_IDS = gql `
query CharsByIds($ids: [ID!]!){
  charactersByIds(ids: $ids){
        id
        name
        image
        species
        status
        location{
          id
          dimension
        }
        episode{
          id
          air_date
          name
          episode
        }
        gender
        origin{
          id
          dimension
         }
  }
}`
//this query gets all characters from a particular page in the API
const CHARS_PER_PAGE = gql `
query CharsPerPage ($page: Int){
  characters(page: $page) {
    info {
      count
      pages
    }
    results {
       name
        id
        image
        species
        status
        location{
          id
          dimension
        }
        episode{
          id
          air_date
          name
          episode
        }
        gender
        origin{
          id
          dimension
         }
    }
  }
}
`;



class RicknMortyApi extends GraphQLDataSource {
    constructor() {
        super();
        this.baseURL = 'https://rickandmortyapi.com/graphql';
      }
      
      async getCharactersByPage( pageNumber ){
        try{
          const response = await this.query(CHARS_PER_PAGE, {
            variables: {
              page: pageNumber
            }
          });
          return response.data.characters.results;
        }
        catch(error){
          console.error(error);
        }
      }
      
      async getCharacterById( favId ){
        try{
          const response = await this.query(EACH_CHARACTER, {
            variables: {
              id: favId
            }})
        return response.data.character;
          }
          catch (error) {
            console.error(error);
          }
      }

      async getCharactersByIds( favIds ){
        try{
          const response = await this.query(CHARACTERS_BY_IDS, {
            variables: {
              ids : favIds
            }})
        return response.data.charactersByIds;
          }
          catch (error) {
            console.error(error);
          }
      }
}
module.exports = RicknMortyApi