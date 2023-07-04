import { ApplicationCommandOptionType, Client, CommandInteraction, InteractionReplyOptions } from "discord.js";
import { Command } from "src/Command";
import { DatabaseConnection } from "../DBConnection";

export const MateriaPorCodigo: Command = {
    name: 'materia-por-codigo',
    description: 'Muestra la materia con el codigo ingresado',
    options: [
        {
            name: "codigo",
            description: "codigo de la materia",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const codigoOption = interaction.options.get('codigo');
        if (codigoOption) {
            const codigo = codigoOption.value as string;
            const materia = await DatabaseConnection.getNombreMateriasPorCodigo([codigo]);
            if (materia) {
                const reply: InteractionReplyOptions = {
                    content: `Materia: ${materia} - Código: ${codigo}`,
                    ephemeral: true,
                };
                await interaction.followUp(reply);
            } else {
                await interaction.followUp('No se encontro la materia');
            }
        } else {
            await interaction.followUp('Se requiere proporcionar el codigo.');
        }
    }
};

