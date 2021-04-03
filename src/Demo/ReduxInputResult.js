import { connect } from 'react-redux'

const ReduxImputResult = (props) => {
    console.log('props', props);
    return (
        <div>
            <div>
                <h1>Imput Result</h1>
            </div>
            <div>
                <input
                    type="text"
                    name="text"
                    placeholder="Type something"
                    onChange={(e) => { props.changeInputValue(e.target.value) }}
                    value={props.inputValue}
                />
                <p>
                    input value :  {props.inputValue}
                </p>

                <button onClick={props.resetInputValue}>reset input</button>

            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue: (inputValue) => dispatch({ type: 'changeInputValue', inputValue: inputValue }),
        resetInputValue: () => dispatch({ type: 'resetInputValue' })
    }
}

const ReduxDemoWithState = connect(mapStateToProps, mapDispatchToProps)(ReduxImputResult)

export default ReduxDemoWithState