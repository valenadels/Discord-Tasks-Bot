import { Client, CommandInteraction } from "discord.js";
import { Command } from "../Command";
import { DatabaseConnection } from "../DBConnection";
import { padron } from "./LogIn";
import fs from 'fs';
import { join } from "path";

import path from 'path';

export const CodigosDeMaterias: Command = {
    name: "codigos-de-materias",
    description: "Códigos de materias según carrera",
    options: [],
    run: async (client: Client, interaction: CommandInteraction) => {
        if (!padron) {
            await interaction.followUp("Debe loguearse primero. Use /login <padron>");
            return;
        }

        const materias = await DatabaseConnection.getAllMateriasCodigoPorCarreras();
        if (materias.length < 1) {
            await interaction.followUp({
                content: "No se ha encontrado la carrera.",
                ephemeral: true
            });
            return;
        }

        const filePath = path.join(__dirname, 'codigos.txt');
        const materiasCodigo: string[] = materias.map((materia) => {
            return materia.name + ' - ' + materia.value;
        });

        try {
            materiasCodigo.forEach((materia: string) => {
                fs.writeFileSync(filePath, materia + '\n', { flag: 'a' });
            });

            await interaction.followUp({
                content: "Aquí tienes las materias con sus códigos:",
                ephemeral: true,
                files: [{
                    attachment: filePath,
                    name: "codigos.txt"
                }]
            });
        } catch (error) {
            console.error("Error al crear el archivo:", error);
            await interaction.followUp({
                content: "Ha ocurrido un error al generar el archivo.",
                ephemeral: true
            });
        } finally {
            fs.unlinkSync(filePath);
        }
    }
};

