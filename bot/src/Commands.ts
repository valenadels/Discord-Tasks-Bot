import { Command } from "./Command";
import { Create } from "./commands/Create";
// import { Edit } from "./commands/Edit";
// import { Delete } from "./commands/Delete";
// import { Finish } from "./commands/Finish";
// import { List } from "./commands/List";


export function loadCommands(): Command[] {
  let Commands: Command[] = [
    Create
    // Edit,
    // Delete,
    // Finish,
    // List
  ]
  return Commands;
}



