import { useRef, useMemo } from "react";
// import { useState } from 'react';

export default function TimelineSlider({ currentDay, onDayChange, normalisedStarts, unixStarts }) {

    // console.log(unixStarts.length)
    // console.log(normalisedStarts.length)
    
    // so I can manipulate the html element: hooks MUST go here, before any conditions!!! otherwise violates Rules of Hooks... (not safe - gets skipped on some renders)
    const input = useRef()

    // currentDay is getting the unix seconds... where should normalisation happen? NOT HERE - IN UTILS but this is wrong! The slider works but... the value is 1 not on first load.. sorted in App.
    console.log(currentDay / 1000)
    
    const sliderCurrentNormalised = currentDay / 1000
    console.log(sliderCurrentNormalised)
    
    // Find closest value in array - this does it - sadly I had to ask chatgpt for the calculation. 
    // Math.abs() means it works in both directions!!!
    // Shouldnt this be moved to my Utils? Yes but not at the moment
    // This now obsolete bcause function below does the same thing, plus gets the index
    // const snappedValue = useMemo(() => {
    //     return normalisedStarts.reduce((previous, current) =>
    //         //
    //         Math.abs(current - sliderCurrentNormalised) < Math.abs(previous - sliderCurrentNormalised) 
    //         ? current 
    //         : previous
    //     );
    // }, [sliderCurrentNormalised, normalisedStarts]);

    //------------------------
    // So this gets both the snapped Value and the index, so that I can treat them in relation to each other: 
    // I couldnt have worked this out in the time without consulting chat:
     const { snappedValue, snappedIndex} = useMemo(() => {
        // this kind of thing ought to be a reflex by now, I know (but it isnt, if I'm honest):
        if(normalisedStarts.length === 0) 
            return { snappedValue2: null, snappedIndex: -1 };
        // define some variables to hold values:
        let closestIndex = 0;
        let closestValue = normalisedStarts[0];
        // calculate the difference that is actually the smallest - see below: 
        let smallestDiff = Math.abs(closestValue - sliderCurrentNormalised);
        // loop through the normalised starts, and find the difference between each norm star value and the current slider value:
        for ( let i = 1; i < normalisedStarts.length; i++) {
            //for all of the starts, find the difference between each of the normalised Starts and the slider's value, - Math.abs to make sure it doesnt end up a negative number.
            const startsDiff = Math.abs(normalisedStarts[i] - sliderCurrentNormalised);
            // And if the current difference value is smaller than the smallest difference... 
            if (startsDiff < smallestDiff) {
                // ...then set this start value to be the smallest difference 
                smallestDiff = startsDiff;
                // and set this start value to be the closest value:
                closestValue = normalisedStarts[i];
                // and the index to be the index
                closestIndex = i;
            }
        }
        //and return values as objects!!!!!
        return { snappedValue: closestValue, snappedIndex: closestIndex}

    }, [sliderCurrentNormalised, normalisedStarts]);
    //woohoo snapped value still works!!!
    console.log(snappedIndex)

    // So now can get it back out of the unixStarts using the index!!!!:
    const snappedUnixTimestamp = unixStarts[snappedIndex]; 
    console.log(snappedUnixTimestamp)

    // does what it says...
    const humanReadable = new Date(snappedUnixTimestamp * 1000).toLocaleDateString()

    // this also from chatgpt - to my shame:
    const sliderValue = useMemo(() => {
        return Math.round(snappedValue * 1000)
    }, [snappedValue]);
    console.log(snappedValue)

    //so... need to reverse the process of normalisation to get the index out - then apply index to the sory en

    // handle changes to the range input:
    const handlePointerUp =(e) => {
        //needed? not entirely sure:
        // e.preventDefault()
        // console.log(e.target.value);
        //chat suggests:
        // onDayChange(snappedUnixTimestamp)
        onDayChange(e.target.value)
    }

    //  const handleOnChange = () => {
    //     // not needed? not entirely sure.
    // }

    // but the tick marks are even... need to be proportional for UX.
    return (
        <div>
            <form 
                style={ { 
                position: 'absolute',  
                bottom: 40, 
                width: '100%', 
                textAlign: 'center'
                } }
            >
                <input 
                    ref={ input }
                    type="range" 
                    id="range"
                    min={0}
                    //1000 gives the appearance of smoothness
                    max={1000}
                    step={1} 
                    value={ sliderValue }
                    //this is better than onChange
                    onPointerUp={handlePointerUp}
                    // but... need to keep onChange, otherwise slider becomes read only! what to do? Without this function, even an empty function makes it read only. Thankfully the snapping seems to be preventing it from firing off 100s of changes:
                    onChange={handlePointerUp}
                />
                <p style={{ margin: 0}}>Selected date: { humanReadable }</p>
                <p style={{ margin: 0}}>Selected date: { snappedValue }</p>
                <p style={{ margin: 0}}>Selected timestamp: { snappedUnixTimestamp }</p>
                <p style={{ margin: 0, paddingBottom: '26px'}}>Selected event index number: { snappedIndex }</p>
            </form>
        </div>
    )
}
  