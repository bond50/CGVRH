import classes from './logo.module.css'
import Link from 'next/link'

import Image from "next/image";

const Logo = ({clicked}) => {
    return (
        <div className={classes.Logo}>
            <Link href={`/user`}>
                <a className={classes.Link}>
                    <Image src={`/logo/logo.png`} alt="logo" width={298} height={165}/>
                    <span
                        className="d-none d-lg-block">
                        Dashboard
                        {/*{isAuth() && isAuth().role === 1 ? 'HospitalAdmin' : `${isAuth() && isAuth().username}'s Dash`}*/}
                    </span>
                </a>
            </Link>
            <i className={`bi bi-list ${classes.Icon}`} onClick={clicked}/>
        </div>
    );
};

export default Logo;