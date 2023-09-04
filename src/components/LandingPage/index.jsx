import React, { useEffect, useState } from "react";
import Workspace from "../../models/workspace";
import LoadingChat from "../WorkspaceChat/LoadingChat";
import WorkspaceChat from "../WorkspaceChat";
import paths from "../../utils/paths";

export default function LandingContainer({ loading }) {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [createChatError, setCreateChatError] = useState(false);
  const userID = localStorage.getItem('user')
  const [workspace, setWorkspace] = useState({
    'id' : 1,
    'name': userID
  })
  
  //workspace will be chatID for future ref
  
  // var workspace = {
  //   'id' : 1,
  //   'name': userID
  // }

  useEffect(() => {
    async function getChatID() {
      var activeChatID = await Workspace.bySlug(userID) //get_active_chat
      if (activeChatID === null) {
        var newworkspace =  await Workspace.new({user_id: userID, name:userID})
        newworkspace = newworkspace.workspace
        if (newworkspace === undefined) { //if error in creating chat
          setCreateChatError(true)
          setLoadingHistory(false) //must be removed in the future ya
        } else {
          setLoadingHistory(false)
          // workspace['id'] = activeChatID
          setWorkspace(newworkspace)
        }
      } else {
        setLoadingHistory(false)
        workspace['id'] = activeChatID
      }
    }
    getChatID()
  }, [])

  // useEffect(() => {
  //   console.log(workspace)
  // }, [workspace])


  if (loadingHistory) return <LoadingChat />;

  // might want a if createChatError 

  return <WorkspaceChat workspace={workspace} knownHistory={history} />;
}
