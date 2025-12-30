"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddFrameModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onAddFrame: (frameType: string, frameTitle: string) => void;
}

const frameTypes = [
  {
    id: "standard",
    name: "Standard Frame",
    description: "Introduction text, attachments, and discussion board",
    icon: "📋",
  },
  {
    id: "discussion",
    name: "Discussion Board",
    description: "Master discussion board for general project conversation",
    icon: "💬",
  },
  {
    id: "leaderboard",
    name: "Points Leaderboard",
    description: "Show top contributors with point scores",
    icon: "🏆",
  },
  {
    id: "members",
    name: "Members List",
    description: "Display all project participants",
    icon: "👥",
  },
  {
    id: "visual",
    name: "Visual Frame",
    description: "Mood board with resizable visual tiles",
    icon: "🎨",
  },
];

export default function AddFrameModal({ isOpen, onClose, onAddFrame }: AddFrameModalProps) {
  const [selectedType, setSelectedType] = useState("standard");
  const [frameTitle, setFrameTitle] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (frameTitle.trim()) {
      onAddFrame(selectedType, frameTitle);
      setFrameTitle("");
      setSelectedType("standard");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add New Frame</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Frame Type Selection */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Frame Type</h3>
          <div className="grid grid-cols-2 gap-4">
            {frameTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  selectedType === type.id
                    ? "border-[#e83e3e] bg-[#fff5f5]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{type.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Frame Title */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Frame Title</label>
          <Input
            type="text"
            placeholder="Enter frame title"
            value={frameTitle}
            onChange={(e) => setFrameTitle(e.target.value)}
            className="border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!frameTitle.trim()}
            className="flex-1 bg-[#e83e3e] hover:bg-[#d92e2e] text-white disabled:opacity-50"
          >
            Add Frame
          </Button>
        </div>
      </div>
    </div>
  );
}
