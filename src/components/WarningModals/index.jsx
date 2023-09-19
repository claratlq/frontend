import "../WarningModals/warningmodalsStyles.css"

export default function WarningModals({display, setDisplay, reset, pdf, error, errorMessage, setErrorMessage}) {
    return (
    <div>
        {errorMessage != null && error ? (
            <div className="Error-Container">
                <div className="Error-Box">
                    <p className="Error-Header">File Upload Fail</p>
                    <p className="Error-Message">{errorMessage}</p>
                    <div className="Button-Container">
                        <button id='Reupload' type="button" className="Reupload">Re-Upload</button>
                        <button className="Cancel" type="button" onClick={()=> setErrorMessage(null)}>Cancel</button>
                    </div>
                </div>
            </div>
        ) : display && pdf ? (
            <div className="Error-Container">
                <div className="Error-Box">
                    <p className="Error-Header">Upload PDF</p>
                    <p className="Error-Message">This will clear your existing chat and start a new session. Your current chat session will not be saved.</p>
                    <div className="Button-Container">
                        <button id='Reupload' type="button" className="Reupload" onClick={() => reset(setDisplay)}>Continue</button>
                        <button className="Cancel" type="button" onClick={()=> setDisplay(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        ) : display ? (
            <div className="Error-Container">
                <div className="Error-Box">
                    <p className="Error-Header">Clear this chat?</p>
                    <p className="Error-Message">Please clear your chat to start a new session. Your current chat session will not be saved.</p>
                    <div className="Button-Container">
                        <button id='Reupload' type="button" className="Reupload" onClick={() => reset(setDisplay)}>Clear</button>
                        <button className="Cancel" type="button" onClick={()=> setDisplay(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        ) : (
            null
        )}
    </div>
  );
}