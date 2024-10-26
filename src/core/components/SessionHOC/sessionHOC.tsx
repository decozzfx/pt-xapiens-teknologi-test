'use client';

import React, { ComponentType, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ACCESS_TOKEN_KEY } from '@/core/services/tokenService';

export interface SessionHOCProps {
    data: {
        session: string;
    };
    error: boolean;
    loading: boolean;
}

export const withSessionHOC = <P extends object>(Component: ComponentType<P & SessionHOCProps>): React.FC<P> => {
    const Wrapper: React.FC<P> = (props) => {
        const token = globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY);

        const router = useRouter();

        useEffect(() => {
            if (!token) {
                router.push('/');
            }
        }, [token]);

        const modifiedProps = {
            ...props,
            data: {
                session: token as string,
            },
            error: false,
            loading: false,
        };

        return <Component {...modifiedProps} />;
    };

    return Wrapper;
};
