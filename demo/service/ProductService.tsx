import { Demo } from '@/types';
import { DataScrollerLazyLoadEvents } from 'primereact/datascroller';

export const ProductService = {
    getProductsSmall() {
        return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProducts() {
        return fetch('/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProductsWithOrdersSmall() {
        return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProducts2(params?: DataScrollerLazyLoadEvents): Promise<{ totalRecords: number; data: Demo.Product[] }> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return fetch(`/demo/data/products.json?offset=${params?.first}&limit=${params?.rows}`, { headers: { 'Cache-Control': 'no-cache' } })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log({ res, params });
                        const data = res as { data: Demo.Product[]; totalRecords: number };
                        data.data = data.data.slice(params?.first ?? 0, (params?.first ?? 0) + (params?.rows ?? 10));
                        resolve({ data: data.data, totalRecords: data.totalRecords });
                        return { data: data.data, totalRecords: data.totalRecords };
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, 2000);
        });
    }
};
