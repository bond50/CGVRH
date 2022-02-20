import classes from './header-nav.module.css'
import Image from "next/image";
import {isAuth} from "../../../../actions/auth";
import {useEffect, useState} from "react";
import {API} from "../../../../config";

const HeaderNav = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    return (mounted && <div className={`${classes.HeaderNav}`}>
            <div className={classes.IconContainer}>
                <i className={`bi bi-bell ${classes.Icon}`}/>
                <span className={`badge bg-primary ${classes.Badge}`}>4</span>
            </div>
            <div className={classes.IconContainer}>
                <i className={`bi bi-chat-left-text ${classes.Icon}`}/>
                <span className={`badge bg-success ${classes.Badge}`}>3</span>
            </div>

            {isAuth() && <div className={`${classes.Profile}`}>
                    <div className={classes.ProfileImage}>
                        <Image
                        src={`${API}/user/photo/${isAuth() && isAuth().username}`}
                        width={40}
                        height={40}
                        layout="responsive"
                        className={`rounded-circle `}
                    />
                    </div>
                <span className="d-none d-md-block dropdown-toggle ps-2">{isAuth().name}</span>
            </div>}
        </div>
    );
};

export default HeaderNav;