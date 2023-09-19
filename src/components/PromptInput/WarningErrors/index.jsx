import "../WarningErrors/warningStyles.css"

export default function WarningModals({errorMessage, setErrorMessage}) {
    return (
    <div>
        {errorMessage != null ? (
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
        ) : (
            null
        )}
    </div>
  );
}