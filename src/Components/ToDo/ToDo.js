import React, { Component } from 'react'
import Task from '../Task/Task.js'
import { Container, Row, Col, Button } from 'react-bootstrap'
import TaskDeleteConfirm from '../TaskDeleteConfirm/TaskDeleteConfirm'
import TaskEditModal from '../TaskModal/TaskModal'
import dateFormatter from '../../Helpers/date'
import Preloader from '../Preloader/Preloader'
import actionTypes from '../../Redux/actionTypes'
import { connect } from 'react-redux'

class ToDo extends Component {

    handleSubmit = (formdata) => {
        this.props.toggleLoading(true)
        if (!!!formdata.title.trim() || !!!formdata.description.trim()) return;
        formdata.date = dateFormatter(formdata.date)

        fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(formdata),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.addTask(data)
            })
            .catch(error => {
                console.log("catch-error", error)
            })
            .finally(() => {
                this.props.toggleLoading(false)
            })

    }

    handleDeleteOneTask = (_id) => {
        this.props.toggleLoading(true)
        fetch("http://localhost:3001/task/" + _id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.deleteOnetask(_id)
                this.props.toggleLoading(false)
            })
            .catch(error => {
                console.log("catch-error", error)
            })
            .finally(() => {
                this.props.toggleLoading(false)
            })
    }


    removeSelectedTasks = () => {
        this.props.toggleLoading(true)
        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(this.props.removeTasks) }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
               this.props.deleteSelectTasks()
            })
            .finally(() => {
                this.props.toggleLoading(false)
            })

    }
    hendleEditTask = (editedTask) => {
        this.props.toggleLoading(true)
        fetch("http://localhost:3001/task/" + editedTask._id, {
            method: "PUT",
            body: JSON.stringify(editedTask),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.editTask(data)
            })
            .catch(error => {
                console.log('error', error);
            })
            .finally(() => {
                this.props.toggleLoading(false)
            })

    }

    componentDidMount() {
        this.props.toggleLoading(true)
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.setTasks(data)
                this.props.toggleLoading(false)
            })
            .catch(error => {
                console.log("Get tasks request error", error)
            })
            .finally(() => {
                this.props.toggleLoading(false)
            })
    }

    render() {
        const {
            //state
            tasks,
            loading,
            removeTasks,
            confirmDeleteModal,
            editTaskData,
            AddNewTask,
            

            //functions
            toggleSelectTask,
            toggleSelectAllTasks,
            toggleOpenDeleteModal,
            toggleOpenAddtaskModal,
            toggleClosetaskModal,
            toggleOpenEditTaskModal

        } = this.props;

        const Tasks = tasks.map((task) => {
            return (
                <Col
                    xs={12}
                    md={4}
                    lg={3}
                    className='mr-3 mb-3'
                    key={task._id}

                >
                    <Task
                        task={task}
                        handleDeleteOneTask={this.handleDeleteOneTask}
                        toggleSetRemoveTaskId={toggleSelectTask}
                        disabled={!!removeTasks.size}
                        checked={removeTasks.has(task._id)}
                        hendleSetEditTask={toggleOpenEditTaskModal}
                    />
                </Col>
            )
        })

        return (
            <>
                <Container>
                    <Row className=" justify-content-md-center mt-3 mb-3">
                        <Button
                            variant="outline-secondary"
                            onClick={toggleOpenAddtaskModal}
                            disabled={!!removeTasks.size}
                        >
                            Add task
                            </Button>
                    </Row>
                    <Row className="justify-content-md-center">
                        {loading && <Preloader />}

                        {!Tasks.length && !loading && <div>Tasks is Empty</div>}

                        {Tasks}

                    </Row>
                    <Row className="justify-content-md-center mt-2 ">
                        <Col>
                            <Button
                                className="mr-2"
                                variant="danger"
                                onClick={toggleOpenDeleteModal}
                                disabled={!!!removeTasks.size}
                            >
                                Remove Selected
                            </Button>

                            <Button
                                onClick={toggleSelectAllTasks}
                                disabled={!!!tasks.length}
                            >
                                {!!!removeTasks.size ? `Select all tasks` : `Unselect all tasks`}

                            </Button>
                        </Col>
                    </Row>
                </Container>

                {
                    confirmDeleteModal && <TaskDeleteConfirm
                        onHide={toggleOpenDeleteModal}
                        onSubmit={this.removeSelectedTasks}
                        selectedTasks={removeTasks.size}

                    />
                }

                {
                    (!!editTaskData || !!AddNewTask) && <TaskEditModal
                        editTaskData={editTaskData}
                        onHide={toggleClosetaskModal}
                        onSubmit={this.hendleEditTask}
                        AddNewTask={AddNewTask}
                        handleSubmit={this.handleSubmit}

                    />
                }

            </>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('todo state' , state)
    const {
        tasks,
        loading,
        removeTasks,
        confirmDeleteModal,
        AddNewTask,
        editTaskData
    } = state.someStates.todoState
    return {
        tasks,
        loading,
        removeTasks,
        confirmDeleteModal,
        AddNewTask,
        editTaskData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: (data) => {
            dispatch({ type: actionTypes.SET_TASKS, data });
        },
        toggleLoading: (isLoading) => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading });
        },

        deleteOnetask: (_id) => {
            dispatch({ type: actionTypes.DELETE_ONE_TASK, _id });
        },

        addTask: (data) => {
            dispatch({ type: actionTypes.ADD_TASK, data });
        },

        editTask: (data) => {
            dispatch({ type: actionTypes.EDIT_TASK, data });
        },

        toggleSelectAllTasks: () => {
            dispatch({ type: actionTypes.TOGGLE_SELECT_ALL_TASKS });
        },

        toggleSelectTask: (_id) => {
            dispatch({ type: actionTypes.TOGGLE_SEELECT_TASK, _id });
        },

        toggleOpenDeleteModal: () => {
            dispatch({ type: actionTypes.TOGGLE_OPEN_DELETE_MODAL })
        },

        deleteSelectTasks: () => {
            dispatch({ type: actionTypes.DELETE_SELECT_TASKS })
        },

        toggleOpenAddtaskModal: () => {
            dispatch({ type: actionTypes.TOOGLE_OPEN_ADD_TASK_MODAL })
        },

        toggleClosetaskModal: () => {
            dispatch({ type: actionTypes.TOOGLE_CLOSE_TASK_MODAL })
        },

        toggleOpenEditTaskModal: (task) => {
            dispatch({ type: actionTypes.TOOGLE_OPEN_EDIT_TASK_MODAL , task })
        }

    }

}




const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo);


export default TodoProvider;