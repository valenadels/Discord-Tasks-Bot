import { Command } from "./Command";
//import { Ayuda } from "./commands/Ayuda";
import { Calendario } from "./commands/Calendario";
import { Carrera } from "./commands/Carrera";
import { Dollyfiuba } from "./commands/DollyFiuba";
import { Fiubamap } from "./commands/FiubaMap";
import { Fiubaplan } from "./commands/FiubaPlan";
import { Hello } from "./commands/Hello";
import { Login } from "./commands/LogIn";
import { createMateriasAprobadas } from "./commands/MateriasAprobadas";
import { Materia } from "./commands/Materia";

export async function loadCommands(): Promise<Command[]> {
  const materiasAprobadasCommand = await createMateriasAprobadas();

  const Commands: Command[] = [
    Hello,
    Calendario,
    Fiubamap,
    Dollyfiuba,
    Fiubaplan,
    Login,
    Carrera,
    Materia,
    materiasAprobadasCommand
  ];
    return Commands;
}


  