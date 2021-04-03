
import { connect } from 'react-redux'

const ReduxCounter = (props) => {
    return (
        <div>
            <h1>Redux Counter</h1>
            <h2>{props.counter}</h2>
            <div>
                <button onClick={props.counterPlus}>+</button>
                <button onClick={props.counterMinus}>-</button>
            </div>

            <div>
                <button onClick={props.counterReset}>Reset</button>
              
            </div>
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        counterPlus: () => dispatch({ type: 'counterPlus' }),
        counterMinus: () => dispatch({ type: 'counterMinus' }),
        counterReset: () => dispatch({ type: 'counterReset' })
    }
}

const ReduxDemoWithState = connect(mapStateToProps, mapDispatchToProps)(ReduxCounter)

export default ReduxDemoWithState