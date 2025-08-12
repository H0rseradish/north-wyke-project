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

export default function Experience({currentYear}){
    // useContext in action: the data is here!! not needed in Makefield
    //wait can I get these from App? 
    // (renaming geojsonData to fieldsData - is this wise? or stupidly unnecessary? to allow for geojson that's not fields?)
    const { geojsonData: fieldsData} = useAllAppData();

    const [visible, setVisible] = useState(false)
    // console.log(appConfig)

    //omigod chat suggested putting currentYear in as a dependency...(with the reset to false)
    //ok this kind of works...but you see it kind of bounce...its the tension and friction in combination with the timeout... need to experiment.
    useEffect(() => {
        setVisible(false); // reset visibility
        const timeout = setTimeout(() => {
            setVisible(true); // trigger animation after delay
        }, 300); // small delay to force re-render

        return () => clearTimeout(timeout); // cleanup
    }, [currentYear]);


    if(!fieldsData || fieldsData.length === 0) return null;
    // console.log(fieldsData)
    
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
                    color: colors.construction 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.construction
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.construction
                }
            ]
        },
        2009: {
            fields: [
                { 
                    ids: greenFieldsFromStartIDs,
                    color: colors.construction 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.construction
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.construction
                }
            ]
        },
        2010: {
            fields: [
                { 
                    ids: greenFieldsFromStartIDs,
                    color: colors.construction 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.construction
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.construction
                }
            ]
        },
        2011: {
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
        2012: {
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
        2013: {
            fields: [
                { 
                    ids: greenFieldsFrom2013IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2014: {
            fields: [
                { 
                    ids: greenFieldsFrom2013IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2015: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2016: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2017: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2018: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2019: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2020: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2021: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2022: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2023: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2024: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
        2025: {
            fields: [
                { 
                    ids: greenFieldsFrom2015IDs,
                    color: colors.greenSystem 
                },
                {
                    ids: blueFieldsFromStartIDs,
                    color: colors.blueSystem
                },
                {
                    ids: redFieldsFromStartIDs,
                    color: colors.redSystem
                }
            ]
        },
    }
  
    // console.log(fieldsData[0].properties)
    
    // currentYear actually returns an object, I AM AN IDIOT, forgot to destructure the prop! Leaving this comment in to remind me.
    // console.log(currentYear)

    const yearData = displayByYear[currentYear];
    //so this is an object containing an array of 3 objects:
    // console.log(yearData)

    // because there might not be year data...
    if (!yearData) return [];

    //have spread the arrays into array so don't need this:
    // const fieldsToDisplay = fieldsToDisplayArrays.flat()
    // console.log(fieldsToDisplay)

    // console.log(yearData.fields)

    //ok this works:
    const fieldsArray = yearData.fields.flatMap(fields => fields.ids)
    // console.log(fieldsArray)
    

    //OK I caved in and got this from chatgpt - I had not used Map() before...
    // Build a map of OBJECTID -> color
    const fieldColorMap = new Map();

    //Map.set() creates related pairs of things - in this case the id plus the color:
    yearData.fields.forEach(group => {
        group.ids.forEach(id => {
            fieldColorMap.set(id, group.color);
        });
    });
    // its an object full of pairs of things connected by a fat arrow: eg {4 => 'gray', etc..}
    // console.log(fieldColorMap)


    //this also adapted from chat using .has() (new to me I think?) 
    //get the actual geojson for the relevant fields:
    const fieldsToDisplay = fieldsData.filter((field) => 
        fieldColorMap.has(field.properties.OBJECTID)
    );


    return (
        fieldsToDisplay.map((field) => { 
            //these variables also came from the chatgpt response:
            //so you can use get() to get something out of a Mapped pair:
            const fieldId = field.properties.OBJECTID;
            const color = fieldColorMap.get(fieldId);

            // putting currentYear into the key apparently unmounts and remounts MakeField when the year changes:
            return(
            <>       
                <MakeField 
                    key={`field-${currentYear}-${field.properties.OBJECTID}`} 
                    field={ field } 
                    // fieldName={ field.properties.name }
                    color={ color }
                    visible={ visible }
                />
                <MakeBoundary 
                    key={ `boundary-${field.properties.OBJECTID}` } 
                    field={ field }
                    color={'yellow'} 
                />
            </>
            )
        })
    )    
}  
  