import React from 'react'
import { Button } from 'react-bootstrap'

class SingleTask extends React.Component {
    state = {
        singleTask: null
    }


    componentDidMount() {
        const { id } = this.props.match.params
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error

                this.setState({
                    singleTask: data
                })

            })
            .catch(error => {
                console.error("Request error", error)
            })
    }

    deleteSingleTask = () => {
        const id = this.props.match.params.id
        fetch(`http://localhost:3001/task/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.history.push('/')
            })
            .catch(error=>{
                console.error('error', error)
            })
    }

    render() {
        const { singleTask } = this.state

        if (!singleTask) {
            return <div>
                <span>Loading...</span>
            </div>
        }

        return (
            <div>
                <h1>Single Page</h1>

                <div>
                    {singleTask.title}
                </div>
                <div>
                    {singleTask.description}
                </div>
                <div>
                    {singleTask.date}
                </div>

                <Button
                    variant="danger"
                    onClick={() => this.deleteSingleTask()}
                     >Del</Button>
                <Button
                    variant="warning"
                    className="ml-2"
                     >Edit</Button>
            </div >
        )

    }
}

SingleTask.propTypes={
    deleteSingleTask: PropTypes.func.isRequired,
}

export default SingleTask