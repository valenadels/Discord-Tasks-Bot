import { Client } from "discord.js";
import ready from "./listeners/Ready";
import { DatabaseConnection } from "./DBConnection";


async function main() {
    const token = require("../config.json").token;
    console.log("Bot is starting...");
    DatabaseConnection.initializeDB();
    let client = new Client({
        intents: []
    });
    ready(client);
}

main().catch((error) => {
    console.error("An error occurred:", error);
});
