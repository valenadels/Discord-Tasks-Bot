import { ApplicationCommandOptionType, Client, CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Command } from "../Command";
import { createConnection, getRepository } from 'typeorm';
import { Alumno } from '../entities/Entities';
import { DatabaseConnection } from 'src/DBConnection';


const db = DatabaseConnection.getInstance();

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

    
      const nuevoAlumno = new Alumno();
      nuevoAlumno.padron = padron;
      db.saveAlumno(nuevoAlumno);

      const reply: InteractionReplyOptions = {
        content: `¡Bienvenido, ${user.username}! has iniciado sesión correctamente.`,
        ephemeral: true,
      };

      await interaction.followUp(reply);
    } else {
      await interaction.followUp('Se requiere proporcionar el padron.');
    }
  }
};

