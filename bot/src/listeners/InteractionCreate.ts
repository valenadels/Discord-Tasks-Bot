import { Client, CommandInteraction, Interaction, InteractionType } from "discord.js";
import { loadCommands } from "../Commands";

export default async (client: Client): Promise<void> => {
  client.on("interactionCreate", async (interaction: Interaction) => {

    if (interaction.isAutocomplete()) {
      // respond to the request
      interaction.respond([
        {
          // What is shown to the user
          name: 'Command Help',
          // What is actually used as the option.
          value: 'help'
        }
      ]);
    } else {
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
    }
  });
};

