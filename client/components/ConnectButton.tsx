import { ConnectButton as RainbowKitConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Button from './Button';

export default function ConnectButton() {
    return (
        <div className='mx-auto my-2'>
            <RainbowKitConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                }) => {
                    const connected = mounted && account && chain;
                    return (
                        <div
                            {...(!mounted && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <Button onClick={openConnectModal}>
                                            Connect
                                        </Button>
                                    );
                                }
                                if (chain.unsupported) {
                                    return (
                                        <Button onClick={openChainModal}>
                                            Wrong network
                                        </Button>
                                    );
                                }
                                return (
                                    <div className='flex items-center gap-2'>
                                        <Button
                                            onClick={openChainModal}
                                        >
                                            {chain.name}
                                        </Button>
                                        <Button onClick={openAccountModal}>
                                            {account.displayName}
                                            {account.displayBalance
                                                ? ` (${account.displayBalance})`
                                                : ''}
                                        </Button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </RainbowKitConnectButton.Custom>
        </div>
    );
}