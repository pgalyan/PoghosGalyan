import React, { Component } from 'react'
import Task from '../Task/Task.js'
import AddTask from "../AddTask/AddNewTask"
import { Container, Row, Col, Button} from 'react-bootstrap'
import IdGenerator from '../../Helpers/IdGen'
// import PropTypes from 'prop-types'

class ToDo extends Component {
    state = {
        tasks: [
            {
                id: IdGenerator(),
                title: 'title 1',
            },
            {
                id: IdGenerator(),
                title: 'title 2',
            },
            {
                id: IdGenerator(),
                title: 'title 3',
            }
        ],
        removeTasks: new Set()
    }

    handleSubmit = (value) => {
        if (!value) return;
        const tasks = [...this.state.tasks]
        tasks.push({
            id: IdGenerator(),
            title: value,
        })
        this.setState({
            tasks
        });
    }

    handleDeleteOneTask = (id) => {
        let tasks = [...this.state.tasks]
        tasks = tasks.filter(item => item.id !== id)
        this.setState({
            tasks
        });
    }

    toggleSetRemoveTaskId = (id) => {
        let removeTasks = new Set(this.state.removeTasks)

        if (removeTasks.has(id)) {
            removeTasks.delete(id)
        } else {
            removeTasks = removeTasks.add(id)
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
                removeTasks.add(tasks[key].id)
            }
        }
        this.setState({
            removeTasks
        })
    }

    removeSelectedTasks = () => {
        let tasks = [...this.state.tasks]
        let removeTasks = new Set(this.state.removeTasks)
        tasks = tasks.filter(item => !removeTasks.has(item.id))
        this.setState({
            tasks,
            removeTasks: new Set()
        })

    }

    render() {
        const removeTasks = new Set(this.state.removeTasks)


        const Tasks = this.state.tasks.map((task) => {
            return (
                <Col
                    xs={12}
                    md={4}
                    lg={3}
                    className='mr-3 mb-3'
                    key={task.id}

                >
                    <Task
                        task={task}
                        handleDeleteOneTask={this.handleDeleteOneTask}
                        toggleSetRemoveTaskId={this.toggleSetRemoveTaskId}
                        disabled={!!removeTasks.size}
                        checked={removeTasks.has(task.id)}
                    />
                </Col>
            )
        })


        return (
            <Container>
                <Row className="justify-content-md-center mt-3">
                    <AddTask
                        handleSubmit={this.handleSubmit}
                        disabled={!!removeTasks.size}
                    />
                </Row>
                {/* <Row className="justify-content-md-center mt-3 mb-3">
                    <InputGroup.Prepend  >
                        <InputGroup.Checkbox
                            onChange={this.toggleSetSelectAllTasks}
                            checked={!!removeTasks.size}
                        />
                        <div> Select all tassks</div>
                    </InputGroup.Prepend>
                </Row> */}
                <Row className="justify-content-md-center">
                    {!Tasks.length && <div>Tasks is Empty</div>}

                    {Tasks}

                </Row>
                <Row className="justify-content-md-center mt-2 ">
                    <Col>
                        <Button
                            className="mr-2"
                            variant="danger"
                            onClick={this.removeSelectedTasks}
                            disabled={!!!removeTasks.size}
                        >
                            Remove Selected
                            </Button>

                        <Button
                         onClick={this.toggleSetSelectAllTasks}
                         disabled={!!!this.state.tasks.length}
                        >
                            {!!!removeTasks.size?`Select all tasks`: `Unelect all tasks`}
                            
                            </Button>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default ToDo