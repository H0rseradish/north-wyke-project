import { useMemo } from 'react';
import { useAllAppData } from "./jsonContext";

// what is the most convenient solution for passing this data around?
// Not this, apparently. 

// need to use useContext???? with this data as well as the json, to avoid the chicken and egg situation of Rules of Hooks and the condition... because I should be memoizing some of these functions.
   
export default function useDerivedAppConstants() {

    const { appConfig }= useAllAppData();

    // Omigod the solution is to put everything inside useMemo? WAIT is this actually working? YES!!!
    const appConstants = useMemo(() => {
        //check that appConfig is not false (ie neither null nor undefined) before accessing .story - this is 'Optional Chaining'.
        // the longer way would be: if(appConfig && !appConfig.story) etc:
        if (!appConfig?.story) return {loading: true} 

        //deconstruct story out of the appConfig:
        const { story } = appConfig;

        // Filtering out anything that doesnt have a start
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
        // console.log(unixStarts)

        const normalisedStarts = unixStarts.map((unixStart) => {
            const x = unixStart - startDay;
            const normalised = x / (endDay - startDay);
            return normalised
        })
        
        const startYear = new Date(allStoryEvents[0].timestamps.start.unix * 1000).getFullYear()
        // console.log(startYear)

        // // the current year....
        const endYear = new Date().getFullYear()
        // console.log(endYear)


        // 1st param is the wanted length, 2nd is basically a map function (mdn): and inside the map (looping) function params are the current element and its index. So just add index to the startYear.
        const yearsList = Array.from({length: endYear - startYear + 1}, (__, i) => startYear + i )

        console.log(yearsList)

        // returning the status object!!! (with all the other things)
        return { 
            loading: false, 
            allStoryEvents, 
            startDay, 
            endDay, 
            startYear, 
            endYear,
            yearsList, 
            normalisedStarts,
            unixStarts
         }

    }, [appConfig])

    return appConstants;
    
}
