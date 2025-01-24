import { Demo } from '@/types';

export const CustomerService = {
    getCustomersMedium() {
        return fetch('/demo/data/customers-medium.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Customer[]);
    },

    getCustomersLarge() {
        return fetch('/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Customer[]);
    },

    getCustomers(params?: any): Promise<{ totalRecords: number; data: Demo.Customer[] }> {
        const queryParams = JSON.parse(params?.lazyEvent);
        return fetch('/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => {
                console.log(d, queryParams);
                const data = d as { data: Demo.Customer[]; totalRecords: number };
                data.data = data.data.slice(queryParams.first ?? 0, (queryParams.first ?? 0) + (queryParams.rows ?? 10));
                return data;
            });
    },
    getCustomers2(params?: any) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams, {
            mode: 'no-cors'
        }).then((res) => res.json());
    }
};
