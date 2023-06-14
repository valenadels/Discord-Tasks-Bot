import { Command } from "./Command";
import { Ayuda } from "./commands/Ayuda";
import { Calendario } from "./commands/Calendario";
import { Dollyfiuba } from "./commands/DollyFiuba";
import { Fiubamap } from "./commands/FiubaMap";
import { Fiubaplan } from "./commands/FiubaPlan";
import { Hello } from "./commands/Hello";
import { Login } from "./commands/LogIn";

export const Commands: Command[] = [Hello, Calendario, Fiubamap, Dollyfiuba, Fiubaplan, Ayuda, Login]; 