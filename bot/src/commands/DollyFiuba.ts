import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Dollyfiuba: Command = {
    name: "dollyfiuba",
    description: "Acceder a Dolly Fiuba",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const url = "https://dollyfiuba.com/";
        await interaction.followUp({
            content: `Aquí tienes Dolly Fiuba: ${url}`,
            ephemeral: true});
    }
};
