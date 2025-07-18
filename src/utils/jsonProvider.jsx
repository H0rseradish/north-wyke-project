import { useState, useEffect } from "react";
import { AllDataContext } from "./jsonContext.js";
import { jsonLoad } from "./jsonLoader.js";

// function to make a Provider of geojson, which will wrap the app - it had to be separated from the createContext.: 
// So  children is an array that will contain, in this case, <App /> plus whatever else, if anything - see index.jsx  in other words, whatever the Provider eventually wraps.
export const JsonProvider = ( { children } ) => {
    //these are the values that children can access:
    const [geojsonData, setGeojsonData] = useState(null);
    const [appConfig, setAppConfig] = useState(null);

    // suggested by chatgpt - see jsonContext.js, any of the children eg <App />,  will be able to access these via useAllAppData() AKA my custom hook, either all of them or by deconstructing like this? const { geojsonData, userConfig } = useAllAppData();
    // (it would be possible to use useContext(AllDataContext directly, but less redable etc))

    // whether it is still loading (being fetched):
    const [loading, setLoading] = useState(true);
    // any error during the fetch:
    const [error, setError] = useState(true);

    //this happens once on first render?? I think?:
    useEffect(() => {
        jsonLoad()
        //this callback is from chatgpt!:
        .then(({ geojsonData, appConfig }) => {
            setGeojsonData(geojsonData);
            setAppConfig(appConfig);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Appdata loading error:', err);
            setError(err);
            setLoading(false);
        });
    }, []);

    return (
        <AllDataContext.Provider value={ { geojsonData, appConfig, loading, error } }>
            { children }
        </AllDataContext.Provider>
    );
}
