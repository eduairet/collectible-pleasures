import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function NFTForm() {
    const [nftName, setNftName] = useState('NFT'),
        mint = (e: any) => e.preventDefault(),
        getPreview = useCallback(async () => {
            const { data } = await axios.get(`/api/preview`, {
                params: {
                    nft: nftName || '   ',
                },
            });
            return data;
        }, [nftName]),
        handleMint = useCallback(async (e: Event) => {
            e.preventDefault();
            console.log('Minting...');
        }, []);

    useEffect(() => {
        getPreview();
    }, [getPreview]);

    return (
        <form
            className='w-full max-w-sm flex flex-col gap-6 mt-4 px-3'
            onSubmit={handleMint}
        >
            <label htmlFor='nft' className='text-center text-lg'>
                Type your 3 letter NFT name
            </label>
            <input
                id='nft'
                className='text-center text-2xl rounded-md p-2 w-full black text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75'
                type='text'
                minLength={1}
                maxLength={3}
                value={nftName}
                onChange={e => {
                    setNftName(e.target.value);
                    getPreview();
                }}
            />
            <input
                type='submit'
                value='MINT'
                className='mx-auto w-20 h-20 cursor-pointer rounded-full bg-black text-white border-white border-2 font-semibold hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 ease-in-out duration-300'
            />
        </form>
    );
}
