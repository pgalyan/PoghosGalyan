import React, {Component} from 'react'
import Task from '../Task/Task.js'
import AddTask from "../AddTask/AddNewTask";
import Styles from './ToDo.module.css';

class ToDo extends Component {
state = {
    tasks: ['task 1', 'task 2', 'task 3']
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
             key={index}
            
            />
       )    
   })

    return(
        <div>
            <AddTask
            handleSubmit={this.handleSubmit}
            />
            <div className={Styles.tasks}>
                {Tasks}
            </div>
            
        </div>
    )
}

}

export default ToDo