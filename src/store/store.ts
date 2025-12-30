import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import projectsReducer from "./projectsSlice";
import membersReducer from "./membersSlice";

// Persist configuration
const persistConfig = {
  key: "radiocarbon",
  storage,
  whitelist: ["projects", "members"], // Only persist projects and members
};

// Create persisted reducers
const persistedProjectsReducer = persistReducer(persistConfig, projectsReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: persistedProjectsReducer,
    members: membersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["projects._persist"],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
