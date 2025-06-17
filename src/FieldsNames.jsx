import { useEffect, useState } from 'react';
import { geojsonLoad } from './utils/geojsonLoader.js'

export default function FieldsNames() {  
    //create an array of fields, with state:
    const [ fieldData, setFieldData ] = useState([]);

    //with empty array, this will be called once, AFTER the first render.
    useEffect(() => {
        // on first render only:
        geojsonLoad().then(setFieldData).catch(console.error);
    }, [])


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
    