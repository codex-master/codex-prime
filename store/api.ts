"use client";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { host, port } from "@/constants/index"
import { showToast } from "@/hooks/toast";

export const baseURL1 = `http://${host}:${port}/api/v1/`;
export const baseURL = `/api/v1/`;
export const wsURL = `ws://${host}:${port}/`;

export default function api(url: string, config?: AxiosRequestConfig) {
  const requestURL = url.startsWith("http") ? url : `${baseURL}${url}`;
  return axios(requestURL, {
    ...config,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log({ res })
      if (res.config.method?.toLowerCase() != "get") {
        showToast('success', 'Success', 'User data fetched successfully!');
        // if (res?.data?.title) {
        // toast.success(res?.data?.title, { description: res?.data?.message || res?.data?.detail, duration: 3000 })
        // }
      }
      return res.data;
    })
    .catch((err: AxiosError) => {
      console.log({ err })
      const msg = (err?.response?.data as { error: string }).error ?? err.message;
      showToast('error', 'Error', msg);
      throw err;

      // if ((err?.response?.data as ResponseData)?.title) {
      //   toast.error((err?.response?.data as ResponseData)?.title, { description: (err?.response?.data as ResponseData)?.message, duration: 3000 })
      // } else if (err && err.status && err.status >= 500) {
      //   console.log({ err })
      //   toast.error(`${err.response?.data}`, { description: err.message, duration: 3000 })
      // }
      // throw new Error((err?.response?.data as ErrorResponseData)?.message);
    });
}
