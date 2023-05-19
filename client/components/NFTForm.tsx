import { useState } from 'react';

export default function NFTForm() {
    const [nftName, setNftName] = useState('NFT'),
        mint = (e: any) => e.preventDefault();

    return (
        <form className='flex flex-col gap-2 mt-4' onSubmit={mint}>
            <input
                className='border-2 border-gray-300 rounded-lg p-2 w-full black'
                type='text'
                placeholder='Enter NFT Name'
                value={nftName}
                onChange={e => setNftName(e.target.value)}
            />
            <input
                type='submit'
                value='Mint NFT'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            />
        </form>
    );
}
