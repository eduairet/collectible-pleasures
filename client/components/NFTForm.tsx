import { useCallback, useContext } from 'react';
import { NftContext } from '@/store/nft-context';
import { ETHContext } from '@/store/eth-context';
import Preview from '@/components/Preview';

export default function NFTForm() {
    const nftCtx = useContext(NftContext),
        ethCtx = useContext(ETHContext),
        handleMint = useCallback(async () => {
            console.log(!ethCtx?.address);
            console.log('Minting...');
        }, []);

    return (
        <form
            className='w-full max-w-sm flex flex-col gap-6 mt-4 px-3'
            onSubmit={e => {
                e.preventDefault();
                handleMint();
            }}
        >
            <div className='flex flex-col'>
                <label htmlFor='nft' className='text-center text-lg'>
                    Type your 3 letter NFT name
                </label>
                <p className='text-center text-sm italic'>(A-Z letters and space only)</p>
            </div>
            <input
                id='nft'
                className='text-center text-2xl rounded-md p-2 w-full black text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75'
                type='text'
                minLength={1}
                maxLength={3}
                value={nftCtx?.nft}
                onChange={e => {
                    nftCtx?.handleNft(e.target.value);
                }}
            />
            <Preview />
            <input
                type='submit'
                value='MINT'
                disabled={!ethCtx?.address}
                className='mx-auto w-20 h-20 cursor-pointer rounded-full bg-black text-white border-white border-2 font-semibold hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 ease-in-out duration-300'
            />
        </form>
    );
}
