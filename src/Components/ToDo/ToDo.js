import React, { Component } from 'react'
import Task from '../Task/Task.js'
// import AddTask from "../AddTask/AddNewTask"
import { Container, Row, Col, Button } from 'react-bootstrap'
// import IdGenerator from '../../Helpers/IdGen'
import TaskDeleteConfirm from '../TaskDeleteConfirm/TaskDeleteConfirm'
import TaskEditModal from '../TaskModal/TaskModal'
// import PropTypes from 'prop-types'
import dateFormatter from '../../Helpers/date'
import Preloader from '../Preloader/Preloader'

class ToDo extends Component {
    state = {
        tasks: [],
        removeTasks: new Set(),
        isConfirmModal: false,
        editTaskData: null,
        AddNewTask: false,
        loading: false
    }

    handleSubmit = (formdata) => {
        this.setState({
            loading: true
        })
        if (!formdata.title || !formdata.description)
            return;
        formdata.date = dateFormatter(formdata.date)
        const tasks = [...this.state.tasks]
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
                tasks.push(data);
                this.setState({
                    tasks
                });
            })
            .catch(error => {
                console.log("catch-error", error)
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })

    }

    handleDeleteOneTask = (_id) => {
        this.setState({
            loading: true
        })

        let tasks = [...this.state.tasks]
        fetch("http://localhost:3001/task/" + _id, {
            method: "DELETE",
            // body: JSON.stringify(formdata),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                tasks = tasks.filter(item => item._id !== _id)
                this.setState({
                    tasks
                });
            })
            .catch(error => {
                console.log("catch-error", error)
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })


    }

    toggleSetRemoveTaskId = (_id) => {
        let removeTasks = new Set(this.state.removeTasks)

        if (removeTasks.has(_id)) {
            removeTasks.delete(_id)
        } else {
            removeTasks = removeTasks.add(_id)
        }
        this.setState({
            removeTasks
        })
    }

    toggleSetSelectAllTasks = () => {
        let tasks = [...this.state.tasks]
        let removeTasks = new Set(this.state.removeTasks)

        if (removeTasks.size !== 0) {
            removeTasks.clear()
        } else {
            for (let key in tasks) {
                removeTasks.add(tasks[key]._id)
            }
        }
        this.setState({
            removeTasks
        })
    }

    removeSelectedTasks = () => {
        this.setState({
            loading: true
        })
        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(this.state.removeTasks) }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                let tasks = [...this.state.tasks]
                let removeTasks = new Set(this.state.removeTasks)
                tasks = tasks.filter(item => !removeTasks.has(item._id))
                this.setState({
                    tasks,
                    removeTasks: new Set()
                })
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })

    }

    handleToggleOpenModal = () => {
        this.setState({
            isConfirmModal: !this.state.isConfirmModal
        });
    }

    hendleSetEditTask = (task) => {

        this.setState({
            editTaskData: task
        })
    }

    setEditeTableDataNull = () => {
        this.setState({
            editTaskData: null,
            AddNewTask: false
        })
    }

    hendleEditTask = (editedTask) => {
        this.setState({
            loading: true
        })
     

        fetch("http://localhost:3001/task/" + editedTask._id, {
            method: "PUT",
            body: JSON.stringify(editedTask),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log('data',data);
                if (data.error) {
                    throw data.error
                }
                const tasks = [...this.state.tasks]
                const index = tasks.findIndex(el => el._id === data._id)
                tasks[index] = data
                this.setState({
                    tasks
                })
            })
            .catch(error => {
                console.log('error', error);
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
            
    }

    hendleAddNewTask = () => {
        this.setState({
            AddNewTask: true,
            editTaskData: true
        })
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.setState({
                    tasks: data,
                    loading: false
                })
            })
            .catch(error => {
                console.log("Get tasks request error", error)

            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        const removeTasks = new Set(this.state.removeTasks)

        const { isConfirmModal, editTaskData, AddNewTask, tasks, loading } = this.state




        const Tasks = this.state.tasks.map((task) => {
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
                        toggleSetRemoveTaskId={this.toggleSetRemoveTaskId}
                        disabled={!!removeTasks.size}
                        checked={removeTasks.has(task._id)}
                        hendleSetEditTask={this.hendleSetEditTask}
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
                            onClick={this.hendleAddNewTask}
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
                                onClick={this.handleToggleOpenModal}
                                disabled={!!!removeTasks.size}
                            >
                                Remove Selected
                            </Button>

                            <Button
                                onClick={this.toggleSetSelectAllTasks}
                                disabled={!!!this.state.tasks.length}
                            >
                                {!!!removeTasks.size ? `Select all tasks` : `Unelect all tasks`}

                            </Button>
                        </Col>
                    </Row>
                </Container>

                {
                    isConfirmModal && <TaskDeleteConfirm
                        onHide={this.handleToggleOpenModal}
                        onSubmit={this.removeSelectedTasks}
                        selectedTasks={removeTasks.size}

                    />
                }

                {
                    editTaskData && <TaskEditModal
                        editTaskData={editTaskData}
                        onHide={this.setEditeTableDataNull}
                        onSubmit={this.hendleEditTask}
                        AddNewTask={AddNewTask}
                        handleSubmit={this.handleSubmit}

                    />

                }

            </>
        )
    }

}

export default ToDo