import api from "@/store/api";
import { Demo } from "@/types";

export function getProducts() {
  return api('/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' }, method: "GET" })
    .then((res) => res.json())
    .then((d) => d.data as Demo.Product[]);
}

export function register(data: Demo.User): Promise<Demo.User & { error?: string }> {
  console.log({ data })
  return api(`https://reqres.in/api/register`, {
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
    method: 'POST',
    data: data
  })
    .then((user) => {
      return { ...data, ...user };
    })
    .catch((err: { error: string }) => {
      return err;
    });
}