import { useRef, useMemo } from "react";
// import { useState } from 'react';

export default function TimelineSlider({ currentDay, onDayChange, normalisedStarts, startDay }) {
    
    // so I can manipulate the html element: hooks MUST go here, before any conditions!!! otherwise violates Rules of Hooks... (not safe - gets skipped on some renders)
    const input = useRef()

    // checking:
    console.log(normalisedStarts)
    //this is undefined here - sorted now!


    // currentDay is getting the unix seconds... where should normalisation happen? but this is wrong! The slider works but... not on first load   
    console.log(currentDay / 1000)
    // console.log(startDay)
    const sliderCurrentNormalised = currentDay / 1000
    console.log(sliderCurrentNormalised)
    

    // Find closest value in array - this does it - sadly I had to ask chatgpt for the calculation. 
    // Math.abs() means it works in both directions!!!
    // Shouldnt this be moved to my Utils?
    const snappedValue = useMemo(() => {
        return normalisedStarts.reduce((previous, current) =>
            //
            Math.abs(current - sliderCurrentNormalised) < Math.abs(previous - sliderCurrentNormalised) 
            ? current 
            : previous
        );
    }, [sliderCurrentNormalised, normalisedStarts]);

    // this also from chatgpt - to my shame:
    const sliderValue = useMemo(() => {
        return Math.round(snappedValue * 1000)
    }, [snappedValue]);


    // handle changes to the range input:
    // the onChange event is WRONG there will be many multiples especially if I use days...!!! - needs to be pointerup etc
    const handlePointerUp =(e) => {
        //needed? not entirely sure:
        // e.preventDefault()
        // console.log(e.target.value);

        onDayChange(e.target.value)
    }

    //  const handleOnChange = () => {
    //     // not needed? not entirely sure.
    // }

    // but the tick marks are even... need to be proportional for UX
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
                    value={sliderValue}
                    //this is better than onchange
                    onPointerUp={handlePointerUp}
                    // but... need to keep onChange, otherwise slider becomes read only! what to do? Without this function, even an empty function makes it read only. Thankfully the snapping seems to be preventing it from firing off 100s of changes:
                    onChange={handlePointerUp}
                />
                <p style={{ paddingBottom: '12px'}}>Selected date: { snappedValue }</p>
            </form>
        </div>
    )
}
