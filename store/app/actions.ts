import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import * as actions from "./api";
import { Demo } from "@/types";

export const getProducts = createAsyncThunk<Demo.Product[]>("app/getProducts", async () =>
  actions.getProducts()
);

export const register = createAsyncThunk<Demo.User, Demo.User>("app/register", async (data) =>
  actions.register(data)
);

export const clearProducts = createAction("app/clearProducts");
