import Link from 'next/link';
import classes from '../../../../styles/Logo.module.css'

const Logo = () => <div className={classes.Logo}>

        <a href={`/`}>
            <img src="/logo1.png" alt="logo"/>
        </a>

</div>;

export default Logo;