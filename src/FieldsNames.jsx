import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { fieldsLoad } from './geojsonLoader.js'

export default function FieldsNames() {  
    //create an array of fields, with state:
    const [ fieldData, setFieldData ] = useState([]);

    useEffect(() => {
        // on first render only:
        fieldsLoad().then(setFieldData).catch(console.error);
    }, [])

  
    useEffect(()  => {
        if(fieldData.length > 25){
            console.log(fieldData[6].properties)
            console.log(fieldData[6].geometry)
            console.log(fieldData[6].geometry.coordinates)
            console.log(fieldData[6].geometry.coordinates[0][0])
        }      
    }, [fieldData]);
    //these don't work (and cause an error) until a hot reload has happened:
    
    // const lowerWheatyCoords = fieldData[6].geometry.coordinates[0][0];
    // console.log(lowerWheatyCoords);


    // Or Maybe just get some static info first? 
        return (
            <div>
                <ul>
                    { fieldData.map((field) => 
                        // these could be defined elsewhere (in another json file???) and injected? just thinking about reusability of the app?
                        <li key={ field.properties.OBJECTID }>{ field.properties.Field_Name }: <strong>{ field.properties.OBJECTID }</strong></li>   
                    ) }
                </ul>
            </div>            
        )
    }
    