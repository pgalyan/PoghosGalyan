import React from 'react'
import ContactForm from '../../ContactForm/ContactForm'
// import ContactFormHooks from '../../ContactForm/ContactFormHooks'

class Contact extends React.Component{
    render(){
        return(
            <div>
                <h1>Contact Us</h1>

                <ContactForm />
                {/* <ContactFormHooks /> */}
            </div>
        )
    }
}

export default Contact