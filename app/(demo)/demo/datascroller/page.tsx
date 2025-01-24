'use client';
import React, { useState, useEffect, useTransition } from 'react';
import { Button } from 'primereact/button';
import { DataScroller, DataScrollerLazyLoadEvents } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { ProductService } from '@/demo/service/ProductService';
import { Demo } from '@/types/demo';
import { ProgressSpinner } from 'primereact/progressspinner';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

export default function BasicDemo() {
    const [products, setProducts] = useState<Demo.Product[]>([]);

    const [lazyParams, setLazyParams] = useState<DataScrollerLazyLoadEvents>({ rows: 10, first: 0 });
    const [totalRecords, setTotalRecords] = useState(0);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        loadData();
    }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

    const getSeverity = (product: Product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const itemTemplate = (data: Product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${data.image}`} alt={data.name} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.name}</div>
                                <div className="text-700">{data.description}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <Rating value={data.rating} readOnly cancel={false}></Rating>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">${data.price}</span>
                            <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            <Tag value={data.inventoryStatus} severity={getSeverity(data)}></Tag>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const loadData = () => {
        startTransition(async () => {
            const data = await ProductService.getProducts2(lazyParams);

            startTransition(() => {
                setProducts([...products, ...data.data]);
                setTotalRecords(data.totalRecords);
                // setLazyParams({ ...lazyParams, first: lazyParams.first + lazyParams.rows });
            });
        });
    };
    // Lazy load on scroll
    const onLazyLoad = (evt: DataScrollerLazyLoadEvents) => {
        setLazyParams(evt);
    };

    return (
        <div className="card">
            <div style={{ position: 'fixed', top: 100, right: 10 }}>{isPending ? <ProgressSpinner /> : products.length}</div>

            <DataScroller buffer={1} lazy value={products} itemTemplate={itemTemplate} rows={lazyParams.rows} header="List of Products" onLazyLoad={onLazyLoad} />
        </div>
    );
}
