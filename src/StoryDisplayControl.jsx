import { useEffect, useState, } from "react";

// trying to solve chicken and egg....
// feeling quite smug now
// just a reminder to myself that the logoc to find all the events on a particular day happens in TextExplanation.jsx  


//If I change the json I will need a condition in here: to show on the basis of the name not being a number, maybe? 


export default function StoryDisplayControl({ snappedStoryEvents }) {
    //should I move this state into the App.jsx? Can I?
    const [visibleDescription, setVisibleDescription] = useState(() => ({
        //the check is integrated with the '?'... from chat, but I like it.
        //just using the first one in the array directly is actually less confusing than separating it into a variable these days... 
        //ok this works but only on load so I will need a conditional elsewhere - wait should I wrap in a UseEffect so updates as the snappedStoryEvents get updated?? yes, because the condition works but only on load, not on subsequent slider interactions. By Jove shes got it!        
        [snappedStoryEvents[0]?.id]: true,
    }))

    //this is often an array of length 1:
    console.log(snappedStoryEvents)

    // I am pathetically proud of working this out for myself!:
    // Maybe I am finally starting to get React..
    useEffect(() => {
        //and of course I didnt even need a condition because [0] should ALWAYS be visible!!!!
        setVisibleDescription( {
                    [snappedStoryEvents[0].id]: true,
                })
    }, [snappedStoryEvents])

    //just use the id directly to reduce complication??
    //it is clearer I think
    const ToggleVisibility = (id) => {
        // NOOOOOOO another react chicken and egg?????
            //condition here NO!!!! This is all wrong
            // if (snappedStoryEvents.length > 1)
            //     setVisibleDescription( {
            //         [snappedStoryEvents[0].id]: true,
            //     })
            // else

            //set the react state to update based on the previous state
            setVisibleDescription((previous) => ({
                // spread (copy) all the previous stories (state)
                ...previous,
                //the toggle, which controls what gets put into state:

                //so how do I set an initial state??:- I will need an object like this except it will just be true:
                //  [firstStoryId]: true - see above....
                [id]: !previous[id]
        }))
    }
    // now this is separated its clearer what is going on. When it was one file there were two lengthy return staements which were confusing to navigate for me.
   //the mapping can be here now:
        return snappedStoryEvents.map((storyEvent) => (
            
            <div key={ storyEvent.id } >
                <h3 
                style={{ 
                    marginTop: "0.4rem", 
                    marginBottom: 0, 
                    color: "#a7b5c0ff", 
                    cursor: "pointer",
                    // pointerEvents: "all" 
                }}
                // have to do this below otherwise the function just gets called immediately:
                //so only put the toggle on if there is more than one story... no? no this wasnt the right place??
                onClick={ () => ToggleVisibility(storyEvent.id)}
                >
                    {/* look - no interim variables!! */}
                    { storyEvent.name } 
                    { visibleDescription[storyEvent.id] 
                        ? <span style={{
                            color: "#89d457ff",
                            fontSize: "0.8em",
                            paddingLeft: "0.5em",
                            opacity: 0.6
                        }}> ▼
                        </span> 
                        : <span style={{
                                color: "#89d457ff",
                                fontSize: "0.8em",
                                paddingLeft: "0.5em"
                            }}> ▶</span> }
                </h3>

                {/* //if its true show its description */}
                { visibleDescription[storyEvent.id] && (
                    <>
                        <p 
                            className="description" 
                            style={{ marginTop: "0.5rem", pointerEvents: "none", fontSize: "0.95em" }}
                        >
                        { storyEvent.description } 
                        </p>

                        {/* // if there is an image in the json display iy */}
                        { storyEvent.imageUrl && (
                            <img 
                                src={storyEvent.imageUrl}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "30vh"
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        )); 
}