import Image from 'next/image';

export default function Header() {
    return (
        <header className='container mx-auto flex max-w-600 flex-col items-center justify-start pt-8 sm:pt-12 mb-8'>
            <h2 className='font-thin text-6xl sm:text-7xl text-center antialiased'>
                Collectible
            </h2>
            <Image
                alt='Collectible Pleasures Logo'
                src='/cp.svg'
                width={300}
                height={300}
                className='mt-2'
            />
            <h2 className='font-thin text-5xl sm:text-6xl text-center text-upper antialiased uppercase'>
                Pleasures
            </h2>
        </header>
    );
}
