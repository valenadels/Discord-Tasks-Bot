import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, CacheType, CommandInteractionOption } from "discord.js";
import { Command } from "../Command";
import { MateriaAprobada } from "../entities/Entities";
import { DatabaseConnection, MateriaOption } from "../DBConnection";
import { padron } from './LogIn';

let materiasYaMostradas: MateriaOption[] = []
let materiasParticiones: MateriaOption[][] = [];
let particionActual: MateriaOption[] = [];
let i = 0;

export async function loadMateriaParticiones() {
  let materias = await DatabaseConnection.getAllMaterias();
  const result: MateriaOption[][] = [];
  let sizeParticion = 24;
  let lengthMaterias = materias.length;
  for (let i = 0; i < lengthMaterias; i += sizeParticion) {
    result.push(materias.slice(i, i + sizeParticion));
  }
  materiasParticiones = result;
  particionActual = materiasParticiones.at(i)!;
  materiasYaMostradas.push(...particionActual!);
  particionActual.push({ name: "Mostrar más y volver a ejecutar comando", value: "Mostrar más" });
  i++;
}

export async function createMateriasAprobada(): Promise<Command> {
  const MateriasAprobadas: Command = {
    name: "materias-aprobada",
    description: "Registra tus materias aprobadas",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "materias-aprobada",
        description: "materia aprobada",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: particionActual,
      }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
      console.log("entre al principio");
      if (!padron) {
        await interaction.followUp("Debe loguearse primero. use /login <padron>");
        return;
      }
      const materiaOption = interaction.options.get("materias-aprobada");
      if (materiaOption) {
        if (i < materiasParticiones.length && materiaOption.value == "Mostrar más") {
          console.log("entre");
          particionActual = materiasParticiones.at(i)!;
          i++;
          materiasYaMostradas.push(...particionActual!);
          particionActual.push({ name: "Mostrar más y volver a ejecutar comando", value: "Mostrar más" });
          console.log(materiasYaMostradas);
          console.log(particionActual);
          await interaction.followUp({
            content: `Volvé a ejecutar el comando para ver más materias`,
            ephemeral: true
          });
        } else {
          console.log("entre2");
          await guardarMateria(materiaOption, interaction);
        }
      }
    }
  }
  return await MateriasAprobadas;
}

async function guardarMateria(materiaOption: CommandInteractionOption<CacheType>, interaction: CommandInteraction<CacheType>) {
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
