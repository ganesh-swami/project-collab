"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, toggleCreateModal } from "@/store/projectsSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { RootState } from "@/store/store";

const colors = ["#3b82f6", "#10b981", "#a855f7", "#f97316", "#ef4444", "#eab308"];

export default function CreateProjectModal() {
  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.projects.showCreateModal);
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    name: "",
    color: colors[0],
    startDate: "",
    endDate: "",
    participantCap: 10,
  });

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.startDate || !formData.endDate) {
      alert("Please fill in all required fields");
      return;
    }

    const newProject = {
      id: `project_${Date.now()}`,
      name: formData.name,
      color: formData.color,
      startDate: formData.startDate,
      endDate: formData.endDate,
      participantCap: formData.participantCap,
      members: user ? [user.id] : [],
      createdBy: user?.id || "",
      frames: [
        {
          id: `frame_${Date.now()}`,
          title: "Introduction",
          content: `Welcome to our ${formData.name} project.`,
          attachments: [],
          discussion: "",
        },
      ],
      messages: [],
    };

    dispatch(createProject(newProject));
    setFormData({
      name: "",
      color: colors[0],
      startDate: "",
      endDate: "",
      participantCap: 10,
    });
  };

  const handleClose = () => {
    dispatch(toggleCreateModal(false));
    setFormData({
      name: "",
      color: colors[0],
      startDate: "",
      endDate: "",
      participantCap: 10,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Project Settings</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
            <Input
              type="text"
              placeholder="Project A"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
            />
          </div>

          {/* Project Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Project Color</label>
            <div className="grid grid-cols-6 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`h-10 rounded-lg transition-all ${
                    formData.color === color ? "ring-2 ring-offset-2 ring-gray-400" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
            />
          </div>

          {/* Participant Cap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Participant Cap
            </label>
            <Input
              type="number"
              min="1"
              value={formData.participantCap}
              onChange={(e) =>
                setFormData({ ...formData, participantCap: parseInt(e.target.value) || 1 })
              }
              className="border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#e83e3e] hover:bg-[#d92e2e] text-white"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
