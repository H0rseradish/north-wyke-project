import { useRef } from "react";
// import { useState } from 'react';
import { useAllAppData } from "./utils/jsonContext";


export default function TimelineSlider({ currentDay, onDayChange, startDay, endDay }) {
    //so I can manipulate the html element: hooks MUST go here, before any conditions!!! otherwise violates Rules of Hooks... (not safe - gets skipped on some renders)
    const input = useRef()

    //get that appConfig data!
    const { appConfig }= useAllAppData()
    

    // finally(!!!!) understand WHY this condition stops null thing: - a way of preventing crashing WHILE react is loading the data... it just tell it to hold off.
    if (!appConfig) 
        return <p>Loading app config...</p>
    // console.log(appConfig)

    const { story } = appConfig;
    // console.log(story)

    // handle changes to the range input:
    //the onChange event is WRONG there will be many multiples especially if I use days...!!! - needs to be pointerup etc
    const handleChange =(e) => {
        // console.log(e.target.value);
        const selected = e.target.value
        //just doing this for now
        const selectedToYear = new Date(selected * 1000).getFullYear()
        console.log(selectedToYear)

        onDayChange(Number(e.target.value))
    }

    // handle clicks on the timeline labels - the years are the most granular if they are permanently visible?. Will need multiple handlers to handle each kind of event
    const handleClick = (e) => {
        console.log(e.target.value);
        input.current.value = e.target.value
        //aha!!
        onDayChange(Number(input.current.value))
    }
    

    //clicking on the year labels:
    // fixed order is intrinsic to any timeline so index as key is ok in this case? 
    //Another thing, because of this loop I think I have to make sure that other things, when part of this function, are only rendered once using useEffect with empty array as second param? or useMemo? 
    
    //OK -  after many false starts just realised the year things will need to be a separate thing!!!  - Component! YearLine? TimelineNav
    // const labels = timelineLabels.map((option, index) => 
    //     <option 
    //         key={ index } 
    //         value={ option } 
    //         label={ option } 
    //         onClick={ handleClick } 
    //     />
    // )

    // ?? const humanReadableSelection = 
     
    return (
        <div>
            <form 
                style={ { 
                position: 'absolute',  
                bottom: 20, 
                width: '100%', 
                textAlign: 'center'
                } }
            >
                <input 
                    ref={ input }
                    type="range" 
                    id="range"
                    min={ startDay}
                    max={ endDay }
                    value={ currentDay }
                    // need different events (but keep onChange for animations?)
                    onChange={ handleChange }
                    onClick={ handleClick}
                    //24 hr steps:
                    step={86400} 
                />

            </form>
            <p>Selected date: humanReadableSelection</p>
        </div>
    )
}