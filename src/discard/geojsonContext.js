import { createContext, useContext } from "react"

// instantiate the createContext:
export const GeojsonContext = createContext();

export const useGeojson = () => {
    const context = useContext(GeojsonContext);
    if (!context) {
        throw new Error('useGeojson has to be used inside a GeojsonProvider')
    }
    return context;
};
