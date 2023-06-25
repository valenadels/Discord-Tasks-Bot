import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { MateriaAprobada, Materia } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';

export const MateriasAprobadas: Command = {
  name: "materia-aprobada",
  description: "Add your subject",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "materia",
      description: "Materia aprobada",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: []
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!padron) {
      await interaction.followUp("Debe loguearse primero. Use /login <padron>");
      return;
    }
    
    // Obtener todas las materias de la base de datos
    const materias = await DatabaseConnection.getAllMaterias();
    
    const opcionesMateria = materias.map((materia) => ({
      name: materia.nombre,
      value: materia.codigo
    }));
    
    // Agregar las opciones de materia al comando
    MateriasAprobadas.options[0].choices = opcionesMateria;
    
    const materiaOption = interaction.options.get("materia");
    
    if (materiaOption) {
      const nombreMateria = materiaOption.value as string;
      const materiaAprobada = new MateriaAprobada();
      const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombre(nombreMateria);
      
      if (codigoMateria) {
        materiaAprobada.materiaCodigo = codigoMateria;
        materiaAprobada.alumnoPadron = padron;
        await DatabaseConnection.saveMateriaAprobada(materiaAprobada); 
        
        await interaction.followUp({
          content: "Tu materia aprobada se ha guardado exitosamente.",
          ephemeral: true
        });
      } else {
        await interaction.followUp("No se encontró la materia especificada.");
      }
    }
  }
};
