"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFrameInProject } from "@/store/projectsSlice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Link as LinkIcon, Upload } from "lucide-react";
import { RootState } from "@/store/store";

interface StandardFrameProps {
  projectId: string;
}

export default function StandardFrame({ projectId }: StandardFrameProps) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === projectId)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  if (!project || project.frames.length === 0) return null;

  const frame = project.frames[0];

  const handleEditStart = () => {
    setEditContent(frame.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch(
      updateFrameInProject({
        projectId,
        frame: { ...frame, content: editContent },
      })
    );
    setIsEditing(false);
  };

  return (
    <div className="bg-[#e83e3e] rounded-xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#d92e2e] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <h3 className="font-semibold text-white text-lg">{frame.title}</h3>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={handleEditStart}
            className="p-2 hover:bg-[#c92a2a] rounded-lg transition text-white"
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="bg-white p-6">
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-32 border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
              placeholder="Enter frame content..."
            />
            <div className="flex gap-3">
              <Button
                onClick={handleSaveEdit}
                className="bg-[#e83e3e] hover:bg-[#d92e2e] text-white"
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mb-6">{frame.content}</p>
        )}

        {/* Attachments Section */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 text-sm">Attachments</h4>
          {frame.attachments.length === 0 ? (
            <p className="text-sm text-gray-500 mb-4">No attachments yet</p>
          ) : (
            <div className="space-y-2 mb-4">
              {frame.attachments.map((attachment, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700"
                >
                  <LinkIcon className="h-4 w-4 text-gray-400" />
                  {attachment}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 text-sm flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Files
            </Button>
            <Button
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 text-sm flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              Add Link
            </Button>
          </div>
        </div>

        {/* Discussion Section */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="font-semibold text-gray-900 text-sm mb-3">Discussion</h4>
          <p className="text-sm text-gray-600">Comments will appear here</p>
        </div>
      </div>
    </div>
  );
}
