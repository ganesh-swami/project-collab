"use client";

import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Eye, Users, Plus } from "lucide-react";
import StandardFrame from "@/components/StandardFrame";
import MembersList from "@/components/MembersList";
import DiscussionBoard from "@/components/DiscussionBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/store/store";
import { useState } from "react";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const [activeTab, setActiveTab] = useState("home");

  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === projectId)
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const allMembers = useSelector((state: RootState) => state.members.members);

  if (!user) {
    router.push("/login");
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

  const projectMembers = allMembers.filter((m) => project.members.includes(m.id));

  return (
    <div className="min-h-screen bg-[#fdf2f2]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Back Button and Title */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Participant View
            </Button>
            <Button
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Add People
            </Button>
            <Button
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Frame
            </Button>
            <Button
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 flex items-center gap-2 ml-auto"
            >
              <Settings className="h-4 w-4" />
              Customize
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start rounded-none h-auto p-0">
              <TabsTrigger
                value="home"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#e83e3e] rounded-none px-6 py-4 font-medium text-gray-700 data-[state=active]:text-[#e83e3e] bg-transparent"
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                value="groups"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#e83e3e] rounded-none px-6 py-4 font-medium text-gray-700 data-[state=active]:text-[#e83e3e] bg-transparent"
              >
                Groups (0)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="space-y-8">
            {/* Project Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Standard Frame */}
              <div className="lg:col-span-2">
                <StandardFrame projectId={projectId} />
              </div>

              {/* Right Column - Info Card */}
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-32">
                  <h3 className="font-semibold text-gray-900 mb-4">Project Info</h3>

                  {/* Stats */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">MEMBERS</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {projectMembers.length}/{project.participantCap}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-600 mb-2">START DATE</p>
                      <p className="text-sm text-gray-900">
                        {new Date(project.startDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-600 mb-2">END DATE</p>
                      <p className="text-sm text-gray-900">
                        {new Date(project.endDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-600 mb-3">TEAM</p>
                      <div className="flex flex-wrap gap-2">
                        {projectMembers.slice(0, 6).map((member) => (
                          <div
                            key={member.id}
                            className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm tooltip"
                            title={member.name}
                          >
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                        ))}
                        {projectMembers.length > 6 && (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-xs">
                            +{projectMembers.length - 6}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Members and Discussion */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MembersList projectId={projectId} />
              <DiscussionBoard projectId={projectId} />
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600 mb-4">No groups yet</p>
              <Button className="bg-[#e83e3e] hover:bg-[#d92e2e] text-white">
                Create Group
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
