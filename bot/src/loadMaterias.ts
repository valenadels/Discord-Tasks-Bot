import { DatabaseConnection } from "./DBConnection";

export let materiasPorCarrerasDelAlumno: string[] = [];

export async function loadMateriasPorCarrera() {
    let materias = (await DatabaseConnection.getAllMaterias());
    materiasPorCarrerasDelAlumno = materias.filter((value, index, self) => self.indexOf(value) === index);
} 




