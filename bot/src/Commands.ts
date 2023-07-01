import { Command } from "./Command";
import { Ayuda } from "./commands/Ayuda";
import { Calendario } from "./commands/Calendario";
import { Carrera } from "./commands/Carrera";
import { Dollyfiuba } from "./commands/DollyFiuba";
import { Fiubamap } from "./commands/FiubaMap";
import { Fiubaplan } from "./commands/FiubaPlan";
import { Hello } from "./commands/Hello";
import { Login } from "./commands/LogIn";
import { createMateriasAprobadas, loadMateriasParticiones } from "./commands/MateriasAprobadas";
import { createMateriasAprobada, loadMateriaParticiones } from "./commands/MateriaAprobada";
import { Materia } from "./commands/Materia";

export async function loadCommands(): Promise<Command[]> {
 // await loadMateriasParticiones();
  // const materiasAprobadasCommand = await createMateriasAprobadas();
   await loadMateriaParticiones();
  const materiaAprobadaCommand = await createMateriasAprobada();
  const Commands: Command[] = [
    Hello,
    Calendario,
    Fiubamap,
    Dollyfiuba,
    Ayuda,
    Fiubaplan,
    Login,
    Carrera,
    Materia,
    //materiasAprobadasCommand,
    materiaAprobadaCommand
  ];
  return Commands;
}


