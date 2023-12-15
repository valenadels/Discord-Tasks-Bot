import { ApplicationCommandOptionType, ApplicationCommandType, CacheType, Client, CommandInteraction } from "discord.js";
import { Command } from "../Command";
import { padron } from "./LogIn";
import { DatabaseConnection } from "../DBConnection";
import { MateriaAprobada } from "../entities/Entities";
import { DBError } from "../DBError";

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
        const correlativas = await DatabaseConnection.getCorrelativas(codigoMateria);

        if (correlativas?.includes("NULL")) {
            mensaje = await aprobarMateria(codigoMateria, mensaje, interaction);
        } else if (correlativas) {
            const alumnoMaterias = await DatabaseConnection.getAlumnoMateriasAprobadas(padron!, carrera);
            const correlativasFaltantes = correlativas.filter((correlativa) => !alumnoMaterias.includes(correlativa));
            let correlativasFaltantesNombres;
            try {
                correlativasFaltantesNombres = await DatabaseConnection.getNombreMateriasPorCodigo(correlativasFaltantes);
            }catch (error) {
                console.error("Se produjo un error al obtener las correlativas:", error);
                return;
            }

            if (!(correlativasFaltantesNombres instanceof DBError) && correlativasFaltantesNombres.length > 0) {
                const codigosFaltantes = correlativasFaltantesNombres.join(", ");
                const nombreCarrera = await DatabaseConnection.getNombreCarreraPorCodigo(carrera);
                await interaction.followUp(
                    `No puedes agregar esta materia. Faltan las correlativas: ${codigosFaltantes} para la carrera: ${nombreCarrera}`
                );
            } else {
                mensaje = await aprobarMateria(codigoMateria, mensaje, interaction);
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

