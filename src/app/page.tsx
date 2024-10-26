'use client';

import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

import * as Yup from 'yup';

import { SessionHOCProps, withSessionHOC } from '@/core/components/SessionHOC/sessionHOC';
import BaseForm, { FormikHelpers, FormikValues } from '@/core/components/Form/Form';
import { GlobalContext } from '@/core/context/GlobalContext';

import { Button, Text, Title, Icon, ButtonRef } from '@/components/atoms';
import { InputWithLabel } from '@/components/molecules';

import { authUseCases } from '@/services/AuthService';
import Link from 'next/link';

interface HomeProps extends SessionHOCProps {}

const Home: React.FC<HomeProps> = ({ loading, error, data }) => {
    const { session } = data;

    const { blockUIRef, toastRef } = useContext(GlobalContext);

    const router = useRouter();

    const btnSubmitRef = useRef<ButtonRef>(null);

    useMemo(() => {
        if (session && !error && !loading) {
            blockUIRef.current?.setIsBlocked(true);
        }
    }, [loading, session, error]);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('email is required').email('email is invalid'),
        password: Yup.string().required('password is required').min(4, 'password must be at least 4 characters'),
    });

    const handleLogin = useCallback(async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        const { password, email } = values;

        actions.setSubmitting(true);
        btnSubmitRef.current?.setLoading(true);

        try {
            await authUseCases.login({
                email,
                password,
            });

            actions.setSubmitting(false);
            btnSubmitRef.current?.setLoading(false);

            toastRef.current?.showToast({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successfully',
            });

            router.push('/users');
        } catch {
            actions.setSubmitting(false);
            btnSubmitRef.current?.setLoading(false);

            toastRef.current?.showToast({
                severity: 'error',
                summary: 'Error',
                detail: 'Login failed',
            });
        }
    }, []);

    return (
        <main data-testid="page-login" className="page-login">
            <BaseForm
                initialValues={{
                    email: 'eve.holt@reqres.in',
                    password: 'cityslicka',
                }}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={handleLogin}
                data-testid="page-login-form-testid"
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
                <div className="page-login__form">
                    <div data-testid="page-login-title-testid" className="page-login__form_title">
                        <Icon icon="pi-lock" />
                        <Title variant="h2">Login</Title>
                        <Text variant="fwReg-fs16-gray500">Please fill the login form</Text>
                    </div>

                    <InputWithLabel placeholder="Email" labelText="Email" name="email" type="email" />

                    <InputWithLabel labelText="Senha" name="password" type="password" placeholder="Password" />

                    <Button variant="gradient" type="submit" ref={btnSubmitRef}>
                        Login
                    </Button>
                </div>
            </BaseForm>
            <span>
                dont have account? <Link href={'/register'}>Register</Link>
            </span>
        </main>
    );
};

export default withSessionHOC(Home);
