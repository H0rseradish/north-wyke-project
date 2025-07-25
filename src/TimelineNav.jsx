import { useAllAppData } from "./utils/jsonContext";

export default function TimelineNav({currentYear, onYearChange }) {
    // All hooks here, above any conditions
    const { appConfig }= useAllAppData()


     // condition to prevent null thing: 
    if (!appConfig) 
        return <p>Loading app config...</p>
    // console.log(appConfig)

    const { story } = appConfig;
    // console.log(story)


    // handle clicks on the dates. can it be done with only one function for these events???
    const handleClick = (e) => {
        console.log('clicked');
        console.log(e.currentTarget)
        // //aha!!
        // onYearChange(Number(input.current.value))
    }
    

    // ok here are all the story events that have non null start dates - in an array 
    const unixTimelineValues = story.filter(item => item.timestamps.start.unix !== null)
    // console.log(unixTimelineValues)
    // console.log(unixTimelineValues[0].timestamps.start.unix)

    //making an array of all the years - this should be in a separate function? YES in a separate file even? with useMemo?
    //get the start year from the config instead of hard-coding it:
    const startYear = new Date(unixTimelineValues[0].timestamps.start.unix * 1000).getFullYear()
    // console.log(startYear)
    // and the end is now (or possibly nigh if I dont get a move on)
    const endYear = new Date().getFullYear()
    // console.log(endYear)
    const timelineNavLabels = Array()

    for (let year = startYear; year <= endYear; year++) {
        timelineNavLabels.push(year) 
    }
    console.log(timelineNavLabels)


    //OK NOW NEEDS TO BE A DIV WITH BUTTONS that gets returned!

    return (
        <div style={{
            position: "absolute",
            bottom: 20
        }}>
            {timelineNavLabels.map(label => (
                <button 
                    key={label}
                    onClick={handleClick}
                >
                    {label}
                </button>

            ))}

        </div>

    )
}