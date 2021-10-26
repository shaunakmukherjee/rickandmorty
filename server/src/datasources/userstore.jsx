const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * It gets called with the datasource config including things
   * like caches and context. 
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes username, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ username: usernameArg } = {}) {
    const username =
      this.context && this.context.user ? this.context.user.username : usernameArg;
    if (!username) return null;
    console.log("GETS TO HERE")
    const users = await this.store.users.findOrCreate({ where: { username } });
    return users && users[0] ? users[0] : null;
  }

  async getAllUsers(){
    return await this.store.users.findAll()
  }

  async getAllFavourites(){
    return await this.store.favourites.findAll()
  }

  //this is the logic for adding a character into their favourites, based on the user
  async makeFavourite({ favId }) {
    const userId = this.context.user.id;
    return this.store.favourites.findOrCreate({
      where: { userId, favId },
    });
  }

  //this makes us get the user's favourites for displaying 
  async getFavIdsByUser() {
    const userId = this.context.user.id;
    console.log("USER IS", userId)
    const found = await this.store.favourites.findAll({
      where: { userId },
    });
    return found
  }

}

module.exports = UserAPI;