import React, { Component } from 'react'
import Task from '../Task/Task.js'
import AddTask from "../AddTask/AddNewTask";
import { Container, Row , Col} from 'react-bootstrap'
import IdGenerator from '../../Helpers/IdGen';

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
        ]
    }

    handleSubmit = (value) => {
        if (!value) return;
        const tasks = [...this.state.tasks]
        tasks.push({
            id:IdGenerator(),
            title: value,
        })
        this.setState({
            tasks
        });
    }

    handleDeleteOneTask = (id) => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(item => item.id !== id)
        this.setState({
            tasks
        });
    }

    render() {
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
                    />
                </Col>
            )
        })


        return (
            <Container>
                <Row className="justify-content-md-center mt-3">
                    <AddTask
                        handleSubmit={this.handleSubmit}
                    />
                </Row>
                <Row className="justify-content-md-center">
                    {!Tasks.length && <div>Tasks is Empty</div>}

                    {Tasks}

                </Row>
            </Container>
        )
    }

}

export default ToDo