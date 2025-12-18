// import {useRef, useState} from 'react'
import './Dice.css'

export default function Dice(props) {
    
    return (
        <>
            <button 
            type="button" 
            aria-label={`Value of button is ${props.value}, ${props.status? "You are pressed on the button and its Held" : "You are not pressed on the button and its not Held"}`}
            onClick={() => props.holdParent(props.parentId)}
            className={`btn-${props.status? "clicked": ""}`}
            aria-pressed={props.status}
            // style={{backgroundColor: props.status? "#094" : ""}}
            >
                {props.value}
            </button>
        </>
    )
}


