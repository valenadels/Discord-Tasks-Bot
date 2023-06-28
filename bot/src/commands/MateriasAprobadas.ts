import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, ApplicationCommandOptionChoiceData } from "discord.js";
import { Command } from "../Command";
import { MateriaAprobada } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';

// async function obtenerYMostrarPrimerMateria() {
//   const materias = await DatabaseConnection.getAllMaterias();
//   console.log(materias[0].nombre); 
// }

// obtenerYMostrarPrimerMateria();


// ESTE FUNCIONA PERO SIN LAS OPCIONES
// export const MateriasAprobadas: Command = {
//     name: "materia-aprobada",
//     description: "Add your subject",
//     type: ApplicationCommandType.ChatInput,
//     options: [
//       {
//         name: "materia-aprobada",
//         description: "materia aprobada",
//         type: ApplicationCommandOptionType.String,
//         required: true,
//       },
//     ],
//     run: async (client: Client, interaction: CommandInteraction) => {
//       if(!padron){
//         await interaction.followUp("Debe loguearse primero. use /login <padron>");
//         return;
//       }
//       const materiaOption = interaction.options.get("materia-aprobada");
//       if (materiaOption) {
//         const nombreMateria = materiaOption.value as string;
//         const materiaAprobada = new MateriaAprobada();
//         const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombre(nombreMateria);
//         if(codigoMateria){
//           materiaAprobada.materiaCodigo = codigoMateria;
//           materiaAprobada.alumnoPadron = padron;
//           DatabaseConnection.saveMateriaAprobada(materiaAprobada); 
//         }
  
//         await interaction.followUp({
//                 content: `Tu materia aprobada se ha guardado exitosamente.`,
//                 ephemeral: true});
//       }
//     }
// };

// export async function generateAutocompleteChoices(): Promise<ApplicationCommandOptionChoiceData[]> {
//   // Fetch subjects from the database or any other data source based on the search query
//   const materias = (await DatabaseConnection.getAllMaterias());

//   // Map the fetched subjects to autocomplete choices
//   const autocompleteChoices: ApplicationCommandOptionChoiceData<string | number>[] = materias.map((materia) => ({
//     name: materia.name,
//     value: materia.name,
//     type: ApplicationCommandOptionType.String, // Add the 'type' property here
//   }));

//   return autocompleteChoices;
// }



export async function createMateriasAprobadas(): Promise<Command> {
  const materias = (await DatabaseConnection.getAllMaterias());
 //only preserve 25 elements of materias
  materias.splice(25, materias.length);
  const MateriasAprobadas: Command = {
    name: "materia-aprobada",
    description: "Add your subject",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "materia-aprobada",
        description: "materia aprobada",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: materias,
        //autocomplete: true,
      }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
      if (!padron) {
        await interaction.followUp("Debe loguearse primero. use /login <padron>");
        return;
      }
      const materiaOption = interaction.options.get("materia-aprobada");
      if (materiaOption) {
        const nombreMateria = materiaOption.value as string;
        const materiaAprobada = new MateriaAprobada();
        const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombre(nombreMateria);
        if (codigoMateria) {
          materiaAprobada.materiaCodigo = codigoMateria;
          materiaAprobada.alumnoPadron = padron;
          DatabaseConnection.saveMateriaAprobada(materiaAprobada); 
        }
  
        await interaction.followUp({
          content: `Tu materia aprobada se ha guardado exitosamente.`,
          ephemeral: true
        });
      }
    }
  } 
  return await MateriasAprobadas;
};

