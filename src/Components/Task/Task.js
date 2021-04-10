import React from 'react'
import Styles from './Task.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCheckSquare, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, InputGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'
import dateFormatter from '../../Helpers/date'
import { NavLink } from 'react-router-dom'

class Task extends React.PureComponent {
  render() {
    const { 
      task,
      handleDeleteOneTask,
      toggleSetRemoveTaskId,
      disabled,
      checked,
      hendleSetEditTask,
      toggleActiveTask
    } = this.props

    return (

      <Card className={`${Styles.tasks} ${checked && Styles.checked}`}>
        <InputGroup.Prepend className='justify-content-rigth mt-3 ml-3'>
          <InputGroup.Checkbox onChange={() => toggleSetRemoveTaskId(task._id)}
            checked={checked && true}
          // onChange={()=> `checked = ${checked && true}`} 
          />
        </InputGroup.Prepend>
        <Card.Body>
          <NavLink to={`/task/${task._id}`}>
            <Card.Title>{task.title}</Card.Title>
          </NavLink>

          <Card.Text>
            {task.description}
          </Card.Text>
          <Card.Text>
            Date : {dateFormatter(task.date)}
          </Card.Text>
          <Card.Text>
            Created at : {dateFormatter(task.created_at)}
          </Card.Text>
          <Button
            variant="danger"
            onClick={() => handleDeleteOneTask(task._id)}
            disabled={disabled} >Del</Button>
          <Button
            variant="warning"
            className="ml-2"
            onClick={() => hendleSetEditTask(task)}
            disabled={disabled} >Edit</Button>
          <Button
            variant="info"
            className="ml-3"
            disabled={disabled}
            onClick={() => toggleActiveTask(task)}
            //  {task.status !== "active" ? style=backgroundColor: "green"}
             style={{backgroundColor: task.status !== "active" ? "green" : "blue" }}
          >
            <FontAwesomeIcon icon={task.status === "active" ? faHourglassHalf : faCheckSquare}  />
          </Button>
        </Card.Body>
      </Card >
    )
  }
}

Task.prototypes = {
  task: PropTypes.object.isRequired,
  handleDeleteOneTask: PropTypes.func,
  toggleSetRemoveTaskId: PropTypes.func,
  checked: PropTypes.bool.isRequired
}

export default Task