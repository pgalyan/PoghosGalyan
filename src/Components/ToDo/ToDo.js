import React, {Component} from 'react'
import Task from '../Task/Task.js'
import AddTask from "../AddTask/AddNewTask";
import {Container, Row, Col } from 'react-bootstrap'
import IdGenerator from '../../Helpers/IdGen';

class ToDo extends Component {
state = {
    tasks: ['task 1', 'task 2', 'task 3', 'task 4', 'task 5', 'task 6' ]
}

handleSubmit = (value) => {
    if (!value) return;
    const tasks = [...this.state.tasks]
    tasks.push(value)
    this.setState({
        tasks
    });
}

render(){
    const Tasks = this.state.tasks.map((task, index)=>{
        return(
            <Task
             task={task}
             id= {IdGenerator()}
             key={index}
            />
       )    
   })

    return(
        <Container>        
           <Row className="justify-content-md-center mt-3">
                <AddTask
                            handleSubmit={this.handleSubmit}
                 />
           </Row>
            <Row  className="justify-content-md-center">
            <Col xs={12} md={4} lg={3} >
                 {Tasks}
            </Col>
            </Row>
        </Container>   
    )
}

}

export default ToDo