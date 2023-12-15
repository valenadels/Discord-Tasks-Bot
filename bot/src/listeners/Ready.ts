import { Client } from "discord.js";
import { loadCommands } from "../Commands";

export default async (client: Client): Promise<void> => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(loadCommands());

        console.log(`${client.user.username} is online`);
    });
}; 