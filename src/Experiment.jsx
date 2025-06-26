import { useGeojson } from "./utils/geojsonContext";
import MakeField from "./MakeField";

//experimenting

//so the colour is dependent upon: the farmlet, the enterprise, maybe even the individual field id? these are all available in the json. (Not necessary for the year.)
//the colorscheme could be brought in as json?? with the aim of app reusability?
const colors = {
    farmletSystem: {
        green: "green",
        blue: "blue",
        red: "red"
    },
    // more in here eg:
    // { enterprise: 
    //    A1, A2, A3: "orange"}
    // flume/catchment: 
    // etc etc 
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

function yearFieldsDisplay(fieldsData, currentYear){
    // in the json all the time except this is no good because the filtering is not enough to get the correct fields:
    const blueFields = fieldsData.filter((field) => field.properties.Farmlet === "Blue")
    // console.log(blueFields)

    const redFields = fieldsData.filter((field) => field.properties.Farmlet === "Red")
    // console.log(redFields)

    const greenFields = fieldsData.filter((field) => field.properties.Farmlet === "Green")
    // console.log(redFields)

     //should be done on ID not index? The way I am assigning colours wont work here
    const allFieldsTo2013 = [
       ...fieldsData.slice(0, 16),
       ...fieldsData.slice(17, 22), 
    ]
    //ditto
    const orchardDeanSplit2015 = [
        // 24:Orchard Dean North, 25:Orchard Dean South
        ...fieldsData.slice(24),
    ];

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
            system: [redFields, greenFields, blueFields, orchardDeanSplit2015]
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
    console.log(fieldsToDisplay)
    

    return fieldsToDisplay.map((field) => ( 
        
        <MakeField 
            key={ field.properties.OBJECTID } 
            field={ field } 
            fieldName={ field.properties.Field_Name }
            // color={ 'blue' }
            // will this need to actually be a a prop passed to assignColor??? - because it won't always be dependent on farmlet.
            color={ assignColor(field.properties.Farmlet) }
        />
    ));
}

//so this was able to stay as it was
export default function Experiment({currentYear}) {

    // useContext in action: the data is here!! not needed in Makefield
    const { geojsonData: fieldsData } = useGeojson();

    //just in case:
    if(!fieldsData || fieldsData.length === 0) return null;

    // the yearFields function decides what to display based on current year
    const yearFields = yearFieldsDisplay(fieldsData, currentYear)

    return (
        <>
            {yearFields}
        </>
    )
}