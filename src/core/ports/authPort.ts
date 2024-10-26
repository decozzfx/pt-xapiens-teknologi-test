import { AuthCredentialSchema, AuthResponseSchema, RegisterResponseSchema } from '@/schemas/AuthSchema';

interface AuthPortProps {
    login: (body: AuthCredentialSchema) => Promise<AuthResponseSchema>;
    register: (body: AuthCredentialSchema) => Promise<RegisterResponseSchema>;
}

export default AuthPortProps;
