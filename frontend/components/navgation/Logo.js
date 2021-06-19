import Link from 'next/link';

const Logo = () => <div className="logo">
    <Link href={`/`}>
        <a className='img-fluid'><img src="/logo1.png" alt="logo"/> </a>
    </Link>
</div>;

export default Logo;