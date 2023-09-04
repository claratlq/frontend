import React, { useEffect, useState } from "react";
import Workspace from "../../models/workspace";
import LoadingChat from "../WorkspaceChat/LoadingChat";
import ChatContainer from "../WorkspaceChat/ChatContainer";
import paths from "../../utils/paths";

export default function LandingContainer({ loading }) {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [createChatError, setCreateChatError] = useState(false);
  const userID = localStorage.getItem('user')
  
  //workspace will be chatID for future ref
  
  var workspace = {
    'id' : 1,
    'name': userID
  }

  useEffect(() => {
    async function getChatID() {
      var activeChatID = await Workspace.bySlug({user_id: userID}) //get_active_chat
      if (activeChatID === null) {
        activeChatID = await Workspace.new({user_id: userID})['workspace'] //reset_chat
        if (activeChatID === undefined) { //if error in creating chat
          setCreateChatError(true)
          setLoadingHistory(false) //must be removed in the future ya
        } else {
          setLoadingHistory(false)
          workspace['id'] = activeChatID
        }
      } else {
        setLoadingHistory(false)
        workspace['id'] = activeChatID
      }
    }
    getChatID()
    console.log(workspace)
  })

  
  if (loadingHistory) return <LoadingChat />;

  // might want a if createChatError 

  return <ChatContainer workspace={workspace} knownHistory={history} />;
}
