import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { AlumnoMateria } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';
import { DBError } from "../DBError";

export const Materia: Command = {
  name: "materia",
  description: "Agrega tu materia a cursar",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "nombre",
      description: "tu materia",
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!padron) {
      await interaction.followUp("Debe loguearse primero. Use /login <padron>");
      return;
    }

    const materiaOption = interaction.options.get("nombre");
    if (materiaOption) {
      const nombreMateria = materiaOption.value as string;
      const carreras = await DatabaseConnection.getCarrerasId(padron);

      if (!carreras || carreras.length < 1) {
        await interaction.followUp({
          content: `No se ha encontrado la carrera.`,
          ephemeral: true,
        });
        return;
      }

      for (const carrera of carreras) {
        await handleMateriaInteraction(interaction, padron, nombreMateria, carrera);
      }
    }
  },
};

async function handleMateriaInteraction(
  interaction: CommandInteraction,
  padron: number,
  nombreMateria: string,
  carrera: number
) {
  const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombreYCarrera(nombreMateria, carrera);
  
  if (!codigoMateria) {
    await interaction.followUp({
      content: `No se ha encontrado la materia para la carrera ${await DatabaseConnection.getNombreCarreraPorCodigo(carrera)}.`,
      ephemeral: true,
    });
    return;
  }

  const correlativas = await DatabaseConnection.getCorrelativas(codigoMateria);

  if (correlativas?.includes("NULL")) {
    await saveMateriaInteraction(interaction, padron, codigoMateria);
  }else if (correlativas) {
    const alumnoMaterias = await DatabaseConnection.getAlumnoMateriasAprobadas(padron, carrera);
    const correlativasFaltantes = correlativas.filter((correlativa) => !alumnoMaterias.includes(correlativa));
    let correlativasFaltantesNombres;
    try{
      correlativasFaltantesNombres = await DatabaseConnection.getNombreMateriasPorCodigo(correlativasFaltantes);
    }catch(error){
      console.error("Se produjo un error al obtener las correlativas:", error);
      await interaction.followUp({
        content: `Se produjo un error al obtener las correlativas.`,
        ephemeral: true,
      });
      return;
    }
    if (!(correlativasFaltantesNombres instanceof DBError) && correlativasFaltantesNombres.length > 0) {
      const codigosFaltantes = correlativasFaltantesNombres.join(", ");
      const nombreCarrera = await DatabaseConnection.getNombreCarreraPorCodigo(carrera);
      await interaction.followUp(
        `No puedes agregar esta materia. Faltan las correlativas: ${codigosFaltantes} para la carrera: ${nombreCarrera}`
      );
    } else {
      await saveMateriaInteraction(interaction, padron, codigoMateria);
    }
  } 
}

async function saveMateriaInteraction(interaction: CommandInteraction, padron: number, codigoMateria: string) {
  let mensaje = "";

  const nuevoAlumno = new AlumnoMateria();
  nuevoAlumno.alumnoPadron = padron;
  nuevoAlumno.materiaCodigo = codigoMateria;

  try {
    mensaje = await DatabaseConnection.saveAlumnoMateria(nuevoAlumno);
  } catch (error) {
    console.error("Se produjo un error al guardar la materia:", error);
    mensaje = "Se produjo un error al guardar la materia.";
  }

  await interaction.followUp({
    content: mensaje,
    ephemeral: true,
  });
}




