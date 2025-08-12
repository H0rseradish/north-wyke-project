//understanding Pete's code:
import { useState } from "react";
import "./css/style.css";

// storing the system types in an object:
const systemTypes = {
  baseline: 0,
  redSystem: 1,
  greenSystem: 2,
  blueSystem: 3,
};

// Making an array of fields objects. Each has a systemtype property, and a cowsnumber property. This is a starting point for the state and will be passed into useState()
// I need to think about how the individual fields relate to this - as an array of all the fields as objects????
const intialFields = [
  { systemType: systemTypes.baseline, cows: 0 },
  { systemType: systemTypes.baseline, cows: 0 },
  { systemType: systemTypes.baseline, cows: 0 },
];

// a function to display the 'fields' with colors: returns a div of the appropriate color for the fieldType passed in:
function Field({ fieldType }) {
  const colors = ["black", "red", "green", "blue"];

  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        //shows the colors (according to the index of the system type),
        backgroundColor: colors[fieldType.systemType],
        // opacity controlled by cow number, OR default to 1 (full strength)
        opacity: fieldType.cows / 100 || 1,
        transition: "all 1s ease-in-out",
      }}
    ></div>
  );        
}

//function that returns the rendered fields using .map() to..loop through the fields (originally the array of objects in initial?Fields, and subsequently whatever the state happens to be - I think...?)
function Map({ fields }) {

  return fields.map((_, i) => (
    // loop through giving each field a key and assigning a style based on its index:
    <Field key={`field${i}`} fieldType={fields[i]} />
  ));
}

// the actual App: returns three buttons with a function on each to handle the clicks, and the Map function 
// useState has 2 params: the current state(value) and a function to update state (setter?) (destructured into fields and setFields)
export default function PetesApp() {
  const [fieldsState, setFields] = useState(intialFields);
  //so this below logs the initial state (initialFields) as expected AND THEN LOGS A NEW STATE ACCORDING TO WHICH BUTTON IS CLICKED! so somehow holds on to the state!
  // console.log(fieldsState)

  //3 differing functions called onClick that control the current state of the app, plus in these functions    - many things many happen...
  function handleClick() {
    setFields([
      { systemType: systemTypes.baseline, cows: 0 },
      { systemType: systemTypes.baseline, cows: 0 },
      { systemType: systemTypes.baseline, cows: 0 },
    ]);
  }

  function handleClick1() {
    setFields([
      { systemType: systemTypes.redSystem, cows: 10 },
      { systemType: systemTypes.greenSystem, cows: 20 },
      { systemType: systemTypes.blueSystem, cows: 30 },
    ]);
  }

  function handleClick2() {
    setFields([
      { systemType: systemTypes.greenSystem, cows: 100 },
      { systemType: systemTypes.blueSystem, cows: 100 },
      { systemType: systemTypes.redSystem, cows: 100 },
    ]);
  }

  return (
    <div className="App">
      <button onClick={handleClick}>2014</button>
      <button onClick={handleClick1}>2015</button>
      <button onClick={handleClick2}>2016</button>
      {/* - set a fields property on Map that will be the current STATE of fields:- based on which/whether button was clicked, with its setter function determinig the values*/}
      <Map fields={fieldsState} />
    </div>
  );
}
