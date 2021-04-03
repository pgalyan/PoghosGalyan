import { createStore } from 'redux'

const initialState = {
    counter: 0,
    inputValue: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "counterPlus":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "counterMinus":
            return {
                ...state,
                counter: state.counter - 1
            }
        case "counterReset":
            return {
                ...state,
                counter: 0
            }
        case "changeInputValue":
            return {
                ...state,
                inputValue: action.inputValue
            }

        case "resetInputValue":
            return {
                ...state,
                inputValue: ""
            }

        default: return state;
    }
}

const store = createStore(reducer)


export default store