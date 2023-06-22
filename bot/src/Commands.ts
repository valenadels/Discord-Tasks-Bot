import { Command } from "./Command";
import { Ayuda } from "./commands/Ayuda";
import { Calendario } from "./commands/Calendario";
import { Carrera } from "./commands/Carrera";

import { Dollyfiuba } from "./commands/DollyFiuba";
import { Fiubamap } from "./commands/FiubaMap";
import { Fiubaplan } from "./commands/FiubaPlan";
import { Hello } from "./commands/Hello";
import { Login } from "./commands/LogIn";
import { MateriasAprobadas } from "./commands/MateriasAprobadas";
import { Materia } from "./commands/Materia";



export const Commands: Command[] = [Hello, Calendario, Fiubamap, Dollyfiuba, Fiubaplan, Ayuda, Login, Carrera, Materia, MateriasAprobadas]; 