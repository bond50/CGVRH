import {useEffect} from 'react';
import Router from 'next/router';
import {isAuth} from '../../actions/auth';

const Private = ({children}) => {
    useEffect(() => {
        if (!isAuth()) {
            Router.push(`/signin`);
        }
    }, []);
    return <div className='container p-5 pb-5'>
        {children}
    </div>;
};

export default Private;