import TimelineSlider from "./TimelineSlider";

export default function TextExplanation({allStoryEvents, snappedIndex}) {
    //this stopped the crash but longer term add an Error Boundary - to investigate. The reason it crashed was because there is no event at the end of the timeline. Need to consider how to deal with this.
    if (!allStoryEvents || snappedIndex < 0 || !allStoryEvents[snappedIndex]) { 
            return <p>Waiting for valid data...</p>;
        }
    
   //logic as to what gets displayed:
    const mainHeading = 'Main Heading';  


    // this following is too simplistic: need to check for existence, and also deal with the existence of multiple stories with the same start dates BECAUSE AM NOT GETTING ALL THE EVENTS: Eg: see event 49 but not 50 (same timestamp) There needs to be an array for each timestamp somewhere. -Sorted
    // AND a way of user selecting that is fine-grained - by date?


    const snappedStoryEvent = allStoryEvents[snappedIndex]
    //gets the individual story that is snapped to
    // console.log(snappedStoryEvent)

    const snappedIndexTimestamp = snappedStoryEvent.timestamps.start.unix

    // console.log(snappedIndexTimestamp)

    //     
    const snappedStoryEvents = allStoryEvents.filter(storyEvent => storyEvent.timestamps.start.unix === snappedIndexTimestamp)

    // console.log(snappedStoryEvents)


    const storyName = allStoryEvents[snappedIndex].name;

    const description = allStoryEvents[snappedIndex].description;

    const date = allStoryEvents[snappedIndex].timestamps.start.humanReadable;


    //now need to loop through the snappedStoryEvents...
    //AND probably will want to control showing the descriptions.... too much text
    return (
        <div 
            className='explanation' 
        >
            <h1>{ mainHeading }</h1>
            <p>{ date }</p>
                <div>
                    <h2>{ storyName }</h2>
                    <p className="description">{ description }</p>
                </div>
        </div>
    );
}