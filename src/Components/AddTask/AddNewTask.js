import React from "react"
import { InputGroup, Button, FormControl, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

class AddTask extends React.Component {
    constructor(props){
        super(props);
        this.inputRef = React.createRef()
        this.state = {
            inputValue: ''
        }
    }
    
    

    handleChange = (event) => {
        const { value } = event.target
        this.setState({
            inputValue: value
        })
    }

    hendelChangeKey = ({ key, type }) => {
        if (type === 'keypress' && key !== 'Enter') return

        const { inputValue } = this.state
        const { handleSubmit } = this.props

        handleSubmit(inputValue)
        this.setState({
            inputValue: ''
        })
    }

    componentDidMount(){
        this.inputRef.current.focus();
    }

    render() {

        const { inputValue } = this.state
        const { disabled } = this.props


        return (
            <Col xs={12} md={6} lg={4}>
                <InputGroup className="mb-3">
                    <FormControl
                        type='text'
                        onChange={this.handleChange}
                        onKeyPress={this.hendelChangeKey}
                        placeholder="Task title"
                        value={inputValue}
                        disabled={disabled}
                        ref={this.inputRef}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={this.hendelChangeKey}
                            disabled={!!!inputValue}
                        >
                            Add task
                            </Button>

                    </InputGroup.Append>
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