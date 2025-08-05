import { useRef, useMemo, useState, useEffect } from "react";
import { ConstantColorFactor } from "three/src/constants.js";
// import TextExplanation from "./TextExplanation";

export default function TimelineSlider({ currentDay, onDayChange, currentYear, onYearChange, yearsList, normalisedStarts, unixStarts, setSnappedIndex }) {

    // console.log(unixStarts.length)
    // console.log(normalisedStarts.length)
    console.log(currentYear)

    // so I can manipulate the html element: hooks MUST go here, before any conditions!!! otherwise violates Rules of Hooks... (not safe - gets skipped on some renders)
    //and I knew I would need this...!
    const input = useRef()
    //set the state because there needs to be a value that is not undefined?
    const [inputWidth, setInputWidth] = useState(0);

    const windowWidth = window.innerWidth;
    console.log(windowWidth)


    useEffect(() => {
    //find the width and set it!
        const width = input.current.offsetWidth;
        setInputWidth(width)

    //also now need to listen for window changes, need to make the above into function expression so can call it :

    }, []);
    //and it works:
    console.log(inputWidth)
    // so now I have the state of the input width at all times...  

    // currentDay is getting the unix seconds... where should normalisation happen? NOT HERE - IN UTILS but this is wrong! The slider works but... the value is 1 not on first load.. sorted in App.
    console.log(currentDay / 1000)
    
    const sliderCurrentNormalised = currentDay / 1000
    // console.log(sliderCurrentNormalised)
    

    //I tried to move this to configUtils but it didnt go well... so I had to move it back!

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
        //pass the index back up - but THIS IS WRONG!!:
        setSnappedIndex(closestIndex)
        //and return values as objects!!!!!
        return { snappedValue: closestValue, snappedIndex: closestIndex}
        // and snappedIndex is also now a dependency:
    }, [sliderCurrentNormalised, normalisedStarts, setSnappedIndex]);
    //woohoo snapped value still works!!!
    // console.log(snappedIndex)

    // So now can get it back out of the unixStarts using the index!!!!:
    const snappedUnixTimestamp = unixStarts[snappedIndex]; 
    // console.log(snappedUnixTimestamp)

    // does what it says...except that month comes first
    // const humanReadable = new Date(snappedUnixTimestamp * 1000).toLocaleDateString()

    // now I need to make this the currentYear
    const year = new Date(snappedUnixTimestamp * 1000).getFullYear()
    console.log(year)

    // this also from chatgpt - to my shame:
    const sliderValue = useMemo(() => {
        return Math.round(snappedValue * 1000)
    }, [snappedValue]);
    console.log(snappedValue)

    //now to sort the labels et on the slider -this is where Ineed to getaccesss to the html element (my useRef set up above...)
    console.log(input)
    console.log(input.current)
    // console.log(input.current.offsetWidth)
    //so... the above works... but only when the page has ALREADY LOADED WITHOUT IT... so this means that the initial state needs to be set and known?
    // console.log(window.innerWidth)
    //will need to listen for changes to the window size?
    //and update the state of the input width? 
    
    const timelineOptions = yearsList.map((option, index) => 
        <option 
            key={ index } 
            value={ option } 
            label={ option } 
            // onClick={ handleClick } 
        />
    )
    // handle changes to the range input:
    const handlePointerUp =(e) => {
        // console.log(e.target);
        onDayChange(e.target.value)
        onYearChange(year)

    }

    //  const handleOnChange = () => {
    //     // not needed? not entirely sure.
    // }

    // but the tick marks are even... need to be proportional for UX.
    return (
        <div className="input-wrapper">
            <form 
                style={ { 
                position: 'absolute',  
                bottom: 0, 
                width: '100%', 
                textAlign: 'center',
                alignItems: 'center'
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
                    width={input.width}
                />
                <div style={{ width: inputWidth, color: "red", height: "10px", zIndex: 10}}/>
                <datalist>
                    { timelineOptions }
                </datalist>

                
                {/* get rid: */}
                <div className="input-results">
                    <p style={{ margin: 0}}>Selected year: { year }</p>
                    <p style={{ margin: 0}}>Selected date as snapped Value: { snappedValue }</p>
                    <p style={{ margin: 0}}>Selected timestamp: { snappedUnixTimestamp }</p>
                    <p style={{ margin: 0, paddingBottom: '26px'}}>Selected event index number: { snappedIndex }</p>
                </div>
            </form>
        </div>
    )
}
  