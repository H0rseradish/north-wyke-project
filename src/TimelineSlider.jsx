import { useRef, useMemo, useState, useEffect } from "react";


export default function TimelineSlider({ currentDay, setCurrentDay, currentYear, setCurrentYear, yearsList, normalisedStarts, unixStarts, setSnappedIndex }) {

    // console.log(unixStarts.length)
    // console.log(normalisedStarts.length)
    console.log(currentYear)

    // so I can manipulate the html element: hooks MUST go here, before any conditions!!! otherwise violates Rules of Hooks... (not safe - gets skipped on some renders)
    //and I knew I would need this...!
    const inputSlider = useRef()
    //set the state because there needs to be a value that is not undefined?
    const [inputSliderWidth, setInputWidth] = useState(0);

    // const windowWidth = window.innerWidth;
    // console.log(windowWidth)


    useEffect(() => {
    //find the width and set it!
        // const width = input.current.offsetWidth;
        // setInputWidth(width)

    //also now need to listen for window changes, need to make the above into function expression so can call it :
        const updateWidth = () => {
            setInputWidth(inputSlider.current.offsetWidth);
            // console.log('resize happening')
        }
        //so call it first so it sets the initial stae of width:
        updateWidth();
        // add event listener to window and give it the function to update the state on resize:
        window.addEventListener('resize', updateWidth)
        //Wait I forgot ResizeObserver! should it be that instead?

        //and this here so that it gets cleaned up - (ie the event listener is removed) every time there is a resize:
        // I kind of remembered it was necessary from the Three.js course but would not have thought to put it here
        return () => {
            window.removeEventListener('resize', updateWidth);
        }
    }, []);
    //and it works:
    console.log(inputSliderWidth)
    
    // so now I have the state of the input width at all times...  

    // currentDay is getting the unix seconds... where should normalisation happen? NOT HERE - IN UTILS but this is wrong! The slider works but... the value is 1 not on first load.. sorted in App.
    // console.log(currentDay / 1000)
    
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
        //pass the index back up - but THIS IS WRONG? or is it? it builds, anyway:
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

    // now I need to make this the currentYear (see handlePointerUp)
    const year = new Date(snappedUnixTimestamp * 1000).getFullYear()
    console.log(year)

    // this also from chatgpt - to my shame:
    const sliderValue = useMemo(() => {
        return Math.round(snappedValue * 1000)
    }, [snappedValue]);
    console.log(snappedValue)

    //now to sort the labels et on the slider -this is where Ineed to getaccesss to the html element (my useRef set up above...)
    console.log(inputSlider)
    console.log(inputSlider.current)
    // console.log(input.current.offsetWidth)
    //so... the above works... but only when the page has ALREADY LOADED WITHOUT IT... so this means that the initial state needs to be set and known?
    // console.log(window.innerWidth)
    //will need to listen for changes to the window size?
    //and update the state of the input width? 
    
    const timelineOptions = yearsList.map((option, index) => 
        <option 
            key={ index }
            className= { year } 
            value={ option } 
            label={ option } 
        />
    )
     
    // handle changes to the range input:
    const handlePointerUp =(e) => {
        // console.log(e.target);
        setCurrentDay(e.target.value)
        setCurrentYear(year)
    }

    //  const handleOnChange = () => {
    //     // not needed? not entirely sure.
    // }

    return (
        <div className="input-wrapper">
            <form 
                style={ { 
                position: 'absolute',  
                bottom: 30, 
                width: '100%', 
                textAlign: 'center',
                alignItems: 'center'
                } }
            >
                <datalist>
                    { timelineOptions }
                </datalist>
                <input 
                    ref={ inputSlider }
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
                    width={inputSlider.width}
                />
                {/* div that sits on top of the range input element,to hold all the tiny tickmark divs */}
                <div 
                    className="tickmarks" 
                    style={{ 
                        position: "absolute",
                        top: 0,
                        // left: 0,
                        flex: "flex",        
                        alignItems: "center",
                        width: inputSliderWidth, 
                        color: "red", 
                        height: "100%", 
                        pointerEvents: "none",
                        zIndex: 0}}
                >   
                    {/* making a bunch of tiny divs within the div, each in the 'start' position */}
                    {normalisedStarts.map((start, index) => (
                        <div 
                            key={index}
                            style={{
                                position: "absolute",
                                top: "2.5rem",
                                // each 'start' (normalised value so less than 1) is multiplied by the current width of the slider:
                                //except- should I be distributing these the same way the snapping is distributed because the 'thumb' does not exactly align with the tickmarks - nearly, but not quite...
                                left: `${start * inputSliderWidth}px`,
                                width: "2px",
                                height: "1rem",
                                backgroundColor: "white",
                                opacity: 0.4,
                                marginLeft: "5vw",
                                pointerEvents: "none"
                            }}
                        />
                    ))}
                </div>
                
                {/* get rid: */}
                {/* <div className="input-results">
                    <p style={{ margin: 0}}>Selected year: { year }</p>
                    <p style={{ margin: 0}}>Selected date as snapped Value: { snappedValue }</p>
                    <p style={{ margin: 0}}>Selected timestamp: { snappedUnixTimestamp }</p>
                    <p style={{ margin: 0, paddingBottom: '26px'}}>Selected event index number: { snappedIndex }</p>
                </div> */}
            </form>
        </div>
    )
}
  