import { Client } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import { DatabaseConnection } from "./DBConnection";


const token = require("../config.json").token;
console.log("Bot is starting...");

// Uso de la clase DatabaseConnection
const dbConnection = new DatabaseConnection();
dbConnection
  .connect()
  //.then(() => {
    // Aquí puedes comenzar a trabajar con la base de datos
  //})
  .catch((error) => console.log(error));
const client = new Client({
    intents: []
})
ready(client);
interactionCreate(client);

client.login(token);
