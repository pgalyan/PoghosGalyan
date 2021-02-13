import Styles from './Task.module.css'


const Task = ({task,id}) => {

return(
      <div className={Styles.tasks} id={id}>
        <p> {task}</p> 
      </div>
)
}

export default Task