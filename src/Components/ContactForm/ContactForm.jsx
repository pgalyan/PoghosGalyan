import React from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './ContactForm.module.css'
import { withRouter } from 'react-router-dom';
// import { isRequired, maxLength, minLength, emailValidation, isAllValid } from '../../Helpers/validators'

import actionTypes from '../../Redux/actionTypes'
import { connect } from 'react-redux'


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
    
    hendleSubmit = () => {
        const contactData = { ...this.props.state.contactFormState }

        console.log('contact data', contactData)

        delete contactData.errorMassage

        for (let key in contactData) {
            contactData[key] = contactData[key].value
        }

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
                this.props.contactError(error)

                console.log("catch-error", error)
            })
    }

    componentWillUnmount () {
        this.props.contactStateReset()
    }

    render() {

        const {
            name,
            email,
            message,
            errorMessage,
            addContact
        } = this.props

        const isValid = name.valid && email.valid && message.valid

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
                        onChange={addContact}
                        value={this.props[item.name].value}

                    />
                    <Form.Text className={styles.text} > {this.props[item.name].error}</Form.Text>
                </Form.Group>
            )
        })
        return (
            <div className={styles.form}>


                <Form onSubmit={(e) => e.preventDefault()} >

                    <p style={{ color: "red", textTransform: "uppercase" }}>
                        {errorMessage}
                    </p>

                    {inputs}

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.hendleSubmit}
                        disabled={!isValid}
                    >
                        Send massage
                      </Button>
                </Form>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {
      name,
      email,
      message,
      errorMessage
    } = state.contactFormState
    return {
       name,
       email,
       message,
       errorMessage,
       state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addContact: (event) => {
            dispatch({ type: actionTypes.ADD_CONTACT, event });
        },

        contactError: (error) => {
            dispatch({ type: actionTypes.CONTACT_ERROR, error });
        },

        contactStateReset: (error) => {
            dispatch({ type: actionTypes.CONTACT_STATE_RESET, error });
        },

    }
}


const ContactFormProvider = connect(mapStateToProps, mapDispatchToProps)(ContactForm);


export default withRouter(ContactFormProvider)



