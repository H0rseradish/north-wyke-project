import { useRef } from "react";
//get the make Field into here to make all the functions
import MakeField from './MakeField.jsx'

export default function Timeline({currentYear, onYearChange }) {

    const input = useRef()

    // handle changes to the range input:
    const handleChange =(e) => {
        onYearChange(Number(e.target.value))
    }

    // handle clicks on the dates
    const handleClick = (e) => {
        // console.log(e.target.value);
        input.current.value = e.target.value
        //aha!!
        onYearChange(Number(input.current.value))
    }
    // state has to be lifted, so this needs to be elsewhere:
    // const [ currentYear, setCurrentYear ] = useState('2008')

    //would need to fetch this array from a json config?
    // const timelineValues = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    // //ohmigod this works: so now I need to pass current year to somewhere where something happens.
    // console.log(currentYear)

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
                min="2008"
                max="2018"
                value={ currentYear }
                //put the fields ito here
                onChange={handleChange}
            />
            {/* make this invisible in css. I think it needs to exist though? */}
            <label htmlFor="range">{currentYear}</label>

            <datalist>
            {/* need to loop through an array of values to make these from config file for reusability? Should just be made in a loop anyway because this is terrible */}
                <option value='2008' label='2008' onClick={ handleClick } />
                <option value='2009' label='2009' onClick={ handleClick } />
                <option value='2010' label='2010' onClick={ handleClick } />
                <option value='2011' label='2011' onClick={ handleClick } />
                <option value='2012' label='2012' onClick={ handleClick } />
                <option value='2013' label='2013' onClick={ handleClick } />
                <option value='2014' label='2014' onClick={ handleClick } />
                <option value='2015' label='2015' onClick={ handleClick } />
                <option value='2016' label='2016' onClick={ handleClick } />
                <option value='2017' label='2017' onClick={ handleClick } />
                <option value='2018' label='2018' onClick={ handleClick } />
            </datalist>
        </form>
    )
}

// Will need  a whole bunch of functions to define what happens each year - IN THE EXPERIENCE FILE!!