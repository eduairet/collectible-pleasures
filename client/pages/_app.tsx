import '@/styles/globals.css';
import { NftProvider } from '@/store/NFTContext';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <NftProvider><Component {...pageProps} /></NftProvider>
}
