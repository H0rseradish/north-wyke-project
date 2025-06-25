import { useGeojson } from "./utils/geojsonContext";
import MakeField from "./MakeField";

//experimenting
//this didnt work because things were mixed up.
// export default function Experiment() {
//     const byYear = {
//     2008: [0, 1, 2],
//     2009: [ 0, 1, 2, 3 ],
//     2010: BlueFields()
// }

// const blueFields = fieldsData.filter((field) => field.properties.Farmlet === "Blue")
//         console.log(blueFields) 

// const fieldsByYear = {
//     2010: blueFields
// }


function yearFieldsDisplay(fieldsData, currentYear){
    // ok this: it was in the json all the time:
    const blueFields = fieldsData.filter((field) => field.properties.Farmlet === "Blue")
    console.log(blueFields)

    // FINALLY! now can put the required colours in here too
    // But remember its still rerendering for each year -is that desirable/necessary? Or is there still a better alternative?
    // also reminder that need to handle errors 
    const fieldsByYear = {
    2008: blueFields,
    2009: blueFields,
    2010: blueFields,
    2011: blueFields
    }
    console.log(fieldsByYear)

    // a new array - with length of 7
    console.log(fieldsByYear[2011])
    // gets the objectid of the first of the array of 7: (1 in this case) 
    // Definitely need to be using OBJECTID from the json, not the index
    // console.log(fieldsByYear[2011][0].properties.OBJECTID)
    
    // console.log(fieldsData[0].properties)
    // console.log(currentYear)
    // console.log(fieldsByYear[currentYear])
    const fieldsToDisplay = fieldsByYear[currentYear]
    
    // console.log(fieldsToDisplay)
    // console.log(fieldsToDisplay[0].properties.OBJECTID)

    //All the above works!!!!! The problem is below: what is getting passed into Makefield: 

    //remember each field is an object where the key is the year..
    return fieldsToDisplay.map((field) => ( 
        
        <MakeField 
            key={ field.properties.OBJECTID } 
            field={ field } 
            fieldName={ field.properties.Field_Name }
            color="blue"
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