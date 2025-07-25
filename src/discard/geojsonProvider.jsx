import { useState, useEffect } from "react";
import { GeojsonContext } from "./geojsonContext.js";
import { geojsonLoad } from "./geojsonLoader.js";

// function to make a Provider of geojson, which will wrap the app - it had to be separated from the createContext.: 
export const GeojsonProvider = ( { children } ) => {
    const [geojsonData, setGeojsonData] = useState(null);

    useEffect(() => {
        geojsonLoad().then(setGeojsonData);
    }, []);

    return (
        <GeojsonContext.Provider value={ { geojsonData }}>
            { children }
        </GeojsonContext.Provider>
    );
}
