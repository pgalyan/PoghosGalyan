import React, {  useEffect } from 'react'
import { Button } from 'react-bootstrap'
import TaskModal from '../../../Components/TaskModal/TaskModal'
import styles from './SingleTask.module.css'
import { connect } from 'react-redux'
import {
    setSingleTaskThunk,
    editSingleTaskThunk,
    toggleEditSingleTaskThunk,
    deleteSingleTaskThunk

} from '../../../Redux/action'



const SingleTask = (props) => {


    useEffect(() => {
        const { id } = props.match.params
        setSingleTask( id ,props)
    },[props])



    const hendleEditTask = (formData) => {
        editSingleTask(formData)
    }

    const toggleDeleteSingleTask = () => {
        
        const history = props.history
        const id = props.match.params.id
        deleteSingleTask(id , history )
    }


    const hendleGoBack = () => {
        props.history.goBack();
    }


    const {
        singleTask,
        isEditModalOpen,


        setSingleTask,
        editSingleTask,
        toggleEditSingleTask,
        deleteSingleTask
        
        
    } = props

    if (!singleTask) {
        return <div>
            <span>Loading...</span>
        </div>
    }

    return (
        <>
            <div className={styles.task}>
                <h1>Single Page</h1>
                <div>
                    <Button
                        onClick={hendleGoBack}
                    >
                        Go back
                                </Button>
                </div>

                <div className={styles.taskBody}>
                    <div>
                        <h4>Title</h4> {singleTask.title}
                    </div>
                    <div>
                        <h4>Description</h4> {singleTask.description}
                    </div>
                    <div>
                        <h4>Date</h4> {singleTask.date}
                    </div>
                    <div>
                        <h4>Created at</h4> {singleTask.created_at}
                    </div>
                </div>
                <div>
                    <Button
                        variant="danger"
                        onClick={toggleDeleteSingleTask}
                    >
                        Del
                        </Button>
                    <Button
                        variant="warning"
                        className="ml-2"
                        onClick={toggleEditSingleTask}
                    >
                        Edit
                         </Button>
                </div>
            </div >
            {
                isEditModalOpen && <TaskModal
                    editTaskData={singleTask}
                    onHide={toggleEditSingleTask}
                    onSubmit={hendleEditTask}
                    AddNewTask={false}
                />
            }
        </>
    )

}


const mapStateToProps = (state) => {
    const {
        singleTask,
        isEditModalOpen
    } = state.singleTaskState
    return {
        singleTask,
        isEditModalOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSingleTask: (_id , props) => dispatch(setSingleTaskThunk(_id, props)),
       editSingleTask: (formData) => dispatch(editSingleTaskThunk(formData)),
       toggleEditSingleTask: () => dispatch(toggleEditSingleTaskThunk()),
       deleteSingleTask: (id , history) => dispatch(deleteSingleTaskThunk(id, history))
    //    toggleEditeSingleTaskStatus: (singleTask) => dispatch(toggleEditeSingleTaskStatusThunk(singleTask))
    }
}


const SingleTaskProvider = connect(mapStateToProps, mapDispatchToProps)(SingleTask);



export default SingleTaskProvider