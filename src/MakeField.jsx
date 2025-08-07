import * as THREE from 'three';
import { useMemo } from 'react';
// import { Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

//now -- try using props here... to make the selected field. But do I use index, or should I use the OBJECTID from the geojson - is that even doable? YES NEED TO DO THAT but leave it as index for now. 
// There will be a lot more props because of changing colours etc?

export default function MakeField( {field, fieldName, color, visible = true } ) {
    // console.log(props)
    // console.log(props.field)
    // console.log(field)

    // because utm coordinates are huuuuge:    
    const OFFSET_X = 265900;
    const OFFSET_Z = 98200;


    // the useContext hook in action!!!!: But dont need it now because the data is coming from Experiment
    // const {geojsonData: fieldsData} = useGeojson();

    // console.log(fieldsData);
    // console.log(fieldsData[6].geometry.coordinates[0][0])

    //So the field is just coming in with its data now:
    const fieldCoords = field.geometry.coordinates[0][0];


    //need to use useMemo for spring apparently (but is this why it isnt animating on changing the currentYear....):

    const fieldShape = useMemo(() => {
        const shape = new THREE.Shape();

        fieldCoords.forEach((coordinate, i) => {
            // start point, as before in vanilla app:
            if(i === 0) {
                shape.moveTo(coordinate[0] - OFFSET_X, coordinate[1] - OFFSET_Z);
            } else { 
                // then draw the shape, (same as in vanilla app):
                shape.lineTo(coordinate[0] - OFFSET_X, coordinate[1] - OFFSET_Z);
            }
        })
        console.log('Generating shape for field', field.properties.OBJECTID);
        console.log('to see if this works:', field.geometry.coordinates);
        return shape
    }, [fieldCoords, field.properties.OBJECTID, field.geometry.coordinates]);

    // some random settings for now:    
    const extrudeSettings = {
            steps: 3,
            depth: 1,
            bevelEnabled: true 
    }

    // spring's opacity animation: couldn't get this to work... yet - something missing somewhere... had to pass visible to MakeField!!!!
    const { opacity } = useSpring({
        //'visible' is boolean
        opacity: visible ? 1 : 0,
        //need to fiddle with these values.... in conjunction with the timeout delay in the useEffect in the Experiment4 file..
        config: { tension: 40, friction: 40 }
        // config: { duration: 500 }
    })


    // putting the scale on here is much better than messing with extreme values on the camera - which is what I was doing in the vanilla app:
    return (
            <a.mesh 
                scale= { 0.015 } 
                position={[-1, 0, -1]} 
                rotation={ [Math.PI * - 0.5, 0, 0] }
            >
                <extrudeGeometry args={ [ fieldShape,  extrudeSettings ] } />
                <a.meshBasicMaterial 
                    color={ color }
                    transparent
                    opacity={opacity} 
                />
                {/* sort the labels out later: */}
                {/* <Html>{ fieldName }</Html> */}
            </a.mesh>
    )
}

