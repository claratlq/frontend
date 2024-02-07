import { API_BASE } from "../utils/constants";

const logger = require("../utils/logger");

const Workspace = {
  new: async function () {
    const chatId = await fetch(`${API_BASE}/reset_chat`, {
      method: "GET"
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return { chatId: null };
      })
      .catch((e) => {
        logger.debug(e);
        return { chatId: null };
      });
    return chatId;
  },

  chatHistory: async function () {
    const history = await fetch(`${API_BASE}/get_chat_history`, {
      method: "GET"
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return { textHistory: [] };
      })
      .catch((e) => {
        logger.debug(e);
        return { textHistory: [] };
      });
    return history;
  },

  // sendChat: async function (data) {
  //   const chatResult = await fetch(`${API_BASE}/send_message`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return res.json()
  //       } else {
  //         console.debug('error', res)
  //         return res.json()
  //       }
  //     })
  //     .catch((e) => {
  //       console.debug(e)
  //       return null
  //     }
  //     );
  //   return chatResult;
  // },

  streamingSendChat: async function (data) {
    const header = {
      "Content-Type": "application/json"
    };
    const chatResult = await fetch(`${API_BASE}/send_message_stream`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: header
    })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        return res;
      })
      .catch((e) => {
        logger.error(e);
        return null;
      });

    return chatResult;
  },

  rateResponse: async function (ratings = {}) {
    const header = {
      "Content-Type": "application/json"
    };
    const status = await fetch(`${API_BASE}/rate_response`, {
      method: "POST",
      body: JSON.stringify(ratings), // contains 'adds' and 'removes' keys that are arrays of filepaths
      headers: header
    })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        return res;
      })
      .catch((e) => {
        logger.debug(e);
        return null;
      });
    return status;
  },

  getActiveChat: async function () {
    const workspace = await fetch(`${API_BASE}/get_active_chat`, {
      method: "GET"
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return { chatId: null };
      })
      .catch((e) => {
        logger.debug(e);
        return { chatId: null };
      });
    return workspace;
  },

  uploadFile: async function (formData) {
    const response = await fetch(`${API_BASE}/pdf_upload`, {
      method: "POST",
      body: formData
    })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        return res;
      })
      .catch((e) => {
        logger.debug(e);
        return e;
      });
    return response;
  },
  removeFile: async function (chatID) {
    const header = {
      "Content-Type": "application/json"
    };
    const response = await fetch(`${API_BASE}/pdf_delete`, {
      method: "POST",
      body: JSON.stringify({ chatId: chatID }),
      headers: header
    })
      .then((res) => {
        if (res.status === 403) {
          return null;
        }
        if (res.status === 200) {
          return res;
        }
        return res;
      })
      .catch((e) => {
        logger.debug(e);
        return e;
      });
    return response;
  }
};

export default Workspace;
