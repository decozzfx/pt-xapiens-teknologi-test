import { ACCESS_TOKEN_KEY } from '@/core/services/tokenService';

export const dataCases = {
    getAllData: async ({ page = 1 }): Promise<GetAllDataResponseType> => {
        const token = globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY);
        const response = await fetch('https://reqres.in/api/users?page=' + page, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        return response.json();
    },
    getUser: async (id: string): Promise<GetUserResponseType> => {
        const token = globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY);
        const response = await fetch('https://reqres.in/api/users/' + id, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        return response.json();
    },
};

export interface GetAllDataResponseType {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserType[];
    support: Support;
}

interface Support {
    url: string;
    text: string;
}

export interface UserType {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface GetUserResponseType {
    data: UserType;
    support: Support;
}
