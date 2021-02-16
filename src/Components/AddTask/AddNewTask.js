import React from "react"
import { InputGroup, Button, FormControl, Col } from 'react-bootstrap'

class AddTask extends React.Component {
    state = {
        inputValue: ''
    }

    handleChange = (event) => {
        const { value } = event.target
        this.setState({
            inputValue: value
        })
    }

    render() {

        const { inputValue } = this.state
        const { handleSubmit } = this.props
        const sub = () => {
            handleSubmit(inputValue)
            this.setState({
                inputValue: ''
            })
        }

        return (
            <Col xs={12} md={6} lg={4}>
                <InputGroup className="mb-3" onChange={this.handleChange}>
                    <FormControl
                        placeholder="Task title"
                        value={inputValue}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary"  onClick={sub}>Add task</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        )
    }
}


export default AddTask