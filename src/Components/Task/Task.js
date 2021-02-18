// import Styles from './Task.module.css'
import { Card, Button ,InputGroup } from 'react-bootstrap'


const Task = ({ task , handleDeleteOneTask,toggleSetRemoveTaskId }) => {

  return (

    <Card >
      <InputGroup.Prepend className='justify-content-rigth mt-1 ml-1'>
        <InputGroup.Checkbox onClick= {()=> toggleSetRemoveTaskId(task.id)} />
      </InputGroup.Prepend>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Button variant="danger" onClick={()=>handleDeleteOneTask(task.id)} >Del</Button>
      </Card.Body>
    </Card>

  )
}

export default Task