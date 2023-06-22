import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { Alumno, AlumnoCarrera, AlumnoMateria, Carreras } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';

const db = DatabaseConnection.initializeDB();

export const Materia: Command = {
    name: "materia",
    description: "Add your subject",
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
      if(!padron){
        await interaction.followUp("Debe loguearse primero. use /login <padron>");
        return;
      }
      const materiaOption = interaction.options.get("materia");
  
      if (materiaOption) {
        const nuevoAlumno = new AlumnoMateria();
        nuevoAlumno.alumnoPadron = padron;
        DatabaseConnection.saveAlumnoMateria(nuevoAlumno); 
  
      await interaction.followUp({
              content: `Tu materia se ha guardado exitosamente.`,
              ephemeral: true}
          );
        } 
    }
};