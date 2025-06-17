import { useState } from "react";


export default function Timeline() {

    const [ currentYear, setCurrentYear ] = useState('2008')

    //would need to fetch this from a json config?
    const timelineValues = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    //ohmigod this works: so now I need to pass current year to somewhere where something happens.
    console.log(currentYear)

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
                type="range" 
                id="range"
                min="2008"
                max="2018"
                value={ currentYear }
                onChange={(e) => setCurrentYear(e.target.value)}
                // list={ timelineValues }
                
            />
            <label htmlFor="range">year</label>
            <datalist>
            {/* need to loop through an array of values to make these from config file for reusability, */}
                <option value='2008' label='2008'/>
                <option value='2009' label='2009'/>
                <option value='2010' label='2010'/>
                <option value='2011' label='2011'/>
                <option value='2012' label='2012'/>
                <option value='2013' label='2013'/>
                <option value='2014' label='2014'/>
                <option value='2015' label='2015'/>
                <option value='2016' label='2016'/>
                <option value='2017' label='2017'/>
                <option value='2018' label='2018'/>
            </datalist>
        </form>
    )
}