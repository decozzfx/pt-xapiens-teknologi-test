'use client';
import { Text } from '@/components/atoms';
import { Header } from '@/components/organism';
import { dataCases, UserType } from '@/services/DataService';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

const UserDetail = () => {
    const [user, setUser] = React.useState<UserType>();
    const { id } = useParams();

    useEffect(() => {
        dataCases.getUser(id as string).then((response) => {
            setUser(response.data);
        });
    }, []);

    return (
        <section className="page-welcome">
            <Header />
            <Text data-testid="a-text-welcome" variant="fwSb-fs16-primary">
                USER DETAIL
            </Text>

            <div className="page-welcome__content">
                <div className="page-welcome__content_body">
                    <div className="page-welcome__content_body__avatar">
                        <Image width={100} height={100} src={user?.avatar as string} alt="avatar" />
                    </div>
                    <div className="page-welcome__content_body__detail">
                        <Text variant="fwSb-fs16-primary">First Name: {user?.first_name}</Text>
                        <Text variant="fwSb-fs16-primary">Last Name: {user?.last_name}</Text>
                        <Text variant="fwSb-fs16-primary">Email: {user?.email}</Text>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserDetail;
