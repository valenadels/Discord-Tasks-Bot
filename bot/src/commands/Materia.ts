import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, CacheType } from "discord.js";
import { Command } from "../Command";
import { AlumnoMateria } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';
import { parsearCodigos } from "./MateriaAprobadaPorCodigo";

export const Materia: Command = {
  name: "materia",
  description: "Agrega codigo de la materia a cursar",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "codigo_materia",
      description: "codigo_materia",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!padron) {
      await interaction.followUp("Debe loguearse primero. use /login <padron>");
      return;
    }

    const input = interaction.options.get("codigo_materia")?.value as string;
    const codigos = parsearCodigos(input);
    try {
      await DatabaseConnection.getNombreMateriasPorCodigo(codigos);
      codigos.forEach(async codigo => {
        await agregarMateria(codigo, interaction);
      });
      await interaction.followUp({
        content: `Se ha guardado la/las materia/s con el codigo ${input}`,
        ephemeral: true
      });

    } catch (error) {
      await interaction.followUp({
        content: `Ha ocurrido un error: ${error}. Asegurate de que el código de la materia sea correcto para tu carrera y/o tengas una carrera asignada.`,
        ephemeral: true
      });
    }
  }
}


async function agregarMateria(codigoMateria: string, interaction: CommandInteraction<CacheType>) {

  const correlativas = await DatabaseConnection.getCorrelativas(codigoMateria);

  if (correlativas?.includes("NULL")) {
    await guardarMateriaSinCorrelativas(codigoMateria, interaction);
    return;
  }

  if (correlativas) {
    const alumnoMaterias = await DatabaseConnection.getAlumnoMateriasAprobadas(padron!);
    const missingCorrelatives = correlativas.filter(correlativa => !alumnoMaterias.includes(correlativa));
    const missingCorrelativesNames = await DatabaseConnection.getNombreMateriasPorCodigo(missingCorrelatives);

    if (!(missingCorrelativesNames instanceof Error)) {
      await faltanCorrelativas(missingCorrelativesNames, interaction);
    } else {
      await guardarMateria(codigoMateria, interaction);
    }
  } else {
    await interaction.followUp({
      content: `No se ha encontrado la materia.`,
      ephemeral: true
    });
  }
}

async function guardarMateria(codigoMateria: string, interaction: CommandInteraction<CacheType>) {
  const nuevoAlumno = new AlumnoMateria();
  nuevoAlumno.alumnoPadron = padron!;
  nuevoAlumno.materiaCodigo = codigoMateria;
  DatabaseConnection.saveAlumnoMateria(nuevoAlumno);
}

async function faltanCorrelativas(missingCorrelativesNames: string[], interaction: CommandInteraction<CacheType>) {
  const missingCodes = missingCorrelativesNames.join(", ");
  await interaction.followUp(`No puedes agregar esta materia. Faltan las correlativas: ${missingCodes}`);
}

async function guardarMateriaSinCorrelativas(codigoMateria: string, interaction: CommandInteraction<CacheType>) {
  const nuevoAlumno = new AlumnoMateria();
  nuevoAlumno.alumnoPadron = padron!;
  nuevoAlumno.materiaCodigo = codigoMateria;
  DatabaseConnection.saveAlumnoMateria(nuevoAlumno);

  await interaction.followUp({
    content: `Tu materia se ha guardado exitosamente.`,
    ephemeral: true
  });
}

