import Image from 'next/image';

export default function Footer() {
    return (
        <footer className='container mx-auto pt-8 pb-16'>
            <p className='flex justify-center items-center gap-3'>
                <span className='font-light border-white border-2 p-2 rounded-md'>
                    Eduardo Aire
                </span>
                <strong>2023</strong>
                <a
                    href='https://github.com/eduairet/collectible-pleasures'
                    target='_blank'
                    rel='noreferrer'
                >
                    <Image
                        alt='GitHub Logo'
                        src='/github.svg'
                        width={30}
                        height={30}
                    />
                </a>
            </p>
        </footer>
    );
}
