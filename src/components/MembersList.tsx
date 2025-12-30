"use client";

import { useDispatch, useSelector } from "react-redux";
import { removeMemberFromProject } from "@/store/projectsSlice";
import { RootState } from "@/store/store";

interface MembersListProps {
  projectId: string;
  onInviteClick?: () => void;
}

export default function MembersList({ projectId, onInviteClick }: MembersListProps) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === projectId)
  );
  const allMembers = useSelector((state: RootState) => state.members.members);

  if (!project) return null;

  const projectMembers = allMembers.filter((m) => project.members.includes(m.id));

  const handleRemoveMember = (memberId: string) => {
    dispatch(removeMemberFromProject({ projectId, memberId }));
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Members List */}
      <div className="space-y-2 flex-1 overflow-y-auto">
        {projectMembers.length === 0 ? (
          <p className="text-sm text-gray-500">No members yet</p>
        ) : (
          projectMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition text-sm"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{member.name}</p>
                  <p className="text-xs text-gray-500 truncate">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <span
                  className={`h-2 w-2 rounded-full ${
                    member.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span className="text-xs text-gray-600 capitalize px-2 py-1 bg-gray-100 rounded whitespace-nowrap">
                  {member.role.split("-").pop()}
                </span>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="p-1 hover:bg-red-100 text-gray-400 hover:text-[#e83e3e] rounded transition shrink-0"
                  title="Remove member"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Invite Members Button */}
      <button
        onClick={onInviteClick}
        className="w-full px-4 py-2 border-2 border-dashed border-[#e83e3e] text-[#e83e3e] hover:bg-red-50 rounded-lg font-medium transition"
      >
        + Invite Members
      </button>
    </div>
  );
}
