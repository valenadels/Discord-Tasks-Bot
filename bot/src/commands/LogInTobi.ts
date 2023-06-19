import { ApplicationCommandOptionType, Client, CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Command } from "../Command";
import { createConnection, getRepository } from 'typeorm';
import { Alumno } from '../entities/Entities';
import { DatabaseConnection } from '../DBConnection';


let loggedPadron: number | null = null;
const dbConnection = new DatabaseConnection("dbConnection");
dbConnection.connect().catch(error => console.error('Error:', error));


export const Logintobi: Command = {
  name: 'login-tobi',
  description: 'Log in to the bot',
  options: [
    {
      name: "padron",
      description: "tu padron",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    }],
  run: async (client: Client, interaction: CommandInteraction) => {
    const user = interaction.user;
    const padronOption = interaction.options.get('padron');

    if (padronOption) {
      const padron = padronOption.value as number;

      // Verificar si el alumno ya existe en la base de datos
      const alumnoRepository = getRepository(Alumno, dbConnection.name);
      const alumnoExistente = await alumnoRepository.findOne({ where: { padron: padron } });

      if (!alumnoExistente) {
        // Si el alumno no existe, crear y guardar el nuevo alumno
        const nuevoAlumno = new Alumno();
        nuevoAlumno.padron = padron;
        loggedPadron = padron;
        await alumnoRepository.save(nuevoAlumno);
        loggedPadron = padron;

        const reply: InteractionReplyOptions = {
          content: `¡Bienvenido, ${user.username}! Tu padron (${padron}) ha sido guardado correctamente y has iniciado sesión.`,
          ephemeral: true,
        };

        await interaction.followUp(reply);
      } else {
        // Si el alumno ya existe, dar la bienvenida indicando que ya está logueado
        loggedPadron = padron;
        const reply: InteractionReplyOptions = {
          content: `¡Bienvenido, ${user.username}! Iniciaste sesión con tu padron (${padron}).`,
          ephemeral: true,
        };

        await interaction.followUp(reply);
      }
    } else {
      await interaction.followUp('Se requiere proporcionar el padron.');
    }
  },
};

export { loggedPadron };
