import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { Alumno, AlumnoCarrera, AlumnoMateria, Carreras } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";

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
      const user = interaction.user;
      const materiaOption = interaction.options.get("materia");
  
      if (materiaOption) {
        
        const materia = materiaOption.value as String;
  
        
        const nuevoAlumno = new AlumnoMateria();
        //nuevoAlumno.alumnoPadron = user.padron;
        //db.saveAlumnoMateria(nuevoAlumno); 
  
      await interaction.followUp({
              content: `Tu materia se ha guardado exitosamente.`,
              ephemeral: true}
          );
    } else {
          await interaction.reply("La materia especificada no existe.");
        }
    }
};