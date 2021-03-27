import { createContext, useState } from 'react';
import {
    isRequired, maxLength, minLength, emailValidation, isAllValid } from '../Helpers/validators';
import { withRouter } from 'react-router-dom';

export const ContactContext = createContext();

const ContactContextProvider = (props) => {
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

                console.log("catch-error", error)
            })
    }

    return <ContactContext.Provider
        value={
            {
                errorMessage,
                formData,
                hendleChange,
                hendleSubmit
            }
        }
    >
        {props.children}
    </ContactContext.Provider>
}


export default withRouter(ContactContextProvider);