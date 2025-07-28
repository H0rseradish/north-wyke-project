import { useAllAppData } from "./utils/jsonContext";



export default function TimelineNav({currentYear, onYearChange, startYear }) {
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
        // console.log(Number(e.target.innerText))
        onYearChange(Number(e.target.innerText))
    }


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