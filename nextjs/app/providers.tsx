'use client';

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { config } from './config/wagmi';
import { sepolia } from 'wagmi/chains';
import { useTheme } from 'next-themes';

const queryClient = new QueryClient();

function RainbowKitProviderWrapper({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <RainbowKitProvider 
            initialChain={sepolia} 
            modalSize="compact"
            theme={theme === 'dark' ? 
                darkTheme({
                    accentColor: '#000000',
                    accentColorForeground: 'white',
                    borderRadius: 'medium',
                    overlayBlur: 'small',
                }) :
                lightTheme({
                    accentColor: '#000000',
                    accentColorForeground: 'white',
                    borderRadius: 'medium',
                    overlayBlur: 'small',
                })
            }
        >
            {children}
        </RainbowKitProvider>
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProviderWrapper>
                    {children}
                </RainbowKitProviderWrapper>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
