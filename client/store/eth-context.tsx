import { createContext, PropsWithChildren } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import {
    metaMaskWallet,
    injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ThemeOptions } from '@rainbow-me/rainbowkit/dist/themes/baseTheme';
import { useAccount } from 'wagmi';

const { chains, publicClient } = configureChains(
    [sepolia],
    [
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
    isConnected: boolean,
}

const ETHContext = createContext({
    address: undefined,
    isConnected: false,
} as User);

const ETHProvider = (props: PropsWithChildren) => {
    const { address, isConnected } = useAccount();

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                chains={chains}
                theme={midnightTheme(themeOptions)}
                modalSize="compact"
            >
                <ETHContext.Provider value={{ address, isConnected }}>
                    {props.children}
                </ETHContext.Provider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export { ETHContext, ETHProvider }