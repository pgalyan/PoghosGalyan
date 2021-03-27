import {  useContext} from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './ContactForm.module.css'
import { withRouter } from 'react-router-dom';
// import { isRequired, maxLength, minLength, emailValidation, isAllValid } from '../../Helpers/validators'


import { ContactContext } from '../../Context/ContactPageContext';

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

const ContactFormHooks = () => {

    const context = useContext(ContactContext);
    const {
        errorMessage,
        formData,
        hendleChange,
        hendleSubmit
    } = context;
    

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



