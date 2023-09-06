import { forwardRef, memo } from "react";
import { AlertTriangle , ThumbsUp, ThumbsDown} from "react-feather";
import Jazzicon from "../../../../UserIcon";
import renderMarkdown from "../../../../../utils/chat/markdown";
import Citations from "../Citation";
import Workspace from "../../../../../models/workspace";

const thumbsUp = async (uuid, slug) => {
  const ratingJson = {
    response_id: uuid,
    rating: 1,
  };
  const googleAuthToken = window.localStorage.getItem("googleAuthToken");
  const success = await Workspace.rateResponse(
    ratingJson,
    googleAuthToken
  ); 
  if (success.ok) {
    console.log('success')
  }
};

const thumbsDown = async (uuid) => {
  const ratingJson = {
    response_id: uuid,
    rating: -1,
  };

  const googleAuthToken = window.localStorage.getItem("googleAuthToken");
  const success = await Workspace.rateResponse(
    ratingJson,
    googleAuthToken
  );
  if (success.ok) {
    console.log('success')
  }
};



const PromptReply = forwardRef(
  (
    { uuid, reply, pending, error, workspace, sources = [], closed = true },
    ref
  ) => {
    if (!reply && !sources.length === 0 && !pending && !error) return null;
    if (pending) {
      return (
        <div
          ref={ref}
          className="chat__message flex justify-start mb-4 items-end"
        >
          <Jazzicon size={30} user={{ uid: workspace.slug }} />
          <div className="ml-2 pt-2 px-6 w-fit md:max-w-[75%] bg-orange-100 dark:bg-stone-700 rounded-t-2xl rounded-br-2xl rounded-bl-sm">
            <span className={`inline-block p-2`}>
              <div className="dot-falling"></div>
            </span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="chat__message flex justify-start mb-4 items-center">
          <Jazzicon size={30} user={{ uid: workspace.slug }} />
          <div className="ml-2 py-3 px-4 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-slate-100 ">
            <div className="bg-red-50 text-red-500 rounded-lg w-fit flex flex-col p-2">
              <span className={`inline-block`}>
                <AlertTriangle className="h-4 w-4 mb-1 inline-block" /> Could
                not respond to message.
              </span>
              <span className="text-xs">Reason: {error || "unknown"}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={uuid} ref={ref} className="mb-4 flex justify-start items-end">
        <Jazzicon size={30} user={{ uid: workspace.slug }} />
        <div className="ml-2 py-3 px-4 overflow-x-scroll w-fit md:max-w-[75%] bg-orange-100 dark:bg-stone-700 rounded-t-2xl rounded-br-2xl rounded-bl-sm">
          <span
            className="whitespace-pre-line text-slate-800 dark:text-slate-200 flex flex-col gap-y-1 font-[500] md:font-semibold text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(reply) }}
          />
          <Citations sources={sources} />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 md:justify-end">
            <button
              onClick={() => thumbsUp(uuid)}
              type="button"
              >
                <ThumbsUp className="h-3 w-3"/>
              </button>
              <button
              onClick={() => thumbsDown(uuid)}
              type="button"
              >
                <ThumbsDown className="h-3 w-3"/>
              </button>
          </div>
        </div>
      </div>
    );
  }
);

export default memo(PromptReply);
