import React, {useState} from 'react';
import {emailContactForm} from '../../actions/form';
import Alert from "../messages/Alert";
import Button from "../reusables/ui/Button";
import classes from '../../styles/Contact.module.css'

const ContactForm = ({authorEmail, label}) => {
    const [values, setValues] = useState({
        message: '',
        name: '',
        email: '',
        subjectLine:'',
        loading: false,
        showForm: true,
        sent: false,
        buttonText: 'Send Message',
        success: false,
        error: false
    });

    const clickSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true});
        emailContactForm({authorEmail, name, email,subjectLine, message}).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                setValues({
                    ...values,
                    sent: true,
                    name: '',
                    loading: false,
                    showForm: false,
                    email: '',
                    message: '',
                    subjectLine:'',
                    buttonText: 'Sent',
                    success: data.success
                });
            }
        });
    };
    const {message, name, email,subjectLine, loading, success, error} = values;


    let btnText = 'Send Message'
    if (loading) {
        btnText = <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> Sending...</>
    }


    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value, error: false, success: false, buttonText: 'Send Message'});
    };

    const showSuccessMessage = () => success && <div>
        <br/>
        <Alert msg="Your Message has been Sent.Thank you" label='Success' type='success'/>
    </div>


    const showErrorMessage = () => (
        <Alert msg={error} type="danger" label="Danger"/>
    );

    const topData = () => {
        return <div className='row justify-content-center' data-aos='fade-up'>
            <div className='col-lg-10'>
                <div className={classes.Wrap}>
                    <div className="row">

                        <div className={`${classes.Info} col-lg-4`}>
                            <i className='bi bi-geo-alt'/>
                            <h4>Location</h4>
                            <p>Mbale town <br/>Opposite District Headquarters,1069-50300, Maragoli</p>
                        </div>

                        <div className={`${classes.Info} col-lg-4 mt-4 mt-lg-0`}>
                            <i className='bi bi-envelope'/>
                            <h4>Email</h4>
                            <p>vihigahospital@gmail.com</p>
                        </div>

                        <div className={`${classes.Info} col-lg-4 mt-4 mt-lg-0`}>
                            <i className='bi bi-phone'/>
                            <h4>Call us</h4>
                            <p>Phone: +254-723103564 <br/>+254-056-51558
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    }

    const contactForm = () => <div className={`row ${authorEmail ? 'mt-0' : 'mt-5'} justify-content-center`}
                                   data-aos="fade-up" data-aos-once='true'>
        <div className={authorEmail ? '' : 'col-lg-10'}>
            <form onSubmit={clickSubmit} className={authorEmail ? null : classes.Contact}>
                {label && <label className="form-label">{label}</label>}
                <div className="form-group mt-3">
                    <input
                        placeholder="Subject"
                        type="text"
                        onChange={handleChange('subjectLine')}
                        className="form-control"
                        value={subjectLine}

                        required/>
                </div>
                <div className="form-group mt-3">
                    <input
                        placeholder="Your Name"
                        type="text"
                        onChange={handleChange('name')}
                        className="form-control"
                        value={name}
                        required/>
                </div>

                <div className="form-group mt-3">
                    <input
                        placeholder="Your Email"
                        type="email"
                        onChange={handleChange('email')}
                        className="form-control"
                        value={email}
                        required
                    />
                </div>
                <div
                    className="form-group mt-3 mb-3">
                    <textarea
                        rows='5'
                        onChange={handleChange('message')}
                        className="form-control"
                        value={message}
                        required
                    />
                </div>
                {showSuccessMessage()}
                {showErrorMessage()}

                <Button customClass={classes.Btn}
                        type='submit'
                        btnCapture={btnText}
                        loading={loading}/>

            </form>

        </div>
    </div>;

    return (
        <section className={`${classes.Contact}`}>
            {!authorEmail && topData()}
            {contactForm()}
        </section>

    );
};

export default ContactForm;