import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { AlumnoMateria } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';

export const Materia: Command = {
  name: "materia",
  description: "Agrega tu materia a cursar",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "materia",
      description: "tu materia",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!padron) {
      await interaction.followUp("Debe loguearse primero. use /login <padron>");
      return;
    }
    const materiaOption = interaction.options.get("materia");
    if (materiaOption) {
      const nombreMateria = materiaOption.value as string;
      const carreras = await DatabaseConnection.getCarreras(padron);
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
            const correlativas = await DatabaseConnection.getCorrelativas(codigoMateria);

            if (correlativas?.includes("NULL")) {

              const nuevoAlumno = new AlumnoMateria();
              nuevoAlumno.alumnoPadron = padron;
              nuevoAlumno.materiaCodigo = codigoMateria;
              DatabaseConnection.saveAlumnoMateria(nuevoAlumno);

              await interaction.followUp({
                content: `Tu materia se ha guardado exitosamente.`,
                ephemeral: true
              });

              continue;
            }
            if (correlativas) {
              const alumnoMaterias = await DatabaseConnection.getAlumnoMaterias(padron);
              const missingCorrelatives = correlativas.filter(correlativa => !alumnoMaterias.includes(correlativa));
              if (missingCorrelatives.length > 0) {
                const missingCodes = missingCorrelatives.join(", ");
                await interaction.followUp(`No puedes agregar esta materia. Faltan las correlativas: ${missingCodes}`);
                continue;
              } else {
                const nuevoAlumno = new AlumnoMateria();
                nuevoAlumno.alumnoPadron = padron;
                nuevoAlumno.materiaCodigo = codigoMateria;
                DatabaseConnection.saveAlumnoMateria(nuevoAlumno);

                await interaction.followUp({
                  content: `Tu materia se ha guardado exitosamente.`,
                  ephemeral: true
                });
              }
            } else {
            await interaction.followUp({
              content: `No se ha encontrado la materia.`,
              ephemeral: true
            });
          }
        }
      }
    }
  }

