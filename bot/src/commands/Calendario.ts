import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Calendario: Command = {
    name: "calendario",
    description: "Obtener el calendario académico de la FIUBA",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const url = "https://www.fi.uba.ar/estudiantes/calendario-academico";
        await interaction.followUp({
            content: `Aquí tienes el calendario académico de la FIUBA: ${url}`,
            ephemeral: true
        });
    }
};

