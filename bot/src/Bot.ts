import { Client } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import {connect} from "./DBConnection"

const token = require("../config.json").token;
console.log("Bot is starting...");
connect().catch(error => console.error(error));; //conexion a la base de datos
const client = new Client({
    intents: []
})
ready(client);
interactionCreate(client);

client.login(token);
