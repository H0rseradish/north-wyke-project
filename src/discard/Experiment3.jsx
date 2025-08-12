// importing my 'reusable' things:
import { useAllAppData } from "./utils/jsonContext";
import MakeField from "./MakeField";
import MakeBoundary from "./MakeBoundary";
import { useState, useEffect } from "react";

// the whole thing needs rethinking 

//the colorscheme could be brought in as json?? with the aim of app reusability?
const colors = {
    construction: "gray",
    baselineSystem: "lightgreen",
    greenSystem: "green",
    blueSystem: "blue",
    redSystem: "red"
}

//now try to get the data out of appConfig not the geojson...
//am I going to change this to days?

export default function Experiment3({currentYear, appConfig}){
    // useContext in action: the data is here!! not needed in Makefield
    //wait can I get these from App? 
    // (renaming geojsonData to fieldsData - is this wise? or stupidly unnecessary? to allow for geojson that's not fields?)
    const { geojsonData: fieldsData} = useAllAppData();

    // const [visible, setVisible] = useState(false)
    // // console.log(appConfig)

    // useEffect(() => {
    //     //trigger animation after the component is loaded:
    //     requestAnimationFrame(() => {
    //         setVisible(true);
    //     })
    // }, [])

    // below does not work inside Canvas!!! And caused a bug so I have left it here for future reference!!!
    // if (!appConfig) return <p>Loading app config...</p>

    if(!fieldsData || fieldsData.length === 0) return null;
    console.log(fieldsData)
    
    // const configGreenFields = appConfig.fields.filter((field) => field.farmlet === "Green")
    // // console.log(configGreenFields)

    //get fieldsData in here
    const blueFieldsFromStartIDs = [1, 2, 3, 6, 11, 15, 20,];
    const redFieldsFromStartIDs = [7, 8, 9, 10, 14, 16, 19];

    const greenFieldsFromStartIDs = [4, 5, 12, 13, 18, 21, 22];
    const greenFieldsFrom2013IDs = [4, 5, 12, 13, 17, 18];
    const greenFieldsFrom2015IDs = [4, 12, 13, 17, 18, 25, 26];
  
    // need to think here... about these:
    const displayByYear = {
        2008: {
            fields: [
                { 
                    ids: greenFieldsFromStartIDs,
                    color: colors.baselineSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.baselineSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.baselineSystem
                }
            ]
        },
        2009: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.construction
            },
        },
        2010: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.baselineSystem
            },
        },
        2011: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.baselineSystem
            },
        },
        2012: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.baselineSystem
            },
        },
        2013: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.baselineSystem
            },
        },
        2014: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2015: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2016: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2017: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2018: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2019: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2020: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2021: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2022: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2023: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2024: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
        2025: {
            fields: {
                    IDs: [...greenFieldsFromStartIDs, 
                        ...redFieldsFromStartIDs, 
                        ...blueFieldsFromStartIDs],
                    color: colors.greenSystem
            },
        },
    }
  
    // console.log(fieldsData[0].properties)
    
    // currentYear actually returns an object, I AM AN IDIOT, forgot to destructure the prop! Leaving this comment in to remind me.
    console.log(currentYear)

    const yearData = displayByYear[currentYear];
    //so this is an object containing an array of 3 objects:
    console.log(yearData)

    // because there might not be year data...
    if (!yearData) return [];

    //have spread the arrays into array so don't need this:
    // const fieldsToDisplay = fieldsToDisplayArrays.flat()
    // console.log(fieldsToDisplay)

    console.log(yearData.fields)

    //ok this works:
    const fieldsArray = yearData.fields.flatMap(fields => fields.ids)
    console.log(fieldsArray)

    //get the actual geojson for the relevant fields:
    const fieldsToDisplay = fieldsData.filter((field) => 
        fieldsArray.includes(field.properties.OBJECTID)
    );


    return (
        fieldsToDisplay.map((field) => ( 
            <>       
                <MakeField 
                    key={`field-${field.properties.OBJECTID}`} 
                    field={ field } 
                    // fieldName={ field.properties.name }
                    color={ displayByYear[currentYear].fields.color }
                />
                <MakeBoundary 
                    key={ `boundary-${field.properties.OBJECTID}` } 
                    field={ field }
                    color={'yellow'} 
                />
            </>
        ))  
    )
}  
  