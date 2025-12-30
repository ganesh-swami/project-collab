import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectsReducer from "./projectsSlice";
import membersReducer from "./membersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    members: membersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
