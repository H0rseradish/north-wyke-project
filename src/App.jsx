import { useState, useEffect } from 'react';
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

    //wrap this in useMemo() - NO because its a custom hook
    const { allStoryEvents, startDay, endDay, startYear, endYear, normalisedStarts } = useDerivedAppConstants();
    
    //for the new timeline using unix seconds:
    const [currentDay, setCurrentDay] = useState(null)
    //for the timelineNav need initial state to be startYear:
    const [currentYear, setCurrentYear] = useState(null)
    //I KNEW the above was going to be a problem... because I had used startDay when initialising useState, which was never going to be there because react hooks always have to be before conditions! So THIS is what useEffect is for...!  I am getting a feel for it now.
    
    // Sorted!:
    useEffect(() => {
        if (startDay) {
            setCurrentDay(startDay)
        }
        //ok, startDay is unlikely to change, but it might? 
    }, [startDay]);

    useEffect(() => {
        if (startYear) {
            setCurrentYear(startYear)
        }
    }, [startYear]);

    // still need this:
    if(!allStoryEvents) 
        return('StoryEvents not here yet');
    // console.log(allStoryEvents);

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
                normalisedStarts={normalisedStarts}
            /> 
            {/* and a navigation with clickable years*/}
            <TimelineNav 
                startYear={startYear}
                endYear={endYear}
                currentYear={currentYear} onYearChange={setCurrentYear}
            />
        </>
    )
}