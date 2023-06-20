import { createContext, PropsWithChildren } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import {
    metaMaskWallet,
    injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia, polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ThemeOptions } from '@rainbow-me/rainbowkit/dist/themes/baseTheme';
import { useAccount, useNetwork, Chain } from 'wagmi';

const { chains, publicClient } = configureChains(
    [polygon, sepolia],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_POLYGON_KEY || '' }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_SEPOLIA_KEY || '' }),
        publicProvider()
    ]
);
const connectors = connectorsForWallets([{
    groupName: 'Collectible Pleasures',
    wallets: [
        metaMaskWallet({ chains, projectId: 'CollectiblePleasures' }),
        injectedWallet({ chains }),
    ],
}]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})
const themeOptions: ThemeOptions = {
    accentColor: '#101010',
    accentColorForeground: 'white',
    borderRadius: 'small',
    fontStack: 'system',
    overlayBlur: 'small',
}

interface User {
    address: `0x${string}` | undefined,
    chain: Chain | undefined,
    isConnected: boolean,
}

const ETHContext = createContext({
    address: undefined,
    chain: undefined,
    isConnected: false,
} as User);

const ETHProvider = (props: PropsWithChildren) => {
    const { address, isConnected } = useAccount(),
        { chain } = useNetwork();

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                chains={chains}
                theme={midnightTheme(themeOptions)}
                modalSize="compact"
            >
                <ETHContext.Provider value={{ address, chain, isConnected }}>
                    {props.children}
                </ETHContext.Provider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export { ETHContext, ETHProvider }