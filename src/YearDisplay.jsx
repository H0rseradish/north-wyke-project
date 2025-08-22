export default function YearDisplay({ currentYear,  appConfig }) {
    //so...state of current Year is coming from App

    //but what if there is a mistake...
    // const yearChapter = appConfig.chapters.filter(chapter =>
    //     chapter.name === currentYear
    // )
    // console.log(yearChapter)
//--------------------------------------------------
//SORTED!!!!!
    // for when I change the json:
    const highlights = appConfig.story.filter(storyEvent =>
        storyEvent.isHighlight === true
    )
    //ok this works:
    // console.log(highlights)

    //well I haven't made the json like this  - will need to extract the date from the timestamps to do the comparison:
    // const currentHighlight = highlights.filter(highlight =>
    //     Number(highlight.name) === currentYear
    // )

    const currentHighlight = highlights.filter((highlight) => {
        // base it on the unix as superior to human readable?
       const timestamp = highlight.timestamps.start.unix
       // (forgot the * 1000 at first... like a twat!)
       const year = new Date(timestamp * 1000).getFullYear();
       return year === currentYear
    })
    // ok this gets it but its an array of one - see way of dealing with this in jsx
    // console.log(currentHighlight)
    
    return (
        <div 
            style={{
                position: "absolute",
                bottom: 30,
                width: "100%",
                height: "fit-content",
                // marginTop: "50vh",
                paddingBottom: "4rem",
                pointerEvents: "none",
                textAlign: "end",
                zIndex: 2,
            }}>

            <h2 
                style={{
                    position:"absolute",
                    bottom: 110,
                    right: 5,
                    width: "100%",
                    paddingRight: "5vw",
                    paddingLeft: "5vw",
                    fontSize: "5em",
                    // lineHeight: "1.2em",
                    color: "#89d457ff",
                    opacity: 0.6,
                    margin: 0
                }}
            >
                { currentYear }
            </h2>

            <p 
                style={{
                    paddingRight: "5vw",
                    paddingLeft: "5vw",
                    fontSize: "1.7em",
                    lineHeight: "1.2em",
                    margin: 0
                }}
            >
                { currentHighlight.length === 1 ? currentHighlight[0].highlightText : '' }
            </p>

        </div>
    ); 
}