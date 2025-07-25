import { useRef } from "react";
// import { useState } from 'react';
import { useAllAppData } from "./utils/jsonContext";


export default function TimelineUnix({ currentDay, onDayChange, startDay, endDay }) {
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
    //the event is wrong - needs to be pointerup etc
    const handleChange =(e) => {
        console.log(e.target.value);
        onDayChange(Number(e.target.value))
    }

    // handle clicks on the timeline labels - the years are the most granular if they are permanently visible?. Will need multiple handlers to handle each kind of event
    const handleClick = (e) => {
        console.log(e.target.value);
        input.current.value = e.target.value
        //aha!!
        onDayChange(Number(input.current.value))
    }

    // these need to be obtained from the json not hard-coded here:
    const timelineYears = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    
    // ok here are all the story events that have non null start dates - in an array 
    const unixTimelineValues = story.filter(item => item.timestamps.start.unix !== null)
    // console.log(unixTimelineValues)
    // console.log(unixTimelineValues[0].timestamps.start.unix)

    //making an array of all the years - this should be in a separate function? YES in a separate file even? with useMemo?
    //get the start year from the config instead of hard-coding it:
    const startYear = new Date(unixTimelineValues[0].timestamps.start.unix * 1000).getFullYear()
    // console.log(startYear)
    // and the end is now (or possibly nigh if I dont get a move on)
    const endYear = new Date().getFullYear()
    // console.log(endYear)
    const timelineLabels = Array()

    for (let year = startYear; year <= endYear; year++) {
        timelineLabels.push(year) 
    }
    console.log(timelineLabels)

    //clicking on the year labels:
    // fixed order is intrinsic to any timeline so index as key is ok in this case? 
    //Another thing, because of this loop I think I have to make sure that other things, when part of this function, are only rendered once using useEffect with empty array as second param? or useMemo?   
    const labels = timelineYears.map((option, index) => 
        <option 
            key={ index } 
            value={ option } 
            label={ option } 
            onClick={ handleClick } 
        />
    )

    // ?? const humanReadableSelection = 
     
    return (
        <div>
            <form 
                style={ { 
                position: 'relative',  
                bottom: 40, 
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
                    //24 hr steps:
                    step={86400} 
                />

                {/* <label htmlFor="range">{currentYear}</label> */}

                <datalist>
                    { labels }
                </datalist>
            </form>
            <p>Selected date: humanReadableSelection</p>
        </div>
    )
}