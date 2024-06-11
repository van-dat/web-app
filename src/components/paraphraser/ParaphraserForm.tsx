import { useEffect, useState } from "react";
import {
  BoxFooter,
  BoxLeft,
  ButtonDelete,
  ButtonStatistics,
  ButtonUpload,
  FileInput,
  FormSummarize,
  PasteTextBox,
  PasteTextContainer,
  Separation,
  Textarea,
  Tooltiptext,
} from "../summarize/SummarizeStyleComponent";
import {
  Clipboard2,
  CloudArrowUp,
  Dot,
  FileArrowDown,
  Files,
  Trash,
} from "react-bootstrap-icons";
import {
  funcCutWord,
  funcSentenceCounter,
  funcWordCounter,
} from "../functions/Counter";
import funcCopyToClipboard from "../functions/CopyToClipboard";
import classNames from "classnames";
import funcDownloadWord from "../functions/DownloadWord";
import ModalDelete from "./ModalDelete";
import styled from "styled-components";
import LimitWord from "../LimitWord";

const MODES = [
  {
    id: 0,
    name: "standard",
  },
  {
    id: 1,
    name: "fluency",
  },
  {
    id: 2,
    name: "formal",
  },
  {
    id: 3,
    name: "academic",
  },
  {
    id: 4,
    name: "creative",
  },
  {
    id: 5,
    name: "simple",
  },
  {
    id: 6,
    name: "casual",
  },
  {
    id: 7,
    name: "shorten",
  },
];
const LIMIT_WORD = 225;
type Props = {
  paraphraserResult: any;
  setLoading: any;
  handleParaphraser: any;
  loading: any;
};

const ParaphraserForm = (props: Props) => {
  const { paraphraserResult, setLoading, handleParaphraser, loading } = props;
  const [wordCounter, setWordCounter] = useState<number>(0);
  const [tabName, setTabName] = useState<string>("standard");
  const [wordParaphraserCounter, setWordParaphraserCounter] = useState<number>(
    funcWordCounter(paraphraserResult?.standard) || 0
  );
  const [showModalDelete, setShowModelDelete] = useState<boolean>(false);
  const [showBoxLimit, setShowBoxLimit] = useState<boolean>(false)
  const [sentanceParaphraserCounter, setSentenceParaphraserCounter] =
    useState<number>(funcSentenceCounter(paraphraserResult?.standard) || 0);
  const [tabIndex, setTabIndex] = useState(0);
  const [paraphraser, setParaphraser] = useState<string>("");
  const [textareaResult, setTextareaResult] = useState<string>(
    paraphraserResult ? paraphraserResult[tabName] : ""
  );
  const [tabPanel, setTabPanel] = useState(0);

  useEffect(() => {
    setTextareaResult(paraphraserResult ? paraphraserResult[tabName] : "");
    if (paraphraserResult) {
      setWordParaphraserCounter(funcWordCounter(paraphraserResult[tabName]));
      setSentenceParaphraserCounter(
        funcSentenceCounter(paraphraserResult[tabName])
      );
    }
  }, [paraphraserResult]);
  const handleSetWordCounter = (value) => {
    // const content = funcCutWord(value, 125);
    // console.log({ content });
    // setParaphraser(funcCutWord(value, 5));
    setParaphraser(value);
    if(funcWordCounter(value)>LIMIT_WORD){
      setShowBoxLimit(true)
    }
    // getHighlightedText();
    // setParaphraser(getHighlightedText());
    setWordCounter(funcWordCounter(value));
  };
  const handlePasteData = () => {
    navigator.clipboard
      .readText()
      .then((clipboardData) => {
        const content = funcCutWord(clipboardData, 125);
        console.log(content);
        setParaphraser(content);
        handleSetWordCounter(clipboardData);
      })
      .catch((err) => {
        console.error("Failed to read from clipboard", err);
      });
  };
  const handleCopyFullText = () => {
    funcCopyToClipboard(textareaResult);
  };
  const handleOnParaphraser = () => {
    setLoading(true);
    handleParaphraser(paraphraser);
  };
  const handleUploadDoc = () => {
    var fileInput: any = document.getElementById("fileInput");
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        var fileContent = e.target.result;
        setParaphraser(fileContent);
        setWordCounter(funcWordCounter(fileContent));
      };
      reader.readAsText(file);
    }
  };
  const handleExport = () => {
    funcDownloadWord(textareaResult, "paraphraser_results");
  };
  const btnCl = classNames({
    "button is-warning is-rounded": true,
    "is-loading": loading,
  });
  const clTabIndex = classNames({
    "is-active": true,
  });
  const clTabOriginal = classNames({
    "is-active": tabPanel == 0,
    "is-w-50": true,
  });
  const clTabparaphrased = classNames({
    "is-active": tabPanel == 1,
    "is-w-50": true,
  });
  const handleSetTabIndex = (index, tabName) => {
    setTabIndex(index);
    if (paraphraserResult&&paraphraserResult[tabName]) {
      setTabName(tabName);
      setTextareaResult(paraphraserResult[tabName]);
      setWordParaphraserCounter(funcWordCounter(paraphraserResult[tabName]));
      setSentenceParaphraserCounter(
        funcSentenceCounter(paraphraserResult[tabName])
      );
    } else {
      setTextareaResult("");
      setWordParaphraserCounter(0);
      setSentenceParaphraserCounter(0);
    }
  };
  const handleDelete = () => {
    setShowModelDelete(false);
    setParaphraser("");
  };
  // const [htmlContent, setHtmlContent] = useState('<p>Editable HTML content</p>');
  // const contentEditableRef:any = useRef(null);
  // const handleContentChange = (event) => {
  //   const selection:any = window.getSelection();
  //   const range = selection.getRangeAt(0);
  //   const offset = range.startOffset;
  //   const node = range.startContainer;

  //   // Update the HTML content
  //   console.log(event.target.innerHTML)
  //   setHtmlContent(funcCutWord(event.target.innerHTML,5) );
  //   // setHtmlContent(funcCutWord(contentEditableRef.current.innerHTML,5 ) );

  //   // Restore the caret position
  //   const newRange = new Range();
  //   newRange.setStart(node, offset);
  //   newRange.setEnd(node, offset);
  //   selection.removeAllRanges();
  //   selection.addRange(newRange);
  // };
  return (
    <FormSummarize id="form_paraphraser" className="form-summarize">
      <ModalDelete
        setShowModelDelete={setShowModelDelete}
        showModalDelete={showModalDelete}
        handleDelete={handleDelete}
      />
      <div className="header_form">
        <div className="tabs paraphraser-tabs">
          <ul>
            <Model>Modes:</Model>
            {MODES.map((item:any) => {
              let moreCl = "";
              if (paraphraserResult && !paraphraserResult[item?.name]) {
                moreCl += " is-hide";
              }

              return (
                <li
                key={item.id}
                  className={tabIndex == item.id ? clTabIndex + moreCl : moreCl}
                  onClick={() => handleSetTabIndex(item.id, item.name)}
                >
                  <a>{item.name}</a>
                </li>
              );
            })}

            {/* <Synonyms>Synonyms:</Synonyms> */}
            {/* <InputRangeComponent
              tabIndex={tabIndex}
              summaryLengthParagraph={summaryLengthParagraph}
              summaryLengthKeySentences={summaryLengthKeySentences}
              setSummaryLengthParagraph={setSummaryLengthParagraph}
              setSummaryLengthKeySentences={setSummaryLengthKeySentences}
            /> */}
          </ul>
        </div>
      </div>

      <div className="header_form_mobile">
        <div className="tabs">
          <ul>
            <li className={clTabOriginal} onClick={() => setTabPanel(0)}>
              <a>Original</a>
            </li>
            <li className={clTabparaphrased} onClick={() => setTabPanel(1)}>
              <a>Paraphrased</a>
            </li>
          </ul>
        </div>
        {tabPanel == 0 && (
          <BoxTextarea className="column">
            <Textarea
              placeholder='To rewrite text, enter or paste it here and press "Paraphrase."'
              value={paraphraser}
              onChange={(e: any) => handleSetWordCounter(e.target.value)}
            ></Textarea>

            {!wordCounter && (
              <PasteTextContainer onClick={handlePasteData}>
                <PasteTextBox>
                  <Clipboard2 />
                  <div>Paste Text</div>
                </PasteTextBox>
              </PasteTextContainer>
            )}
            {paraphraser && (
              <ButtonDelete
                data-target="modal_delete"
                className="js-modal-trigger is-flex is-align-items-center"
                onClick={() => setShowModelDelete(true)}
              >
                <Trash />
              </ButtonDelete>
            )}
          </BoxTextarea>
        )}
        {tabPanel == 1 && (
          <Textarea
            className="column"
            value={textareaResult}
            onChange={(e: any) => setTextareaResult(e.target.value)}
            // disabled={paraphraserResult[tabName] == "" ? true : false}
          ></Textarea>
        )}
      </div>

      <div className="columns ml-0 mr-0 mt-0 mobile-none">
        <BoxLeft className="column is-half is-flex is-justify-content-center">
          {
            <Textarea
              placeholder='Enter or paste your text and press "Paraphraser."'
              value={paraphraser}
              onChange={(e: any) => handleSetWordCounter(e.target.value)}
            ></Textarea>
          }
          {/* <div
      contentEditable={true}
      onInput={handleContentChange}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{ border: '1px solid #ccc', padding: '5px' }}
    /> */}
          {/* <div
            id="inputBoxParaphraser"
            role="textbox"
            contentEditable={true}
            style={{ marginTop: "5px" }}
            dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
            onInput={(e:any)=>setParaphraser(e.target.innerHTML)}
          /> */}

          {paraphraser && (
            <ButtonDelete
              data-target="modal_delete"
              className="js-modal-trigger is-flex is-align-items-center"
              onClick={() => setShowModelDelete(true)}
            >
              <Trash />
            </ButtonDelete>
          )}

          {!paraphraser && (
            <PasteTextContainer onClick={handlePasteData}>
              <PasteTextBox>
                <Clipboard2 />
                <div>Paste Text</div>
              </PasteTextBox>
            </PasteTextContainer>
          )}
        </BoxLeft>
        <Separation />

        <div className="column is-half">
          <Textarea
            value={textareaResult}
            onChange={(e: any) => setTextareaResult(e.target.value)}
            disabled={textareaResult == "" ? true : false}
          ></Textarea>
        </div>
      </div>

      <div className="columns ml-0 mr-0">
        <div className="column is-half p-0">
          <div className="is-flex is-justify-content-space-between is-align-items-center mb-2 p-3">
            {paraphraser ? (
              wordCounter == 1 ? (
                "1 word "
              ) : wordCounter > LIMIT_WORD && showBoxLimit ? (
                <LimitWord LIMIT_WORD={LIMIT_WORD} wordCounter={wordCounter} setShowBoxLimit={setShowBoxLimit}/>
              ) : (
                `${wordCounter>LIMIT_WORD?wordCounter+ "/"+LIMIT_WORD : wordCounter} words`
              )
            ) : (
              <ButtonUpload className="tooltip">
                <div
                  id="fileUploadForm"
                  className="is-flex is-align-items-center"
                >
                  <FileInput
                    type="file"
                    id="fileInput"
                    accept=".docx, .doc"
                    onChange={handleUploadDoc}
                  />
                  <CloudArrowUp />
                  <label htmlFor="fileInput" className="ml-1 cursor-pointer">
                    Upload Doc
                  </label>
                </div>
                <Tooltiptext className="tooltiptext">
                  Browse for a document
                </Tooltiptext>
              </ButtonUpload>
            )}
            <button onClick={handleOnParaphraser} className={btnCl}
              disabled={!paraphraser || wordCounter>LIMIT_WORD}
              >
              Paraphrase
            </button>
          </div>
        </div>
        <Separation />
        {textareaResult !== "" && (
          <BoxFooter className="column is-half is-flex is-justify-content-space-between is-align-items-center">
            <div className="is-flex is-align-items-center mb-2">
              <p>
                {sentanceParaphraserCounter === 1
                  ? "1 sentence"
                  : `${sentanceParaphraserCounter} sentences`}
              </p>
              <Dot />
              <p>
                {wordParaphraserCounter === 1
                  ? "1 word"
                  : `${wordParaphraserCounter} words`}
              </p>
            </div>
            {paraphraserResult && (
              <div className="is-flex is-align-items-center">
                <ButtonStatistics
                  className="p-2 mt-2 tooltip"
                  onClick={handleExport}
                >
                  <FileArrowDown size={22} />
                  <Tooltiptext className="tooltiptext">Export</Tooltiptext>
                </ButtonStatistics>
                <ButtonStatistics
                  className="p-2 mt-2 tooltip"
                  onClick={handleCopyFullText}
                >
                  <Files size={22} />
                  <Tooltiptext className="tooltiptext">
                    Copy full text
                  </Tooltiptext>
                </ButtonStatistics>
              </div>
            )}
          </BoxFooter>
        )}
      </div>
    </FormSummarize>
  );
};
const Model = styled.p`
  margin: 0;
`;
// const Synonyms = styled.p`
//   margin: 0;
// `;
const BoxTextarea = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;
export default ParaphraserForm;
