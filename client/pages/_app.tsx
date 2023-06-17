import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NftProvider } from '@/store/nft-context';
import { ETHProvider } from '@/store/eth-context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ETHProvider>
      <NftProvider>
        <Component {...pageProps} />
      </NftProvider>
    </ETHProvider>
  )
}
