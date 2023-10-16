import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Backdrop from "@material-ui/core/Backdrop";
import "../modalStyles.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
  dot: {
    backgroundColor: "red", // Change this to your desired color
  },
}));

export default function AcknowledgeTermsModal() {
  const classes = useStyles();
  const [acknowledgedTerms, setAcknowledgedTerms] = useState(
    window.localStorage.getItem("acknowledgedTerms") ? true : false,
  );
  const acknowledgementPages = AcknowledgementPages();

  const acknowledgeTerms = (event) => {
    setAcknowledgedTerms(event.target.value);
  };

  if (!acknowledgedTerms) {
    return (
      <Backdrop className={classes.backdrop} open={!acknowledgedTerms}>
        <AcknowledgementCarousel
          pages={acknowledgementPages}
          acknowledgedTerms={acknowledgeTerms}
        />
      </Backdrop>
    );
  }
  return null;
}

function AcknowledgementCarousel({ pages, acknowledgedTerms }) {
  const classes = useStyles();
  const acknowledgementPages = pages;
  const buttonTypes = ["NEXT", "Ok"];
  const [activeStep, setActiveStep] = useState(0);
  const [buttonType, setButtonType] = useState(buttonTypes[0]);
  const [currentPage, setCurrentPage] = useState(acknowledgementPages[0]);
  const maxSteps = Object.keys(acknowledgementPages).length;
  const theme = useTheme();

  const handleNext = () => {
    if (activeStep === maxSteps - 1) {
      acknowledgedTerms({ target: { value: true } });
      window.localStorage.setItem("acknowledgedTerms", true);
    } else {
      setActiveStep(activeStep + 1);
      setButtonType(buttonTypes[activeStep + 1]);
      setCurrentPage(acknowledgementPages[activeStep + 1]);
    }
  };

  return (
    <div className="modal">
      <div className="acknowledgement-modal-base">
        {currentPage}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            "& .MuiMobileStepper-dotActive": {
              backgroundColor: "black",
            },
          }}
        />
      </div>
      <button
        type="button"
        className="acknowledgment-button"
        onClick={handleNext}
      >
        {buttonType}
      </button>
    </div>
  );
}

function AcknowledgementPages() {
  const PAGES = {
    0: (
      <React.Fragment>
        <div className="acknowledgement-modal-content">
          <h1 className="acknowledgement-heading">Welcome to GAIA!</h1>
          <div className="acknowledgement-intro">
            I am GAIA, your work aid on eHab. I am able to help you with:
          </div>
          <div className="acknowledgment-tasks">
            <div className="acknowledgment-task-content">
              <div className="acknowledgment-task-content-header">
                <img
                  className="acknowledgment-task-content-image"
                  src="/pencil.svg"
                />
                <div className="acknowledgment-task-content-task">
                  Writing Tasks
                </div>
              </div>
              <div className="acknowledgment-task-content-description">
                Summarise content, highlight key points, adjust tone
              </div>
            </div>
            <div className="acknowledgment-task-content">
              <div className="acknowledgment-task-content-header">
                <img
                  className="acknowledgment-task-content-image"
                  src="/bulb.svg"
                />
                <div className="acknowledgment-task-content-task">
                  Research & Brainstorming
                </div>
              </div>
              <div className="acknowledgment-task-content-description">
                Generate ideas, draw from existing reference material
              </div>
            </div>
            <div className="acknowledgment-task-content">
              <div className="acknowledgment-task-content-header">
                <img
                  className="acknowledgment-task-content-image"
                  src="/document.svg"
                />
                <div className="acknowledgment-task-content-task">
                  Document Analysis
                </div>
              </div>
              <div className="acknowledgment-task-content-description">
                Quickly understand and summarise the content of your documents
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ),

    1: (
      <React.Fragment>
        <div className="acknowledgement-modal-content">
          <h1 className="acknowledgement-heading">Welcome to GAIA!</h1>
          <div className="acknowledgement-disclaimer">
            Important disclaimers:
          </div>
          <div className="acknowledgment-tasks">
            <div className="acknowledgment-task-content">
              <div className="acknowledgment-task-content-header">
                <img
                  className="acknowledgment-task-content-image"
                  src="/alert.svg"
                />
                <div className="acknowledgment-task-content-task">
                  GAIA may give inaccurate responses
                </div>
              </div>
              <div className="acknowledgment-task-content-description">
                Please vet through all AI-generated work
              </div>
            </div>
            <div className="acknowledgment-task-content">
              <div className="acknowledgment-task-content-header">
                <img
                  className="acknowledgment-task-content-image"
                  src="/alert.svg"
                />
                <div className="acknowledgment-task-content-task">
                  No knowledge of DSTA policies
                </div>
              </div>
              <div className="acknowledgment-task-content-description">
                Do not ask questions specific to DSTA
              </div>
            </div>
            <div className="acknowledgment-task-content">
              <div className="acknowledgment-task-content-header">
                <img
                  className="acknowledgment-task-content-image"
                  src="/alert.svg"
                />
                <div className="acknowledgment-task-content-task">
                  Only 1 chat session is allowed each time
                </div>
              </div>
              <div className="acknowledgment-task-content-description">
                Please clear the chat history to create a new chat
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ),
  };
  return PAGES;
}
