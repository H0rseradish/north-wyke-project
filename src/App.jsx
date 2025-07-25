import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
// import Experience from './Experience';
import Timeline from './Timeline';
import TimelineSlider from './TimelineSlider';
import TimelineNav from './TimelineNav';
// import Experiment from "./Experiment";
// just checking things are there:
// import { jsonLoad } from './utils/jsonLoader';
//and now - is this going to work....NOT YET..YESSSS!!!
import ExperimentWithConfig from './ExperimentWithConfig';

//I suppose all the time periods ought to be user controlled via config for a reusable app?

// 1st August 2008 as start date - hardcoded in useState for now but should get it out of the config...!

const startDay = 1217545200;
// Date.now is in ms, so:
const endDay = Math.floor(Date.now() / 1000)

// this component is for holding the state so it can be passed around - ie shared, to both the 3d rendering component (Experience) and the Timelime (which is outside of the canvas, because it is not a r3f thing).
export default function App() {
    //for the new timeline using unix seconds:
    const [currentDay, setCurrentDay] = useState(startDay)
    //for the original timeline need initial state to be startYear:
    const [currentYear, setCurrentYear] = useState(2008)
    //just to check...
    // jsonLoad()
    return (
        <>  
            <Canvas
                camera={{ position: [0, 3, 6] }}
            >
                <OrbitControls />
                {/* so experience knows what year has been set */}
               
                {/* <Experience currentYear={currentYear} /> */}

                <ExperimentWithConfig currentYear={currentYear} currentDay={ currentDay}/>
            </Canvas>

            <Timeline 
                currentYear={currentYear} onYearChange={setCurrentYear}/>

            {/* new timeline based on days */}
            <TimelineSlider 
                currentDay={currentDay} 
                onDayChange={setCurrentDay}
                startDay={startDay}
                endDay={endDay}
            /> 
            {/* and a navigation with clickable years*/}
            {/* <TimelineNav 
                currentYear={currentYear} onYearChange={setCurrentYear}
            /> */}
        </>
    )
}