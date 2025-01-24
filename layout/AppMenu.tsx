/* eslint-disable @next/next/no-img-element */

import React, { useContext, useReducer, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';
import { Badge } from 'primereact/badge';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [expandedKeys, setExpandedKeys] = useState<{ [key: string]: boolean }>({ '/': true });
    const itemRenderer = (item: any, options: MenuItemOptions) => {
        return (
            <Link href={item.to || item.url || '#'} target={item.target} className="flex align-items-center px-3 py-3 cursor-pointer" onClick={() => setExpandedKeys({ ...expandedKeys, [item.key]: true })}>
                {item.items ? <span className={`pi pi-angle-${expandedKeys ? (expandedKeys[item.key] == true ? 'down' : 'right') : 'right'}`} /> : ''}
                <span className={`${item.icon} text-primary`} />
                <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto  surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </Link>
        );
    };
    const model = [
        {
            label: 'Home',
            template: itemRenderer,
            key: '/',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', template: itemRenderer, to: '/', key: '/dashboard' }]
        },
        {
            label: 'UI Components',
            template: itemRenderer,
            key: '/uikit',
            items: [
                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', template: itemRenderer, to: '/uikit/formlayout', key: '/uikit/formlayout' },
                { label: 'Form Validation', icon: 'pi pi-fw pi-verified', template: itemRenderer, to: '/uikit/formvalidation', key: '/uikit/formvalidation' },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', template: itemRenderer, to: '/uikit/input', key: '/uikit/input' },
                { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', template: itemRenderer, to: '/uikit/floatlabel', key: '/uikit/floatlabel' },
                { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', template: itemRenderer, to: '/uikit/invalidstate', key: '/uikit/invalidstate' },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', template: itemRenderer, to: '/uikit/button', class: 'rotated-icon', key: '/uikit/button' },
                { label: 'Table', icon: 'pi pi-fw pi-table', template: itemRenderer, to: '/uikit/table', key: '/uikit/table' },
                { label: 'List', icon: 'pi pi-fw pi-list', template: itemRenderer, to: '/uikit/list', key: '/uikit/list' },
                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', template: itemRenderer, to: '/uikit/tree', key: '/uikit/tree' },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', template: itemRenderer, to: '/uikit/panel', key: '/uikit/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', template: itemRenderer, to: '/uikit/overlay', key: '/uikit/overlay' },
                { label: 'Media', icon: 'pi pi-fw pi-image', template: itemRenderer, to: '/uikit/media', key: '/uikit/media' },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', template: itemRenderer, to: '/uikit/menu', preventExact: true, key: '/uikit/menu' },
                { label: 'Message', icon: 'pi pi-fw pi-comment', template: itemRenderer, to: '/uikit/message', key: '/uikit/message' },
                { label: 'File', icon: 'pi pi-fw pi-file', template: itemRenderer, to: '/uikit/file', key: '/uikit/file' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', template: itemRenderer, to: '/uikit/charts', key: '/uikit/charts' },
                { label: 'Misc', icon: 'pi pi-fw pi-circle', template: itemRenderer, to: '/uikit/misc', key: '/uikit/misc' }
            ]
        },
        {
            label: 'Prime Blocks',
            template: itemRenderer,
            key: '/prime-blocks',
            items: [
                {
                    label: 'Free Blocks',
                    icon: 'pi pi-fw pi-eye',
                    template: itemRenderer,
                    to: '/blocks',
                    key: '/blocks',
                    badge: 'NEW'
                },
                { label: 'All Blocks', template: itemRenderer, icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank', key: 'blocks.primereact' }
            ]
        },
        {
            label: 'Utilities',
            key: '/utilities',
            template: itemRenderer,
            items: [
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', template: itemRenderer, to: '/utilities/icons', key: '/utilities/icons' },
                { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank', key: 'primeflex.org' }
            ]
        },
        {
            label: 'Pages',
            key: '/pages',
            template: itemRenderer,
            icon: 'pi pi-fw pi-briefcase',
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    template: itemRenderer,
                    to: '/landing',
                    key: '/landing'
                },
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    template: itemRenderer,
                    key: '/auth',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            template: itemRenderer,
                            to: '/auth/login',
                            key: '/auth/login'
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            template: itemRenderer,
                            to: '/auth/error',
                            key: '/auth/error'
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            template: itemRenderer,
                            to: '/auth/access',
                            key: '/auth/access'
                        }
                    ]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    template: itemRenderer,
                    to: '/pages/crud',
                    key: '/pages/crud'
                },
                {
                    label: 'Timeline',
                    icon: 'pi pi-fw pi-calendar',
                    template: itemRenderer,
                    to: '/pages/timeline',
                    key: '/pages/timeline'
                },
                {
                    label: 'Not Found',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    template: itemRenderer,
                    to: '/pages/notfound',
                    key: '/pages/notfound'
                },
                {
                    label: 'Empty',
                    icon: 'pi pi-fw pi-circle-off',
                    template: itemRenderer,
                    to: '/pages/empty',
                    key: '/pages/empty'
                }
            ]
        },
        {
            label: 'Demo',
            template: itemRenderer,
            key: '/demo',
            items: [
                { label: 'Table', icon: 'pi pi-table pi-prime', template: itemRenderer, to: '/demo/table', key: '/demo/table' },
                { label: 'DataScroller', icon: 'pi pi-sort pi-prime', template: itemRenderer, to: '/demo/datascroller', key: '/demo/datascroller' }
            ]
        },
        {
            label: 'Hierarchy',
            key: '/hierarchy',
            template: itemRenderer,
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-bookmark',
                    template: itemRenderer,
                    key: '/submenu-1',
                    items: [
                        {
                            label: 'Submenu 1.1',
                            template: itemRenderer,
                            icon: 'pi pi-fw pi-bookmark',
                            key: '/submenu-1-1',
                            items: [
                                { label: 'Submenu 1.1.1', template: itemRenderer, icon: 'pi pi-fw pi-bookmark', key: '/submenu-1-1-1' },
                                { label: 'Submenu 1.1.2', template: itemRenderer, icon: 'pi pi-fw pi-bookmark', key: '/submenu-1-1-2' },
                                { label: 'Submenu 1.1.3', template: itemRenderer, icon: 'pi pi-fw pi-bookmark', key: '/submenu-1-1-3' }
                            ]
                        },
                        {
                            label: 'Submenu 1.2',
                            key: '/submenu-1-2',
                            template: itemRenderer,
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark', template: itemRenderer, key: '/submenu-1-2-1' }]
                        }
                    ]
                },
                {
                    label: 'Submenu 2',
                    template: itemRenderer,
                    icon: 'pi pi-fw pi-bookmark',
                    key: '/submenu-2',
                    items: [
                        {
                            label: 'Submenu 2.1',
                            template: itemRenderer,
                            key: '/submenu-2-1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', template: itemRenderer, icon: 'pi pi-fw pi-bookmark', key: '/submenu-2-1-1' },
                                { label: 'Submenu 2.1.2', template: itemRenderer, icon: 'pi pi-fw pi-bookmark', key: '/submenu-2-1-2' }
                            ]
                        },
                        {
                            label: 'Submenu 2.2',
                            icon: 'pi pi-fw pi-bookmark',
                            template: itemRenderer,
                            key: '/submenu-2-2',
                            items: [{ label: 'Submenu 2.2.1', template: itemRenderer, icon: 'pi pi-fw pi-bookmark', key: '/submenu-2-2-1' }]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Get Started',
            template: itemRenderer,
            key: '/get-started',
            items: [
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-question',
                    template: itemRenderer,
                    to: '/documentation',
                    key: '/documentation'
                },
                {
                    label: 'Figma',
                    url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/pbic-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                    icon: 'pi pi-fw pi-pencil',
                    template: itemRenderer,
                    target: '_blank'
                },
                {
                    label: 'View Source',
                    icon: 'pi pi-fw pi-search',
                    url: 'https://github.com/primefaces/pbic-react',
                    template: itemRenderer,
                    target: '_blank'
                }
            ]
        }
    ];
    return (
        <MenuProvider>
            <PanelMenu model={model} expandedKeys={expandedKeys} onExpandedKeysChange={setExpandedKeys} />
            {/*  <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer', key:"" /}}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link>
            </ul> */}
        </MenuProvider>
    );
};

export default AppMenu;
