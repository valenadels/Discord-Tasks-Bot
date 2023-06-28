import { Client } from "discord.js";
import interactionCreate from "./listeners/InteractionCreate";
import ready from "./listeners/Ready";
import { DatabaseConnection } from "./DBConnection";


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






