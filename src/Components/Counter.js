import React, {Component} from 'react'
import Actions from './Actions'
import Result from './Result'

class Counter extends Component {

    state = {
        count : 0,
    }

    handlePlusCount = (SEvent) => {
        this.setState({
            count:this.state.count + 1
        })
    }

    handleMinusCount = (SEvent) => {
        this.setState({
            count:this.state.count - 1
        })
    }

    render(){

        // const { count } = this.state

        return(
            <div>

                <Result
                count={this.state.count}
                />
                <Actions
                handlePlusCount={this.handlePlusCount} 
                handleMinusCount={this.handleMinusCount}
                />

            </div>
        )
    }

}

export default Counter