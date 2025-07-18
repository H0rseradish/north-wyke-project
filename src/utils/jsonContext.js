import { createContext, useContext } from "react"


// make this general, with access to all the data, not just the geojson
// instantiate the createContext - :
export const AllDataContext = createContext({
    // to access more than one thing - adapted from chatgpt:
    geojsonFeatures: null,
    appConfig: null,
    // and suggested these following, to manage loading state elsewhere in app: loading in case a message or spinner is needed, and error so can keep track, and hold an error message if needed - standard React practice?
    loading: true,
    error: null
});

//and use my created AllDataContext inside useContext() - this useAllAppData() then becomes my custom 'hook' for getting at the data?
export const useAllAppData = () => {
    const context = useContext(AllDataContext);
    if (!context) {
        throw new Error('useAllAppData has to be used inside a JsonProvider');
    }
    return context;
};
