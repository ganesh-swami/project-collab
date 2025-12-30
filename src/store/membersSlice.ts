import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "super-admin" | "admin" | "participant";
  status: "online" | "offline";
  avatar?: string;
}

interface MembersState {
  members: TeamMember[];
}

const initialState: MembersState = {
  members: [
    {
      id: "user1",
      name: "You",
      email: "user1@example.com",
      role: "super-admin",
      status: "online",
    },
    {
      id: "user2",
      name: "User user2",
      email: "user2@example.com",
      role: "admin",
      status: "offline",
    },
    {
      id: "user3",
      name: "User user3",
      email: "user3@example.com",
      role: "participant",
      status: "offline",
    },
    {
      id: "user4",
      name: "User user4",
      email: "user4@example.com",
      role: "participant",
      status: "online",
    },
  ],
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<TeamMember>) => {
      state.members.push(action.payload);
    },
    updateMemberStatus: (
      state,
      action: PayloadAction<{ memberId: string; status: "online" | "offline" }>
    ) => {
      const member = state.members.find((m) => m.id === action.payload.memberId);
      if (member) {
        member.status = action.payload.status;
      }
    },
  },
});

export const { addMember, updateMemberStatus } = membersSlice.actions;
export default membersSlice.reducer;
