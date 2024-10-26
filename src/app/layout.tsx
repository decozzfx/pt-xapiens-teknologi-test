import React from 'react';

import { Inter } from 'next/font/google';

import { PrimeReactProvider } from 'primereact/api';

import '../styles/theme.scss';


import GlobalContextProvider from '@/core/context/GlobalContext';

const inter = Inter({
    subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className={inter.className}>
            <link rel="icon" href="/images/lock.svg" sizes="any" />
            <body>
                <PrimeReactProvider value={{ ripple: false }}>
                    <GlobalContextProvider>{children}</GlobalContextProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
