import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Commands } from "../Commands";
import { Command } from "src/Command";

export const Ayuda: Command = {
  name: "ayuda",
  description: "Muestra todos los comandos disponibles",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const commandsList = Commands.map((command) => command.name).join(", ");
    await interaction.followUp({
        ephemeral: true,
        content: `Estos son los comandos disponibles: ${commandsList}`});
  },
};


