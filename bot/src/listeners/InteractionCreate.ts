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




//   else if (interaction.isAutocomplete()) {
//     const searchQuery: string | null = interaction.options.getString('materia-aprobada');
//     if (!searchQuery) 
//       return;
//     const autocompleteChoices = await generateAutocompleteChoices();

//     const matchingChoices = autocompleteChoices.filter((choice) =>
//       choice.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const options = matchingChoices.map((choice) => ({
//       label: choice.name,
//       value: choice.value.toString(),
//     }));

//     await interaction.respond({
//       type: InteractionResponseType.ChannelMessageWithSource,
//       data: {
//         options,
//       },
//     });
//   }
// });
// };





