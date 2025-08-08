import { useState } from "react";


export default function TextExplanation({appConfig, allStoryEvents, snappedIndex}) {

    const [visibleDescription, setVisibleDescription] = useState({})


    //this stopped the crash but longer term add an Error Boundary - to investigate. The reason it crashed was because there is no event at the end of the timeline. Need to consider how to deal with this.
    if (!allStoryEvents || snappedIndex < 0 || !allStoryEvents[snappedIndex]) { 
            return <h3 className="explanation description" style={{ paddingTop: "1rem"}}>Story over, for now... check back for the latest information.</h3>;
        }
    
   // surely should have logic as to what gets displayed:
    const appHeading = appConfig.app.farm;  
    const farmHeading = appConfig.title;

    // this following is too simplistic: need to check for existence, and also deal with the existence of multiple stories with the same start dates BECAUSE AM NOT GETTING ALL THE EVENTS: Eg: see event 49 but not 50 (same timestamp) There needs to be an array for each timestamp somewhere. -Sorted
    // AND a way of user selecting that is fine-grained - by date?


    const snappedStoryEvent = allStoryEvents[snappedIndex]
    //gets the individual story that is snapped to
    // console.log(snappedStoryEvent)

    const snappedIndexTimestamp = snappedStoryEvent.timestamps.start.unix

    // console.log(snappedIndexTimestamp)

    //     
    const snappedStoryEvents = allStoryEvents.filter(storyEvent => storyEvent.timestamps.start.unix === snappedIndexTimestamp)

    console.log(snappedStoryEvents)
    // make the relevant elements neede to show each story event for certain dates:
    // const storyName = allStoryEvents[snappedIndex].name;
    // const description = allStoryEvents[snappedIndex].description;

    const date = allStoryEvents[snappedIndex].timestamps.start.humanReadable;

    
    //because there is more than description to toggle...
    function toggleVisibility(storyId) {
        //putting an object into it - needed help from chatgpt here:
        setVisibleDescription((prev) => ({
            ...prev,
            //the toggle:
            [storyId]: !prev[storyId]
        }))
    }

    //now need to loop through the snappedStoryEvents...
    //to do the toggling also need an index - but..:
    const stories = snappedStoryEvents.map((snappedStoryEvent) => {

        const storyId = snappedStoryEvent.id
        //make sure:
        console.log(storyId)
        //putting the current relevant description index into visible:
        const visible = visibleDescription[storyId]
        // return console.log(snappedStoryEvent.name)
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
                onClick={() => toggleVisibility(storyId)}
                >
                    { snappedStoryEvent.name } {visible ? "▼" : "▶"}
                </h3>
                {visible && (
                    <p className="description" style={{ marginTop: "0.5rem" }}>
                    { snappedStoryEvent.description } 
                    </p>
                )}

            </div>
        ) 
    })


    //AND probably will want to control showing the descriptions.... too much text
    return (
        <div 
            className='explanation' 
        >
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
                { stories }
            </div>
        </div>
    );
}