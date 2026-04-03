import { axiosInstance } from "../lib/axios";

// ─── POST /api/cases — Create a new case ─────────────────────────────────────
export const createCase = async (payload) => {
  const { data } = await axiosInstance.post("/cases", payload);
  return data; // { success: true, data: newCase }
};

// ─── GET /api/cases — Get all cases ──────────────────────────────────────────
export const getAllCases = async () => {
  const { data } = await axiosInstance.get("/cases");
  return data; // { success: true, data: [...cases] }
};

// ─── GET /api/cases/:id — Get a single case ───────────────────────────────────
export const getCaseById = async (id) => {
  const { data } = await axiosInstance.get(`/cases/${id}`);
  return data; // { success: true, data: case }
};

// ─── PUT /api/cases/:id — Update a case ──────────────────────────────────────
export const updateCase = async (id, payload) => {
  const { data } = await axiosInstance.put(`/cases/${id}`, payload);
  return data; // { success: true, data: updatedCase }
};

// ─── DELETE /api/cases/:id — Delete a case ───────────────────────────────────
export const deleteCase = async (id) => {
  const { data } = await axiosInstance.delete(`/cases/${id}`);
  return data; // { success: true, message: "Case deleted" }
};

// ─────────────────────────────────────────────────────────────────────────────
// VERSION HISTORY APIs
// ─────────────────────────────────────────────────────────────────────────────

// ─── GET /api/cases/:id/versions
// Returns lightweight list: [{ version, label, isCurrent, editedAt }, ...]
export const getCaseVersions = async (id) => {
  const { data } = await axiosInstance.get(`/cases/${id}/versions`);
  return data; // { success: true, data: [...versions] }
};

// ─── GET /api/cases/:id/versions/:version
// Returns full snapshot data for a specific version number
export const getCaseVersion = async (id, version) => {
  const { data } = await axiosInstance.get(`/cases/${id}/versions/${version}`);
  return data; // { success: true, isCurrent, version, editedAt, data: {...} }
};

// ─── POST /api/cases/:id/versions/:version/restore
// Restores an old version as the new current version
export const restoreCaseVersion = async (id, version) => {
  const { data } = await axiosInstance.post(
    `/cases/${id}/versions/${version}/restore`
  );
  return data; // { success: true, message: "...", data: updatedCase }
};