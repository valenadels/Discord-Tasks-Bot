import { Client, CommandInteraction, Interaction, InteractionType } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() && interaction.type === InteractionType.ApplicationCommand) {
            const slashCommand = Commands.find((c) => c.name === interaction.commandName);
            if (!slashCommand) {
                interaction.followUp({ content: "An error has occurred" });
                return;
            }

            await interaction.deferReply();

            slashCommand.run(client, interaction as CommandInteraction);
        }
    });
};



