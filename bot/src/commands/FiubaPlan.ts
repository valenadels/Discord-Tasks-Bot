import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Fiubaplan: Command = {
    name: "fiubaplan",
    description: "Acceder a FIUBA Plan",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const url = "https://fede.dm/FIUBA-Plan/";
        await interaction.reply(`Aquí tienes FIUBA Plan: ${url}`);
    }
};
