import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Fiubaplan: Command = {
  name: "fiubaplan",
  description: "Acceder a FIUBA Plan",
  run: (client: Client, interaction: CommandInteraction): void => {
    const url = "https://fede.dm/FIUBA-Plan/";
    interaction.reply(`Aquí tienes FIUBA Plan: ${url}`);
  },
};