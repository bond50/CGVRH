import {useEffect, useState} from 'react';
import {withRouter} from 'next/router';
import {signup} from '../../../../actions/auth';
import jwt from 'jsonwebtoken'
import Link from "next/link";


const ActivateAccount = ({router}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        loading: false,
        success: false,
        showButton: true
    });
    const {name, token, error, loading, success, showButton} = values
    useEffect(() => {
        let token = router.query.id
        if (token) {
            const {name} = jwt.decode(token)
            setValues({...values, name, token})
        }

    }, [router])

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values, loading: true, error: ''})
        signup({token}).then((data) => {
            if (data.error) {
                setValues({...values, loading: false, error: data.error, showButton: false})
            } else {
                setValues({...values, loading: false, success: true, showButton: false})
            }

        })


    }
    const showLoading = () => loading ? (<h2>Loading...</h2>) : ('')


    return (
        <div className="container mt-5">
            <h3>Hey {name} ready to activate your account ?</h3>
            {showLoading()}
            {error && error}
            {success && `You have successfully activated your account. Please signin`}
            {showButton && <button className='btn btn-primary mt-4' onClick={clickSubmit}>Activate account</button>}

            {!success && <Link href={`/signup `}>
                <a className={`btn btn-outline-secondary  mx-2 mt-4`}>Back to sign up</a>
            </Link>}
            {success && <Link href={`/signin `}>
                <a className={`btn btn-outline-success btn-sm  mx-2`}> Sign in here</a>
            </Link>}


        </div>

    );
};

export default withRouter(ActivateAccount);