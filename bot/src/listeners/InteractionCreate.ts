import { Client, CommandInteraction, Interaction, InteractionType } from "discord.js";
import { loadCommands } from "../Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
      if (interaction.isCommand() && interaction.type === InteractionType.ApplicationCommand) {
        const slashCommands = await loadCommands();
        const slashCommand = slashCommands.find((c) => c.name === interaction.commandName);
  
        if (!slashCommand) {
          interaction.followUp({ content: "An error has occurred" });
          return;
        }
  
        await interaction.deferReply();
        await slashCommand.run(client, interaction as CommandInteraction);
      }
    });
  };
  




