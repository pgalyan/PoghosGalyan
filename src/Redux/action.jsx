import actionTypes from './actionTypes'

export const setSingleTaskThunk = (_id , props) => (dispatch) => {

    fetch(`http://localhost:3001/task/${_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                dispatch({ type: "setSingleTask", data: data });
            })
            .catch(error => {
                console.error("Request error", error)
                props.history.push('/')
            })
}

export const editSingleTaskThunk = (formData) => (dispatch) => {

    fetch("http://localhost:3001/task/" + formData._id, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: 'editeTask', data: data })
        })
        .catch(error => {
            console.log('error', error);

        })

}

export const toggleEditSingleTaskThunk = () => (dispatch) => {
    dispatch({ type: "toggleEditModal" })   
}

export const deleteSingleTaskThunk = (id , history) => (dispatch) => {
    
        fetch(`http://localhost:3001/task/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                history.push('/')
            })
            .catch(error => {
                console.error('error', error)
            })   
}

export const sortOrFilterTasksThunk = (queryData) => (dispatch) => {
    let query = "?";
    for (let key in queryData) {
        query += key + "=" + queryData[key] + "&";
    }
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`http://localhost:3001/task` + query.slice(0, query.length - 1))
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.SET_TASKS,  data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

