import { API_BASE } from "../utils/constants";
import { baseHeaders } from "../utils/request";
import { reAuthenticate } from "../utils/request";

const Workspace = {
  new: async function () {
    const { chatId }= await fetch(`${API_BASE}/reset_chat`, {
      method: "GET",
      // body: JSON.stringify(data),
      headers: baseHeaders(),
    })
      .then((res) => res.json())
      .catch((e) => {
        if (e.response.status === 403) {
          reAuthenticate()
          return { chatId: null}
        } else {
          return { chatId: null}
        }
      });

    return chatId;
  },
  
  // update: async function (slug, data = {}) {
  //   const { workspace, message } = await fetch(
  //     `${API_BASE}/workspace/${slug}/update`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: baseHeaders(),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .catch((e) => {
  //       return { workspace: null, message: e.message };
  //     });

  //   return { workspace, message };
  // },
  
  // modifyEmbeddings: async function (slug, changes = {}) {
  //   const { workspace, message } = await fetch(
  //     `${API_BASE}/workspace/${slug}/update-embeddings`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(changes), // contains 'adds' and 'removes' keys that are arrays of filepaths
  //       headers: baseHeaders(),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .catch((e) => {
  //       return { workspace: null, message: e.message };
  //     });

  //   return { workspace, message };
  // },

  chatHistory: async function () {
    const history = await fetch(`${API_BASE}/get_chat_history`, {
      method: "GET",
      headers: baseHeaders(),
      // body: JSON.stringify(slug)
    })
      .then((res) => res.json())
      .then((res) => res.history || [])
      .catch((e) => {
        if (e.response.status === 403) {
          reAuthenticate()
          return null
        } else {
          return []
        }});
    return history;
  },


  sendChat: async function (data) {
    const chatResult = await fetch(`${API_BASE}/send_message`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: baseHeaders(),
    })
      .then((res) => {
        return res.json()})
      .catch((e) => {
        console.error(e);
        if (e.response.status === 403) {
          reAuthenticate()
          return null
        } else {
          return null
        }
      });

    return chatResult;
  },


  rateResponse: async function (ratings = {}) {
    const status = await fetch(
      `${API_BASE}/rate_response`,
      {
        method: "POST",
        body: JSON.stringify(ratings), // contains 'adds' and 'removes' keys that are arrays of filepaths
        headers: baseHeaders(),
      }
    )
      .then((res) => res.json())
      .catch((e) => {
        if (e.response.status === 403) {
          reAuthenticate()
          return null
        } else {
          console.log(e)
          return null
        }
      });

    return status;
  },


  // sendChat: async function ({ slug }, prompt, mode = "query") {
  //   var header = baseHeaders();
  //   header["Content-Type"] = "application/json";
  //   const chatResult = await fetch(`http://localhost:8000/chat`, {
  //     method: "POST",
  //     body: JSON.stringify({ prompt, mode }),
  //     headers: header,
  //   })
  //     .then((res) => {return res})
  //     .catch((e) => {
  //       console.error(e);
  //       return null;
  //     });

  //   return chatResult;
  // },

  // all: async function () {
  //   const workspaces = await fetch(`${API_BASE}/workspaces`, {
  //     method: "GET",
  //     headers: baseHeaders(),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => res.workspaces || [])
  //     .catch(() => []);

  //   return workspaces;
  // },

  bySlug: async function () {
    const workspace = await fetch(`${API_BASE}/get_active_chat`, {
      method: "GET",
      headers: baseHeaders(),
      // body: JSON.stringify(slug)
    })
      .then((res) => res.json())
      .catch((e) => {
        if (e.response.status === 403) {
          reAuthenticate()
          return null
        } else {
          console.log(e)
          return null
        }
      });
      return workspace;
  },


  // delete: async function (slug) {
  //   const result = await fetch(`${API_BASE}/workspace/${slug}`, {
  //     method: "DELETE",
  //     headers: baseHeaders(),
  //   })
  //     .then((res) => res.ok)
  //     .catch(() => false);

  //   return result;
  // },


  uploadFile: async function (formData) {
    const response = await fetch(`${API_BASE}/pdf_upload`, {
      method: "POST",
      body: formData,
      headers: baseHeaders(),
    })
      .then(() => {})
      .catch((e) => {
        if (e.response.status === 403) {
          reAuthenticate()
          return null
        } else {
          console.log(e)
          return e.response
        }
      });
    return response;
  },
};

export default Workspace;
