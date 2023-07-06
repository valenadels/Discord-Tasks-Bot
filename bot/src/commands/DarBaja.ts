import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { Alumno, AlumnoCarrera, AlumnoMateria, Carreras } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';



export const Darbaja: Command = {
  name: "dar-baja",
  description: "dar de baja una materia",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "nombre",
      description: "materia a dar de baja",
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!padron) {
      await interaction.followUp("Debe loguearse primero. use /login <padron>");
      return;
    }
  
    const materiaOption = interaction.options.get("nombre");
  
    if (materiaOption) {
      const nombreMateria = materiaOption.value as string;
      const codigosMateria = await DatabaseConnection.getCodigosMateriasPorNombre(nombreMateria);
  
      if (codigosMateria) {
        for (const codigoMateria of codigosMateria) {
          const nuevoAlumno = new AlumnoMateria();
          nuevoAlumno.alumnoPadron = padron;
          nuevoAlumno.materiaCodigo = codigoMateria;
  
          let mensaje = ""; 
  
          try {
          
            mensaje = await DatabaseConnection.darBajaMateria(nuevoAlumno);
        
          } catch (error) {
            console.error("Se produjo un error al eliminar la materia:", error);
            mensaje = "Se produjo un error al eliminar la materia.";
          }
  
          await interaction.followUp({
            content: mensaje,
            ephemeral: true,
          });
        }
      }
    }
  }  
}