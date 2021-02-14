import Styles from './Task.module.css'
import {Col} from 'react-bootstrap'


const Task = ({task,id}) => {

return(
  <Col xs={12} md={4} lg={3} >
      <div className={Styles.tasks} id={id}>
        <p> {task}</p> 
      </div>
   </Col>
)
}

export default Task