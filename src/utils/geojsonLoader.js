export async function geojsonLoad() {
    // how to make the url part of a config...?
    const response = await fetch('./geojson/utm/fields-fenced-area.geojson');
    const result = await response.json();
    // console.log(result.features)
    return result.features;
}