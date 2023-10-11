import { RefreshCcw} from "react-feather";

export default function ResetChat({resetChat}) {

    return (
        <div title="Restart New Chat">
            <button onClick={resetChat} type="button">
                <RefreshCcw/>
            </button>
        </div>
  );
}
