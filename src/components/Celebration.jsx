// install Ready Made Component from react its called Confetti for added celebration animation
// npm install react-confetti   // react-confetti it is npm denpendency
import Confetti from 'react-confetti' // To Added ready make component Confetti import Confetti from 'react-confetti'    
import {useWindowSize}  from 'react-use' // To Detects width and height automatically import {useWindowSize} from 'react-use' {here is destructuring function from its object}

// Celebration is a just function name for Confetti component to return <Confetti />
export default function Celebration() {
    const {width, height} = useWindowSize()
    // Note As Normal and general Rule for react for props 
    // if props for states or decision define props in parent and passing to child
    // if props for visualization define its inside child
    return (
        <>
            {/* width | height attributes but numberOfPieces={anyNumber} to define number of pieces of celebration and recyle={false} to stop after first fire celebration are predefined props */}
            <Confetti 
                width={width}
                height={height}
                numberOfPieces={3500}
                recycle={true}
            />
        </>
    )
}