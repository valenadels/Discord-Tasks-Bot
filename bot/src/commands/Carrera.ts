import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { Alumno, AlumnoCarrera, Carreras } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";

const db = DatabaseConnection.initializeDB();
const opcionesCarrera = [
    { name: "Informatica", value: "Informatica" },
    { name: "Electronica", value: "Electronica" },
    { name: "Sistemas", value: "Sistemas" },
  ];
  

export const Carrera: Command = {
    name: "carrera",
    description: "Add your career",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
          name: "carrera",
          description: "Elige tu carrera",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: opcionesCarrera.map((opcion) => ({
            name: opcion.name,
            value: opcion.value,
          })),
        },
      ],      
      run: async (client: Client, interaction: CommandInteraction) => {
        const user = interaction.user;
        const carreraOption = interaction.options.get("carrera");
      
        if (carreraOption) {
          const carrera = carreraOption.value as string;
          let id = 0;
        
          switch (carrera) {
            case "Informatica":
              id = 1;
              break;
            case "Electronica":
              id = 2;
              break;
            case "Sistemas":
              id = 3;
              break;
            // Agrega más casos según las opciones de carrera definidas
            default:
              await interaction.reply("La carrera seleccionada no es válida.");
              return;
          }
      
          // Continúa con el resto del código para guardar la carrera en AlumnoCarrera
          const nuevoAlumno = new AlumnoCarrera();
          // Asigna el padrón del alumno al campo alumnoPadron de AlumnoCarrera
          //nuevoAlumno.alumnoPadron = user.padron;
          // Asigna la carrera seleccionada al campo carreraId de AlumnoCarrera
          nuevoAlumno.carreraId = id;
          //await db.saveAlumnoCarrera(nuevoAlumno);
      
          await interaction.followUp({
            content: `Tu carrera se ha guardado exitosamente.`,
            ephemeral: true,
          });
        } else {
          await interaction.reply("La carrera especificada no existe.");
        }
      }
      
};
    
  
  