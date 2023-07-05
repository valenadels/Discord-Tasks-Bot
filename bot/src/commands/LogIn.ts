import { ApplicationCommandOptionType, Client, CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Command } from "../Command";
import { Alumno } from '../entities/Entities';
import { DatabaseConnection } from '../DBConnection';

export let padron: number | null = null;
export const Login: Command = {
  name: 'login',
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
      padron = padronOption.value as number;

      let mensaje = '';
      const nuevoAlumno = new Alumno();
      nuevoAlumno.padron = padron;
      try{
        mensaje = await DatabaseConnection.saveAlumno(nuevoAlumno);
      } catch (error) {
        console.error('Se produjo un error al guardar el alumno:', error);
        mensaje = 'Se produjo un error al guardar el alumno.';
      }

      const reply: InteractionReplyOptions = {
        content: `¡Bienvenido, ${user.username}!` + '\n' + mensaje,
        ephemeral: true,
      };

      await interaction.followUp(reply);
    } else {
      await interaction.followUp('Se requiere proporcionar el padron.');
    }
  }
};

export function setPadronNull() {
  padron = null;
}
