import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@mui/material/styles';
import Backdrop from "@material-ui/core/Backdrop";
import "../modalStyles.css"

const useStyles = makeStyles((theme) => ({
    backdrop: {
      color: "#fff",
      zIndex: theme.zIndex.drawer + 1,
    }
  }));

export default function AcknowledgePdfModal() {
    const classes = useStyles();
    const [acknowledgedTerms, setAcknowledgedTerms] = useState(window.localStorage.getItem("acknowledgedTerms")? true: false);

    const acknowledgeTerms = (event) => {
        setAcknowledgedTerms(event.target.value);
    };

    if (!acknowledgedTerms) {
        return(
            <Backdrop
                className={classes.backdrop}
                open={!acknowledgedTerms}
            > 
                <AcknowledgePdf
                 acknowledgedTerms={acknowledgeTerms}
                />
            </Backdrop>
        )
    }
    return null;
}

function AcknowledgePdf({acknowledgedTerms}) {
    const buttonType = "Ok"
  
    const handleClick = () => {
        window.localStorage.setItem("acknowledgedPdfTerms", true)
    };
  
    return (
        <div className="modal">
            <div className="acknowledgement-modal-base">
                <div className="acknowledgement-modal-content">
                    <h1 className="acknowledgement-heading">Document Review Feature</h1>
                    <div className="acknowledgement-disclaimer">Introducing the Document Review feature:</div>
                    <div className="acknowledgment-tasks">
                        <div className="acknowledgment-task-content">
                            <div className="acknowledgment-task-content-header">
                                <img className="acknowledgment-task-content-image" src="../../public/document.svg"/>
                                <div className="acknowledgment-task-content-task">Upload a PDF and ask me anything</div>
                            </div>
                            <div className="acknowledgment-task-content-description">AIDE can analyse and summarise your document for you</div>
                        </div>
                        <div className="acknowledgment-task-content">
                            <div className="acknowledgment-task-content-header">
                                <img className="acknowledgment-task-content-image" src="../../public/error.svg"/>
                                <div className="acknowledgment-task-content-task-critical">Limitations</div>
                            </div>
                            <div className="acknowledgment-task-content-description">Max 5MB size PDF allowed, no images or diagrams in PDF</div>
                        </div>
                    </div>
                </div>
            </div>
            <button 
                type="button"
                className="acknowledgment-button"
                onClick={handleClick}
            >
                {buttonType}
            </button>
        </div>
    );
}
