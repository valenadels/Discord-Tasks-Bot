import { Client } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";


const token = require("../config.json").token;
console.log("Bot is starting...");
const client = new Client({
    intents: []
})
ready(client);
interactionCreate(client);

client.login(token);
