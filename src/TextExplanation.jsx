
export default function TextExplanation({appConfig, allStoryEvents, snappedIndex}) {
    //this stopped the crash but longer term add an Error Boundary - to investigate. The reason it crashed was because there is no event at the end of the timeline. Need to consider how to deal with this.
    if (!allStoryEvents || snappedIndex < 0 || !allStoryEvents[snappedIndex]) { 
            return <p>Waiting for valid data...</p>;
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




    const storyName = allStoryEvents[snappedIndex].name;
    const description = allStoryEvents[snappedIndex].description;

    const date = allStoryEvents[snappedIndex].timestamps.start.humanReadable;

    //now need to loop through the snappedStoryEvents...
    const stories = snappedStoryEvents.map((snappedStoryEvent) => {
        // return console.log(snappedStoryEvent.name)
        return(
            <div>
                <h3 style={{ margin: 0 }}>
                    { snappedStoryEvent.name } 
                </h3>
                <p className="description" style={{ margin: 0 }}>
                    { snappedStoryEvent.description }
                </p>
            </div>
        ) 
    }
        
    )


    //AND probably will want to control showing the descriptions.... too much text
    return (
        <div 
            className='explanation' 
        >
            <h1 style={{ opacity: 0.9, marginBottom: 0 }}>
                { appHeading }
            </h1>

            <h2 style={{ opacity: 0.6, margin: 0 }}>
                { farmHeading }
            </h2>

            <h3 style={{ opacity: 0.6, marginBottom: "0.5rem" }}>
                { date }
            </h3>
            { stories }
        </div>
    );
}