import { ApplicationCommandOptionType, ApplicationCommandType, CacheType, Client, CommandInteraction } from "discord.js";
import { Command } from "../Command";
import { padron } from "./LogIn";
import { DatabaseConnection } from "../DBConnection";
import { MateriaAprobada } from "../entities/Entities";

export const MateriasAprobadas: Command = {
    name: "materia-aprobada",
    description: "Guardar materia aprobada. Insertá más de dos caracteres para autocompletar (recordá poner tildes).",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nombre",
            description: "Nombre de la materia",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        if (!padron) {
            await interaction.followUp({
                content: "No estas logueado. Utilizá el comando /login para hacerlo",
                ephemeral: true
            });
            return;
        }
        const materiaOption = interaction.options.get("nombre");
        if (materiaOption) {
            const nombreMateria = materiaOption.value as string;
            const carreras = await DatabaseConnection.getCarrerasId(padron);
            if (!carreras || carreras.length < 1) {
                await interaction.followUp({
                    content: `No se ha encontrado la carrera.`,
                    ephemeral: true
                });
                return;
            }
            await aprobarMateriasSegunCarrera(carreras, nombreMateria, interaction);
        }

    }
}

async function aprobarMateriasSegunCarrera(carreras: number[], nombreMateria: string, interaction: CommandInteraction<CacheType>) {
    for (const carrera of carreras) {
        const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombreYCarrera(nombreMateria, carrera);
        const nombreCarrera = await DatabaseConnection.getNombreCarreraPorCodigo(carrera);
        if (!codigoMateria) {
            await interaction.followUp({
                content: `No se ha encontrado la materia para la carrera ${nombreCarrera}.`,
                ephemeral: true
            });
        }

        let mensaje = "";
        if (codigoMateria) {
            const correlativas = await DatabaseConnection.getCorrelativas(codigoMateria);
            const correlativasAprobadas = await DatabaseConnection.getAlumnoMateriasAprobadas(padron!, carrera);
            const correlativasFaltantes = correlativas?.filter(correlativa => !correlativasAprobadas?.includes(correlativa) && correlativa !== "NULL");
            if (correlativasFaltantes?.length === 0 || !correlativas) {
                mensaje = await aprobarMateria(codigoMateria, mensaje, interaction);
            } else {
                await interaction.followUp({
                    content: `No se puede guardar la materia porque no se han aprobado todas las correlativas. Faltan: ${correlativasFaltantes} para la carrera ${nombreCarrera}.`,
                    ephemeral: true
                });
            }
        }
    }
}

async function aprobarMateria(codigoMateria: string, mensaje: string, interaction: CommandInteraction<CacheType>) {
    const materiaAprobada = new MateriaAprobada();
    materiaAprobada.materiaCodigo = codigoMateria;
    materiaAprobada.alumnoPadron = padron!;
    try {
        mensaje = await DatabaseConnection.saveMateriaAprobada(materiaAprobada);
    }
    catch (error) {
        console.error("Se produjo un error al guardar la materia:", error);
        mensaje = "Se produjo un error al guardar la materia.";
    }
    await interaction.followUp({
        content: mensaje,
        ephemeral: true
    });
    return mensaje;
}

