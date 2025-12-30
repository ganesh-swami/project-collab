"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { login } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Eye, Users, Plus, Home, Share2 } from "lucide-react";
import StandardFrame from "@/components/StandardFrame";
import MembersList from "@/components/MembersList";
import DiscussionBoard from "@/components/DiscussionBoard";
import AddFrameModal from "@/components/AddFrameModal";
import { RootState } from "@/store/store";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const projectId = params.id as string;
  const [showAddFrame, setShowAddFrame] = useState(false);
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [viewMode, setViewMode] = useState<"admin" | "participant">("admin");
  const [emails, setEmails] = useState<{ email: string; role: string }[]>([
    { email: "", role: "Participant" },
  ]);
  const [invitationMessage, setInvitationMessage] = useState(
    "You have been invited to collaborate on a project. Click the link below to sign up and join the team."
  );

  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === projectId)
  );
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Restore user from cookies if not in Redux
    if (!user) {
      const cookies = document.cookie.split("; ");
      const userCookie = cookies.find((cookie) => cookie.startsWith("user="));
      
      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie.substring(5));
          dispatch(login(userData));
        } catch {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    }
  }, [user, router, dispatch]);

  if (!user) {
    return null;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#fdf2f2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Project not found</p>
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-[#e83e3e] hover:bg-[#d92e2e] text-white"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleAddFrame = (frameType: string, frameTitle: string) => {
    console.log(`Adding frame: ${frameType} - ${frameTitle}`);
    setShowAddFrame(false);
  };

  const addEmailField = () => {
    setEmails([...emails, { email: "", role: "Participant" }]);
  };

  const removeEmailField = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const updateEmail = (index: number, field: string, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = { ...newEmails[index], [field]: value };
    setEmails(newEmails);
  };

  const handleSendInvitations = () => {
    console.log("Sending invitations:", emails);
    setShowAddPeople(false);
    setEmails([{ email: "", role: "Participant" }]);
  };

  return (
    <div className="min-h-screen bg-[#fdf2f2]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 py-4">
          {/* Back Button and Title */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex-1">{project.name}</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Admin/Participant View Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("admin")}
                className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition ${
                  viewMode === "admin"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Settings className="h-4 w-4" />
                Admin View
              </button>
              <button
                onClick={() => setViewMode("participant")}
                className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition ${
                  viewMode === "participant"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Eye className="h-4 w-4" />
                Participant View
              </button>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Action Buttons */}
            <Button
              onClick={() => setShowAddPeople(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm"
            >
              <Users className="h-4 w-4 mr-2" />
              Add People
            </Button>
            <Button
              onClick={() => setShowAddFrame(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Frame
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium text-sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-full mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-0 py-4 font-medium flex items-center gap-2 border-b-2 transition ${
                activeTab === "home"
                  ? "border-[#e83e3e] text-[#e83e3e]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            <button
              onClick={() => setActiveTab("groups")}
              className={`px-0 py-4 font-medium flex items-center gap-2 border-b-2 transition ${
                activeTab === "groups"
                  ? "border-[#e83e3e] text-[#e83e3e]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Share2 className="h-4 w-4" />
              Groups (0)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - All Frames in Horizontal Scroll */}
      {activeTab === "home" && (
        <div className="max-w-full mx-auto px-6 py-8">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {/* Standard Frame */}
              <div className="w-96 shrink-0 bg-white rounded-xl overflow-hidden shadow-md border border-[#e83e3e]">
                <div className="bg-[#e83e3e] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <span>📋</span>
                    <span>Standard Frame</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-[#d92e2e] rounded transition">
                      <Settings className="h-4 w-4 text-white" />
                    </button>
                    <button className="p-1 hover:bg-[#d92e2e] rounded transition text-lg leading-none">
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <StandardFrame projectId={projectId} />
                </div>
              </div>

              {/* Members List Frame */}
              <div className="w-96 shrink-0 bg-white rounded-xl overflow-hidden shadow-md border border-[#e83e3e]">
                <div className="bg-[#e83e3e] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <span>👥</span>
                    <span>Members List</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-[#d92e2e] rounded transition">
                      <Settings className="h-4 w-4 text-white" />
                    </button>
                    <button className="p-1 hover:bg-[#d92e2e] rounded transition text-lg leading-none">
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <MembersList projectId={projectId} onInviteClick={() => setShowAddPeople(true)} />
                </div>
              </div>

              {/* Discussion Board Frame */}
              <div className="w-96 shrink-0 bg-white rounded-xl overflow-hidden shadow-md border border-[#e83e3e]">
                <div className="bg-[#e83e3e] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <span>💬</span>
                    <span>Discussion Board</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-[#d92e2e] rounded transition">
                      <Settings className="h-4 w-4 text-white" />
                    </button>
                    <button className="p-1 hover:bg-[#d92e2e] rounded transition text-lg leading-none">
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <DiscussionBoard projectId={projectId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Groups Tab Content */}
      {activeTab === "groups" && (
        <div className="max-w-full mx-auto px-6 py-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">No groups yet</p>
            <Button className="bg-[#e83e3e] hover:bg-[#d92e2e] text-white">
              Create Group
            </Button>
          </div>
        </div>
      )}

      {/* Add Frame Modal */}
      <AddFrameModal
        isOpen={showAddFrame}
        onClose={() => setShowAddFrame(false)}
        projectId={projectId}
        onAddFrame={handleAddFrame}
      />

      {/* Add People Modal */}
      {showAddPeople && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add People to Project</h2>
              <button
                onClick={() => setShowAddPeople(false)}
                className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Email Section */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Email Addresses</label>
              <div className="space-y-2">
                {emails.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-3 text-gray-400">✉️</span>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={item.email}
                        onChange={(e) => updateEmail(index, "email", e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <select
                      value={item.role}
                      onChange={(e) => updateEmail(index, "role", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Participant</option>
                      <option>Admin</option>
                    </select>
                    <button
                      onClick={() => removeEmailField(index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addEmailField}
                className="mt-3 text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Another Email
              </button>
            </div>

            {/* Invitation Message */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Custom Invitation Message</label>
              <textarea
                value={invitationMessage}
                onChange={(e) => setInvitationMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">A sign-up link will be automatically included in the email.</p>
            </div>

            {/* Email Preview */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Email Preview</label>
              <div className="text-sm text-gray-700 space-y-2">
                <p>{invitationMessage}</p>
                <p className="text-blue-500 underline">Click here to sign up and join the project</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddPeople(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvitations}
                className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
              >
                Send Invitations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
