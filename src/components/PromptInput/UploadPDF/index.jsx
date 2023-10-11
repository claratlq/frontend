import { useEffect, useState } from "react";
import "../../PromptInput/promptinputStyles.css"
import WarningModals from "../../WarningModals"
import "../../WarningModals/warningmodalsStyles.css"
import Workspace from "../../../models/workspace";
import AcknowledgePdfModal from "../../ChatModals/PdfAcknowledgement"

export default function UploadPDF({ history, disabled, reset, documents, setDocuments, setDocumentStatus }) {

    const [errorMessage, setErrorMessage] = useState(null)
    const [clearChat, setClearChat] = useState(false)
    const [clickedPDFbutton, setClickedPDFbutton] = useState(false)

    function updatingButton(disabled) {
        const pdfButton = document.getElementById("uploadPDFbutton")

        if (disabled) {
            if (pdfButton.classList.contains('pdf-upload-enabled')) {
                pdfButton.classList.remove('pdf-upload-enabled') //changing styles
            }
            pdfButton.classList.add('pdf-upload-disabled')
            pdfButton.replaceWith(pdfButton.cloneNode(true)); //reset event listeners on buttons
            pdfButton.disabled = true; //disable button
        } else {
            if (pdfButton.classList.contains('pdf-upload-disabled')) {
                pdfButton.classList.remove('pdf-upload-disabled') //changing styles
            }
            pdfButton.classList.add('pdf-upload-enabled')
            pdfButton.disabled = false //enable button
        }

    }


    useEffect(() => {
        const inputFile = document.getElementById('uploadPDFinput')
        const pdfButton = document.getElementById("uploadPDFbutton")

        if (documents.length === 0) {
            updatingButton(false)
            inputFile.value = null //remove file name such that can reupload same file

            //event listeners
            inputFile.addEventListener('change', uploadFile);
            inputFile.addEventListener('blur', () => { console.debug("ahhhhhhhhhh") });
            pdfButton.addEventListener('click', openDialog);
        } else {
            updatingButton(true)
        }
    }, [documents])


    useEffect(() => {
        if (!disabled) {
            updatingButton(disabled)
            document.getElementById("uploadPDFbutton").addEventListener('click', openDialog);
        } else {
            updatingButton(disabled)
        }
    }, [disabled])


    useEffect(() => {
        if (document.getElementById('Reupload')) {
            document.getElementById("Reupload").addEventListener('click', openDialog);
        }
    }, [errorMessage])

    function openDialog() {
        console.debug('clicked')
        // const backdrop = document.querySelector(".backdrop");
        if (!window.localStorage.getItem("acknowledgedPdfTerms")) {
            console.debug("clicked no ack")
            setClickedPDFbutton(true)
            // backdrop.style.display = "block";
        } else if (history.length === 0) {
            document.getElementById('uploadPDFinput').click()
        } else {
            setClearChat(true)
        }
    }

    function uploadFile() {
        // const backdrop = document.querySelector(".backdrop");
        var fileList = document.getElementById('uploadPDFinput').files
        var file = fileList[0]
        if (file.type !== "application/pdf") {
            setErrorMessage("File uploaded is not a valid PDF. Please re-upload a PDF.")
        } else if (file.size > 5 * 1024 * 1024) {
            setErrorMessage("File size cannot exceed 5mb. Please re-upload a smaller file.")
        } else if (fileList.length == 1) {
            setErrorMessage(null)
            const formData = new FormData();
            formData.append("File", file, file.name);
            submitPDF(formData, file.name)
        }
        console.debug("upload done")
        // backdrop.style.display = "none";
    }

    async function submitPDF(formData, fileName) {
        const chatID = window.localStorage.getItem("chatID");
        formData.append("chatId", chatID)
        setDocumentStatus('Uploading')
        setDocuments(fileName)
        const response = await Workspace.uploadFile(formData);
        if (response.ok) {
            setDocumentStatus('Success')
        } else {
            setDocumentStatus('Error')
            console.debug("PDF Upload Failed", response.json().error)
        }
    }

    return (
        <div>
            <div className="backdrop" />
            <AcknowledgePdfModal display={clickedPDFbutton} setDisplay={setClickedPDFbutton} history={history} setWarning={setClearChat}/>
            <WarningModals display={clearChat} setDisplay={setClearChat} pdf={true} reset={reset} error={true} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            <div title="• 1-page PDF only &#10;• No images or diagrams &#10;• Do not upload any PDF &#10;   with personal data">
                <input type="file" id="uploadPDFinput" name="filename" accept="application/pdf" hidden />
                <button type="button" id="uploadPDFbutton">
                    <svg width="36" height="36" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M29.85 24.425H26.75V14.35H19C18.589 14.35 18.1947 14.1867 17.904 13.896C17.6134 13.6053 17.45 13.2111 17.45 12.8V6.6H8.15005V31.4H11.25V34.5H8.15005C7.32863 34.4975 6.54156 34.1702 5.96073 33.5893C5.3799 33.0085 5.0525 32.2214 5.05005 31.4V6.6C5.0525 5.77858 5.3799 4.99151 5.96073 4.41068C6.54156 3.82985 7.32863 3.50245 8.15005 3.5H22.1L29.85 11.25V24.425ZM20.55 6.6V11.25H25.4636L20.55 6.6ZM22.1456 20.5001L17.4486 15.8031L12.7516 20.5001L14.3956 22.1442L16.2875 20.2522V25.2H18.6125V20.2551L20.5016 22.1442L22.1456 20.5001ZM18.9296 26.8859C18.4074 26.428 17.6203 26.199 16.5683 26.199H13.6961V34.4977H15.9382V31.7447H16.5683C17.1586 31.7447 17.6543 31.6653 18.0555 31.5063C18.4604 31.3474 18.7839 31.1317 19.0261 30.8592C19.2721 30.5868 19.448 30.2765 19.554 29.9283C19.6637 29.5802 19.7186 29.2169 19.7186 28.8385C19.7186 27.9946 19.4556 27.3437 18.9296 26.8859ZM15.9382 28.0098H16.5172C16.8426 28.0098 17.0829 28.093 17.2381 28.2595C17.3932 28.4222 17.4708 28.6341 17.4708 28.8953C17.4708 29.145 17.4197 29.3456 17.3176 29.4969C17.2192 29.6445 17.0867 29.7524 16.9202 29.8205C16.7537 29.8848 16.574 29.917 16.381 29.917H15.9382V28.0098ZM26.7712 32.5792C27.1307 31.9396 27.3104 31.1374 27.3104 30.1724C27.3104 29.3172 27.1477 28.5944 26.8223 28.0041C26.5006 27.4137 26.0295 26.9653 25.4089 26.6588C24.7883 26.3523 24.0314 26.199 23.1384 26.199H20.2662V34.4977H22.9511C23.8328 34.4977 24.5991 34.3388 25.25 34.0209C25.9046 33.6993 26.4117 33.2187 26.7712 32.5792ZM24.7788 29.0031C24.9151 29.3323 24.9832 29.7486 24.9832 30.2519C24.9832 31.0655 24.8242 31.6709 24.5064 32.0683C24.1885 32.4618 23.689 32.6586 23.0078 32.6586H22.5083V28.0098H23.1611C23.5698 28.0098 23.9085 28.093 24.1771 28.2595C24.4458 28.4222 24.6464 28.6701 24.7788 29.0031ZM30.2364 34.4977H28.0283V26.199H32.9326V27.9984H30.2364V29.5821H32.7226V31.3815H30.2364V34.4977Z" fill="#525252" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
