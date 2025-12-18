import {Fragment} from 'react'
import Dice from './components/Dice'
import {useState, useRef, useEffect} from 'react'
import {nanoid} from 'nanoid'
// only import Celebration from '/reative path'
import Celebration from './components/Celebration'
import './App.css'


// other Way to Generte Array according to imperative way
// function generateArray() {
//   // new Array(10).fill(anyValue: number, indexStart:number, indexEnd: number): number[] aftre fill its by anyValue and starts from indexStart ends with indexEnd
//   return new Array(10).fill(0).map(num => Math.ceil(Math.random() * 6))
// }
// console.log(generateArray())
// console.log(generateDiceArray())


function generateDiceArray() {
    // return array of 10 numbers all between 1 - 6
    const dice = [];
    for(let i=0; i < 10; i++) {
      let num = Math.ceil(Math.random() * 6);
      if(num > 0 && num <= 6) 
        // const diceObj = {
        //   val: num, 
        //   isHeld: false
        // }
        dice.push({id: nanoid(),val: num, isHeld: false});
    }
    return dice;
}

export default function App() {
  // when use  const [diceArray, setDiceArray] = useState(generateDiceArray())
  // this state is run in each render in this case not cause issue for performance
  // the function generateDiceArray() is not contains many intensive or complex logic but its simply
  // if use complex logic use call back function in this will runs for once time as below
  // const [diceArray, setDiceArray] = useState(generateDiceArray()) //run every time render
  // const [diceArray, setDiceArray] = useState(() => generateDiceArray()) //run only once
  const [diceArray, setDiceArray] = useState(() => generateDiceArray())
  const [showCelebrate, setShowCelebrate] = useState(false); 
  const timerId = useRef(null);
  const btnRef = useRef(null);
  const isGameOver = handleGame();
  
  const rollDice = () => {
    setDiceArray(prevDice => 
      prevDice.map(ele => 
        ele.isHeld ? {...ele} : 
        {...ele, val: Math.ceil(Math.random() * 6)} 
      )
    )
  }

  const holdDice = (diceId) => {
    handleGame();
    setDiceArray(prevDice => 
      prevDice.map(ele => ele.id === diceId? {...ele, isHeld: !ele.isHeld} : ele
      )
    )
  }

  function handleGame() {
    // let check = diceArray.every(ele => ele.isHeld === true && ele.val === diceArray[0].val)
    // , value = diceArray.map(ele => ele.val === diceArray[0].val? diceArray[0].val : false);
    if(diceArray.every(ele => ele.isHeld === true && ele.val === diceArray[0].val))
      setShowCelebrate(oldVal => !oldVal);
    return diceArray.every(ele => ele.isHeld === true && ele.val === diceArray[0].val);
  }

  useEffect(()=> {
    if(!showCelebrate) return
    if(btnRef && btnRef.current !== null)
      btnRef.current.focus();
    timerId.current = setTimeout(() => {
      setShowCelebrate(oldVal => !oldVal);
      setDiceArray(()=>generateDiceArray());
      console.log("Game Over");
    }, 4000)

    return () => clearTimeout(timerId.current);

  }, [showCelebrate])


  const stopTimer = () => {
    clearInterval(timerId.current);
    setShowCelebrate(oldVal => !oldVal);
    setDiceArray(()=>generateDiceArray());
    console.log("Mannual Game Over");
  }

  const addButtons = diceArray.map(num => {
    return (
      <Dice 
        key={num.id} 
        value={num.val} 
        status={num.isHeld} 
        holdParent={holdDice} 
        parentId={num.id} 
      />
    )
  })


  return (
    <Fragment>
        <main className='main'>
          <div aria-live='polite' className='sr-only'>
            {showCelebrate && <p>Congratualations! You Won, Press on Button "New Game" to start game again.</p>}
          </div>
          {showCelebrate &&  <Celebration />}
          <article className='intro'>
            <h1>Tenzies</h1>
            <p>Roll untill all dice are the same. Click each dice to freeze it at its current value between rolls</p>
          </article>
          <div className="dice-container">
            {addButtons}
          </div>
          <button 
            onClick={isGameOver? stopTimer : rollDice} 
            className='roll-button' 
            ref={btnRef}
            type="button"
            aria-label={`${isGameOver? "Game over Congurations You are won, Press on button to start New Game"  : "Generate Random 10 Numbers"}`}
          >
            {showCelebrate && isGameOver ? "New Game" : "Roll"}
          </button>
      </main>
    </Fragment>
  )
}

// isGameOver? checkGameOver : 