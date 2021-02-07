import React, {Component} from 'react'
import Tasks from './Tasks.js'

class ToDo extends Component {
state = {
    tasks: ['task 1', 'task 2', 'task 3']
}



render(){
    const aaaa = this.state.tasks.map((task, index)=>{
        return(
            <Tasks task={task} />
       )    
   })

    return(
        <div>
            {aaaa}
            
            <div>
                <input></input>
                <button>ADD</button>
            </div>
        </div>
    )
}

}

export default ToDo