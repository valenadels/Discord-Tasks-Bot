import { Command } from "./Command";
import { Ayuda } from "./commands/Ayuda";
import { Calendario } from "./commands/Calendario";
import { Carrera } from "./commands/Carrera";
import { Dollyfiuba } from "./commands/DollyFiuba";
import { Fiubamap } from "./commands/FiubaMap";
import { Fiubaplan } from "./commands/FiubaPlan";
import { Hello } from "./commands/Hello";
import { Login } from "./commands/LogIn";
import { Materia } from "./commands/Materia";
import { LogOut } from "./commands/LogOut";
import { MostrarMateriasAnotadas } from "./commands/MostrarMaterias";
import { MostrarMateriasAprobadas } from "./commands/MostrarMateriasAprobadas";
import { MateriaPorCodigo } from "./commands/MateriaPorcodigo";
import { MateriasAprobadas } from "./commands/MateriaAprobada";


export async function loadCommands(): Promise<Command[]> {
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
    LogOut,
    MostrarMateriasAnotadas,
    MostrarMateriasAprobadas,
    MateriaPorCodigo,
    MateriasAprobadas,
  ]
  return Commands;
}



