import React from 'react'
import { Button } from 'react-bootstrap'
import TaskModal from '../../../Components/TaskModal/TaskModal'
import styles from './SingleTask.module.css'

class SingleTask extends React.Component {
    state = {
        singleTask: null,
        isEditModalOpen: false,
    }

    toggleEditModal = () => {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen
        })
    }

    hendleGoBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        const { id } = this.props.match.params
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error

                this.setState({
                    singleTask: data,
                })

            })
            .catch(error => {
                console.error("Request error", error)
                this.props.history.push('/')
            })
    }

    hendleEditTask = (formData) => {
        fetch("http://localhost:3001/task/" + formData._id, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log('data',data);
                if (data.error) {
                    throw data.error
                }

                this.setState({
                    singleTask: data
                })
            })
            .catch(error => {
                console.log('error', error);

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
            .catch(error => {
                console.error('error', error)
            })
    }

    render() {
        const { singleTask, isEditModalOpen } = this.state

        if (!singleTask) {

            return <div>
                <span>Loading...</span>
            </div>
        }

        return (
            <>
                <div className={styles.task}>
                    <h1>Single Page</h1>

                    <div>
                        <Button
                            onClick={this.hendleGoBack}
                        >
                            Go back
                        </Button>
                    </div>

                    <div className={styles.taskBody}>
                        <div>
                            <h4>Title</h4> {singleTask.title}
                        </div>
                        <div>
                            <h4>Description</h4> {singleTask.description}
                        </div>
                        <div>
                            <h4>Date</h4> {singleTask.date}
                        </div>
                        <div>
                            <h4>Created at</h4> {singleTask.created_at}
                        </div>
                    </div>
                    <div>
                        <Button
                            variant="danger"
                            onClick={() => this.deleteSingleTask()}
                        >
                            Del
                </Button>
                        <Button
                            variant="warning"
                            className="ml-2"
                            onClick={this.toggleEditModal}
                        >
                            Edit
                 </Button>
                    </div>



                </div >
                {
                    isEditModalOpen && <TaskModal
                        editTaskData={singleTask}
                        onHide={this.toggleEditModal}
                        onSubmit={this.hendleEditTask}
                        AddNewTask={false}
                    />
                }
            </>
        )
    }
}

// SingleTask.propTypes={
//     deleteSingleTask: propTypes.func,
// }

export default SingleTask