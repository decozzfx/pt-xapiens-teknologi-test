import { AxiosResponse } from 'axios';

import AuthPortProps from '../ports/authPort';

import httpMiddleware from '../middleware/HttpMiddleware';

import { AuthResponseSchema, AuthUserSchema, RegisterResponseSchema } from '@/schemas/AuthSchema';

const authAdapter: AuthPortProps = {
    login: async ({ email, password }) => {
        const method = 'POST';

        const url = 'https://reqres.in/api/login';

        try {
            const response: AxiosResponse<AuthResponseSchema> = await httpMiddleware({
                method,
                url,
                body: {
                    email,
                    password,
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    register: async ({ email, password }) => {
        const method = 'POST';

        const url = 'https://reqres.in/api/register';

        try {
            const response: AxiosResponse<RegisterResponseSchema> = await httpMiddleware({
                method,
                url,
                body: {
                    email,
                    password,
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    me: async (token: string) => {
        const method = 'GET';

        const url = 'https://reqres.in/users/me';

        try {
            const response: AxiosResponse<AuthUserSchema> = await httpMiddleware({ method, url, token });

            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default authAdapter;
