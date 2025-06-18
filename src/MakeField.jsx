
import * as THREE from 'three';
import { useGeojson } from './utils/geojsonContext.js';

//now -- try using props here... to make the selected field. But do I use index, or should I use the OBJECTID from the geojson - is that even doable? YES NEED TO DO THAT but leave it as index for now.

export default function MakeField({ field }) {
    // console.log(props)
    // console.log(props.field)
    console.log(field)

    // because the coordinates are huuuuge:
    const OFFSET_X = 265900;
    const OFFSET_Z = 98200;

    // the useContext hook in action!!!!:
    const {geojsonData: fieldsData} = useGeojson();

    // console.log(fieldsData);
    // console.log(fieldsData[6].geometry.coordinates[0][0])

    //should this code below below be in a function for any reason? or is that unnecessary complexity??

    const fieldCoords = fieldsData[field].geometry.coordinates[0][0];

    // console.log(fieldCoords);

    const fieldShape = new THREE.Shape();
    
    fieldCoords.forEach((coordinate, i) => {
            // start point, as before in vanilla app:
            if(i === 0) {
                fieldShape.moveTo(coordinate[0] - OFFSET_X, coordinate[1] - OFFSET_Z);
            } else { 
                // then draw the shape, (same as in vanilla app):
                fieldShape.lineTo(coordinate[0] - OFFSET_X, coordinate[1] - OFFSET_Z);
            }
        })

    // some random settings for now:    
    const extrudeSettings = {
            steps: 3,
            depth: 1,
            bevelEnabled: true 
    }
    // putting the scale on here is much better than messing with extreme values on the camera - which is what I was doing in the vanilla app:
    return (
            <mesh scale= { 0.005 }>
                <extrudeGeometry args={ [ fieldShape,  extrudeSettings ] } />
                <meshBasicMaterial color='green' />
            </mesh>
    )
}

