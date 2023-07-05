import { Client } from "discord.js";
import interactionCreate from "./listeners/InteractionCreate";
import ready from "./listeners/Ready";
import { DatabaseConnection } from "./DBConnection";

async function main() {
    const token = require("../config.json").token;
    console.log("Bot is starting...");
    DatabaseConnection.initializeDB();
    DatabaseConnection.loadDBData();
    const client = new Client({
        intents: []
    });
    ready(client);
    interactionCreate(client);
    await client.login(token);
}

main().catch((error) => {
    console.error("An error occurred:", error);
});
