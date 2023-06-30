import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Fiubamap: Command = {
    name: "fiubamap",
    description: "Acceder a FIUBA Map",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const url = "https://fede.dm/FIUBA-Map/";
        await interaction.followUp({
            content: `Aquí tienes FIUBA Map: ${url}`,
            ephemeral: true
        });
    }
};



