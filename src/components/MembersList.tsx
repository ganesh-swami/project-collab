"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberToProject, removeMemberFromProject } from "@/store/projectsSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Trash2 } from "lucide-react";
import { RootState } from "@/store/store";

interface MembersListProps {
  projectId: string;
}

export default function MembersList({ projectId }: MembersListProps) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === projectId)
  );
  const allMembers = useSelector((state: RootState) => state.members.members);
  const [emailInput, setEmailInput] = useState("");

  if (!project) return null;

  const projectMembers = allMembers.filter((m) => project.members.includes(m.id));
  const availableMembers = allMembers.filter((m) => !project.members.includes(m.id));

  const handleAddMember = () => {
    const member = availableMembers.find((m) => m.email === emailInput);
    if (member) {
      dispatch(addMemberToProject({ projectId, memberId: member.id }));
      setEmailInput("");
    } else {
      alert("Member not found");
    }
  };

  const handleRemoveMember = (memberId: string) => {
    dispatch(removeMemberFromProject({ projectId, memberId }));
  };

  return (
    <div className="bg-[#e83e3e] rounded-xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#d92e2e] px-6 py-4 flex items-center gap-3">
        <span className="text-2xl">👥</span>
        <div>
          <h3 className="font-semibold text-white text-lg">Members List</h3>
          <p className="text-xs text-red-100">{projectMembers.length} members</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-6">
        {/* Add Member Section */}
        <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 text-sm">Invite Members</h4>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="email@example.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
              list="availableEmails"
            />
            <datalist id="availableEmails">
              {availableMembers.map((m) => (
                <option key={m.id} value={m.email} />
              ))}
            </datalist>
            <Button
              onClick={handleAddMember}
              className="bg-[#e83e3e] hover:bg-[#d92e2e] text-white flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {availableMembers.length === 0 && (
            <p className="text-xs text-gray-500">All members are already in the project</p>
          )}
        </div>

        {/* Members List */}
        <div className="space-y-3">
          {projectMembers.length === 0 ? (
            <p className="text-sm text-gray-500">No members yet</p>
          ) : (
            projectMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500 truncate">{member.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        member.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <span className="text-xs text-gray-600 capitalize px-2 py-1 bg-gray-100 rounded">
                      {member.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="p-2 hover:bg-red-100 text-gray-600 hover:text-[#e83e3e] rounded-lg transition ml-2"
                  title="Remove member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
