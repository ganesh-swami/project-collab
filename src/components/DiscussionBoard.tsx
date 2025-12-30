"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageToProject } from "@/store/projectsSlice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";
import { RootState } from "@/store/store";

interface DiscussionBoardProps {
  projectId: string;
}

export default function DiscussionBoard({ projectId }: DiscussionBoardProps) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === projectId)
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [message, setMessage] = useState("");

  if (!project || !user) return null;

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: `msg_${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        content: message,
        timestamp: new Date().toISOString(),
        attachments: [],
      };
      dispatch(addMessageToProject({ projectId, message: newMessage }));
      setMessage("");
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-[#e83e3e] rounded-xl overflow-hidden shadow-md h-full flex flex-col">
      {/* Header */}
      <div className="bg-[#d92e2e] px-6 py-4 flex items-center gap-3">
        <span className="text-2xl">💬</span>
        <div>
          <h3 className="font-semibold text-white text-lg">Discussion Board</h3>
          <p className="text-xs text-red-100">{project.messages.length} messages</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="bg-white p-6 flex-1 overflow-y-auto space-y-4">
        {project.messages.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-center">
            <div>
              <p className="text-gray-600 text-sm mb-2">No messages yet. Start the conversation!</p>
              <p className="text-gray-400 text-xs">Drag and drop media to share</p>
            </div>
          </div>
        ) : (
          project.messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {msg.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{msg.userName}</p>
                  <p className="text-xs text-gray-500">{msg.userEmail}</p>
                </div>
                <span className="text-xs text-gray-400 ml-auto">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="ml-10 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="space-y-3">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleSendMessage();
              }
            }}
            placeholder="Add comment, attach files..."
            className="min-h-20 border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e] resize-none"
          />
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-[#e83e3e] hover:bg-[#fff5f5] flex items-center gap-2"
            >
              <Paperclip className="h-4 w-4" />
              <span className="text-sm">Attach</span>
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-[#e83e3e] hover:bg-[#d92e2e] text-white disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span className="text-sm">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
