import { Command } from "./Command";
import { Ayuda } from "./commands/Ayuda";
import { Calendario } from "./commands/Calendario";
import { Carrera } from "./commands/Carrera";
import { Dollyfiuba } from "./commands/DollyFiuba";
import { Fiubamap } from "./commands/FiubaMap";
import { Fiubaplan } from "./commands/FiubaPlan";
import { Hello } from "./commands/Hello";
import { Login } from "./commands/LogIn";
import { createMateriasAprobadas, loadMateriasParticiones } from "./commands/MateriaAprobada";
import { Materia } from "./commands/Materia";
import { LogOut } from "./commands/LogOut";
import { MostrarMateriasAnotadas } from "./commands/MostrarMaterias";
import { MostrarMateriasAprobadas } from "./commands/MostrarMateriasAprobadas";
import { MateriaPorCodigo } from "./commands/MateriaPorcodigo";
import { MateriaAprobadaPorCodigo } from "./commands/MateriaAprobadaPorCodigo";

export async function loadCommands(): Promise<Command[]> {
  // const isUserLoggedIn = padron != null;

  // if (!isUserLoggedIn) {
  //   return [
  //     Hello,
  //     Calendario,
  //     Fiubamap,
  //     Dollyfiuba,
  //     Ayuda,
  //     Fiubaplan,
  //     Login,
  //   ];
  // } else {
  // await loadMateriaParticiones();
  const MateriaAprobadaCommand = await createMateriasAprobadas();
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
    MateriaAprobadaCommand,
    LogOut,
    MostrarMateriasAnotadas,
    MostrarMateriasAprobadas,
    MateriaPorCodigo,
    MateriaAprobadaPorCodigo,
  ];
  return Commands;
  // }
}



