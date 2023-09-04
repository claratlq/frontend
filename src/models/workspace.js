import { API_BASE } from "../utils/constants";
import { baseHeaders } from "../utils/request";

const Workspace = {
  new: async function (data = {}) {
    const { workspace, message } = await fetch(`${API_BASE}/workspace/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: baseHeaders(),
    })
      .then((res) => res.json())
      .catch((e) => {
        return { workspace: null, message: e.message };
      });

    return { workspace, message };
  },
  update: async function (slug, data = {}) {
    const { workspace, message } = await fetch(
      `${API_BASE}/workspace/${slug}/update`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: baseHeaders(),
      }
    )
      .then((res) => res.json())
      .catch((e) => {
        return { workspace: null, message: e.message };
      });

    return { workspace, message };
  },
  modifyEmbeddings: async function (slug, changes = {}) {
    const { workspace, message } = await fetch(
      `${API_BASE}/workspace/${slug}/update-embeddings`,
      {
        method: "POST",
        body: JSON.stringify(changes), // contains 'adds' and 'removes' keys that are arrays of filepaths
        headers: baseHeaders(),
      }
    )
      .then((res) => res.json())
      .catch((e) => {
        return { workspace: null, message: e.message };
      });

    return { workspace, message };
  },
  chatHistory: async function (slug) {
    const history = await fetch(`${API_BASE}/workspace/${slug}/chats`, {
      method: "POST",
      headers: baseHeaders(),
    })
      .then((res) => res.json())
      .then((res) => res.history || [])
      .catch(() => []);
    return history;
  },
  // sendChat: async function ({ slug }, message, mode = "query") {
  //   const chatResult = await fetch(`${API_BASE}/workspace/${slug}/chat`, {
  //     method: "POST",
  //     body: JSON.stringify({ message, mode }),
  //     headers: baseHeaders(),
  //   })
  //     .then((res) => {
  //       console.log(res.headers.get("content-type"));
  //       return res.json()})
  //     .catch((e) => {
  //       console.error(e);
  //       return null;
  //     });

  //   return chatResult;
  // },
  sendChat: async function ({ slug }, prompt, mode = "query") {
    var header = baseHeaders();
    header["Content-Type"] = "application/json";
    const chatResult = await fetch(`http://localhost:8000/chat`, {
      method: "POST",
      body: JSON.stringify({ prompt, mode }),
      headers: header,
    })
      .then((res) => {return res})
      .catch((e) => {
        console.error(e);
        return null;
      });

    return chatResult;
  },
  all: async function () {
    const workspaces = await fetch(`${API_BASE}/workspaces`, {
      method: "GET",
      headers: baseHeaders(),
    })
      .then((res) => res.json())
      .then((res) => res.workspaces || [])
      .catch(() => []);

    return workspaces;
  },
  bySlug: async function (slug = "") {
    const workspace = await fetch(`${API_BASE}/workspace/${slug}`, {
      method: "POST",
      headers: baseHeaders(),
    })
      .then((res) => res.json())
      .then((res) => res.workspace)
      .catch(() => null);
    return workspace;
  },
  delete: async function (slug) {
    const result = await fetch(`${API_BASE}/workspace/${slug}`, {
      method: "DELETE",
      headers: baseHeaders(),
    })
      .then((res) => res.ok)
      .catch(() => false);

    return result;
  },
  uploadFile: async function (slug, formData) {
    const response = await fetch(`${API_BASE}/workspace/${slug}/upload`, {
      method: "POST",
      body: formData,
      headers: baseHeaders(),
    });

    const data = await response.json();
    return { response, data };
  },
};

export default Workspace;
