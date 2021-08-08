import Link from 'next/link';
import Image from "next/image";
import classes from '../../styles/Logo.module.css'

const Logo = ({textLogo}) => <div className={classes.Logo}>
    {textLogo ? <Link href={`/`}>
            <h1 className="text-light"><a><span>Home</span></a></h1>
        </Link> :
        <Link href={`/`}>
            <a>
                <Image src="/logo/logo.png" alt="logo" width={90} height={50} className='img-fluid'/>
            </a>
        </Link>}

</div>;

export default Logo;