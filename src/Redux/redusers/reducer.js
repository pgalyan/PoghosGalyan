import actionTypes from '../actionTypes';
import { isRequired, maxLength, minLength, emailValidation } from '../../Helpers/validators'

const initialState = {
    counter: 0,
    inputValue: "",

    todoState: {
        tasks: [],
        loading: false,
        removeTasks: new Set(),
        confirmDeleteModal: false,
        editTaskData: null,
        AddNewTask: false,
    },

    contactFormState: {
        name: {
            value: "",
            valid: false,
            error: ""
        },
        email: {
            value: "",
            valid: false,
            error: ""
        },
        message: {
            value: "",
            valid: false,
            error: ""
        },

        errorMessage: "",
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //counter
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

        //input 
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



        //ToDo
        case actionTypes.SET_TASKS: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: action.data
                }
            }
        }

        case actionTypes.TOGGLE_LOADING: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    loading: action.isLoading
                }

            }
        }

        case actionTypes.DELETE_ONE_TASK: {
            let tasks = [...state.todoState.tasks]
            tasks = tasks.filter(item => item._id !== action._id)
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: tasks
                }
            }
        }

        case actionTypes.ADD_TASK: {
            let tasks = [...state.todoState.tasks];
            tasks.push(action.data);
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }

        case actionTypes.EDIT_TASK: {
            let tasks = [...state.todoState.tasks]
            let index = tasks.findIndex(el => el._id === action.data._id)
            tasks[index] = action.data
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }

        case actionTypes.TOGGLE_SELECT_ALL_TASKS: {
            let tasks = [...state.todoState.tasks]
            let removeTasks = new Set(state.todoState.removeTasks)
            if (removeTasks.size !== 0) {
                removeTasks.clear()
            } else {
                for (let key in tasks) {
                    removeTasks.add(tasks[key]._id)
                }
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    removeTasks
                }
            }
        }

        case actionTypes.TOGGLE_SEELECT_TASK: {
            let removeTasks = new Set(state.todoState.removeTasks)
            if (removeTasks.has(action._id)) {
                removeTasks.delete(action._id)
            } else {
                removeTasks = removeTasks.add(action._id)
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    removeTasks
                }
            }
        }

        case actionTypes.TOGGLE_OPEN_DELETE_MODAL: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    confirmDeleteModal: !state.todoState.confirmDeleteModal
                }
            }
        }

        case actionTypes.DELETE_SELECT_TASKS: {
            let tasks = [...state.todoState.tasks]
            let removeTasks = new Set(state.todoState.removeTasks)
            tasks = tasks.filter(item => removeTasks.has(item._id))
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks,
                    removeTasks: new Set()
                }
            }
        }
        case actionTypes.TOOGLE_OPEN_ADD_TASK_MODAL: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    AddNewTask: true
                }
            }
        }

        case actionTypes.TOOGLE_CLOSE_TASK_MODAL: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    AddNewTask: false,
                    editTaskData: null
                }
            }
        }

        case actionTypes.TOOGLE_OPEN_EDIT_TASK_MODAL: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    editTaskData: action.task
                }
            }
        }


        case actionTypes.TOOGLE_EDIT_TASK_STATUS: {
            let tasks =[...state.todoState.tasks]
            const index = tasks.findIndex(task => task._id === action.task._id)
            tasks[index] = action.task;
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }

        //contact

        case actionTypes.ADD_CONTACT: {
            let error = null
            const { name, value } = action.event.target
            // let error = null
            // let valid = true
            const maxLength16 = maxLength(16)
            const minLength2 = minLength(2)

            switch (name) {
                case "name":
                case "email":
                case "message":
                    error = isRequired(value) ||
                        (name === "email" && emailValidation(value)) ||
                        minLength2(value) ||
                        maxLength16(value);
                    break;
                default: ;
            }
            return {
                ...state,
                contactFormState: {
                    ...state.contactFormState,
                    [name]: {
                        value,
                        valid: !!!error,
                        error
                    },
                }

            }
        }

        case actionTypes.CONTACT_ERROR: {
            return {
                ...state,
                contactFormState: {
                    ...state.contactFormState,
                    errorMessage: action.error
                }
            }
        }

        case actionTypes.CONTACT_STATE_RESET: {
            return {
                ...state,
                contactFormState: {
                    name: {
                        value: "",
                        valid: false,
                        error: ""
                    },
                    email: {
                        value: "",
                        valid: false,
                        error: ""
                    },
                    message: {
                        value: "",
                        valid: false,
                        error: ""
                    },

                    errorMessage: "",
                }
            }
        }

        default: return state;
    }
}

export default reducer