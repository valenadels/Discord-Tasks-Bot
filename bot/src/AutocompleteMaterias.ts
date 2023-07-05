import { materiasPorCarrerasDelAlumno } from "./loadMaterias";

export async function autocompletarMaterias(interaction: { options: { getFocused: () => any; }; respond: (arg0: { name: string; value: string; }[]) => any; }) {
    const focusedValue = interaction.options.getFocused();
    let filtered = materiasPorCarrerasDelAlumno.filter(choice => choice.includes(focusedValue.toUpperCase()));
    if (filtered.length > 25)
        filtered = filtered.slice(0, 25);

    await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
    );
}