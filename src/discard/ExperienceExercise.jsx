import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function ExperienceExercise(){
    const cube = useRef()

    useFrame((_, delta) => {
        // console.log(delta)
        cube.current.rotation.y += delta * 0.2
    })


    return <>
        
        <mesh position-x={ - 2 }>
            <sphereGeometry />
            <meshBasicMaterial color='orange' wireframe={ true } />
        </mesh>

        <mesh ref={ cube } rotation-y={ Math.PI * 0.25 } position-x={ 2 }scale={ 1.5 }>
            <boxGeometry scale={ 1.5 } />
            <meshBasicMaterial color='mediumpurple' />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshBasicMaterial color='greenyellow' />
        </mesh>
    </>
}