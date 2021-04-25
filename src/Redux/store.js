import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducer from './redusers/reducer'
import singleTaskReducer from './redusers/singleTaskReducer'
import searchReducer from './redusers/searchReducer'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'

const middlewares = [
    thunk,
    // logger
]

const reducers = combineReducers({
    someStates: reducer,
    singleTaskState: singleTaskReducer,
    searchState: searchReducer,
})

const store = createStore(reducers, applyMiddleware(...middlewares))


export default store