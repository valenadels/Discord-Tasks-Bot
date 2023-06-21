import { Client } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import { DatabaseConnection } from "./DBConnection";
import { loadData } from "./loadDB";

const token = require("../config.json").token;
console.log("Bot is starting...");
DatabaseConnection.initializeDB();
DatabaseConnection.loadDBData();
const client = new Client({
    intents: []
})
ready(client);
interactionCreate(client);

client.login(token);

//dbConnection.close();




