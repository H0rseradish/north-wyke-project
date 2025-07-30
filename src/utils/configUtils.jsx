import { useMemo } from 'react';
import { useAllAppData } from "./jsonContext";

// what is the most convenient solution for passing this data around?
   
export default function useDerivedAppConstants() {
    // console.log('configUtils here')

    const { appConfig }= useAllAppData();
    if (!appConfig) 
        return <p>Loading app config...</p>;
    // console.log(appConfig)

    const { story } = appConfig;

    const allStoryEvents = story.filter(item => item.timestamps.start.unix !== null)
    // console.log(allStoryEvents)

    // the start date of the first story event:
    const startDay = allStoryEvents[0].timestamps.start.unix;
    // console.log(startDay)

    //is this wise?:
    const endDay = Math.floor(Date.now() / 1000)
    // would it be better to have the end of the last day of the current year?

    // need to push the current Date on to here!!
    const unixStarts = allStoryEvents.map((item) => item.timestamps.start.unix)
    // console.log(unixStarts)
    //add current date to the array - for the timeline...:
    unixStarts.push(endDay)

    const normalisedStarts = unixStarts.map((unixStart) => {
        const x = unixStart - startDay;
        const normalised = x / (endDay - startDay);
        return normalised
    })
    // console.log(normalisedStarts)


    const startYear = new Date(allStoryEvents[0].timestamps.start.unix * 1000).getFullYear()
    // console.log(startYear)

    // // the current year....
    const endYear = new Date().getFullYear()
    // console.log(endYear)

    return { allStoryEvents, startDay, endDay, startYear, endYear, normalisedStarts }

}
