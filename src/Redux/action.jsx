import actionTypes from './actionTypes'

const API_URL = process.env.REACT_APP_API_URL;

export const setSingleTaskThunk = (_id , props) => (dispatch) => {

    fetch(`${API_URL}/task/${_id}`)
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

    fetch(`${API_URL}/task/` + formData._id, {
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
    
        fetch(`${API_URL}/task/${id}`, {
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
    fetch(`${API_URL}/task` + query.slice(0, query.length - 1))
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

