import { CommandInteraction, Client } from "discord.js";
import { Commands } from "../Commands";
import { Command } from "src/Command";

export const Ayuda: Command = {
  name: "ayuda",
  description: "Muestra todos los comandos disponibles",
  run: (client: Client, interaction: CommandInteraction): void => {
    const commandsList = Commands.map((command) => command.name).join(", ");
    interaction.reply(`Estos son los comandos disponibles: ${commandsList}`);
  },
};
