import { useContext } from "react";
import { NftContext } from '@/store/nft-context'
import Error from "./Error";
import PreviewSpinner from "./PreviewSpinner";

export default function Preview() {
    const nftCtx = useContext(NftContext);

    return (
        <div className="w-full h-[350px] mx-auto flex flex-col items-center justify-center container overflow-hidden rounded-lg">
            {nftCtx ? (nftCtx.isLoading && !nftCtx.error ? <PreviewSpinner /> : nftCtx.error && !nftCtx.isLoading ? <Error errorMessage={nftCtx.error} /> :
                <object width="350" height="350" data={nftCtx.url}>
                </object>) : null}
        </div>
    );
}