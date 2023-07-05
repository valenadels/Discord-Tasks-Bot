import { DatabaseConnection } from "./DBConnection";

export let materiasPorCarrerasDelAlumno: string[] = [];

export async function loadMateriasPorCarrera() {
    materiasPorCarrerasDelAlumno = (await DatabaseConnection.getAllMaterias());
}




