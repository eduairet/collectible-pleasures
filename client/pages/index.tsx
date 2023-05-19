import Image from 'next/image';
import { Inter } from 'next/font/google';
import NFTForm from '../components/NFTForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <Image
                alt='Collectible Pleasures Logo'
                src='/cp.svg'
                width={200}
                height={200}
            ></Image>
            <h1>Collectible Pleasures</h1>
            <NFTForm />
        </main>
    );
}
