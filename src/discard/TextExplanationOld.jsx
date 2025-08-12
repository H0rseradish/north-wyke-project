import { useState, useEffect } from "react";


export default function TextExplanation({appConfig, allStoryEvents, snappedIndex}) {

    const [visibleDescription, setVisibleDescription] = useState({})

    //chicken and egg... again!!!!
    // useEffect(() => {
    //     if (firstStoryId) {
    //         setVisibleDescription( {[firstStoryId]: true})
    //     }
    // }, [firstStoryId]);

    //this stopped the crash - reason was because there was no event at the end of the timeline. I think this is probably quite a bad thing to do...:
    if (!allStoryEvents || snappedIndex < 0 || !allStoryEvents[snappedIndex]) { 
        return <h3 className="explanation description" style={{ paddingTop: "1rem"}}>Story over, for now... check back for the latest information.</h3>;
    }

    // stuff that is static:
    const appHeading = appConfig.app.farm;  
    const farmHeading = appConfig.title;


    //does doing it the long way make it easier to understand? NO- my naming of things is bad.
    const snappedStoryEvent = allStoryEvents[snappedIndex]

    //gets the individual story that is snapped to
    // console.log(snappedStoryEvent)
    const snappedIndexTimestamp = snappedStoryEvent.timestamps.start.unix

    // all the stories that have the same timestamp the snapped Story
    const snappedStoryEvents = allStoryEvents.filter(storyEvent => storyEvent.timestamps.start.unix === snappedIndexTimestamp)


    //so to make an object like the toggling one I need the correct id 
    const firstStoryId = snappedStoryEvents[0].id
    console.log(firstStoryId)
    
    //ok this gets the array
    // console.log(snappedStoryEvents)

    // these are handled in the stories returned jsx:
    // const storyName = allStoryEvents[snappedIndex].name;
    // const description = allStoryEvents[snappedIndex].description;
    

    const date = allStoryEvents[snappedIndex].timestamps.start.humanReadable;

    
    //because there is more than description to toggle...
    function toggleVisibility(storyId) {
        // what if I put the condition here? ...this might be the place
        const firstStory = snappedStoryEvents[0]
        console.log(firstStory)
        //this is not going to do it: I need to set the initial state?
        // snappedStoryEvents.length !== 1 && 
        // console.log(`theres only one and its this: ${firstStory.name}`)
            //putting an object into it - needed help from chatgpt here - (I'm sure that's pretty obvious...)
            //set the react state to update based on the previous state
            setVisibleDescription((previous) => ({
                // spread (copy) all the previous stories (state)
                ...previous,
                //the toggle just the one that is being changed:
                // if it is true, its not the previous thing and vice versa (the standard toggling thingy):
                //and this is what gets put into the object in useState() when a click happens:
                //so how do I set an initial state??:- I will need an object like this one: except it will be true - and not a not not thingy.
                //Ithink I need something like this in state
                // [firstStoryId]: true
                [storyId]: !previous[storyId]
        }))
    }

    //now need to loop through the snappedStoryEvents...
    //to do the toggling also need an index - but..:
    const stories = snappedStoryEvents.map((snappedStoryEvent) => {

        const storyId = snappedStoryEvent.id
        //make sure:
        // console.log(storyId)
        //putting the current relevant description index into 'visible':
        //call it something less ambiguous though
        const visibleStoryDescrip = visibleDescription[storyId]
        // return console.log(snappedStoryEvent.name)

        //making the first story show...  
        // const firstStory = snappedStoryEvents[0]
        // console.log(firstStory)
        // console.log(snappedStoryEvents.length)
        
        //but where should it go? 
        // wait - if it's the only story it shouldnt be toggleable? so there are two things: firstStory and onlyStory. wait no it just needs to be open? so I only need firstStory?

        //ok I need to set the initial state.

        // remember this is the return for const stories...    
        return(
            <div key={storyId}>
                <h3 
                style={{ 
                    marginTop: "0.7rem", 
                    marginBottom: 0, 
                    color: "#a2b4c2ff", 
                    cursor: "pointer" 
                }}
                // have to do this below otherwise the function just gets called immediately:
                //so only put the toggle on if there is more than one story... no? no this wasnt the right place 
                onClick={ () => toggleVisibility(storyId)}
                >
                    { snappedStoryEvent.name } {visibleStoryDescrip ? "▼" : "▶"}

                </h3>
                {visibleStoryDescrip && (
                    <p className="description" style={{ marginTop: "0.5rem" }}>
                    { snappedStoryEvent.description } 
                    </p>
                )}

            </div>
        ) 
    })
    //end of const stories


    //return for the export default. is this really messy
    return (
        <>
            <div className='explanation' />
            
            <div className='text-wrapper'>
                <h1 
                    style={{ 
                        marginBottom: 0, 
                        color: "#a2b4c2ff",
                        fontWeight: "normal",
                    }}>
                    { appHeading }
                </h1>

                <h2 style={{ margin: 0, color: "#899aa7ff"}}>
                    { farmHeading }
                </h2>

                <h3 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.4em"}}>
                    { date }
                </h3>
                {/* here's the different stories... see function above */}
                { stories }
            </div>
        </>
    );
}