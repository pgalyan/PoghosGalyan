import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './ContactForm.module.css'
import { withRouter } from 'react-router-dom';
import { isRequired, maxLength, minLength, emailValidation, isAllValid } from '../../Helpers/validators'

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

const ContactFormHooks = (props) => {
    const [formData, setFormData] = useState({
        name: {
            value: "",
            valid: false,
            error: ""
        },
        email: {
            value: "",
            valid: false,
            error: ""
        },
        message: {
            value: "",
            valid: false,
            error: ""
        },
    })

    const [errorMessage , setErrormessage] = useState("")

   const hendleChange = (event) => {
        const { name, value } = event.target
        let error = null
        let valid = true
        const maxLength16 = maxLength(16)
        const minLength2 = minLength(2)
        switch (name) {
            case "name":
            case "email":
            case "message":
                error = isRequired(value) ||
                    (name === "email" && emailValidation(value)) ||
                    minLength2(value) ||
                    maxLength16(value);
                break;
            default: ;
        }

        setFormData({
            ...formData,
            [name]: {
                value,
                valid: !!!error,
                error
            },
        })



        // this.setState({
        //     [name]: {
        //         value,
        //         valid: !!!error,
        //         error
        //     },
        //     isValid: isAllValid(this.state)
        // })

    }


    const hendleSubmit = () => {
        const contactData = { ...formData}

        // delete contactData.errorMassage

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
                props.history.push("/");
            })
            .catch(error => {
                
                setErrormessage({
                    errorMassage: error.massage
                })


                // this.setState({
                //     errorMassage: error.massage
                // })

                console.log("catch-error", error)
            })
    }



    const { name, email, message } = formData

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
                    onChange={hendleChange}
                    value={formData[item.name].value}

                />
                <Form.Text className={styles.text} > {formData[item.name].error}</Form.Text>
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
                    onClick={hendleSubmit}
                    disabled={!isValid}
                >
                    Send massage
                      </Button>
            </Form>

        </div>
    )
}


export default withRouter(ContactFormHooks)



