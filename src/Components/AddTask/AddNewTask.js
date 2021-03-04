import React from "react"
import { InputGroup, Button, FormControl, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.state = {
            title: '',
            description: ''
        }
    }

    handleChange = (event) => {
        const { name ,  value } = event.target
        this.setState({
            [name]: value
        })
    }

    hendelChangeKey = ({ key, type }) => {
        if (type === 'keypress' && key !== 'Enter') return

        const { title, description } = this.state
        const { handleSubmit } = this.props
        const data = {
            title,
            description
        }
      
        handleSubmit(data)
        
        this.setState({
            title: '',
            description: ''
        })
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {

        const { title } = this.state
        const { description} = this.state
        const { disabled } = this.props


        return (
            <Col xs={12} md={6} lg={4}>
                <InputGroup className=" flex-column mb-3">
                    <div className=" justify-content-md-center ">
                        <FormControl
                            name="title"
                            type='text'
                            onChange={this.handleChange}
                            onKeyPress={this.hendelChangeKey}
                            placeholder="Task title"
                            value={title}
                            disabled={disabled}
                            ref={this.inputRef}
                        />
                        <FormControl
                            name="description"
                            className="my-3 resize-none"
                            as="textarea"
                            onChange={this.handleChange}
                            aria-label="With textarea"
                            placeholder="Task description"
                            style={{resize: "none" }}
                            value={description}
                            disabled={disabled}
                        />

                        <Button
                            variant="outline-secondary"
                            onClick={this.hendelChangeKey}
                            disabled={!(!!title && !!description)}
                        >
                            Add task
                            </Button>


                    </div>

                </InputGroup>
            </Col>
        )
    }
}

AddTask.prototypes = {
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool.isRequired
}


export default AddTask