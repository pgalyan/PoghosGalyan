import React from 'react'
import ContactForm from '../../ContactForm/ContactForm'

class Contact extends React.Component{
    render(){
        return(
            <div>
                <h1>Contact Us</h1>

                <ContactForm />
            </div>
        )
    }
}

export default Contact