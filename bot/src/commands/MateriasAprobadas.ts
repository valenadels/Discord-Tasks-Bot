import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
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
export const MateriasAprobadas: Command = {
    name: "materia-aprobada",
    description: "Add your subject",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "materia-aprobada",
        description: "materia aprobada",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
      if(!padron){
        await interaction.followUp("Debe loguearse primero. use /login <padron>");
        return;
      }
      const materiaOption = interaction.options.get("materia-aprobada");
      if (materiaOption) {
        const nombreMateria = materiaOption.value as string;
        const materiaAprobada = new MateriaAprobada();
        const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombre(nombreMateria);
        if(codigoMateria){
          materiaAprobada.materiaCodigo = codigoMateria;
          materiaAprobada.alumnoPadron = padron;
          DatabaseConnection.saveMateriaAprobada(materiaAprobada); 
        }
  
        await interaction.followUp({
                content: `Tu materia aprobada se ha guardado exitosamente.`,
                ephemeral: true});
      }
    }
};

//esto de aca no funciona, hay que ver por que no me lo borren es de tobi


// import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
// import { Command } from "../Command";
// import { MateriaAprobada } from "../entities/Entities";
// import { DatabaseConnection } from "../DBConnection";
// import { padron } from './LogIn';

// const db = DatabaseConnection.initializeDB();


// async function obtenerYMostrarPrimerMateria() {
//   const materias = await DatabaseConnection.getAllMaterias();
// }

// export const MateriasAprobadas: Command = {
//   name: "materia-aprobada",
//   description: "Add your subject",
//   type: ApplicationCommandType.ChatInput,
//   options: [
//     {
//       name: "materia-aprobada",
//       description: "materia aprobada",
//       type: ApplicationCommandOptionType.String,
//       required: true,
//       choices: materias,
//     }
//   ],
//   run: async (client: Client, interaction: CommandInteraction) => {
//     if (!padron) {
//       await interaction.followUp("Debe loguearse primero. use /login <padron>");
//       return;
//     }
//     const materiaOption = interaction.options.get("materia-aprobada");
//     if (materiaOption) {
//       const nombreMateria = materiaOption.value as string;
//       const materiaAprobada = new MateriaAprobada();
//       const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombre(nombreMateria);
//       if (codigoMateria) {
//         materiaAprobada.materiaCodigo = codigoMateria;
//         materiaAprobada.alumnoPadron = padron;
//         DatabaseConnection.saveMateriaAprobada(materiaAprobada); 
//       }

//       await interaction.followUp({
//         content: `Tu materia aprobada se ha guardado exitosamente.`,
//         ephemeral: true
//       });
//     }
//   }
// };
