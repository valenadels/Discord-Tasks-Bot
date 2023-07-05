import { materiasPorCarrerasDelAlumno } from "./loadMaterias";

export async function autocompletarMaterias(interaction: { options: { getFocused: () => any; }; respond: (arg0: { name: string; value: string; }[]) => any; }) {
    const focusedValue = interaction.options.getFocused();
    const filtered = materiasPorCarrerasDelAlumno.filter(choice => choice.includes(focusedValue.toUpperCase()));
    await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
    );
}