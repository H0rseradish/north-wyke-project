export async function fieldsLoad() {
    const response = await fetch('./geojson/utm/fields-fenced-area.geojson');
    const result = await response.json();
    console.log(result.features)
    return result.features;
}