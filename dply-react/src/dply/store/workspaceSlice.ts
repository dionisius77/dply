import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type WorkspaceState = {
  activeProject: string;
};

const initialState: WorkspaceState = {
  activeProject: "default",
};

const workspaceSlice = createSlice({
  name: "dplyWorkspace",
  initialState,
  reducers: {
    setActiveProject(state, action: PayloadAction<string>) {
      state.activeProject = action.payload || "default";
    },
  },
});

export const { setActiveProject } = workspaceSlice.actions;
export default workspaceSlice.reducer;
