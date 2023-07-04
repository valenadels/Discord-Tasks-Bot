import { Client, CommandInteraction } from "discord.js";
import { Command } from "../Command";
import { DatabaseConnection } from "../DBConnection";
import { padron } from "./LogIn";

export const CodigosDeMaterias: Command = {
    name: "codigos-de-materias",
    description: "Codigos de materias segun carrera",
    options: [],
    run: async (client: Client, interaction: CommandInteraction) => {
        if(!padron) {
            await interaction.followUp("Debe loguearse primero. use /login <padron>");
            return;
        }
        const carreras = await DatabaseConnection.getAllMateriasPorCarreras();
        if (carreras.length < 1) {
            await interaction.followUp({
                content: `No se ha encontrado la carrera.`,
                ephemeral: true
            });
            return;
        }

        interaction.followUp({
            content: `Las carreras disponibles son: ${carreras.join(", ")}`,
            ephemeral: true
        });       
    }
};
