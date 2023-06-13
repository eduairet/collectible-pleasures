import { PropsWithChildren, createContext, useState, useCallback } from "react";
import axios from "axios";

interface NftContextType {
    nft: string;
    url: string;
    error: string | null;
    isLoading: boolean;
    handleNft: (nft: string) => void;
}

const NftContext = createContext<NftContextType | null>(null),
    NftProvider = (props: PropsWithChildren<{}>) => {
        const [nft, setNft] = useState<string>("NFT"),
            [isLoading, setIsLoading] = useState<boolean>(false),
            [error, setError] = useState<string | null>(null),
            nftFormat = useCallback((nft: string | undefined): string => {
                if (nft) {
                    nft = nft.toUpperCase();
                    if (nft.length < 3) return nft.padEnd(3, ' ');
                    else if (nft.length > 3) return nft.slice(0, 3);
                    return nft;
                }
                return '   ';
            }, []),
            [url, setUrl] = useState<string>(`${process.env.NEXT_PUBLIC_SERVER}?nft=${nftFormat(nft)}`),
            getPreview = useCallback(async (nft: string): Promise<void> => {
                setIsLoading(true);
                setError(null);
                try {
                    const _url = `${process.env.NEXT_PUBLIC_SERVER}?nft=${nftFormat(nft)}`;
                    const response = await axios.get(_url);
                    if (response.status !== 200) throw new Error('There\'s something wrong with your URL');
                    setUrl(_url);
                }
                catch (error) {
                    setError('We couldn\'t get the NFT preview');
                }
                setIsLoading(false);
            }, [nftFormat]),
            handleNft = async (_nft: string): Promise<void> => {
                setNft(_nft);
                await getPreview(_nft);
            };

        return (
            <NftContext.Provider value={{ nft, url, error, isLoading, handleNft }}>
                {props.children}
            </NftContext.Provider>
        );
    };

export { NftContext, NftProvider };
