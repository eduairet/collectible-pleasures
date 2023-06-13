import { useContext } from "react";
import { NftContext } from '@/store/NFTContext'
import Error from "./Error";
import PreviewSpinner from "./PreviewSpinner";

export default function Preview() {
    const nftCtx = useContext(NftContext);

    return (
        <div style={{ width: '350px', height: '350px' }} className="flex flex-col items-center justify-center container mx-auto">
            {nftCtx ? (nftCtx.isLoading && !nftCtx.error ? <PreviewSpinner /> : nftCtx.error && !nftCtx.isLoading ? <Error errorMessage={nftCtx.error} /> :
                <object width="350" height="350" data={nftCtx.url}>
                </object>) : null}
        </div>
    );
}