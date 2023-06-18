import { useCallback, useState, useContext, useEffect, FormEventHandler, MouseEventHandler } from 'react';
import axios from 'axios';
import { NftContext } from '@/store/nft-context';
import { ETHContext } from '@/store/eth-context';
import Preview from '@/components/Preview';
import ErrorDialog from '@/components/ErrorDialog';
import BigSpinner from '@/components/BigSpinner';
import TxModal from '@/components/TxModal';
import { mintNFT } from '@/utils/mintNFT';

export default function NFTForm() {
    const nftCtx = useContext(NftContext),
        ethCtx = useContext(ETHContext),
        { isConnected, address } = ethCtx,
        [isDisabled, setIsDisabled] = useState<boolean>(true),
        [mintError, setMintError] = useState<string | null>(null),
        [isMinting, setIsMinting] = useState<boolean>(false),
        [hashUrl, setHashUrl] = useState<`https://${string}` | null>(null),
        handleMint: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
            e.preventDefault();
            setMintError(null);
            setIsMinting(true);
            try {
                const { data } = await axios.post('api/mint', {
                    nft: nftCtx?.nft,
                })
                if (data.success && address) {
                    const hash = await mintNFT(data.url);
                    setHashUrl(`${process.env.NEXT_PUBLIC_EXPLORER}tx/${hash}` as `https://${string}`);
                }
            } catch (_: any) {
                setMintError('We couldn\'t mint your NFT, please refresh the page and try again!');
            }
            setIsMinting(false);
        }, [nftCtx?.nft, address]),
        handleClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = useCallback(() => {
            setHashUrl(null);
        }, []);

    useEffect(() => {
        setIsDisabled(!isConnected);
    }, [isConnected]);

    return (
        <>
            <form
                className='relative w-full max-w-sm flex flex-col gap-6 mt-4 px-3'
                onSubmit={handleMint}
            >
                <div className='flex flex-col'>
                    <label htmlFor='nft' className='text-center text-lg'>
                        Type your 3 letter NFT name
                    </label>
                    <p className='text-center text-sm italic'>(A-Z letters and space only)</p>
                </div>
                <input
                    id='nft'
                    className={`
                    text-center
                    text-2xl
                    rounded-md
                    p-2
                    w-full
                    bg-black
                    border-2
                    border-white
                    text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-white
                    focus:ring-opacity-75
                `}
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
                    value={isMinting ? 'WAIT' : 'MINT'}
                    disabled={isDisabled || isMinting}
                    className={`
                    mx-auto w-20
                    h-20
                    cursor-pointer
                    rounded-full
                    bg-black
                    text-white
                    border-white
                    border-2
                    font-semibold
                    hover:bg-white
                    hover:text-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-white
                    focus:ring-opacity-75
                    ease-in-out duration-300
                    disabled:opacity-50
                    disabled:bg-black
                    disabled:text-white
                    disabled:cursor-not-allowed
                `}
                />
                {mintError && <ErrorDialog errorMessage={mintError} />}
                {isMinting ? <BigSpinner action='Minting...' /> : null}
            </form>
            {hashUrl ? <TxModal title='Successfully Minted!' url={hashUrl} onClose={handleClose} /> : null}
        </>
    );
}
