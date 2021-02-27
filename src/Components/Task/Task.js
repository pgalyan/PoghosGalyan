import React from 'react'
import Styles from './Task.module.css'
import { Card, Button, InputGroup } from 'react-bootstrap'


// const Task = ({ task , handleDeleteOneTask,toggleSetRemoveTaskId, checked }) => {

//   return (

//     <Card  className={`${Styles.tasks} ${checked && Styles.checked}`}>
//       <InputGroup.Prepend className='justify-content-rigth mt-1 ml-1'>
//         <InputGroup.Checkbox onClick= {()=> toggleSetRemoveTaskId(task.id)} checked={checked && true}  />
//       </InputGroup.Prepend>
//       <Card.Body>
//         <Card.Title>{task.title}</Card.Title>
//         <Button variant="danger" onClick={()=>handleDeleteOneTask(task.id)} >Del</Button>
//       </Card.Body>
//     </Card>

//   )
// }


class Task extends React.PureComponent {

  

  render() {

    // console.log('render')
    const { task, handleDeleteOneTask, toggleSetRemoveTaskId, checked } = this.props

    return (

      <Card className={`${Styles.tasks} ${checked && Styles.checked}`}>
        <InputGroup.Prepend className='justify-content-rigth mt-3 ml-3'>
          <InputGroup.Checkbox onChange={() => toggleSetRemoveTaskId(task.id)} 
          checked = {checked && true}
          // onChange={()=> `checked = ${checked && true}`} 
          />
        </InputGroup.Prepend>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Button variant="danger" onClick={() => handleDeleteOneTask(task.id)} >Del</Button>
        </Card.Body>
      </Card >
    )
  }
}

export default Task