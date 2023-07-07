import { DatabaseConnection } from "./DBConnection";

export let materiasPorCarrerasDelAlumno: string[] = [];

export async function loadMateriasPorCarrera() {
    const materias = (await DatabaseConnection.getAllMaterias());
    materiasPorCarrerasDelAlumno = materias.filter((value, index, self) => self.indexOf(value) === index);
} 




