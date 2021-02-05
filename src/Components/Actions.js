import './Counter'

const Actions  = ({handlePlusCount , handleMinusCount})=>{
    return(
        <div>
        <button onClick={handlePlusCount}>+</button>
        <button onClick={handleMinusCount}>-</button>        
        </div>
    )
}

export default Actions