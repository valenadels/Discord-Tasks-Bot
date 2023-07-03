import { Command } from "src/Command";
import { setPadronNull } from "./LogIn";
import { Client, CommandInteraction, InteractionReplyOptions } from "discord.js";

export const LogOut: Command = {
    name: 'logout',
    description: 'Log out of the bot',
    run: async (client: Client, interaction: CommandInteraction) => {
        const user = interaction.user;
        setPadronNull();
        const reply: InteractionReplyOptions = {
            content: `¡Adios, ${user.username}! has cerrado sesión correctamente.`,
            ephemeral: true,
        };
        await interaction.followUp(reply);
    }
};