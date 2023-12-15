// import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
// import { loadCommands } from "../Commands";
// import { Command } from "../Command";

// export const Ayuda: Command = {
//   name: "ayuda",
//   description: "Muestra todos los comandos disponibles",
//   type: ApplicationCommandType.ChatInput,
//   run: async (client: Client, interaction: CommandInteraction) => {
//     const Commands = await loadCommands();
//     const commandsList = Commands.map((command) => command.name).join(", ");
//     await interaction.followUp({
//       ephemeral: true,
//       content: `Estos son los comandos disponibles: ${commandsList}`
//     });
//   },
// };


