import { Client, CommandInteraction, Interaction, InteractionType } from "discord.js";
import { loadCommands } from "../Commands";
import { autocompletarMaterias } from "../commands/MateriaAprobada";

export default async (client: Client): Promise<void> => {
  client.on("interactionCreate", async (interaction: Interaction) => {

    if (interaction.isAutocomplete()) {
      const commandInteraction = interaction as unknown as CommandInteraction;
      const value = commandInteraction.options.get("nombre")?.value as string;
      if (value.length > 2) {
        try {
          await autocompletarMaterias(interaction);
        } catch (error) {
          console.error(error);
        }
      }
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

