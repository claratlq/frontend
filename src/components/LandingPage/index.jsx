import React, { useEffect, useState } from "react";
import Workspace from "../../models/workspace";
import LoadingChat from "../WorkspaceChat/LoadingChat";
import WorkspaceChat from "../WorkspaceChat";
import paths from "../../utils/paths";

export default function LandingContainer({ loading, newChat }) {
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

  async function createNewChat() {
    var newWorkspace =  await Workspace.new({user_id: userID, name:userID}) // name is just the temporary fix, can be removed 
    newWorkspace = newWorkspace.workspace
    if (newWorkspace === undefined) { //if error in creating chat
      setCreateChatError(true)
    } else {
      setLoadingHistory(false)
      // workspace['id'] = activeChatID
      setWorkspace(newWorkspace)
    }
    console.log(newWorkspace)
    window.localStorage.setItem('newChat', false)
  }
  
  useEffect(() => {
    async function getChatID() {
      if (newChat === 'true') {
        createNewChat()
      } 
      else {
        var activeWorkspace = await Workspace.bySlug("peng-yan") //get_active_chat //Temporary is a hardcode value, will convert to actual id from backend after integration
        if (activeWorkspace === null) {
          createNewChat()
        } else {
          setLoadingHistory(false)
          setWorkspace(activeWorkspace)
        }
      }
    }
    getChatID()
  }, [newChat])

  // useEffect(() => {
  //   console.log(workspace)
  // }, [workspace])


  if (loadingHistory) return <LoadingChat />;

  // might want a if createChatError 

  return <WorkspaceChat workspace={workspace} knownHistory={history} />;
}
