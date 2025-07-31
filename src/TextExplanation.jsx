

export default function TextExplanation(currentDay, unixStarts) {
    console.log(currentDay, unixStarts)
    
    //need some other things - time to move more stuff into their own files - or into configUtils? - 'do one thing'
    //logic as to what gets displayed

    const description = 'description from the json will go here'

    return (
        <div 
            className='explanation' 
        >
            <h1>Date</h1>
            <p>{ description }</p>
        </div>
    );
}