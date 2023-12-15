import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, CacheType } from "discord.js";
import { Command } from "../Command";
import { DatabaseConnection } from "../DBConnection";
import { Task } from "src/entities/Entities";

export const Create: Command = {
  name: "create",
  description: "New Task",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "Name",
      description: "task name",
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true,
    },
    {
      name: "Description",
      description: "task description",
      type: ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  run: async (_: Client, interaction: CommandInteraction) => {
    const name = interaction.options.get("Name")?.value as string;
    const description = interaction.options.get("Description")?.value as string;

    if (!name)
      interaction.followUp({ content: "An error has occurred, please try again" });

    const task = createTask(name, description, interaction);
    let result = await DatabaseConnection.saveTask(task);

    interaction.followUp({ content: "Task created with id: " + result?.ID });
  },
};

function createTask(name: string, description: string, interaction: CommandInteraction) {
  const task = new Task();
  task.NAME = name;
  task.DESCRIPTION = description;
  task.RESPONSIBLE = interaction.user.username;
  return task;
}

