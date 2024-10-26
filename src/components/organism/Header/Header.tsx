import React, { useRef } from 'react';

import styles from './Header.module.scss';

import useTheme from '@/core/hooks/useTheme';

import { Avatar, Button, Link, Icon } from '@/components/atoms';
import { LogoutDialog, LogoutDialogRef } from '@/components/templates';

const Header: React.FC = () => {
    const logoutDialogRef = useRef<LogoutDialogRef>(null);
    const theme = useTheme();

    return (
        <header data-testid="header" className={styles.header} id="header">
            <Link href="https://github.com/decozzfx">
                <Avatar data-testid="avatar-testid" image="/images/a-avatar.jpeg" label={''} shape="circle" />
            </Link>
            <div className={styles.flex}>
                <Button variant="transparent" onClick={theme.toggleTheme}>
                    <Icon icon="pi-sun" />
                </Button>
                <Button
                    variant="fwMd-fs16-colGray700-bgWhite"
                    data-testid="a-button-logout"
                    onClick={() => logoutDialogRef.current?.setVisible(true)}
                >
                    Logout
                </Button>
            </div>
            <LogoutDialog ref={logoutDialogRef} />
        </header>
    );
};

export default Header;
