import { API_BASE, FILE_TYPES } from "../utils/constants";
import { baseHeaders } from "../utils/request";

const System = {
  ping: async function () {
    return await fetch(`${API_BASE}/ping`, {method:"GET"})
      .then((res) => res.json())
      .then((res) => res?.online || false)
      .catch(() => false);
  },
  localFiles: async function () {
    return await fetch(`${API_BASE}/system/local-files`, {
      headers: baseHeaders(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not find setup information.");
        return res.json();
      })
      .then((res) => res.localFiles)
      .catch(() => null);
  },
  checkAuth: async function (currentToken = null) {
    return await fetch(`${API_BASE}/system/check-token`, {
      headers: baseHeaders(currentToken),
    })
      .then((res) => res.ok)
      .catch(() => false);
  },
  checkGoogleAuth: async function (authToken) {
    return await fetch(`${API_BASE}/auth`, {
      method: "GET",
      headers: baseHeaders(authToken),
    })
      .then((res) => {
        return res.json()})
      .catch((e) => {
        console.error(e);
        return null;
      });
  },
  requestToken: async function (body) {
    return await fetch(`${API_BASE}/request-token`, {
      method: "POST",
      body: JSON.stringify({ ...body }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not validate login.");
        return res.json();
      })
      .then((res) => res)
      .catch((e) => {
        return { valid: false, message: e.message };
      });
  },
  updateSystem: async (data) => {
    return await fetch(`${API_BASE}/system/update-env`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return { newValues: null, error: e.message };
      });
  },
  deleteDocument: async (name, meta) => {
    return await fetch(`${API_BASE}/system/remove-document`, {
      method: "DELETE",
      headers: baseHeaders(),
      body: JSON.stringify({ name, meta }),
    })
      .then((res) => res.ok)
      .catch((e) => {
        console.error(e);
        return false;
      });
  }
};

export default System;
