import { API_BASE } from "../utils/constants";

const System = {
  ping: async function () {
    return await fetch(`${API_BASE}/ping`, {method:"GET"})
      .then((res) => res.json())
      .then((res) => res?.online || false)
      .catch(() => false);
  },
  checkAuth: async function () {
    return await fetch(`${API_BASE}/auth`, {method: "GET"})
      .then((res) => res.json())
      .catch((e) => {
        return { valid: false, message: e.message };
      });
  }
};

export default System;
