export async function jsonLoad() {
    // how to make the url part of a config...?
    // First fetch the metaconfig:
    const metaResponse = await fetch('./meta-config.json');
    // chat suggested this error-handling:
    if(!metaResponse.ok) throw new Error('Failed to load meta-config')
    // but hopefully it gets stored in here
    const metaConfig = await metaResponse.json();

    // that worked:
    // console.log(metaConfig);

    //Then load the relevant config dependent on the meta-config path:
    const configResponse = await fetch(metaConfig.appConfigPath)
    if (!configResponse.ok) throw new Error('Failed to load the appConfig from the meta-config file')
    const appConfig = await configResponse.json();

    // this worked:        
    // console.log(appConfig)

    // now for the geojson, - but this is just the one file -for now:
    const geoResponse = await fetch(appConfig.geojsonLayers.fields)
    if (!geoResponse.ok) throw new Error('Failed to load the geojson via the config file')
    const geojson = await geoResponse.json();
    //this works:
    // console.log(geojson.features);
    const geojsonData = geojson.features

    return { appConfig, geojsonData } 
}

//chatgpt - on how to handle more than one geojson:
// // Load GeoJSON layers
//   const geojsonData = {};
//   const layerEntries = Object.entries(userConfig.geoJsonLayers || {});

//   await Promise.all(
//     layerEntries.map(async ([name, path]) => {
//       const res = await fetch(path);
//       if (!res.ok) throw new Error(`Failed to load GeoJSON layer: ${name}`);
//       const json = await res.json();
//       geojsonData[name] = json.features || json;
//     })
//   );

//   return { userConfig, geojsonData };
// }

