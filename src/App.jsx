import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import Timeline from './Timeline';


// this component is for holding the state so it can be passed around - ie shared, to both the 3d rendering component (Experience) and the Timelime (which is outside of the canvas, because it is not a r3f thing).
export default function App() {
    const [currentYear, setCurrentYear] = useState(2008)

    return (
        <>
            <Canvas>
                {/* so experience knows what year has been set */}
                <Experience currentYear={currentYear} />
            </Canvas>
            {/* so Timeline knows the year and can set the year */}
            <Timeline currentYear={currentYear} onYearChange={setCurrentYear}/>
        </>
    )
}