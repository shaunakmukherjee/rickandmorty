
const { ApolloServer } = require('apollo-server')
const { getUserId } = require('./utilfunctions.jsx')
const RicknMortyApi = require('./datasources/ricknmorty.jsx')
const UserAPI = require('./datasources/userstore.jsx')
const Query = require('./resolvers/Query.jsx')
const Mutation = require('./resolvers/Mutation.jsx')

const { createStore } = require('./utilfunctions.jsx')
const fs = require('fs');
const path = require('path');

//creating a store for our users
const store = createStore();

/* connecting the two data sources : one for getting the data from the Rick and Morty API and exposing it as a GraphQL API, 
* and one for storing the various functions which are user-based from the store.
*/
const dataSources = () => ({
  ricknmortyapi: new RicknMortyApi(),
  userAPI: new UserAPI({ store }),
}); 
const resolvers = {
  Query, 
  Mutation,
}

const context = async ({ req }) => {
  // simple auth check on every request, converting the usernames through a buffer to an 'encrypted' token
  const auth = (req.headers && req.headers.authorization) || '';
  const username = Buffer.from(auth, 'base64').toString('ascii');

  if (!username) return { user: null };
  const users = await store.users.findOrCreate({ where: {username } });
  const user = users && users[0] ? users[0] : null;

  return { user };
};


// instantiating GraphQL
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
      ),
  resolvers,
  dataSources,
  context,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );