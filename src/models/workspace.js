import { API_BASE } from "../utils/constants";
import { baseHeaders } from "../utils/request";
import { reAuthenticate } from "../utils/request";

const Workspace = {
  new: async function (googleAuthToken) {
    const chatId = await fetch(`${API_BASE}/reset_chat`, {
      method: "GET",
      // body: JSON.stringify(data),
      headers: baseHeaders(googleAuthToken),
    })
      .then((res) => {
        if (res.status === 403) {
          reAuthenticate()
          return { chatId: null }
        } else if (res.status === 200) {
          return res.json()
        } else {
          console.log('error', res)
          return { chatId: null }
        }
      })
      .catch((e) => {
        console.log(e)
        return { chatId: null }
      }
      );
    return chatId;
  },

  chatHistory: async function (googleAuthToken) {
    const history = await fetch(`${API_BASE}/get_chat_history`, {
      method: "GET",
      headers: baseHeaders(googleAuthToken),
      // body: JSON.stringify(slug)
    })
      .then((res) => {
        if (res.status === 403) {
          reAuthenticate()
          return []
        } else if (res.status === 200) {
          return (res.json().history || [])
        } else {
          console.log('error', res)
          return []
        }
      })
      .catch((e) => {
        console.log(e)
        return []
      }
      );
    return history;
  },

  sendChat: async function (data, googleAuthToken) {
    const chatResult = await fetch(`${API_BASE}/send_message`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: baseHeaders(googleAuthToken),
    })
      .then((res) => {
        if (res.status === 403) {
          reAuthenticate()
          return null
        } else if (res.status === 200) {
          return res.json()
        } else {
          console.log('error', res)
          return res.json()
        }
      })
      .catch((e) => {
        console.log(e)
        return null
      }
      );
    return chatResult;
  },

  streamingSendChat: async function (data, googleAuthToken) {
    var header = baseHeaders(googleAuthToken);
    header["Content-Type"] = "application/json";
    const chatResult = await fetch(`${API_BASE}/send_message_stream`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: header,
    })
      .then((res) => {
        if (res.status === 403) {
          reAuthenticate()
          return null
        } else if (res.status === 200) {
          return res
        } else {
          console.log('error', res)
          return res
        }
      })
      .catch((e) => {
        console.error(e);
        return null;
      });

    return chatResult;
  },

  rateResponse: async function (ratings = {}, googleAuthToken) {
    const status = await fetch(
      `${API_BASE}/rate_response`,
      {
        method: "POST",
        body: JSON.stringify(ratings), // contains 'adds' and 'removes' keys that are arrays of filepaths
        headers: baseHeaders(googleAuthToken),
      }
    )
      .then((res) => {
        if (res.status === 403) {
          reAuthenticate()
          return null
        } else if (res.status === 200) {
          return res
        } else {
          console.log('error', res)
          return res
        }
      })
      .catch((e) => {
        console.log(e)
        return null
      }
      );
    return status;
  },

  getActiveChat: async function (googleAuthToken) {
    const workspace = await fetch(`${API_BASE}/get_active_chat`, {
      method: "GET",
      headers: baseHeaders(googleAuthToken),
      // body: JSON.stringify(slug)
    })
      .then((res) => {
        if (res.status === 403) {
          reAuthenticate()
          return { chatId: null }
        } else if (res.status === 200) {
          return res.json()
        } else {
          console.log('error', res)
          return { chatId: null }
        }
      })
      .catch((e) => {
        console.log(e)
        return { chatId: null }
      }
      );
    return workspace;
  },

  uploadFile: async function (formData, googleAuthToken) {
    const response = await fetch(`${API_BASE}/pdf_upload`, {
      method: "POST",
      body: formData,
      headers: baseHeaders(googleAuthToken),
    })
      .then((res) => {
        if (res.status === 403) {
          reAuthenticate()
          return null
        } else if (res.status === 200) {
          return res
        } else {
          console.log('error', res)
          return res
        }
      })
      .catch((e) => {
        console.log(e)
        return e
      }
      );
    return response;
  },
};

export default Workspace;
