import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from "discord.js";
import { Command } from "../Command";
import { padron } from "./LogIn";
import { materiasPorCarrerasDelAlumno } from "../MateriasAutocomplete";

export async function autocompletarMaterias(interaction: { options: { getFocused: () => any; }; respond: (arg0: { name: string; value: string; }[]) => any; }) {
    const focusedValue = interaction.options.getFocused();
    console.log(focusedValue);
    console.log(materiasPorCarrerasDelAlumno);
    const filtered = materiasPorCarrerasDelAlumno.filter(choice => choice.includes(focusedValue.toUpperCase()));
    console.log(filtered);
    await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
    );
}

export const MateriaAprobada: Command = {
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
    }
}
    //     const input = interaction.options.get("codigo")?.value as string;
    //     // if(input.length > 3){
    //     //     let materiasOpciones = getMateriasOpciones(input);


        // }
        // }
        // const codigos = parsearCodigos(input);
        // try {
        //     await DatabaseConnection.getNombreMateriasPorCodigo(codigos);
        //     codigos.forEach(async codigo => {
        //         const materiaAprobada = new MateriaAprobada();
        //         materiaAprobada.materiaCodigo = codigo;
        //         materiaAprobada.alumnoPadron = padron!;
        //         await DatabaseConnection.saveMateriaAprobada(materiaAprobada);
        //     });
        //     await interaction.followUp({
        //         content: `Se ha guardado la/las materia/s aprobada con el codigo ${input}`,
        //         ephemeral: true
        //     });

        // } catch (error) {
        //     await interaction.followUp({
        //         content: `Ha ocurrido un error: ${error}. Asegurate de que el código de la materia sea correcto para tu carrera y/o tengas una carrera asignada.`,
        //         ephemeral: true
        //     });
        // }

