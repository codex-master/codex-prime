'use client';

import { Toast } from 'primereact/toast';
import { Provider } from 'react-redux';
import { initializeStore } from '@/store/store';
import { useEffect, useRef } from 'react';
import { setToastInstance } from '@/hooks/toast';

interface ReduxProviderProps {
    children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
    const toast = useRef<Toast>(null);
    useEffect(() => {
        setToastInstance(toast.current);
    }, []);

    const store = initializeStore();
    return (
        <Provider store={store}>
            <Toast ref={toast} />
            {children}
        </Provider>
    );
};

export default ReduxProvider;
