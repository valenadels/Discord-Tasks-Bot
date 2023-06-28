import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { Alumno, AlumnoCarrera, AlumnoMateria, Carreras } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';

const db = DatabaseConnection.initializeDB();

export const Darbaja: Command = {
    name: "dar-baja",
    description: "dar de baja una materia",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "materia",
        description: "materia a dar de baja",
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
      const nombreMateria = materiaOption.value as string;
      const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombre(nombreMateria);
      if(codigoMateria){
        const nuevoAlumno = new AlumnoMateria();
        nuevoAlumno.alumnoPadron = padron;
        nuevoAlumno.materiaCodigo = codigoMateria;
        DatabaseConnection.darBajaMateria(nuevoAlumno); 
      }

      await interaction.followUp({
              content: `Tu materia se ha dado de baja exitosamente.`,
              ephemeral: true});
    }
  } 
}