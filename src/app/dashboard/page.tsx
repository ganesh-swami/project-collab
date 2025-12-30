"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toggleCreateModal, setCurrentProject } from "@/store/projectsSlice";
import { logout, login } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import CreateProjectModal from "@/components/CreateProjectModal";
import { RootState } from "@/store/store";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    // Check if user is logged in via Redux
    if (!user) {
      // Try to restore from cookies
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

  const handleCreateProject = () => {
    dispatch(toggleCreateModal(true));
  };

  const handleProjectClick = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      dispatch(setCurrentProject(project));
      router.push(`/projects/${projectId}`);
    }
  };

  const handleLogout = () => {
    // Clear cookie
    document.cookie = "user=; path=/; max-age=0";
    
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#fdf2f2]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e83e3e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📁</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Radiocarbon Team Collaboration</h1>
              {user && <p className="text-sm text-gray-600">Welcome, {user.name} ({user.role})</p>}
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-gray-600 hover:text-[#e83e3e] hover:bg-[#fff5f5]"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Create Button */}
        <div className="mb-8">
          <Button
            onClick={handleCreateProject}
            className="bg-[#e83e3e] hover:bg-[#d92e2e] text-white font-semibold h-12 px-6 rounded-lg flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create New Project
          </Button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">No projects yet. Create your first project!</p>
            <Button
              onClick={handleCreateProject}
              className="bg-[#e83e3e] hover:bg-[#d92e2e] text-white"
            >
              Create Project
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const startDate = new Date(project.startDate);
                const endDate = new Date(project.endDate);
                const dateRange = `${startDate.toLocaleDateString("en-GB")} – ${endDate.toLocaleDateString("en-GB")}`;

                return (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    {/* Color Bar */}
                    <div
                      className="h-1 w-full rounded-full mb-4"
                      style={{ backgroundColor: project.color }}
                    />

                    {/* Title and Star */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex-1">{project.name}</h3>
                      <button className="text-2xl hover:opacity-70 transition">⭐</button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>👥 {project.members.length}/{project.participantCap} members</span>
                    </div>

                    {/* Avatars */}
                    <div className="flex items-center gap-2 mb-4">
                      {project.members.slice(0, 5).map((memberId, idx) => (
                        <div
                          key={memberId}
                          className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                        >
                          {String.fromCharCode(65 + idx)}
                        </div>
                      ))}
                      {project.members.length > 5 && (
                        <div className="text-xs text-gray-600 ml-1">
                          +{project.members.length - 5}
                        </div>
                      )}
                    </div>

                    {/* Date Range */}
                    <p className="text-xs text-gray-500">{dateRange}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <CreateProjectModal />
    </div>
  );
}
