import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';

export const MostrarMateriasAprobadas: Command = {
  name: "mostrar-materias-aprobadas",
  description: "Materias aprobadas",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!padron) {
      await interaction.followUp("Debe loguearse primero. use /login <padron>");
      return;
    }

    const carreras = await DatabaseConnection.getCarrerasId(padron);
    if (!carreras || carreras.length < 1) {
      await interaction.followUp({
        content: `No se ha encontrado la carrera.`,
        ephemeral: true
      });
      return;
    }
    for (const carrera of carreras) {
      const codigos = await DatabaseConnection.getAlumnoMateriasAprobadas(padron, carrera);
      const materias = await DatabaseConnection.getNombreMateriasPorCodigo(codigos);

      if (!materias || materias instanceof Error || materias.length < 1) {
        await interaction.followUp({
          content: `No tienes materias aprobadas.`,
          ephemeral: true
        });
        continue;
      }
      const materiasAprobadas = materias.join(", ");
      const nameCarrera = await DatabaseConnection.getNombreCarreraPorCodigo(carrera);
      await interaction.followUp({
        content: `Tus materias aprobadas para la carrera: ${nameCarrera}  son: ${materiasAprobadas}`,
        ephemeral: true
      });
    }
  }
};