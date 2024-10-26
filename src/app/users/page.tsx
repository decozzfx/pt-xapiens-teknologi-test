/* eslint-disable react/prop-types */
'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';

import { SessionHOCProps, withSessionHOC } from '@/core/components/SessionHOC/sessionHOC';

import { Text } from '@/components/atoms';
import { Header } from '@/components/organism';

import { GlobalContext } from '@/core/context/GlobalContext';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { dataCases, GetAllDataResponseType, UserType } from '@/services/DataService';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { RemoveRedEyeOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface UsersProps extends SessionHOCProps {}

const Users: React.FC<UsersProps> = ({ data }) => {
    const { session } = data;
    const { blockUIRef } = useContext(GlobalContext);
    const router = useRouter();

    const [datatable, setDatatable] = useState<GetAllDataResponseType>();
    console.log('🚀 ~ datatable:', datatable);

    const userList = useMemo(() => {
        return datatable?.data ?? [];
    }, [datatable]);

    const columns = useMemo<MRT_ColumnDef<UserType>[]>(
        () => [
            {
                accessorKey: 'avatar',
                header: 'Avatar',
                size: 150,
                Cell: ({ row }) => <Image src={row.original.avatar} alt="avatar" width={50} height={50} />,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 150,
            },
            {
                accessorKey: 'first_name',
                header: 'First Name',
                size: 150,
            },
            {
                accessorKey: 'last_name',
                header: 'Last Name',
                size: 150,
            },
            {
                header: 'Action',
                Cell: ({ row }) => (
                    <IconButton onClick={() => router.push('/users/' + row.original.id)}>
                        <RemoveRedEyeOutlined />
                    </IconButton>
                ),
            },
        ],

        []
    );

    useEffect(() => {
        blockUIRef.current?.setIsBlocked(false);
    }, []);

    useEffect(() => {
        dataCases.getAllData({ page: 1 }).then((res) => setDatatable(res));
    }, []);

    return (
        <>
            <section className="page-welcome">
                <Header />

                {session && (
                    <main className="page-welcome__content">
                        <div className="page-welcome__content_heading">
                            <Text data-testid="a-text-welcome" variant="fwSb-fs16-primary">
                                DATA LIST
                            </Text>
                        </div>
                        <div className="page-welcome__content_subheading">
                            <MaterialReactTable
                                manualSorting
                                enableColumnActions={false}
                                enableHiding={false}
                                enableDensityToggle={false}
                                enableFullScreenToggle={false}
                                enableGlobalFilter={false}
                                enableFilters={false}
                                enableSorting={false}
                                columns={columns}
                                data={userList}
                                muiTableContainerProps={{ sx: { maxWidth: '900px' } }}
                            />
                        </div>
                    </main>
                )}
            </section>
        </>
    );
};

export default withSessionHOC(Users);
