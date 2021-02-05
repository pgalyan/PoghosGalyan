import React, {Component} from 'react'
import Tasks from './Tasks'

class ToDo extends Component {
state = {
    tasks: ['task 1', 'task 2', 'task 3']
}

render(){
    const Task = this.state.tasks.map((task, index)=>{
        return(
              <p index={index}>{task}</p> 
       )    
   })

    return(
        <div>
            <Tasks  Task={Task} />

            <div>
                <input></input>
                <button>ADD</button>
            </div>
        </div>
    )
}

}

export default ToDo