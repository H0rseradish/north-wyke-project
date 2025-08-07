import * as THREE from 'three';

//now -- try using props here... to make the selected field. But do I use index, or should I use the OBJECTID from the geojson - is that even doable? YES NEED TO DO THAT but leave it as index for now. 
// There will be a lot more props because of changing colours etc?

export default function MakeBoundary( {field, color} ) {
    // console.log(props)
    // console.log(props.field)
    // console.log(field)

    // these need to be somewhere else really, they are duplicated in MakeField, too - asking for trouble:    
    const OFFSET_X = 265900;
    const OFFSET_Z = 98200;


    // console.log(fieldsData);
    // console.log(fieldsData[6].geometry.coordinates[0][0])

    //So the field is just coming in with its data now:
    const fieldCoords = field.geometry.coordinates[0][0];

    const fieldCoordsCount = fieldCoords.length;

    const boundaryCoords = new Float32Array(fieldCoordsCount * 3);

    // seetting the values in the float32 array:
    for(let i = 0; i < fieldCoordsCount; i++) {
        //the Bruno method:
        const i3 = i * 3;
        //think about this:
        boundaryCoords[i3 + 0] = (fieldCoords[i][0]) - OFFSET_X;
        boundaryCoords[i3 + 1] = 0;
        boundaryCoords[i3 + 2] = (fieldCoords[i][1]) - OFFSET_Z;
        }
        // console.log(boundaryCoords)

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(boundaryCoords, 3));

    // scale here is much better than messing with extreme values on the camera - which is what I was doing in the vanilla app:
    return (
            <mesh scale= { 0.015 } position={[-1, 0.02, -1]} rotation={ [Math.PI, 0, 0] }>
                <line geometry={ geometry }>
                    <lineBasicMaterial color={ color } />
                </line>      
            </mesh>
    )
}

