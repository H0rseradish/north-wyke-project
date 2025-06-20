import { useGeojson } from "./utils/geojsonContext";
// move orbit controls to App file to keep this file doing one thing  - ie #building fields based on year?

import MakeField from "./MakeField";

//labelling the fields - need to somehow automate the position of the labels depending on the field coordinates? and only show them conditionally upon a field being clicked on?

// object that holds the things that change- would this be part of a json config? This seems excessive anyway.
const fieldsByYear = { 
    2008: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21],
    2009: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21],
    //whole thing green now:
    2010: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21],
    2011: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21],
    2012: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21],
    // 3 colours for diffrereing fields:  new boundary for 16     
    2013: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    2014: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    // orchard Dean split 24 & 25
    2015: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24, 25],
    2016: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24, 25],
    2017: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2018: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    // red system, 7 & 18 join to become Pecketsford Whole (no shape provided) 
    2019: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2020: [ 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2021: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2022: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2023: [ 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2024: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2025: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ] 
} 

    // this seems crappy but will have to do for now! Instead of the stuuf above?
const colorGroupsByYear = {
    2008: {
        gray: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21]
    },
    2009: {
        gray: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21]
    },
    //whole thing green now:
    2010: {
        green: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21]
    },
    2011: {
        green: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21]
    },
    2012: {
        green: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21]
    },
    // 3 colours for differing fields:  new boundary for 16     
    2013: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    2014: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    // orchard Dean split 24 & 25
    2015: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24, 25],
    2016: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24, 25],
    2017: [ 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2018: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    // red system, 7 & 18 join to become Pecketsford Whole (no shape provided) 
    2019: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2020: [ 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2021: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2022: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2023: [ 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2024: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
    2025: [ 0, 1, 2, 3, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ] 



}

// function getYearColors(currentYear) {
 // so what to do?
// }




//But these functions would be very specific to this site. Are they? For the goal of app reusability much thinking required here.
function yearFieldsDisplay(fieldsData, currentYear){
    // console.log(fieldsData[0].properties)
    console.log(currentYear)
    // console.log(fieldsByYear[currentYear])
    const fieldsToDisplay = fieldsByYear[currentYear]
    //ok this is undefined
    console.log(fieldsToDisplay)

    

    return fieldsToDisplay.map((field) => (
        <MakeField 
            key={ fieldsData[field].properties.OBJECTID } 
            field={ field } 
            fieldName={ fieldsData[field].properties.Field_Name }
            // color={ color }
        />
    ));
}

// suggested by chatgpt to use the geojson here rather than in makeField
export default function Experience({currentYear}) {

    // useContext in action:
    const { geojsonData: fieldsData } = useGeojson();

    //just in case:
    if(!fieldsData || fieldsData.length === 0) return null;

    // the yearFields function decides what to display based on current year
    const yearFields = yearFieldsDisplay(fieldsData, currentYear)

    return (
        <>
            {yearFields}
        </>
    )
}