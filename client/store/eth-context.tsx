import { createContext, useState, PropsWithChildren } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ThemeOptions } from '@rainbow-me/rainbowkit/dist/themes/baseTheme';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const { NEXT_PUBLIC_SEPOLIA_KEY } = process.env;
const { chains, publicClient } = configureChains(
    [sepolia],
    [
        alchemyProvider({ apiKey: NEXT_PUBLIC_SEPOLIA_KEY || '' }),
        publicProvider()
    ]
);
const { connectors } = getDefaultWallets({
    appName: 'CollectiblePleasures',
    projectId: '...',
    chains
});
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