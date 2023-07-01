import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, ApplicationCommandOptionChoiceData } from "discord.js";
import { Command } from "../Command";
import { MateriaAprobada } from "../entities/Entities";
import { DatabaseConnection, MateriaOption } from "../DBConnection";
import { padron } from './LogIn';

// let materiasYaMostradas: MateriaOption[] = []
// let materias: MateriaOption[][] = [];

// async function partirArray(array: MateriaOption[]) {
//   let materias = (await DatabaseConnection.getAllMaterias());
//   const result: MateriaOption[][] = [];
//   let size = 24;
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   materias = result;
// }




export async function createMateriasAprobadas(): Promise<Command> {

  // let particion = particiones.pop()!;
  // materiasYaMostradas.push(...particion!);

  // materias.push({ name: "Mostrar más", value: "Mostrar más" });
  
  const MateriasAprobadas: Command = {
    name: "materia-aprobada",
    description: "Registra tus materias aprobadas",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "materia-aprobada",
        description: "materia aprobada",
        type: ApplicationCommandOptionType.String,
        required: true,
        //choices: particion,
      }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
      if (!padron) {
        await interaction.followUp("Debe loguearse primero. use /login <padron>");
        return;
      }
      const materiaOption = interaction.options.get("materia-aprobada");
      if (materiaOption) {
        const nombreMateria = materiaOption.value as string;
        const materiaAprobada = new MateriaAprobada();
        const codigoMateria = await DatabaseConnection.getCodigoMateriaPorNombre(nombreMateria);
        if (codigoMateria) {
          materiaAprobada.materiaCodigo = codigoMateria;
          materiaAprobada.alumnoPadron = padron;
          DatabaseConnection.saveMateriaAprobada(materiaAprobada);
        }

        await interaction.followUp({
          content: `Tu materia aprobada se ha guardado exitosamente.`,
          ephemeral: true
        });
      }
    }
  }
  return await MateriasAprobadas;
}

