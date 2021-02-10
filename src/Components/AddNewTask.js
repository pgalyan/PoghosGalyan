import React from "react";

class AddTask extends React.Component {
    state = {
        inputValue : ''
    }

    handleChange = (event) => {
        const { value } = event.target
        this.setState({
            inputValue: value
        })

    }

    render(){

        const {inputValue} = this.state
        const {handleSubmit} = this.props
        const sub = () =>{
            handleSubmit(inputValue)
            this.setState({
                inputValue: ''
            })
        }

        return(
            <div>
                <input
                onChange={this.handleChange}
                value={inputValue}
                />
                <button
                onClick={sub}
                >
                    ADD
                    </button>
            </div>
        )
    }
}


export default AddTask