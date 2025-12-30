import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  id: string;
  name: string;
  color: string;
  startDate: string;
  endDate: string;
  participantCap: number;
  members: string[];
  createdBy: string;
  frames: Frame[];
  messages: Message[];
}

export interface Frame {
  id: string;
  title: string;
  content: string;
  attachments: string[];
  discussion: string;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  content: string;
  timestamp: string;
  attachments: string[];
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  showCreateModal: boolean;
}

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  showCreateModal: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    createProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
      state.showCreateModal = false;
    },
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    toggleCreateModal: (state, action: PayloadAction<boolean>) => {
      state.showCreateModal = action.payload;
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
      if (state.currentProject?.id === action.payload.id) {
        state.currentProject = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
      if (state.currentProject?.id === action.payload) {
        state.currentProject = null;
      }
    },
    addMemberToProject: (
      state,
      action: PayloadAction<{ projectId: string; memberId: string }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project && !project.members.includes(action.payload.memberId)) {
        project.members.push(action.payload.memberId);
      }
      if (state.currentProject?.id === action.payload.projectId) {
        if (!state.currentProject.members.includes(action.payload.memberId)) {
          state.currentProject.members.push(action.payload.memberId);
        }
      }
    },
    addMemberByEmailToProject: (
      state,
      action: PayloadAction<{ projectId: string; email: string; memberId: string }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project && !project.members.includes(action.payload.memberId)) {
        project.members.push(action.payload.memberId);
      }
      if (state.currentProject?.id === action.payload.projectId) {
        if (!state.currentProject.members.includes(action.payload.memberId)) {
          state.currentProject.members.push(action.payload.memberId);
        }
      }
    },
    removeMemberFromProject: (
      state,
      action: PayloadAction<{ projectId: string; memberId: string }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        project.members = project.members.filter((m) => m !== action.payload.memberId);
      }
      if (state.currentProject?.id === action.payload.projectId) {
        state.currentProject.members = state.currentProject.members.filter(
          (m) => m !== action.payload.memberId
        );
      }
    },
    updateFrameInProject: (
      state,
      action: PayloadAction<{ projectId: string; frame: Frame }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        const frameIndex = project.frames.findIndex((f) => f.id === action.payload.frame.id);
        if (frameIndex !== -1) {
          project.frames[frameIndex] = action.payload.frame;
        }
      }
      if (state.currentProject?.id === action.payload.projectId) {
        const frameIndex = state.currentProject.frames.findIndex(
          (f) => f.id === action.payload.frame.id
        );
        if (frameIndex !== -1) {
          state.currentProject.frames[frameIndex] = action.payload.frame;
        }
      }
    },
    addMessageToProject: (
      state,
      action: PayloadAction<{ projectId: string; message: Message }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        project.messages.push(action.payload.message);
      }
      if (state.currentProject?.id === action.payload.projectId) {
        state.currentProject.messages.push(action.payload.message);
      }
    },
  },
});

export const {
  createProject,
  setCurrentProject,
  toggleCreateModal,
  updateProject,
  deleteProject,
  addMemberToProject,
  addMemberByEmailToProject,
  removeMemberFromProject,
  updateFrameInProject,
  addMessageToProject,
} = projectsSlice.actions;
export default projectsSlice.reducer;
