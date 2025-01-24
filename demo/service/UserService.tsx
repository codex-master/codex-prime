import { Demo } from '@/types';
import { DataScrollerLazyLoadEvents } from 'primereact/datascroller';

export const UserService = {
    async register(prevState: any, queryData: any) {
        const formData = { email: queryData.get('email'), password: queryData.get('password') };
        console.log({ prevState, queryData, formData });
        const data = await fetch(`https://reqres.in/api/register`, {
            headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((data: { id: number; token: string }) => {
                return data;
            })
            .catch((err ) => {
                return err;
            });
        return data;
    },

    register2(prevState: any, data: Demo.User): Promise<{ id: number; token: string } & { error: string }> {
        return fetch(`https://reqres.in/api/register`, {
            headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            })
            .catch((err: { error: string }) => {
                return err;
            });
    }
};
