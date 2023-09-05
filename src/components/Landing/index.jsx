import { useEffect, useState } from "react";
import Workspace from "../../models/workspace";
import LoadingChat from "../WorkspaceChat/LoadingChat";
import WorkspaceChat from "../WorkspaceChat";

export default function LandingContainer({ newChat }) {
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [createChatError, setCreateChatError] = useState(false);
  const userID = localStorage.getItem('user')
  
  const [workspace, setWorkspace] = useState({})
  
  //workspace will be chatID for future ref
  
  // var workspace = {
  //   'id' : null,
  //   'name': userID,
  //   'slug': null
  // }

  async function createNewChat() {
    var activeChatID =  await Workspace.new({"userId": userID}) // name is just the temporary fix, can be removed 
    if (activeChatID.chatId === undefined) { //if error in creating chat
      setCreateChatError(true)
    } else {
      setLoadingHistory(false)
      var NewWorkspace = {
        'id' : activeChatID.chatId,
        'name': userID,
        'slug': activeChatID.chatId
      }
      setWorkspace(NewWorkspace)
    }
    window.localStorage.setItem('newChat', false)
  }
  
  useEffect(() => {
    async function getChatID() {
      if (newChat === 'true') {
        createNewChat()
      } 
      else {
        var activeChatID = await Workspace.bySlug({"userId": userID}) //get_active_chat //Temporary is a hardcode value, will convert to actual id from backend after integration
        if (activeChatID.chatId === undefined) {
          createNewChat()
        } else {
          setLoadingHistory(false)
          var NewWorkspace = {
            'id' : activeChatID.chatId,
            'name': userID,
            'slug': activeChatID.chatId
          }
          setWorkspace(NewWorkspace)
        }
      }
    }
    getChatID()
  }, [newChat])

  useEffect(() => {
    console.log(workspace)
  }, [workspace])


  if (loadingHistory) return <LoadingChat />;

  // Future development: create popup if there is create chat error

  return <WorkspaceChat workspace={workspace} />;
}

// workspace: {id:, name:, slug}