// import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
// import { Command } from "../Command";
// import { DatabaseConnection } from "../DBConnection";

// export const List: Command = {
//   // name: "materias-anotadas",
//   // description: "Materias anotadas",
//   // type: ApplicationCommandType.ChatInput,
//   // run: async (client: Client, interaction: CommandInteraction) => {
//   //   if (!padron) {
//   //     await interaction.followUp("Debe loguearse primero. use /login <padron>");
//   //     return;
//   //   }

//   //   const carreras = await DatabaseConnection.getCarrerasId(padron);
//   //   if (!carreras || carreras.length < 1) {
//   //     await interaction.followUp({
//   //       content: `No se ha encontrado la carrera.`,
//   //       ephemeral: true
//   //     });
//   //     return;
//   //   }
//   //   for (const carrera of carreras) {
//   //     const codigos = await DatabaseConnection.getAlumnoMaterias(padron, carrera);
//   //     const materias = await DatabaseConnection.getNombreMateriasPorCodigo(codigos);

//   //     if (!materias || materias instanceof DBError || materias.length < 1) {
//   //       await interaction.followUp({
//   //         content: `No tienes materias anotadas`,
//   //         ephemeral: true
//   //       });
//   //       continue;
//   //     }
//   //     const materiasAnotadas = materias.join(", ");
//   //     const nameCarrera = await DatabaseConnection.getNombreCarreraPorCodigo(carrera);
//   //     await interaction.followUp({
//   //       content: `Tus materias anotadas para la carrera: ${nameCarrera}  son: ${materiasAnotadas}`,
//   //       ephemeral: true
//   //     });
//   //   }
//   // }
// };
