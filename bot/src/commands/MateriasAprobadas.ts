import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { MateriaAprobada } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from './LogIn';


export const MateriasAprobadas: Command = {
    name: "materia-aprobada",
    description: "Add your subject",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "materia-aprobada",
        description: "materia aprobada",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
      if(!padron){
        await interaction.followUp("Debe loguearse primero. use /login <padron>");
        return;
      }
      const materiaOption = interaction.options.get("materia-aprobada");
      if (materiaOption) {
        const nombreMateria = materiaOption.value as string;
        const materiaAprobada = new MateriaAprobada();
        const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombre(nombreMateria);
        if(codigoMateria){
          materiaAprobada.materiaCodigo = codigoMateria;
          materiaAprobada.alumnoPadron = padron;
          DatabaseConnection.saveMateriaAprobada(materiaAprobada); 
        }
  
        await interaction.followUp({
                content: `Tu materia aprobada se ha guardado exitosamente.`,
                ephemeral: true});
      }
    }
};