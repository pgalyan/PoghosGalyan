import React from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './ContactForm.module.css'
import { withRouter } from 'react-router-dom';

const inputsInfo = [
    {
        name: "name",
        controlId: "formBasicName",
        label: "Name",
        type: "text",
    },
    {
        name: "email",
        controlId: "formBasicEmail",
        label: "Email",
        type: "email",
    },
    {
        name: "message",
        controlId: "textareaForContactPage",
        label: "Message",
        as: "textarea",
        rows: 3,
        maxLength: 100,
    },

]

class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    hendleChange = (event) => {
        const { name, value } = event.target
        // console.log('name', name)
        // console.log('value', value)
        this.setState({
            [name]: value
        })

    }


    hendleSubmit = () => {
        const contactData = { ...this.state }

        fetch('http://localhost:3001/form', {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.history.push("/");
            })
            .catch(error => {
                console.log("catch-error", error)
            })
    }




    render() {
        const inputs = inputsInfo.map((item, index) => {
            return (
                <Form.Group
                    controlId={item.controlId}
                    key={index}
                >
                    <Form.Label>{item.label}</Form.Label>
                    <Form.Control

                        name={item.name}
                        type={item.type}
                        as={item.as}
                        placeholder={item.label}
                        onChange={this.hendleChange}

                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
            )
        })
        return (
            <div className={styles.form}>


                <Form onSubmit={(e) => e.preventDefault()} >

                    {inputs}

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.hendleSubmit}
                    >
                        Send massage
                      </Button>
                </Form>

          </div>
        )
    }


}


export default withRouter(ContactForm)



