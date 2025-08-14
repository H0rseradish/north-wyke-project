import { useRef, useMemo, useState, useEffect } from "react";


export default function TimelineSlider({ currentDay, setCurrentDay, currentYear, setCurrentYear, yearsList, normalisedStarts, unixStarts, setSnappedIndex }) {

    // console.log(unixStarts.length)
    // console.log(normalisedStarts.length)
    // console.log(currentYear)

    // so I can manipulate the html element: hooks MUST go here, before any conditions!!! otherwise violates Rules of Hooks... (not safe - gets skipped on some renders)
    //and I knew I would need this...!
    const inputSlider = useRef()
    //set the state because there needs to be a value that is not undefined?
    const [inputSliderWidth, setInputWidth] = useState(0);



    // i think I might need this: NOOOO no need.
    // const datalistUl = useRef()
    //no I need to get at the option elements! but there are many so how?- That's NOT the way...
    

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
    // console.log(inputSliderWidth)
    
    // so now I have the state of the input width at all times...  
    
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
        // let smallestDiff = Math.abs(closestValue - sliderCurrentNormalised);

        // new calc based on pixel values to match tickmarks:
        let smallestPixelDiff = Math.abs((closestValue * inputSliderWidth) - (sliderCurrentNormalised * inputSliderWidth))
        // loop through the normalised starts, and find the difference between each norm star value and the current slider value:
        for ( let i = 1; i < normalisedStarts.length; i++) {
            //for all of the starts, find the difference between each of the normalised Starts and the slider's value, - Math.abs to make sure it doesnt end up a negative number.
            const startsDiff = Math.abs(normalisedStarts[i] - sliderCurrentNormalised);
            // And if the current difference value is smaller than the smallest difference... 
            if (startsDiff < smallestPixelDiff) {
                // ...then set this start value to be the smallest difference 
                smallestPixelDiff = startsDiff;
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
    }, [sliderCurrentNormalised, normalisedStarts, setSnappedIndex, inputSliderWidth]);


    //woohoo snapped value still works!!!
    // console.log(snappedIndex)

    // So now can get it back out of the unixStarts using the index!!!!:
    const snappedUnixTimestamp = unixStarts[snappedIndex]; 
    // console.log(snappedUnixTimestamp)

    // now I need to make this the currentYear (see handlePointerUp)
    const year = new Date(snappedUnixTimestamp * 1000).getFullYear()
    // console.log(year)

    // this also from chatgpt - to my shame:
    const sliderValue = useMemo(() => {
        return Math.round(snappedValue * 1000)
    }, [snappedValue]);
    // console.log(snappedValue)


    // wait, do I also need to put a ref on the datalist element? to get to it - NO
    // so how to bolden the currentYear?
    // need to find the item in the yearslist Array that matches current Year. 
    // need to bolden that one only, and also change it as the input changes... so state - ITS ALREADY HANDLED AS CURRENTYEAR!

    // OK I cannot use datalist element then because it is not part of the dom when rendered... 

    //try a filter - 
    const currentYearFromYearsList = yearsList.filter((year) => (year === currentYear))
    //this works - it gets an array of length 1...
    // console.log(currentYearFromYearsList)

    
    // handle changes to the range input:
    const handlePointerUp =(e) => {
        // console.log(e.target);
        //THINK!
        // I could put a condition in here? buth then what - how to grab the relevant thing out of the datalist 
        // console.log(currentYearFromYearsList[0])
        // console.log(yearsList)
        // console.log(currentYear)
        // console.log(datalistUl.current)
        // so maybe put a conditional in here?
    
        setCurrentDay(e.target.value)
        setCurrentYear(year)
    }


    const timelineOptions = yearsList.map((option, index) => 
        <li 
            role="option"
            key={ index }
            value={ option } 
            label={ option } 
            //wait but do we even want user to do this? NOOOOOO!
            // just a condition to make it bold? YES How is this so simple???
            style={{
                fontWeight: option === currentYear ? "bold" : "normal",
                color: option === currentYear ? "#89d457ff" : "#ffffff"
            }}
        >
        {option}   
        </li>
    )

    return (
        <div className="input-wrapper">
            <form 
                style={ { 
                position: 'absolute',  
                bottom: 30, 
                width: '100%', 
                textAlign: 'center',
                alignItems: 'center',
                zIndex: 2
                } }
            >
                <ul
                    // ref={ datalistUl }
                    role="datalist"
                    style={{ 
                        top: "2em",
                        position: "absolute",
                        marginBottom: "2rem",
                        marginLeft: "5vw",
                        paddingLeft: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8em",
                        width: "90vw",
                        listStyle: "none",
                        cursor: "pointer",
                        pointerEvents: "inherit"
                    }}
                >
                    { timelineOptions }
                </ul>
                <input 
                    // NB styled as element in the css
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
                    width={inputSliderWidth}
                />
                {/* div that sits on top of the range input element,to hold all the tiny tickmark divs */}
                <div 
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
                        zIndex: 2}}
                >   
                    {/* making a bunch of tiny divs within the div, each in the 'start' position */}
                    {normalisedStarts.map((start, index) => (
                        <div 
                            key={index}
                            style={{
                                position: "absolute",
                                top: "1em",
                                // each 'start' (normalised value so less than 1) is multiplied by the current width of the slider:
                                //except- should I be distributing these the same way the snapping is distributed because the 'thumb' does not exactly align with the tickmarks - nearly, but not quite...
                                left: `${start * inputSliderWidth - 1}px`,
                                width: "2px",
                                height: "1em",
                                backgroundColor: "white",
                                opacity: 0.4,
                                marginLeft: "5vw",
                                pointerEvents: "inherit"
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
  