import { Client, CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Command } from "../Command";
import { Alumno } from './entities/Alumno';

let loggedPadron: number | null = null;

export const Login: Command = {
  name: 'login',
  description: 'Log in to the bot',
  run: async (client: Client, interaction: CommandInteraction) => {
    const user = interaction.user;
    const padronOption = interaction.options.get('padron');

    if (padronOption) {
      const padron = padronOption.value as number;

      // Verificar si el alumno ya existe en la base de datos
      const alumnoExistente = await Alumno.findOne({ padron });

      if (!alumnoExistente) {
        // Si el alumno no existe, crear y guardar el nuevo alumno
        const nuevoAlumno = new Alumno();
        nuevoAlumno.padron = padron;
        loggedPadron = padron;
        await nuevoAlumno.save();

        const reply: InteractionReplyOptions = {
          content: `¡Bienvenido, ${user.username}! Tu padron (${padron}) ha sido guardado correctamente y has iniciado sesión.`,
          ephemeral: true,
        };

        await interaction.reply(reply);
      } else {
        // Si el alumno ya existe, dar la bienvenida indicando que ya está logueado
        const reply: InteractionReplyOptions = {
          content: `¡Bienvenido, ${user.username}! Iniciaste sesión con tu padron (${padron}).`,
          loggedPadron = padron;
          ephemeral: true,
        };

        await interaction.reply(reply);
      }
    } else {
      await interaction.reply('Se requiere proporcionar el padron.');
    }
  },
};

export { loggedPadron };
