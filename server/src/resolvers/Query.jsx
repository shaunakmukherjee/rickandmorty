async function feed(parent, args, {dataSources}, info){
        return dataSources.userAPI.getAllFavourites()
  }

async function allUsers(parent, args, {dataSources}, info){
    return dataSources.userAPI.getAllUsers()
}

async function charactersPerPage(parent, {pageNumber}, {dataSources}, info){
    return dataSources.ricknmortyapi.getCharactersByPage(pageNumber)
}
async function favsbyUser(_, args, {dataSources}, info){
    return dataSources.userAPI.getFavIdsByUser()
}
async function charactersByIds(_, {ids}, {dataSources}, info){
    return dataSources.ricknmortyapi.getCharactersByIds(ids)
}
async function character(_, {id}, {dataSources}){
    return dataSources.ricknmortyapi.getCharacterById(id)
}


module.exports = {
    feed,
    allUsers,
    character,
    favsbyUser,
    charactersByIds,
    charactersPerPage,
}