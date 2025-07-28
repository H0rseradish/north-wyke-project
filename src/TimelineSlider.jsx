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

    // handle clicks on the timeline (display the date clicked on? labels) -
    const handleClick = (e) => {
        console.log(e.target.value);
    }

    // all the story objects that have a start date
    const unixTimelineValues = story.filter(item => item.timestamps.start.unix !== null)
    console.log(unixTimelineValues)

    const storyEventStarts = unixTimelineValues.map((i) => i.timestamps.start.unix )
    console.log(storyEventStarts)
    // now - how to map these to a value that goes from 0 - 1? 


    //(also Date() is legacy now(!), according to mdn - except that Temporal is only supported in firefox Ha! according to caniuse)
    const currentUnix = new Date().getSeconds()
    console.log(currentUnix)

     
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
                    //somehow the tickmarks/steps need to be values from looping (mapping?) the array of the start timestamps in the json:
                    step={86400} 
                />

            </form>
            <p>Selected date: humanReadableSelection</p>
        </div>
    )
}