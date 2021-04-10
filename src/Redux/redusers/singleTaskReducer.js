const initialState = {
    singleTask: null,
    isEditModalOpen: false,
    
}

const singleTaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case "toggleEditModal":
            return {
                ...state,
                isEditModalOpen: !state.isEditModalOpen
            }
        case "setSingleTask":
            return {
                ...state,
                singleTask: action.data
            }

        case "editeTask":
            return {
                ...state,
                singleTask: action.data
            }

        // case "editeTaskStatus":
        //     return {
        //         ...state,
        //         singleTask: action.data
        //     }

            

        default: return state;
    }
}

export default singleTaskReducer