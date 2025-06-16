
import * as THREE from 'three';
import { useGeojson } from './geojsonContext.js';

export default function Fields() {

    const OFFSET_X = 265900;
    const OFFSET_Z = 98200;

    const {geojsonData: fieldsData} = useGeojson()

    console.log(fieldsData)
    // console.log(fieldsData[6].geometry.coordinates[0][0])

    const lowerWheatyCoords = fieldsData[6].geometry.coordinates[0][0];

    console.log(lowerWheatyCoords);


    const shape = new THREE.Shape();
    shape.moveTo( 0, 0 );
    shape.lineTo( 0, 3 );
    shape.lineTo( 5, 3 );
    shape.lineTo( 5, 0 );
    shape.lineTo( 0, 0 );

    const fieldShape = new THREE.Shape();

    lowerWheatyCoords.forEach((coordinate, i) => {
            if(i === 0) {
                fieldShape.moveTo(coordinate[0] - OFFSET_X, coordinate[1] - OFFSET_Z);
            } else { 
                fieldShape.lineTo(coordinate[0] - OFFSET_X, coordinate[1] - OFFSET_Z);
            }
        })



    const extrudeSettings = {
            steps: 3,
            depth: 1,
            bevelEnabled: true 
    }
    
    return (
       <>
        <mesh scale= {0.05}>
            <extrudeGeometry args={ [ fieldShape,  extrudeSettings ] } />
            <meshBasicMaterial color='green' />
        </mesh>
        </>
    )

}

