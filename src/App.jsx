import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import Experience from './Experience';
import Timeline from './Timeline';
import Experiment from "./Experiment";

// this component is for holding the state so it can be passed around - ie shared, to both the 3d rendering component (Experience) and the Timelime (which is outside of the canvas, because it is not a r3f thing).
export default function App() {
    const [currentYear, setCurrentYear] = useState(2008)

    return (
        <>
            <Canvas
                camera={{ position: [0, 3, 6] }}
            >
                <OrbitControls />
                {/* so experience knows what year has been set */}
               
                {/* <Experience currentYear={currentYear} /> */}

                 <Experiment currentYear={currentYear}/>
            </Canvas>
            {/* so Timeline knows the year and can set the year */}
            <Timeline currentYear={currentYear} onYearChange={setCurrentYear}/>
            
        </>
    )
}