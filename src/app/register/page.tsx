'use client';

import React, { useCallback, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';

import * as Yup from 'yup';

import BaseForm, { FormikHelpers, FormikValues } from '@/core/components/Form/Form';
import { GlobalContext } from '@/core/context/GlobalContext';

import { Button, Text, Title, Icon, ButtonRef } from '@/components/atoms';
import { InputWithLabel } from '@/components/molecules';

import { authUseCases } from '@/services/AuthService';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
    const { toastRef } = useContext(GlobalContext);

    const router = useRouter();

    const btnSubmitRef = useRef<ButtonRef>(null);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('email is required').email('email is invalid'),
        password: Yup.string().required('password is required').min(4, 'password must be at least 4 characters'),
    });

    const handleRegister = useCallback(async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        const { password, email } = values;

        actions.setSubmitting(true);
        btnSubmitRef.current?.setLoading(true);

        try {
            await authUseCases.register({
                email,
                password,
            });

            actions.setSubmitting(false);
            btnSubmitRef.current?.setLoading(false);

            toastRef.current?.showToast({
                severity: 'success',
                summary: 'Success',
                detail: 'Register successfully',
            });

            router.push('/');
        } catch {
            actions.setSubmitting(false);
            btnSubmitRef.current?.setLoading(false);

            toastRef.current?.showToast({
                severity: 'error',
                summary: 'Error',
                detail: 'Register failed',
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
                onSubmit={handleRegister}
                data-testid="page-login-form-testid"
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
                <div className="page-login__form">
                    <div data-testid="page-login-title-testid" className="page-login__form_title">
                        <Icon icon="pi-lock" />
                        <Title variant="h2">Register</Title>
                        <Text variant="fwReg-fs16-gray500">Please fill the register form</Text>
                    </div>

                    <InputWithLabel placeholder="Email" labelText="Email" name="email" type="email" />

                    <InputWithLabel labelText="Senha" name="password" type="password" placeholder="Password" />

                    <Button variant="gradient" type="submit" ref={btnSubmitRef}>
                        Register
                    </Button>
                </div>
            </BaseForm>
        </main>
    );
};

export default Register;
