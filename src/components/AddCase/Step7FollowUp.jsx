import { useState, useRef } from "react";

export default function Step7FollowUp({ data, onChange, readOnly, onRegisterFile }) {
  const [newTask, setNewTask] = useState({ description: "", dueDate: "", details: "", status: "pending" });
  const fileInputRef = useRef(null);

  // ── Follow-Up Tasks Table helpers ─────────────────────────────
  const tasks = data.followUpTasks || [];

  const addTask = () => {
    if (readOnly) return;
    if (!newTask.description && !newTask.dueDate) return;
    onChange({ ...data, followUpTasks: [...tasks, { ...newTask }] });
    setNewTask({ description: "", dueDate: "", details: "", status: "pending" });
  };

  const removeTask = (idx) => {
    if (readOnly) return;
    onChange({ ...data, followUpTasks: tasks.filter((_, i) => i !== idx) });
  };

  // ── Case Uploads helpers ──────────────────────────────────────
  const uploads = data.caseUploads || [];

  const handleFileSelect = (e) => {
    if (readOnly) return;
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Register the File object in CasePage's ref store — get back a stable key
    const _fileKey = onRegisterFile ? onRegisterFile(file) : null;

    const entry = {
      fileName:        file.name,
      contentType:     file.type || "application/octet-stream",
      visibleToClient: false,
      _fileKey,        // key into fileStoreRef — survives React re-renders
    };

    onChange({ ...data, caseUploads: [...uploads, entry] });
    e.target.value = "";
  };

  const toggleVisible = (idx) => {
    if (readOnly) return;
    const updated = uploads.map((u, i) =>
      i === idx ? { ...u, visibleToClient: !u.visibleToClient } : u
    );
    onChange({ ...data, caseUploads: updated });
  };

  const removeUpload = (idx) => {
    if (readOnly) return;
    onChange({ ...data, caseUploads: uploads.filter((_, i) => i !== idx) });
  };

  const statusBadge = (status) => {
    const map = {
      pending:     "bg-yellow-100 text-yellow-700",
      in_progress: "bg-blue-100 text-blue-700",
      completed:   "bg-green-100 text-green-700",
      cancelled:   "bg-gray-100 text-gray-500",
    };
    return map[status] || "bg-gray-100 text-gray-500";
  };

  const tdBase = "border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0148AF] w-full";

  return (
    <div>
      <p className="text-sm text-[#131315] mb-1">Step 7/7</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Follow-Up &amp; Case Management Tasks</h2>
      <hr className="border-gray-200 mb-8" />

      {/* ── Follow-Up Tasks Table ───────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Follow-Up Tasks</h3>
          {!readOnly && (
            <button
              type="button"
              onClick={addTask}
              className="text-sm text-[#0148AF] hover:underline font-medium"
            >
              + add
            </button>
          )}
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="grid grid-cols-4 bg-[#131315] text-white text-sm font-medium px-4 py-3">
            <span>Description</span>
            <span>Due Date</span>
            <span>Details</span>
            <span>Status</span>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8 bg-gray-50">
              No Rows To Show
            </div>
          ) : (
            tasks.map((task, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 px-4 py-3 border-t border-gray-100 text-sm text-gray-700 hover:bg-gray-50 items-center"
              >
                <span>{task.description}</span>
                <span>{task.dueDate}</span>
                <span className="truncate">{task.details}</span>
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(task.status)}`}>
                    {task.status?.replace("_", " ")}
                  </span>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => removeTask(idx)}
                      className="text-red-400 hover:text-red-600 text-xs shrink-0"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {!readOnly && (
            <div className="grid grid-cols-4 gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50">
              <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className={tdBase}
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className={tdBase}
              />
              <input
                type="text"
                placeholder="Details"
                value={newTask.details}
                onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
                className={tdBase}
              />
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className={`${tdBase} appearance-none`}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ── Case Uploads ────────────────────────────────────────── */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Case Uploads</h3>

        {!readOnly && (
          <div
            className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white cursor-pointer hover:border-[#0148AF] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="text-sm text-gray-400">Click to select</span>
            <button
              type="button"
              className="px-4 py-1.5 bg-gray-200 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            >
              Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        )}

        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="grid grid-cols-3 bg-[#131315] text-white text-sm font-medium px-4 py-3">
            <span>File Name</span>
            <span>Content Type</span>
            <span>Visible to Client</span>
          </div>

          {uploads.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8 bg-gray-50">
              No Rows To Show
            </div>
          ) : (
            uploads.map((upload, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 px-4 py-3 border-t border-gray-100 text-sm text-gray-700 hover:bg-gray-50 items-center"
              >
                <span className="truncate">{upload.fileName}</span>
                <span className="text-gray-500 text-xs">{upload.contentType}</span>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    disabled={readOnly}
                    onClick={() => toggleVisible(idx)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      upload.visibleToClient ? "bg-[#0148AF]" : "bg-gray-300"
                    } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        upload.visibleToClient ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => removeUpload(idx)}
                      className="ml-4 text-red-400 hover:text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}