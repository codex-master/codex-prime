/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const menuAvatarRef = useRef<Menu>(null);
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
        menuAvatar: menuAvatarRef.current
    }));
    const itemTemplateRender = (item: any, options: MenuItemOptions) => {
        return (
            <div className="p-menuitem-content">
                <Link className="flex align-items-center p-menuitem-link" href={item.to}>
                    <span className={item.icon} />
                    <span className="mx-2">{item.label}</span>
                    {item.badge && <Badge className="ml-auto" value={item.badge} />}
                    {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
                </Link>
            </div>
        );
    };
    const items = [
        {
            label: 'My Account',
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    template: itemTemplateRender,
                    badge: 'premium',
                    to: '/'
                },
                {
                    label: 'Billing',
                    template: itemTemplateRender,
                    icon: 'pi pi-credit-card',
                    to: '/billing'
                },
                {
                    label: 'Logout',
                    template: itemTemplateRender,
                    icon: 'pi pi-sign-out',
                    to: '/auth/login'
                }
            ]
        }
    ];
    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>PBIC</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <Button type="button" className="p-link layout-topbar-button" aria-controls="popup_menu_right" aria-haspopup onClick={(event) => menuAvatarRef.current?.toggle(event)}>
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </Button>
                <Menu model={items} popup ref={menuAvatarRef} id="popup_menu_right" popupAlignment="right" />
                <Link href="/documentation">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-palette"></i>
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
