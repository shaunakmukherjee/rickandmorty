/* 
This module is responsible for creating a Sequelize ORM-based database,
and creating a User Store that shall be accessed by userstore.jsx
*/

const {Sequelize} = require('sequelize');


module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite',
    define: {
      freezeTableName: true
    }
  });

  const users = db.define('users', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    username: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    token: Sequelize.STRING,
  });

  const favourites = db.define('favourite', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    favId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
  });
  users.sync();
  favourites.sync();
  return { db, users, favourites };
};