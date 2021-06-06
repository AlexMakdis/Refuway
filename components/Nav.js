import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Nav() {
    const router = useRouter();

    return (
        <nav className="flex-1 flex justify-between items-center">
            <div className="mr-3">
            <Link href='/' passHref>
            <a>
            <Image
                src="/logo.png"
                alt="logo"
                width={400}
                height={150}
             />
             </a>
             </Link>

            </div>
        <ul className="nav-links flex items-center justify-between font-semibold text-white">
            <li className={router.pathname == "/work" ? "mx-8 text-green font-bold active" : "mx-8"}>
                <Link href='/work'>Work</Link>
            </li>
            <li className={router.pathname == "/house" ? "mx-8 text-green font-bold active" : "mx-8"}>
                <Link href='/house'>House</Link>
            </li>
            <li className={router.pathname == "/language" ? "mx-8 text-green font-bold active" : "mx-8"}>
                <Link href='/language'>Language</Link>
            </li>
            <li className={router.pathname == "/culture" ? "mx-8 text-green font-bold active" : "mx-8"}>
                <Link href='/culture'>Culture</Link>
            </li>
            <li className={router.pathname == "/organisations" ? "mx-8 text-green font-bold active" : "mx-8"}>
                <Link href='/organisations'>Organisations</Link>
            </li>
        </ul>
        <div className="burger" 
            onClick={() => {
                document.querySelector('.nav-links').classList.toggle('nav-active'); 
                document.querySelector('.burger').classList.toggle('toggle'); 
            }}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
        </nav>
    );
  }
  