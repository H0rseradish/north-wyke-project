import StoryEventsDisplay from "./StoryDisplayControl";

//separated out to hopefully solve the chicken and egg situation of needing a conditional before setting state.
//it is also a lot easier to work out whats going on. 

export default function TextExplanation({appConfig, allStoryEvents, snappedIndex}) {

    // check its all here - probably this message is a fudge (not sure) but I am leaving it for now:
    if (!allStoryEvents || snappedIndex < 0 || !allStoryEvents[snappedIndex]) { 
        return <h3 className="explanation description" style={{ paddingTop: "1rem"}}>Story over, for now... check back for the latest information.</h3>;
    }

    // stuff that is static: this could just be done in the jsx - is brevity clearer? - maybe not yet for me.
    const appHeading = appConfig.app.farm;  
    const farmHeading = appConfig.title;


    //does doing it the long way by sicking it in variables make it easier to understand? no but I will leavbe it for now - thought process.
    const snappedStoryEvent = allStoryEvents[snappedIndex]
    const snappedIndexTimestamp = snappedStoryEvent.timestamps.start.unix

    // makes an array of all the stories that have the same timestamp as the snapped Story:
    const snappedStoryEvents = allStoryEvents.filter(storyEvent => storyEvent.timestamps.start.unix === snappedIndexTimestamp)

    //thedate for the jsx - this could also just be done directly I know.
    const date = allStoryEvents[snappedIndex].timestamps.start.humanReadable;


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

                <StoryEventsDisplay snappedStoryEvents={ snappedStoryEvents }/>

            </div>
        </>
    );
}