import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { Alumno, AlumnoCarrera } from "../entities/Entities";


export const Login: Command = {
  name: "login",
  description: "Log in to the bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "padron",
      description: "tu padron",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: "carrera",
      description: "tu carrera",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const user = interaction.user;
    const padronOption = interaction.options.get("padron");
    const carreraOption = interaction.options.get("carrera");

    if (padronOption && carreraOption) {
      const padron = padronOption.value as number;
      const carrera = carreraOption.value as string;

      // Guardar el padrón en la tabla alumno
      const alumno = new Alumno();
      alumno.padron = padron;
      //guardar en base de datos
      
      //await dbConnection.getRepository(Alumno).save(alumno);

      // Guardar la carrera en la tabla alumno_carrera
    //   const carreraObject = await dbConnection.getRepository(Carreras).findOne({ nombre: carrera });
    //   if (carreraObject) {
    //     const alumnoCarrera = new AlumnoCarrera();
    //     alumnoCarrera.alumnoPadron = alumno.padron;
    //     alumnoCarrera.carreraId = carreraObject.id;
    //     await dbConnection.getRepository(AlumnoCarrera).save(alumnoCarrera);

    await interaction.followUp({
            content: `¡Bienvenido, ${user.username}! Has iniciado sesión correctamente.`,
            ephemeral: true}
        );
    //   } else {
    //     await interaction.reply("La carrera especificada no existe.");
    //   }
    // } else {
    //   await interaction.reply("Se requiere proporcionar el padrón y la carrera.");
    // }
    }
  }
};
