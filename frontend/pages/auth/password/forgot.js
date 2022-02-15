import {useState} from 'react';
import {forgotPassword} from '../../../actions/auth';
import Layout from "../../../hoc/Layout";
import Alert from "../../../components/messages/Alert";


const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });


    const {email, message, error, showForm} = values;

    const handleChange = name => e => {
        setValues({...values, message: '', error: '', [name]: e.target.value});
    };

    const handleSubmit = e => {

        e.preventDefault();
        setValues({...values, message: '', error: ''});
        forgotPassword({email}).then(data => {

            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, message: data.message, email: '', showForm: false});
            }
        });
    };


    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group ">
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control mb-3"
                    value={email}
                    placeholder="Type your email"
                    required
                />
            </div>
            <div className='mb-3'>
                <button className="btn btn-primary">Send password reset link</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="container mt-5">
                <h2>Forgot password</h2>
                <hr/>
                <Alert msg={error} type='danger' label='Danger'/>
                <Alert msg={message} type='success' label='Success'/>

                {showForm && passwordForgotForm()}
            </div>
        </Layout>
    );
};

export default ForgotPassword;