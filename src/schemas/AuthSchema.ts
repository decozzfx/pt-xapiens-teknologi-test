export interface AuthCredentialSchema {
    email: string;
    password: string;
}

export interface AuthUserSchema {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponseSchema {
    token: string;
}
export interface RegisterResponseSchema {
    id: string;
    token: string;
}
