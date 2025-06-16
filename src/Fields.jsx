
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { fieldsLoad } from './geojsonLoader.js'
import { Const } from 'three/tsl';

export default function Fields(){

    const OFFSET_X = 265900;
    const OFFSET_Z = 98200;

    const [ fieldData, setFieldData ] = useState([]);

    useEffect(() => {
        // on first render only:
        fieldsLoad().then(setFieldData).catch(console.error);
    }, [])

    // console.log(fieldData)
    // console.log(fieldData[6].geometry.coordinates[0][0])

    useEffect(()  => {
        if(fieldData.length > 25){
            const lowerWheatyCoords = fieldData[6].geometry.coordinates[0][0]

            console.log(lowerWheatyCoords)
        }      
    }, [fieldData]);


    const shape = new THREE.Shape();
    shape.moveTo( 0, 0 );
    shape.lineTo( 0, 3 );
    shape.lineTo( 5, 3 );
    shape.lineTo( 5, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
        steps: 3,
        depth: 1,
        bevelEnabled: true
    }

    return (
        <mesh>
            <extrudeGeometry args={ [ shape,  extrudeSettings ] } />
            <meshBasicMaterial color='red' wireframe />
        </mesh>
    )

}