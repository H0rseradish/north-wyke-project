// importing my 'reusable' things:
import { useAllAppData } from "./utils/jsonContext";
import MakeField from "./MakeField";
import MakeBoundary from "./MakeBoundary";
import { useState, useEffect } from "react";



//the colorscheme is brought in as json?? with the aim of app reusability?
// const colors = {
//     construction: "gray",
//     baselineSystem: "lightgreen",
//     greenSystem: "green",
//     blueSystem: "blue",
//     redSystem: "red"
// }

//now try to get the data out of appConfig not the geojson...
//am I going to change this to days?

export default function Experience({currentYear, snappedIndex}){
    
    // (renaming geojsonData to fieldsData - is this wise? or stupidly unnecessary? Or will allow for geojson that's not fields?)
    const { geojsonData: fieldsData, appConfig } = useAllAppData();

    const [visible, setVisible] = useState(false)
    // console.log(appConfig)

    //omigod chat suggested putting currentYear in as a dependency...(with the reset to false)
    //ok this kind of works...but you see it kind of bounce...its the tension and friction in combination with the timeout... need to experiment.
    useEffect(() => {
        setVisible(false); // reset visibility
        const timeout = setTimeout(() => {
            setVisible(true); // trigger animation after delay
        }, 300); // small delay to force re-render

        return () => clearTimeout(timeout); // cleanup
    }, [currentYear]);


    if(!fieldsData || fieldsData.length === 0) return null;
    // console.log(fieldsData)
 
   ///----------------------------------------------------------
    // this would get the green fields
    const greenSystemFields = appConfig.fields.filter((field) => field.farmlet === "Green")
    // const redSystemFields = appConfig.fields.filter((field) => field.farmlet === "Red")
    // const blueSystemFields = appConfig.fields.filter((field) => field.farmlet === "Blue")
    //so something like this would need to be in a loop somewhere - see lower down in file in the condition that if the time period is farmlet then apply the farmlet colours.

    const greenSystemFieldIds = greenSystemFields.map((field) => field.id)
    console.log(greenSystemFieldIds)



    // need to think here... 
    // so I need an array of the years to themn map stuff out of them?? I already
    //yearsList is created from the startYear and End Year from the story: is that more robust? than getting the the year chapters I have created? Wait should my year chapters be just events like the others, with a type of 'overview?' or highlight? YES PROBABLY?

    // console.log(appConfig.story.length)
    //what do I need to do?
    //make an array of the events that are highlights. highlight could be a boolean....instead of in the types..!
    //if the current year matches the year in the highlights array display it - what? - 
    // what about if it is a land event could I put affectedFields as an array in the story json? get the  wanted stuff out of the story Event

    // wait and I can control colours based on dates too? maybe or on time periods!!
    //---------------------------------
    //first I need to gather things:

    // collect my highlighted story events into an array
    const highlights = appConfig.story.filter(storyEvent =>
        storyEvent.isHighlight === true)

    console.log(highlights)

     // just use find then it will just get one? or is it better to have an array of an array of one? as in yearDisplay (the issue is how and when to stop a crash?...)    
    const currentHighlight = highlights.find((highlight) => {
             // base it on the unix as superior to human readable?
            const timestamp = highlight.timestamps.start.unix
            // (forgot the * 1000 at first... like a twat!)
            const year = new Date(timestamp * 1000).getFullYear();
            return year === currentYear
        })   

    // the question mark prevents a crash...
    console.log(currentHighlight?.fields)
    // console.log(fieldsData[0].properties)
    
    // currentYear actually returns an object, I AM AN IDIOT, forgot to destructure the prop! Leaving this comment in to remind me.
    // console.log(currentYear)
    const yearDisplay = currentHighlight?.fields
    // const yearData = displayByYear[currentYear];
    //so this is an object containing an array of 3 objects:
    // console.log(yearData)

    // because there might not be year data...
    if (!yearDisplay) return [];

    //----------------------------------------
    //Map systems to colours: This is tricky.

    // OK I caved in and got this from chatgpt - I had not used Map() before...
    // and then had to use chatgpt to extend it too
    // Build a map of OBJECTID -> color
    const fieldColorMap = new Map();


    // if (currentHighlight?.timelinePeriod && appConfig.colors[currentHighlight.timelinePeriod]) {
    // // Map.set() - fieldColorMap is the instance here- creates related pairs of things - in this case the id plus the color:
    // currentHighlight.fields.forEach(id => {
    //     const color = appConfig.colors[currentHighlight.timelinePeriod];
    //     fieldColorMap.set(id, color);
    //     });
    // }
    // its an object full of pairs of things connected by a fat arrow: eg {4 => 'gray', etc..}
    console.log(fieldColorMap)

    //and again to deal with farmlets:
     if (currentHighlight?.timelinePeriod) {
        if(currentHighlight.timelinePeriod === "farmlet") {
            // farmlet determines colours:
            currentHighlight.fields.forEach(id => {
                //this naming is from chatgpt...as is the logic!
                const fieldMeta = appConfig.fields.find(field => field.id === id);  
                //I like this kind of checking though:        
                const farmlet = fieldMeta?.farmlet;
                const color = appConfig.colors.farmlet[farmlet];

                console.log(color);
                //check again:
                if (color) {
                    fieldColorMap.set(id, color)
                } else {
                    //you can tell I got this from AI because here's a fallback!
                    fieldColorMap.set(id, "gray")
                }      
            });
        } else {
            const color = appConfig.colors[currentHighlight.timelinePeriod];

            currentHighlight.fields.forEach(id => {
                fieldColorMap.set(id, color);
            })            
        }
     }

    // this also adapted from chat using .has() (new to me I think?) 
    // get the actual geojson for the relevant fields:
    const fieldsToDisplay = fieldsData.filter((field) => 
        fieldColorMap.has(field.properties.OBJECTID)
    );

    //get the actual geojson for the relevant fields:
    // omigod I wrote this before: but I might still the need the map above to display colours -I did.
    // const fieldsToDisplay = fieldsData.filter((field) => 
    //     yearDisplay.includes(field.properties.OBJECTID)
    // );

    //so need to separate out boundary display from field display I think:
    return (
        fieldsToDisplay.map((field) => { 
            //these variables also came from the chatgpt response:
            //so you can use get() to get something out of a Mapped pair:
            const fieldId = field.properties.OBJECTID;
            const color = fieldColorMap.get(fieldId);

            // putting currentYear into the key apparently unmounts and remounts MakeField when the year changes, helping the animation?:
            return(
            <>       
                <MakeField 
                    key={`field-${currentYear}-${field.properties.OBJECTID}`} 
                    field={ field } 
                    // fieldName={ field.properties.name }
                    color={ color }
                    // color={'gray'} 
                    visible={ visible }
                />
                <MakeBoundary 
                    key={ `boundary-${field.properties.OBJECTID}` } 
                    field={ field }
                    color={'yellow'} 
                />
            </>
            )
        })
    )    
}  
