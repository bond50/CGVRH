import Link from 'next/link';
import Image from "next/image";
import classes from '../../../../styles/Logo.module.css'

const Logo = () => <div className={classes.Logo}>

        <Link href={`/`}>
            <a>
                 <Image src="/logo/logo.png" alt="logo" width={90} height={45}/>
            </a>
        </Link>

</div>;

export default Logo;