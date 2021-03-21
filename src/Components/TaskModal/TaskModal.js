import React from 'react'
import { Modal, Button, FormControl } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import dateFormatter from '../../Helpers/date'

class TaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        // this.state = {
        //     ...props.EditTaskData
        //     //_id,
        //     //title,
        //     //description
        // }
        const editTaskData = props.editTaskData ? { ...props.editTaskData } : {}; 
        this.state = {
            _id: '',
            title: '',
            description: '',
            date: editTaskData.date? new Date(editTaskData.date) : new Date(),
            ...editTaskData
        }

    }
    hendleSetDate =(date)=>{
        
        this.setState({
            date
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    hendleS = ({ type, key }) => {
        if (type === 'keypress' && key !== 'Enter') return
        const { onSubmit, onHide, AddNewTask , handleSubmit} = this.props
        const formData = this.state
        formData.date = dateFormatter(formData.date)

        if(AddNewTask === false){
            onSubmit(formData)
            onHide()
        }else{
            handleSubmit(formData)
            onHide()
        }
            
    }

    componentDidMount() {
        this.myRef.current.focus()
    }

    render() {
        const { onHide, AddNewTask } = this.props
        const { title, description, date } = this.state;
        return (
            <Modal
                show={true}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {AddNewTask? `Add New Task`: `Edit Task`}
        </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-md-center'>
                    <div style={{width:'100%'}}>
                        <FormControl
                            name="title"
                            type='text'
                            onChange={this.handleChange}
                            onKeyPress={this.hendelChangeKey}
                            placeholder="Task title"
                            value={title}
                            // disabled={disabled}
                            ref={this.myRef}
                        />
                        <FormControl
                            name="description"
                            className="my-3 resize-none"
                            as="textarea"
                            onChange={this.handleChange}
                            aria-label="With textarea"
                            placeholder="Task description"
                            style={{ resize: "none" }}
                            value={description}
                        // disabled={disabled}
                        />
                        <DatePicker 
                        selected={new Date(date)} 
                        onChange={date => this.hendleSetDate(date)} />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant='secondary' >Close</Button>
                    <Button onClick={this.hendleS} variant='warning'>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }



}

export default TaskModal