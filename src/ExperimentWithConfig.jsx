// importing my 'reusable' things:
import { useAllAppData } from "./utils/jsonContext";
import MakeField from "./MakeField";

//Now - to experiment with using appConfig...

// the whole thing needs rethinking 



//the colorscheme could be brought in as json?? with the aim of app reusability?
const colors = {
    farmletSystem: {
        green: "green",
        blue: "blue",
        red: "red"
    },
}
// But.. this will have to encompass more things: like a baseline color, colors dependent on things other than farmlet etc
function assignColor(farmletSystem){
    
    switch (farmletSystem) {
    case 'Green': 
        return colors.farmletSystem.green
    case 'Blue': 
        return colors.farmletSystem.blue
    case 'Red': 
        return colors.farmletSystem.red
    }
}

//now try to get the data out of appConfig not the geojson...
//am I going to change this to days?

function yearFieldsDisplay(fieldsData, currentYear, appConfig){

    // console.log(appConfig)
    // in the json all the time except this is no good because the filtering is not enough to get the correct fields:
    const blueFields = fieldsData.filter((field) => field.properties.Farmlet === "Blue")
    // console.log(blueFields)

    const redFields = fieldsData.filter((field) => field.properties.Farmlet === "Red")
    // console.log(redFields)

    const greenFields = fieldsData.filter((field) => field.properties.Farmlet === "Green")
    
    // try this:
    //will need to filter the field data geojson on the basis of the json config fields??? - need map too? 
    // THINK ABOUT THIS LATER!!!
    if (!appConfig) return <p>Loading app config...</p>

    const configGreenFields = appConfig.fields.filter((field) => field.farmlet === "Green")
    // console.log(configGreenFields)
    

    //should be done on ID not index
    // Also the way I am assigning colours wont work here either
    const allFieldsTo2013 = [
       ...fieldsData.slice(0, 16),
       ...fieldsData.slice(17, 22), 
    ]
    //should be done on ID not index- Its causing a Key Error! 
    // const orchardDeanSplit2015 = [
    //     // 24:Orchard Dean North, 25:Orchard Dean South
    //     ...fieldsData.slice(24),
    // ];

    // but what about the colours?
    // - they don't depend upon year (except sometimes they do... ie baseline)
    const fieldsByYear = {
        2008: {
            system: [allFieldsTo2013]
        },
        2009: {
            system: [blueFields]
        },
        2010: {
            system: [greenFields, blueFields]
        },
        2011: {
            system: [redFields, greenFields]
        },
        2012: {
            system: [redFields, greenFields, blueFields]
        },
        2013: {
            system: [redFields, greenFields, blueFields]
        },
        2014: {
            system: [redFields, greenFields, blueFields]
        },
        2015: {
            system: [redFields, blueFields, greenFields]
        }
    }

    // a new array - with length of 7
    // console.log(fieldsByYear[2011])
    // gets the objectid of the first of the array of 7: (1 in this case) 
    // Definitely need to be using OBJECTID from the json, not the index
    // console.log(fieldsByYear[2011][0].properties.OBJECTID)
    
    // console.log(fieldsData[0].properties)
    // console.log(currentYear)
    // console.log(fieldsByYear[currentYear])

    const fieldsToDisplayArrays = fieldsByYear[currentYear]

    // because there might not be a year...
    if (!fieldsByYear[currentYear]) return [];

    const fieldsToDisplay = fieldsToDisplayArrays.system.flat()
    // console.log(fieldsToDisplay)
    

    return fieldsToDisplay.map((field) => ( 
        
        <MakeField 
            key={ field.properties.OBJECTID } 
            field={ field } 
            fieldName={ field.properties.name }
            // color={ 'blue' }
            // will this need to actually be a a prop passed to assignColor??? - because it won't always be dependent on farmlet.
            color={ assignColor(field.properties.Farmlet) }
        />
    ));
}  

//so this was able to stay as it was
export default function ExperimentWithConfig({currentYear}) {

    // useContext in action: the data is here!! not needed in Makefield
    const { geojsonData: fieldsData, appConfig } = useAllAppData();

    //just in case - this is a version of a condition checking if the data is there - and making sure react holds off until the data is there:
    if(!fieldsData || fieldsData.length === 0) return null;
    //this does the same thing:
    if (!appConfig) 
        return <p>Loading app config...</p>

    // the yearFields function decides what to display based on current year
    const yearFields = yearFieldsDisplay(fieldsData, currentYear, appConfig)

    return (
        <>
            {yearFields}
        </>
    )
}