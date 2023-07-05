import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction} from "discord.js";
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
        const materiaOption = interaction.options.get("materias-aprobada");
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
            for (const carrera of carreras) {
                const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombreYCodigo(nombreMateria, carrera);
                if (!codigoMateria) {
                await interaction.followUp({
                    content: `No se ha encontrado la materia.`,
                    ephemeral: true
                });
                }

                let mensaje = "";
                if (codigoMateria){
                    const materiaAprobada = new MateriaAprobada();
                    materiaAprobada.materiaCodigo = codigoMateria;
                    materiaAprobada.alumnoPadron = padron!;
                    try{
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
                }
            }
        }
   
    }
}
