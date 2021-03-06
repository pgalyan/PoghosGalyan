import React from 'react'
import { Modal, Button, FormControl } from 'react-bootstrap'

class TaskEditModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            ...props.EditTaskData
            //_id,
            //title,
            //description


        }
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
        if(AddNewTask === false){
            onSubmit(this.state)
        }else{
            handleSubmit(this.state)
        }
        
        onHide()
    }




    render() {
        const { onHide, AddNewTask } = this.props
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
                    <div Style={'width:100%'}>
                        <FormControl
                            name="title"
                            type='text'
                            onChange={this.handleChange}
                            onKeyPress={this.hendelChangeKey}
                            placeholder="Task title"
                            value={this.state.title}
                            // disabled={disabled}
                            ref={this.inputRef}
                        />
                        <FormControl
                            name="description"
                            className="my-3 resize-none"
                            as="textarea"
                            onChange={this.handleChange}
                            aria-label="With textarea"
                            placeholder="Task description"
                            style={{ resize: "none" }}
                            value={this.state.description}
                        // disabled={disabled}
                        />
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

export default TaskEditModal