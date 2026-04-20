import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice";
import workspaceReducer from "./workspaceSlice";

const savedToken = localStorage.getItem("dply.token") || "";
const savedUserRaw = localStorage.getItem("dply.user");
const savedProject = localStorage.getItem("dply.project") || "default";

const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
  },
  preloadedState: {
    auth: {
      token: savedToken,
      user: savedUserRaw ? JSON.parse(savedUserRaw) : null,
    },
    workspace: {
      activeProject: savedProject,
    },
  },
});

store.subscribe(() => {
  const state = store.getState();
  if (state.auth.token) {
    localStorage.setItem("dply.token", state.auth.token);
  } else {
    localStorage.removeItem("dply.token");
  }

  if (state.auth.user) {
    localStorage.setItem("dply.user", JSON.stringify(state.auth.user));
  } else {
    localStorage.removeItem("dply.user");
  }

  localStorage.setItem("dply.project", state.workspace.activeProject);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
