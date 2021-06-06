import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Nav() {
    const router = useRouter();
    return (
        <nav className="flex flex-row items-center">
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
            <ul className="container flex justify-end font-semibold text-white">
                <li className={router.pathname == "/work" ? "mx-8 mx-8 active" : "mx-8"}>
                    <Link href='/work'>Work</Link>
                </li>
                <li className={router.pathname == "/house" ? "mx-8 active" : "mx-8"}>
                    <Link href='/house'>House</Link>
                </li>
                <li className={router.pathname == "/language" ? "mx-8 active" : "mx-8"}>
                    <Link href='/language'>Language</Link>
                </li>
                <li className={router.pathname == "/culture" ? "mx-8 active" : "mx-8"}>
                    <Link href='/culture'>Culture</Link>
                </li>
                <li className={router.pathname == "/organisations" ? "mx-8 active" : "mx-8"}>
                    <Link href='/organisations'>Organisations</Link>
                </li>
            </ul>   
        </nav>
    );
  }
  