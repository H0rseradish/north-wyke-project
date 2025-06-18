import { useGeojson } from "./utils/geojsonContext";
import { Html, OrbitControls } from "@react-three/drei";

import MakeField from "./MakeField";


//function to display something:
function yearFieldsDisplay(fieldsData, currentYear){
    if (currentYear === 2011)
        // ok this is daft - will need to be able to pass array to MakeField!!!!!!!
    return (
        <>
            <MakeField field={ 0 } />
            <MakeField field={ 1 } />
            <MakeField field={ 2 } /> 
            <MakeField field={ 3 } /> 
            <MakeField field={ 4 } /> 
            <MakeField field={ 5 } /> 
            <MakeField field={ 6 } /> 
            <MakeField field={ 7 } /> 
            <MakeField field={ 8 } /> 
            <MakeField field={ 9 } /> 
            <MakeField field={ 10 } /> 
            <MakeField field={ 11 } /> 
            <MakeField field={ 12 } /> 
            <MakeField field={ 13 } /> 
            <MakeField field={ 14 } /> 
            <MakeField field={ 15 } /> 
            <MakeField field={ 16 } /> 
            <MakeField field={ 17 } /> 
            <MakeField field={ 18 } /> 
            <MakeField field={ 19 } /> 
            <MakeField field={ 20 } /> 
            <MakeField field={ 21 } /> 
            <MakeField field={ 22 } /> 
            <MakeField field={ 23 } /> 
            <MakeField field={ 24 } /> 
            <MakeField field={ 25 } />  
            
        </>
     
    )
}

// suggested by chatgpt to use the geojson here rather than in makeField
export default function Experience({currentYear}) {

    const { geojsonData: fieldsData } = useGeojson();
    //just in case:
    if(!fieldsData || fieldsData.length === 0) return null;

    //make an array of relevant fields to loop (map) over: to 

    const yearFields = yearFieldsDisplay(fieldsData, currentYear)


    return (
        <>
            <OrbitControls />

            {yearFields}
        </>
    )
}