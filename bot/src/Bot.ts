import { Client } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import { DatabaseConnection } from "./DBConnection";
import { loadData } from "./loadDB";


const token = require("../config.json").token;
console.log("Bot is starting...");

// Uso de la clase DatabaseConnection
const dbConnection = new DatabaseConnection();
dbConnection
  .connect()
  .then((c) => loadData(c).catch(error => console.error('Error:', error)))
  .catch((error) => console.log(error));
const client = new Client({
    intents: []
})
ready(client);
interactionCreate(client);

client.login(token);


