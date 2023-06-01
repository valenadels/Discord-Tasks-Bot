import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Calendario: Command = {
  name: "calendario",
  description: "Obtener el calendario académico de la FIUBA",
  run: (client: Client, interaction: CommandInteraction): void => {
    const url = "https://www.fi.uba.ar/estudiantes/calendario-academico";
    interaction.reply(`Aquí tienes el calendario académico de la FIUBA: ${url}`);
  },
};
