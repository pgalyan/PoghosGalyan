import { Modal, Button } from 'react-bootstrap';

const TaskDeleteConfirm = ({ onSubmit, onHide, selectedTasks }) => {

    const handleSubmit = () => {
        onSubmit();
        onHide();
    }
    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want delete {selectedTasks} tasks ? </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
          </Button>
                <Button variant="danger" onClick={handleSubmit}>
                    Confirm
          </Button>
            </Modal.Footer>
        </Modal>
    )


}

export default TaskDeleteConfirm