import React from "react";
import Die from "./Die"
import Confetti from 'react-confetti'

export default  function Tenzie(props) {
    const [dies,setDies] = React.useState(allNewDice) /** initialize the state with the function value*/
    const [tenzies,setTenzies] = React.useState(false)
  
    React.useEffect(() => {
      const allHeld = dies.every(die => die.isHeld) //cHECK IF ALL THE VALUES OF isHeld ARE TRUE
      const firstValue = dies[0].value              //Save the first value of the first object
      const allSameValue = dies.every(die => die.value === firstValue) //Check if every value are equals to the first value 
  
      if (allHeld && allSameValue) { //If allHeld and allSameValue are true it renders the setTenzies.The variables that use .every are booleans
          setTenzies(true)
          console.log("You won!")
      }
    }, [dies])
  
    function allNewDice(){    /* the function creates a new array of objects */
      const newDice =  []
      console.log("All New Dice")
      for(let i=1;i<=10;i++){
        newDice.push({
          id: i,
          value: (Math.ceil(Math.random() * 6)),
          isHeld: false
        })
      }
      return newDice
    }
  
    function toggleUpdate(){  /**this will set all diferents value to the objects thar are FALSE*/    
      if(tenzies){
        setDies(allNewDice)
        setTenzies(false)
      }
      else{
        setDies(prevDies => {
          return prevDies.map(obj => {
            return {
              ...obj,
              value: obj.isHeld ? obj.value : (Math.ceil(Math.random() * 6))
            }
          })
      })
      }
    }
  
    function toggleChangeNums(id){  /** this change the value of isHeld to the current object with the same id in parameter */
        setDies(prevArray => {
          return prevArray.map((prevSquare) => {
            return prevSquare.id===id ? {...prevSquare, isHeld: !prevSquare.isHeld} : prevSquare
          })
        })
    }
  
    const arrayDies = dies.map(objects => {  /**this creates a new container numbers */
      return <Die key={objects.id}
                   {...objects} //Send it the entire object to die props
                   toggleChangeNums={() => toggleChangeNums(objects.id)} /* toggleChangeNums is send it to the Die component and recives the same function with the current id of the object*/
              />
      }
    )
  
    return (
      <menu className={props.darkMode ? "dark" : ""}>
        {tenzies && <Confetti />   /* if ttenzies is true it display some Confetti animation */} 
        <h1 className="tittle">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
          {arrayDies}
        </div>
        <button onClick={toggleUpdate} className="roll--button">{tenzies ? "New Game" : "Roll"}</button>
      </menu>
    )
  }