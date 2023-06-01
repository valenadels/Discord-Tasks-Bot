import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Fiubamap: Command = {
  name: "fiubamap",
  description: "Acceder a FIUBA Map",
  run: (client: Client, interaction: CommandInteraction): void => {
    const url = "https://fede.dm/FIUBA-Map/";
    interaction.reply(`Aquí tienes FIUBA Map: ${url}`);
  },
};

