import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./app/reducer";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  app: appReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

let storeInstance: ReturnType<typeof configureStore>;

// Singleton store function
export const initializeStore = (preloadedState?: RootState) => {
  if (!storeInstance) {
    storeInstance = configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== "production",
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types
            // ignoredActions: ['your/action/type'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'payload.dateOfBirth'],
            // Ignore these paths in the state
            ignoredPaths: ["app.user.dateOfBirth"],
          },
        }),
    });
  }
  return storeInstance;
};

// Access the existing store instance
export const getStore = () => storeInstance;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(makeStore);
