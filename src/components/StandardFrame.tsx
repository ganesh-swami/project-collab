"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFrameInProject } from "@/store/projectsSlice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link as LinkIcon, Upload } from "lucide-react";
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
    <div className="space-y-6">
      {/* Content Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Introduction</h4>
          {!isEditing && (
            <button
              onClick={handleEditStart}
              className="text-[#e83e3e] hover:text-[#d92e2e] transition text-sm font-medium"
              title="Edit"
            >
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-24 border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
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
          <p className="text-gray-700">{frame.content}</p>
        )}
      </div>

      {/* Attachments Section */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <h4 className="font-semibold text-gray-900 text-sm">Attachments</h4>
        {frame.attachments.length === 0 ? (
          <p className="text-sm text-gray-500">No attachments yet</p>
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
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <h4 className="font-semibold text-gray-900 text-sm">Discussion</h4>
        <p className="text-sm text-gray-600">Comments will appear here</p>
      </div>
    </div>
  );
}
