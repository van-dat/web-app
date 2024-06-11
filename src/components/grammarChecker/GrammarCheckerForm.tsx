import { useState } from "react";
import {
  // ArrowRepeat,
  Clipboard2,
  FileArrowDown,
  FileBarGraph,
  Files,
  // ThreeDotsVertical,
  Trash,
  Upload,
  X,
} from "react-bootstrap-icons";
import styled from "styled-components";
import funcDownloadWord from "../functions/DownloadWord";
import funcCopyToClipboard from "../functions/CopyToClipboard";
import {
  funcCharacterCounter,
  funcReadingTime,
  funcSentenceCounter,
  funcWordCounter,
} from "../functions/Counter";
import classNames from "classnames";
import {
  ButtonDelete,
  Tooltiptext,
} from "../summarize/SummarizeStyleComponent";
import ModalDelete from "../paraphraser/ModalDelete";
import Drawer from "react-modern-drawer";
import ItemDrawer from "../summarize/ItemDrawer";
import ContentEditable from "react-contenteditable";

const LANGUAGES = [
  {
    id: 0,
    language: "English (US)",
  },
  // {
  //   id: 1,
  //   language: "English (UK)",
  // },
];
type Props = {
  errorCounter: number;
  setGrammar: any;
  grammar: string;
  handleFixError: any;
  tabIndex: number;
  setTabIndex: any;
  handleGrammarChecker: any;
  grammarResult: string;
  handleSetTabIndex: any;
  loading: boolean;
  setLoading: any;
  setErrorList: any;
  setErrorCounter: any;
};

const GrammarCheckerForm = (props: Props) => {
  const {
    errorCounter,
    setGrammar,
    grammar,
    handleFixError,
    tabIndex,
    setErrorList,
    // setTabIndex,
    setErrorCounter,
    handleGrammarChecker,
    // grammarResult,
    loading,
    setLoading,
    handleSetTabIndex,
  } = props;
  const [wordCounter, setWordCounter] = useState<number>(0);
  const [characterCounter, setCharacterCounter] = useState<number>(0);
  const [sentenceCounter, setSentenceCounter] = useState<number>(0);
  const [showModalDelete, setShowModelDelete] = useState<boolean>(false);
  const [showResultCounter, setShowResultCounter] = useState<boolean>(false);
  const [defaultCounter, setDefaultCounter] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [languageName, setLanguageName] = useState(LANGUAGES[0].language);
  const handleStatistics = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };
  const handleSetValueTextarea = (value) => {
    setGrammar(value);

    value = value.replaceAll('<span class="highlight-text">', "");
    value = value.replaceAll("</span>", "");
    value = value.replaceAll("&nbsp;", " ");
    setWordCounter(funcWordCounter(value));
    setDefaultCounter(
      funcWordCounter(value) === 1
        ? "1 word"
        : `${funcWordCounter(value)} words`
    );
    setCharacterCounter(funcCharacterCounter(value));
    setSentenceCounter(funcSentenceCounter(value));
  };
  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((clipboardData) => {
        setGrammar(clipboardData);
        setWordCounter(funcWordCounter(clipboardData));
        setDefaultCounter(
          funcWordCounter(clipboardData) === 1
            ? "1 word"
            : `${funcWordCounter(clipboardData)} words`
        );

        setCharacterCounter(funcCharacterCounter(clipboardData));
        setSentenceCounter(funcSentenceCounter(clipboardData));
      })
      .catch((err) => {
        console.error("Failed to read from clipboard", err);
      });
  };
  const handleUploadDoc = () => {
    var fileInput: any = document.getElementById("fileInput");
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        var fileContent = e.target.result;
        setGrammar(fileContent);
        setWordCounter(funcWordCounter(fileContent));
        setCharacterCounter(funcCharacterCounter(fileContent));
        setSentenceCounter(funcSentenceCounter(fileContent));
        setDefaultCounter(
          funcWordCounter(fileContent) === 1
            ? "1 word"
            : `${funcWordCounter(fileContent)} words`
        );
      };
      reader.readAsText(file);
    }
  };
  const handleExport = () => {
    if (grammar) funcDownloadWord(grammar, "grammar");
  };
  const handleCopyFullText = () => {
    if (grammar) funcCopyToClipboard(grammar);
  };
  const clTabIndex = classNames({
    "is-active": true,
  });
  const handleDelete = () => {
    setShowModelDelete(false);
    setGrammar("");
    setWordCounter(0);
    setErrorCounter(0);
    setErrorList([]);
  };
  const handleSetDefaultCounter = (text) => {
    setDefaultCounter(text);
    setShowResultCounter(false);
  };
  const btnCl = classNames({
    "button is-warning is-rounded": true,
    "is-loading": loading,
  });
  const handleSetLanguage = (id, language) => {
    setLanguageName(language);
    setShowLanguage(false);
    handleSetTabIndex(id, language);
  };

  return (
    <Container className="p-4 user-select-none">
      <ModalDelete
        setShowModelDelete={setShowModelDelete}
        showModalDelete={showModalDelete}
        handleDelete={handleDelete}
      />
      {/* header desktop */}
      <div className="header_form mb-5">
        <div className="tabs paraphraser-tabs">
          <ul className="m-0">
            <Languages>Languages:</Languages>
            {LANGUAGES.map((item: any) => {
              let moreCl = "";
              // if (paraphraserResult && !paraphraserResult[item?.language]) {
              //   moreCl += " is-hide";
              // }

              return (
                <li
                  key={item.id}
                  className={tabIndex == item.id ? clTabIndex + moreCl : moreCl}
                  onClick={() => handleSetTabIndex(item.id, item.language)}
                >
                  <a>{item.language}</a>
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
          <ButtonGrammarCheck
            disabled={!grammar}
            className={btnCl}
            onClick={() => {
              handleGrammarChecker(grammar);
              setLoading(true);
            }}
          >
            Check Grammar
          </ButtonGrammarCheck>
        </div>

        {grammar && (
          <ButtonDelete
            data-target="modal_delete"
            className="js-modal-trigger is-flex is-align-items-center"
            onClick={() => setShowModelDelete(true)}
          >
            <Trash />
          </ButtonDelete>
        )}
      </div>
      {/* end header desktop */}

      <HeaderFormMobile>
        <BoxLanguage
          className="dropup"
          onClick={() => setShowLanguage(!showLanguage)}
        >
          <DefaultLanguage>{languageName}</DefaultLanguage>
          <IconOption showResultCounter={showLanguage}></IconOption>
          {showLanguage && (
            <BoxListLanguage>
              {LANGUAGES.map((item) => (
                <BoxLanguage
                  key={item.id}
                  className="pt-1 pb-2"
                  onClick={() => handleSetLanguage(item.id, item.language)}
                >
                  <DefaultLanguage>{item.language}</DefaultLanguage>
                </BoxLanguage>
              ))}
            </BoxListLanguage>
          )}
        </BoxLanguage>
        <div className="is-flex">
          <ButtonGrammarCheck
            disabled={!grammar}
            className={btnCl}
            onClick={() => {
              handleGrammarChecker(grammar);
              setLoading(true);
            }}
          >
            Check Grammar
          </ButtonGrammarCheck>
          {grammar && (
            <ButtonDelete
              data-target="modal_delete"
              className="js-modal-trigger is-flex is-align-items-center pl-3 pr-3 ml-2"
              onClick={() => setShowModelDelete(true)}
            >
              <Trash />
            </ButtonDelete>
          )}
        </div>
      </HeaderFormMobile>

      {/* <BoxTextarea> */}

      {/* <Textarea
        grammar={grammar}
        id="textarea-summarize"
        placeholder="Start by writing, pasting (Ctrl + V) text, or uploading a document (doc, pdf)."
        value={grammar}
        className="user-select-none"
        onChange={(e: any) => handleSetValueTextarea(e.target.value)}
        // dangerouslySetInnerHTML={{ __html: grammar }}
      ></Textarea> */}
      <TextareaGrammar grammar={grammar}>
        {grammar.length === 0 && (
          <PlaceholderTextarea
            style={{ position: "relative" }}
            className="placeholder"
          >
            Start by writing, pasting (Ctrl + V) text, or uploading a document (doc, pdf).
          </PlaceholderTextarea>
        )}
        <ContentEditable
          className="textarea-grammar-check"
          html={grammar}
          onChange={(e: any) => handleSetValueTextarea(e.target.value)}
        />
      </TextareaGrammar>
      {/* <div
        style={{ height: "100px",color:"red" }}
        data-gramm_editor="true"
        wt-ignore-input="true"
        contentEditable="true"
        spellCheck="false"
        onInput={(e: any) => {handleSetValueTextarea(e.target.innerHTML)
        console.log(e.target.innerHTML)
        
        }}
        dangerouslySetInnerHTML={{ __html: grammar }}
      /> */}
      {/* {grammar && (
        <ButtonDelete
        data-target="modal_delete"
        className="js-modal-trigger is-flex is-align-items-center"
        onClick={() => setShowModelDelete(true)}
        >
            <Trash />
          </ButtonDelete>
        )} */}
      {/* </BoxTextarea> */}
      {!grammar && (
        <BoxPasteUpload>
          <ButtonPaste onClick={handlePaste}>
            <Clipboard2 className="mr-2" />
            Paste Text
          </ButtonPaste>
          <ButtonPaste onClick={handleUploadDoc}>
            <form id="fileUploadForm" encType="multipart/form-data">
              <FileInput
                type="file"
                id="fileInput"
                accept=".docx, .doc, .pdf"
                onChange={handleUploadDoc}
              />
              <label htmlFor="fileInput" className="ml-1 cursor-pointer">
                <Upload className="mr-2" />
                Upload Document
              </label>
            </form>
          </ButtonPaste>
        </BoxPasteUpload>
      )}
      {/* BottomMobile mobile */}
      {grammar && (
        <BoxBottomMobile>
          <div>
            {defaultCounter}
            <p>
              {errorCounter > 1
                ? `${errorCounter} errors`
                : `${errorCounter} error`}
            </p>
          </div>
          <div>
            {errorCounter > 0 && (
              <ButtonFixError
                disabled={!errorCounter}
                className={btnCl}
                // className="btn_download button is-warning"
                onClick={handleFixError}
              >
                Fix Errors
              </ButtonFixError>
            )}
          </div>
          <div className="is-flex is-align-items-center">
            <ButtonEvent className="tooltip" onClick={handleExport}>
              <FileArrowDown size={22} />
              <Tooltiptext className="tooltiptext">Export</Tooltiptext>
            </ButtonEvent>
            <Separation />
            <ButtonEvent className="tooltip" onClick={handleCopyFullText}>
              <Files size={22} />
              <Tooltiptext className="tooltiptext">Copy full text</Tooltiptext>
            </ButtonEvent>
          </div>
        </BoxBottomMobile>
      )}
      {/* end BottomMobile mobile */}

      {/* BottomMobile desktop */}
      {grammar && (
        <BoxBottom>
          <BoxBottomLeft className="is-flex">
            {errorCounter > 0 && (
              <ErrorCounter size={28}>{errorCounter}</ErrorCounter>
            )}

            {errorCounter > 0 && (
              <ButtonFixError
                disabled={!errorCounter}
                className={btnCl}
                // className="btn_download button is-warning"
                onClick={handleFixError}
              >
                Fix Errors
              </ButtonFixError>
            )}
          </BoxBottomLeft>
          <BoxBottomRight className="is-flex is-align-items-center is-flex-wrap-wrap	">
            {/* <BoxButtonParaphrase>
              <ButtonParaphrase>
                <ArrowRepeat className="mr-1" />
                Paraphrase
              </ButtonParaphrase>
              <Separation />
            </BoxButtonParaphrase> */}
            <BoxDefaultCounter className="dropup">
              <DefaultCounter
                onClick={() => {
                  setShowResultCounter(!showResultCounter);
                }}
              >
                {defaultCounter}
                <IconOption showResultCounter={!showResultCounter}></IconOption>
              </DefaultCounter>
              {showResultCounter && (
                <div className="dropup-content">
                  <ItemCounter
                    onClick={() =>
                      handleSetDefaultCounter(
                        wordCounter === 1 ? "1 word" : `${wordCounter} words`
                      )
                    }
                  >
                    {wordCounter === 1 ? "1 word" : `${wordCounter} words`}
                  </ItemCounter>
                  <ItemCounter
                    onClick={() =>
                      handleSetDefaultCounter(
                        characterCounter === 1
                          ? "1 character"
                          : `${characterCounter} characters`
                      )
                    }
                  >
                    {characterCounter === 1
                      ? "1 character"
                      : `${characterCounter} characters`}
                  </ItemCounter>
                  <ItemCounter
                    onClick={() =>
                      handleSetDefaultCounter(
                        sentenceCounter === 1
                          ? "1 sentence"
                          : `${sentenceCounter} sentences`
                      )
                    }
                  >
                    {sentenceCounter === 1
                      ? "1 sentence"
                      : `${sentenceCounter} sentences`}
                  </ItemCounter>
                </div>
              )}
            </BoxDefaultCounter>
            <Separation />
            {errorCounter != 0 && (
              <BoxButtonStatistics>
                <ButtonEvent className="tooltip" onClick={handleStatistics}>
                  <FileBarGraph size={22} />
                  <Tooltiptext className="tooltiptext">Statistics</Tooltiptext>
                </ButtonEvent>
                <Separation />
              </BoxButtonStatistics>
            )}
            <ButtonEvent className="tooltip" onClick={handleExport}>
              <FileArrowDown size={22} />
              <Tooltiptext className="tooltiptext">Export</Tooltiptext>
            </ButtonEvent>
            <Separation />
            <ButtonEvent className="tooltip" onClick={handleCopyFullText}>
              <Files size={22} />
              <Tooltiptext className="tooltiptext">Copy full text</Tooltiptext>
            </ButtonEvent>
            {/* <Separation />
            <ButtonEvent className="">
              <ThreeDotsVertical />
            </ButtonEvent> */}
          </BoxBottomRight>
        </BoxBottom>
      )}
      {/* end BottomMobile desktop */}
      <Drawer
        open={isOpenDrawer}
        // onClose={toggleDrawer}
        direction="right"
        className="min-width-380"
      >
        <div className="is-flex is-justify-content-space-between p-4">
          <Statistics>Statistics</Statistics>
          <ButtonClose>
            <X
              color="black"
              cursor={"pointer"}
              size={24}
              onClick={() => setIsOpenDrawer(false)}
            />
          </ButtonClose>
        </div>
        <hr className="m-0" />
        <div>
          <ItemDrawer
            title="TOTAL ERRORS"
            reduction={`${errorCounter || 0} `}
          />
          <ItemDrawer
            title="ERROR PERCENTAGE"
            reduction={`${
              ((errorCounter / wordCounter) * 100).toFixed(1) || 0
            } %`}
          />
          <ItemDrawer
            title="READING TIME"
            reduction={funcReadingTime(grammar)}
          />
          {/* <ItemDrawer title="READABILITY" reduction='READABILITY' />
          <ItemDrawer title="SENTIMENT" reduction="SENTIMENT" /> */}
        </div>
      </Drawer>
    </Container>
  );
};
const PlaceholderTextarea = styled.label`
  position: absolute !important;
`;
const TextareaGrammar: any = styled.div`
  color: #0b3f51;
  overflow-y: auto;
  position: relative;
  height: ${(props: any) => (props.grammar ? "28vh" : "10vh")} !important;
  &:focus-visible {
    outline: none;
  }
`;
// const BoxTextarea = styled.div`
//   position: relative;
// `;
const BoxBottomMobile = styled.div`
  display: none !important;
  @media screen and (max-width: 635px) {
    display: flex !important;
  }
  color: black;
  width: 90%;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  & p {
    margin: 0;
  }
`;
const BoxListLanguage = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  margin-left: -10px;
  background-color: white;
  box-shadow: 0 3px 10px 0 rgba(124, 147, 173, 0.35);
`;
const BoxLanguage = styled.div`
  display: flex;
  min-width: 130px;
  position: relative;
  align-items: center;
  padding: 0 10px;
  color: #0077a3;
  &:hover {
    cursor: pointer;
    background-color: #e6f8fe;
  }
  & strong {
    position: absolute;
    margin-left: 6px;
    border-color: #0077a3;
    border-style: solid;
    border-width: 0 2px 2px 0;
    content: "";
    height: 6px;
    width: 6px;
  }
`;
const DefaultLanguage = styled.div`
  // color: black;
  margin-right: 4px;
`;
const HeaderFormMobile = styled.div`
  display: none;
  margin-bottom: 20px;
  position: relative;
  @media screen and (max-width: 635px) {
    display: flex !important;
    justify-content: space-between;
  }
`;
const ButtonClose = styled.span`
  height: 24px;
  border-radius: 50%;
  background-color: transparent;
  &:hover {
    background-color: #e6f8fe;
  }
`;
const Statistics = styled.b`
  color: black;
  font-size: 20px;
`;
const Languages = styled.div`
  color: black;
`;
const ButtonGrammarCheck = styled.button`
  @media screen and (min-width: 635px) {
    position: absolute;
    right: 38px;
    bottom: 6px;
  }
`;
// const BoxButtonParaphrase = styled.div`
//   display: flex;
//   align-items: center;
//   // @media screen and (max-width: 928px) {
//   //   display: none !important;
//   // }
// `;
const BoxButtonStatistics = styled.div`
  display: flex;
  align-items: center;
  // @media screen and (max-width: 928px) {
  //   display: none !important;
  // }
`;
const BoxBottom = styled.div`
  position: absolute;
  bottom: 20px;
  width: calc(100% - 32px);
  z-index: 2;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 22px 0px;
  border-radius: 16px;
  border: 0.5px solid rgb(222, 225, 227);
  background-color: rgb(255, 255, 255);
  @media screen and (max-width: 635px) {
    display: none !important;
  }
`;
const BoxBottomLeft = styled.div`
  @media screen and (max-width: 1208px) {
  }
`;
const BoxBottomRight = styled.div`
  color: #0077a3;
  @media screen and (max-width: 1208px) {
  }
`;
const ItemCounter = styled.div`
  padding: 8px 16px;
  &:hover {
    background-color: #e6f8fe;
  }
`;
const FileInput = styled.input`
  display: none;
`;
const BoxDefaultCounter = styled.div`
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
  &:hover {
    background-color: #e6f8fe;
  }
`;
const DefaultCounter = styled.div`
  width: 140px;
  & strong {
    border-color: #0077a3;
    border-style: solid;
    border-width: 0 2px 2px 0;
    content: "";
    display: block;
    height: 6px;
    position: absolute;
    top: 50%;
    width: 6px;
  }
`;
const IconOption: any = styled.strong`
  transform: ${(props: any) =>
    props.showResultCounter
      ? "rotate(-45deg) scaleY(-1) translateY(calc(-50% + 5px))"
      : "rotate(45deg) translateY(calc(-50% - 2px))"};
  right: ${(props: any) => (props.showResultCounter ? "15px" : "20px")};
`;

export const ButtonEvent = styled.div`
  cursor: pointer;
  border-radius: 50%;
  background-color: transparent;
  padding: 10px 10px 6px 10px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    color: rgb(67, 67, 67);
    background-color: #e6f8fe;
  }
  &:focus {
    color: rgb(23, 135, 51);
  }
`;
const Separation = styled.div`
  width: 1px;
  background-color: rgb(222, 225, 227);
  height: 24px;
  margin: 0px 4px;
`;
// const ButtonParaphrase = styled.div`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   padding: 6px 8px;
//   border-radius: 4px;
//   &:hover {
//     background-color: #e6f8fe;
//   }
// `;
const ButtonFixError = styled.button`
  margin-left: 16px;
  border-radius: 29px;
  padding-left: 24px;
  padding-right: 24px;
  font-weight: 700;
  white-space: nowrap;
  background-color: #ffe08a;
  cursor: pointer;
  &:hover {
    background-color: #ffc31d;
  }
`;
export const ErrorCounter: any = styled.div`
  border-radius: 100%;
  height: ${(props: any) => props.size}px;
  width: ${(props: any) => props.size}px;
  background-color: ${(props) => (props.color ? props.color : "#ff8484")};
  color: white;
  border: none;
  font-size: ${(props: any) => props.fontSize}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-left: 5px;
`;

const Container = styled.div`
  @media screen and (max-width: 970px) {
    // display: none !important;
    width: 100%;
  }
  width: 60%;
  position: relative;
  height: 50vh;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0px -1px 4px 1px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
`;

const ButtonPaste = styled.button`
  background-color: transparent;
  border: 1px solid rgb(0, 119, 163);
  font-weight: 700;
  color: rgb(0, 119, 163);
  padding: 4px 18px;
  border-radius: 29px;
  cursor: pointer;
  margin-right: 10px;
  & label {
    cursor: pointer;
  }
  &:hover {
    background-color: #eefaff;
    color: rgb(0, 119, 163);
  }
`;
const BoxPasteUpload = styled.div`
  text-align: center;
  @media screen and (max-width: 450px) {
    & ${ButtonPaste} {
      margin-bottom: 10px;
    }
  }
`;
export const Textarea: any = styled.textarea`
  width: 100%;
  resize: none;
  outline: none;
  border-style: none;
  overflow: auto;
  min-height: ${(props: any) => (props.grammar ? "28vh" : "10vh")} !important;
  user-select: none;
  background-color: transparent;
  color: #0b3f51;
`;

export default GrammarCheckerForm;
