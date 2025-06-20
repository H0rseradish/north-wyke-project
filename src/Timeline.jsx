import { useRef } from "react";

export default function Timeline({currentYear, onYearChange }) {
    //so I can manipulate the element:
    const input = useRef()

    // handle changes to the range input:
    const handleChange =(e) => {
        onYearChange(Number(e.target.value))
    }

    // handle clicks on the dates. can it be done with only one function for these events???
    const handleClick = (e) => {
        // console.log(e.target.value);
        input.current.value = e.target.value
        //aha!!
        onYearChange(Number(input.current.value))
    }

    // Need to import/fetch? this array from a json config - for the app reusability goal.
    const timelineValues = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    // This is better! Except for using the index as a key? But the idea of fixed order is intrinsic to any timeline so surely this is ok in this case? (Wait, or is it that things don't necessarily get computed in array order????)
    //Another thing, because of this loop I think I have to make sure that other things, when part of this function, are only rendered once using useEffect with empty array as second param????
    const timelineOptions = timelineValues.map((option, index) => 
        <option 
            key={ index } 
            value={ option } 
            label={ option } 
            onClick={ handleClick } 
        />
    )
    
    // These could be neater as variables to give to input?
    // console.log(timelineValues[0]);
    // console.log(timelineValues[timelineValues.length - 1]);

    return (
        <form 
            style={ { 
            position: 'absolute',  
            bottom: 20, 
            width: '100%', 
            textAlign: 'center'
            } }
        >
            <input 
                ref={ input }
                type="range" 
                id="range"
                min={ timelineValues[0] }
                max={ timelineValues[timelineValues.length - 1] }
                value={ currentYear }
                onChange={ handleChange }
            />
            {/* make this invisible in css. I think it needs to exist though? */}
            {/* <label htmlFor="range">{currentYear}</label> */}

            <datalist>
                { timelineOptions }
            </datalist>
        </form>
    )
}