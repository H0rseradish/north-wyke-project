import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";

import useDerivedAppConstants from './utils/configUtils';

import TimelineSlider from './TimelineSlider';
import TextExplanation from "./TextExplanation";
// much work still to do on this:
import ExperimentWithConfig from './ExperimentWithConfig';


//I suppose all the time periods ought to be user controlled via config for a reusable app? Yes - done!!

// this component is for holding the state so it can be passed around - ie shared, to both the 3d rendering component (Experience) and the Timelime (which is outside of the canvas, because it is not a r3f thing).
export default function App() {
    
    //wrap this in useMemo() - NO because its a custom hook. (the variables are wrapped in useMemo in the configUtils file, (after much tribulation)
    const { allStoryEvents, startDay, endDay, startYear, endYear, normalisedStarts, unixStarts } = useDerivedAppConstants();
    
    //for the new timeline using unix seconds:
    const [currentDay, setCurrentDay] = useState(null)
    //for the timelineNav need initial state to be startYear:
    const [currentYear, setCurrentYear] = useState(null)
    //I KNEW the above was going to be a problem... because I had used startDay when initialising useState, which was never going to be there because react hooks always have to be before conditions! So THIS is what useEffect is for...!  I am getting a feel for it now.

    // lifting state up - but there is something wrong - it is conflicting?
    const [snappedIndex, setSnappedIndex] = useState(-1)
    
    // Sorted!:
    useEffect(() => {
        if (startDay) {
            // Is this really stupid to have this condition ?:
            setCurrentDay(0)
        }
        //... ok, startDay is unlikely to change, but it might? 
    }, [startDay]);

    useEffect(() => {
        if (startYear) {
            setCurrentYear(startYear)
        }
    }, [startYear]);

    // still need this:
    if(!allStoryEvents) 
        return('StoryEvents not here yet, which probably means nothing else is either');
    // console.log(allStoryEvents);

    return (
        <>  
            <TextExplanation 
                currentDay={currentDay}
                snappedIndex={snappedIndex} 
                allStoryEvents={allStoryEvents} 
            />
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
                currentYear={currentYear} onYearChange={setCurrentYear}
                startDay={startDay}
                endDay={endDay}
                startYear={startYear}
                endYear={endYear}
                normalisedStarts={normalisedStarts}
                unixStarts={unixStarts}
                // pass the snappedIndex state down to this TimelineSlider
                setSnappedIndex={setSnappedIndex}
                
            /> 
        </>
    )
}