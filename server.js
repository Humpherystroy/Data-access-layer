const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataAccessLayer = require("./dataAccessLayer");
const { ObjectId, ObjectID } = require("mongodb");
const { request, response } = require("express");
dataAccessLayer.connect();
// TODO: add in middleware: cors. bodyparser
const app = express();
app.use(cors());
app.use(bodyParser.json());

// TODO: add the endpoints e.g. app.get('/path', () => {...})
app.get("/api/games", async (request, response) => {
  const games = await dataAccessLayer.findAll();

  response.send(games);
});

app.get("/api/games/:id", async (request, response) => {
  const gameId = request.params.id;

  if (!ObjectID.isValid(gameId)) {
    response.status(400).send(`GameID ${gameId} is incorrect.`);
    return;
  }

  const gameQuery = {
    _id: new ObjectId(gameId),
  };
  let game;
  try {
    game = await dataAccessLayer.findOne(gameQuery);
  } catch (error) {
    response.status(404).send(`Game with id ${gameId} not found`);
    return;
  }
  response.send(game);
});
app.post("/api/games", async (request, response) => {
  const body = request.body;

  if (!body.name) {
    response.status(400).send("Empty No Text Found!!");

    return;
  }

  if (typeof body.name !== "string") {
    response.status(400), send("Must be a String");
  }
  await dataAccessLayer.insertOne(body);
  response.status(201).send();
});

app.put("/api/games/:id", async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  if (!ObjectID.isValid(gameId)) {
    response.status(400).send(`GameId ${gameId} is incorrect.`);
    return;
  }
  if (body.name && typeof body.name !== "string") {
    response.status(400).send("Must be type of string");
    return;
  }

  const gameQuery = {
    _id: new ObjectId(gameId),
  };
  try {
    await dataAccessLayer.updateOne(gameQuery, body);
  } catch (error) {
    response.status(404).send(`Game with id ${gameId} not found`);
    return;
  }
  response.send();
});
app.delete("/api/games/:id", async (request, response) => {
  const gameId = request.params.id;

  if (!ObjectID.isValid(gameId)) {
    response.status(400).send(`GameID ${gameId} is incorrect.`);
    return;
  }

  const gameQuery = {
    _id: new ObjectId(gameId),
  };
  try {
    await dataAccessLayer.deleteOne(gameQuery);
  } catch (error) {
    response.status(404).send(`Game with id ${gameId} not found`);
    return;
  }

  response.send();
});

const port = process.env.PORT ? process.env.PORT : 3006;
app.listen(port, () => {
  console.log("API STARTED");
});
