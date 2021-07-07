import Link from 'next/link';
import classes from '../../../../styles/Logo.module.css'

const Logo = () => <div className={classes.Logo}>
    <Link href={`/`}>
        <a>
            <img src="/logo1.png" alt="logo"/>
        </a>
    </Link>
</div>;

export default Logo;