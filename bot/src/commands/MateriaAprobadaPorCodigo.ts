import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from "discord.js";
import { Command } from "../Command";
import { DatabaseConnection } from "../DBConnection";
import { MateriaAprobada } from "../entities/Entities";
import { padron } from "./LogIn";


function parsearCodigos(input: string): string[] {
    const codigos = input.split(",");
    return codigos.map(codigo => codigo.trim());
}

export const MateriaAprobadaPorCodigo: Command = {
    name: "materia-aprobada-por-codigo",
    description: "Guardar materia aprobada por codigo",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "codigo",
            description: "Codigo de la materia aprobada",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const input = interaction.options.get("codigo")?.value as string;
        const codigos = parsearCodigos(input);
        const materias = await DatabaseConnection.getNombreMateriasPorCodigo(codigos);
        if (!materias) {
            await interaction.followUp({
                content: `No se ha encontrado la/las materia/s con el codigo ${input}`,
                ephemeral: true
            });
            return;
        }

        codigos.forEach(async codigo => {
            const materiaAprobada = new MateriaAprobada();
            materiaAprobada.materiaCodigo = codigo;
            materiaAprobada.alumnoPadron = padron!;
            await DatabaseConnection.saveMateriaAprobada(materiaAprobada);
        }
        );
        await interaction.followUp({
            content: `Se ha guardado la/las materia/s con el codigo ${input}`,
            ephemeral: true
        });
    }
};
