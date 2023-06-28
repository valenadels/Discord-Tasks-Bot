import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { AlumnoCarrera } from "../entities/Entities";
import { DatabaseConnection } from "../DBConnection";
import { padron } from '../commands/LogIn';

const INFORMATICA = "Informatica";
const ELECTRONICA = "Electronica";
const SISTEMAS = "Sistemas";
const opcionesCarrera = [
    { name: INFORMATICA, value: INFORMATICA },
    { name: ELECTRONICA, value: ELECTRONICA },
    { name: SISTEMAS, value: SISTEMAS },
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
        if(!padron){
          await interaction.followUp("Debe loguearse primero. use /login <padron>");
          return;
        }

        const carreraOpcion = interaction.options.get("carrera");
      
        if (carreraOpcion) {
          const carrera = carreraOpcion.value as string;
          let id = 0;
        
          switch (carrera) {
            case INFORMATICA:
              id = 1;
              break;
            case  ELECTRONICA:
              id = 2;
              break;
            case SISTEMAS:
              id = 3;
              break;
          }
      
          const nuevoAlumno = new AlumnoCarrera();
          nuevoAlumno.alumnoPadron = padron;
          nuevoAlumno.carreraId = id;
          await DatabaseConnection.saveAlumnoCarrera(nuevoAlumno);
      
          await interaction.followUp({
            content: `Tu carrera se ha guardado exitosamente.`,
            ephemeral: true,
          });
        } 
      }
      
};
    
  
  