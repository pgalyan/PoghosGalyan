import { createStore , applyMiddleware, combineReducers} from 'redux'
import reducer from './redusers/reducer'
import singleTaskReducer from './redusers/singleTaskReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const middlewares = [thunk , logger] 

const reducers = combineReducers({
    someStates: reducer,
    singleTaskState: singleTaskReducer
})

const store = createStore(reducers, applyMiddleware(...middlewares))


export default store