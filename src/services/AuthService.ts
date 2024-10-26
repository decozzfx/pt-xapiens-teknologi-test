import tokenService from '@/core/services/tokenService';

import authAdapter from '@/core/adapters/authAdapter';

import AuthPort from '@/core/ports/authPort';

import { AuthCredentialSchema } from '@/schemas/AuthSchema';

export const authUseCases: AuthPort = {
    login: async ({ email, password }: AuthCredentialSchema) => {
        try {
            const response = await authAdapter.login({ email, password });

            tokenService.save(response.token);

            return response;
        } catch (error) {
            throw error;
        }
    },
    register: async ({ email, password }: AuthCredentialSchema) => {
        try {
            const response = await authAdapter.register({ email, password });
            return response;
        } catch (error) {
            throw error;
        }
    },
};
