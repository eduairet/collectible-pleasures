import { useState } from 'react';

export default function NFTForm() {
    const [nftName, setNftName] = useState('NFT'),
        mint = (e: any) => e.preventDefault();

    return (
        <form
            className='w-full max-w-sm flex flex-col gap-6 mt-4 px-3'
            onSubmit={mint}
        >
            <input
                className='text-center text-2xl rounded-md p-2 w-full black text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75'
                type='text'
                value={nftName}
                onChange={e => setNftName(e.target.value)}
            />
            <input
                type='submit'
                value='MINT'
                className='mx-auto w-20 h-20 cursor-pointer rounded-full bg-black text-white border-white border-2 font-semibold hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 ease-in-out duration-300'
            />
        </form>
    );
}
