const { request } = require("express");
// TODO: require mongodb
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
// TODO: require env file
require("dotenv").config();

// TODO: read those env variable from the porcess.env.VAR_NAME
const url = process.env.MONGODB_URL;
const dataBaseName = process.env.MONGODB_DATABASE;

console.log(url);
console.log(dataBaseName);

const gameName = "games";
const settings = {
  useUnifiedTopology: true,
};
// TODO: Define all function that talk to database
let dataBaseUser;
let gameCollection;

// connect()
const connect = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, settings, (error, client) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      dataBaseUser = client.db(dataBaseName);
      gameCollection = dataBaseUser.collection(gameName);
      console.log("SUCCESFULLY CONNECTED TO DATABASE!!");
      resolve;
    });
  });
};
/*
- findAll documents (READ - R from CRUD)
-FindONe document (READ)
    -insertOne() document (CREATE)
    -updateOne() document (UPDATE)
    -deleteOne()  document (DELETE)
*/
const findAll = function () {
  const query = {};

  return new Promise((resolve, reject) => {
    gameCollection.find(query).toArray((error, games) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      console.log(`SUCCESFULLY FOUND ${games.length} GAMES`);
      resolve(games);
    });
  });
};

const insertOne = function (game) {
  return new Promise((resolve, reject) => {
    gameCollection.insertOne(game, (error, result) => {
      if (error) {
        console.log(errro);
        reject(error);
        return;
      }
      console.log("SUCCESFULLY WROTE A REVIEW");
      resolve();
    });
  });
};

const findOne = function (query) {
  return new Promise((resolve, reject) => {
    gameCollection.find(query).toArray((error, games) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      if (games.length > 0) {
        console.log("FOUND GAME!!");
        const game = games[0];
        resolve(game);
      } else {
        reject("NO GAME FOUND");
      }
    });
  });
};

const updateOne = function (query, newGame) {
  const newGameQuery = {};

  if (newGame.name) {
    newGameQuery.name = newGame.name;
  }

  if (newGame.imageUrl) {
    newGameQuery.imageUrl = newGame.imageUrl;
  }

  if (newGame.comments) {
    newGameQuery.comments = newGame.comments;
  }

  return new Promise((resolve, reject) => {
    gameCollection.updateOne(query, { $set: newGameQuery }, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      } else if (result.modifiedCount === 0) {
        console.log("No POST Found");
        reject("No POST Found");
        return;
      }

      console.log("SUCCESSFULLY UPDATED POST!");
      resolve();
    });
  });
};
const deleteOne = function (query) {
  return new Promise((resolve, reject) => {
    gameCollection.deleteOne(query, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      } else if (result.deletedCount === 0) {
        console.log("No Post Found");
        reject("No Post Found");
        return;
      }
      console.log("SUCCESSFULLY DELETED POST");
      resolve();
    });
  });
};
// TODO: module.exports = {connect, ...}
module.exports = { connect, insertOne, findAll, findOne, updateOne, deleteOne };

/*
- findAll documents (READ - R from CRUD)
-FindONe document (READ)
    -insertOne() document (CREATE)
    -updateOne() document (UPDATE)
    -deleteOne()  document (DELETE)
*/
