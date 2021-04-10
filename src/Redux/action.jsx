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

// export const toggleEditeSingleTaskStatus = (singleTask) => (dispatch) => {

//     const status = task.status === "active" ? "done" : "active";
    
//     fetch("http://localhost:3001/task/" + formData._id, {
//         method: "PUT",
//         body: JSON.stringify(task.status),
//         headers: {
//             "Content-type": "application/json"
//         }
//     })
//         .then(res => res.json())
//         .then(data => {
//             if (data.error) {
//                 throw data.error
//             }
//             dispatch({ type: 'editeTaskStatus', data: task.status })
//         })
//         .catch(error => {
//             console.log('error', error);

//         }) 
// }

