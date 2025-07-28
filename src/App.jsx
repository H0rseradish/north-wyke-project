import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";

import TimelineSlider from './TimelineSlider';
import TimelineNav from './TimelineNav';

//and now - is this going to work....NOT YET..YESSSS!!!
import ExperimentWithConfig from './ExperimentWithConfig';
import useDerivedAppConstants from './utils/configUtils';
//I suppose all the time periods ought to be user controlled via config for a reusable app? Yes - done!!

// this component is for holding the state so it can be passed around - ie shared, to both the 3d rendering component (Experience) and the Timelime (which is outside of the canvas, because it is not a r3f thing).
export default function App() {
    const { allStoryEvents, startDay, endDay, startYear } = useDerivedAppConstants()
    
    //for the new timeline using unix seconds:
    const [currentDay, setCurrentDay] = useState(startDay)
    //for the timelineNav need initial state to be startYear:
    const [currentYear, setCurrentYear] = useState(startYear)

    if(!allStoryEvents) return('not here yet')
    console.log(allStoryEvents)

    return (
        <>  
            <Canvas
                camera={{ position: [0, 3, 6] }}
            >
                <OrbitControls />
                {/* so experience knows what year has been set */}
                <ExperimentWithConfig currentYear={currentYear} currentDay={ currentDay}/>

            </Canvas>

            {/* new timeline based on days */}
            <TimelineSlider 
                currentDay={currentDay} 
                onDayChange={setCurrentDay}
                startDay={startDay}
                endDay={endDay}
            /> 
            {/* and a navigation with clickable years*/}
            <TimelineNav 
                startYear={startYear}
                currentYear={currentYear} onYearChange={setCurrentYear}
            />
        </>
    )
}