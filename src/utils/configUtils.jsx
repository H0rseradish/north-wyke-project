import { useEffect, useMemo } from 'react';
import { useAllAppData } from "./jsonContext";

// what is the most convenient solution for passing this data around?
// Not this, apparently. 

// need to use useContext???? with this data as well as the json, to avoid the chicken and egg situation of Rules of Hooks and the condition... because I should be memoizing some of these functions.
   
export default function useDerivedAppConstants() {

    const { appConfig }= useAllAppData();

    // Omigod the solution is to put everything inside useMemo? WAIT is this actually working? YES!!!
    const appConstants = useMemo(() => {

        if (!appConfig?.story) return {loading: true} 
        //when this is null or undefined the story data cannot be obtained but returning jsx is wrong? Because hooks are to 'encapsulate reusable logic and state' So it is not a PURE function.
        // return <p> Loading data. This jsx is bad - but it works - will have to sort it out later</p>;
        //solution - a 'status object'!!!
        // return { loading: true}
        // However, I still have the chicken and egg situation with useMemo.... see above
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

        // returning the status object!!! (with all the other things)
        return { 
            loading: false, 
            allStoryEvents, 
            startDay, 
            endDay, 
            startYear, 
            endYear, 
            normalisedStarts,
            unixStarts
         }

    }, [appConfig])

    return appConstants;
    
}
