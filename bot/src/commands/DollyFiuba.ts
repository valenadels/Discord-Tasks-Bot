import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Dollyfiuba: Command = {
  name: "dolly fiuba",
  description: "Acceder a Dolly Fiuba",
  run: (client: Client, interaction: CommandInteraction): void => {
    const url = "https://dollyfiuba.com/";
    interaction.reply(`Aquí tienes Dolly Fiuba: ${url}`);
  },
};