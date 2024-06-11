import classNames from "classnames";
import { useState } from "react";
import {
  Clipboard2,
  CloudArrowUp,
  Dot,
  FileArrowDown,
  FileBarGraph,
  Files,
  // InfoCircle,
  ThreeDotsVertical,
  Trash,
  X,
} from "react-bootstrap-icons";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import funcCopyToClipboard from "../functions/CopyToClipboard";
import {
  funcSentenceCounter,
  funcWordCounter,
  statisticSummarize,
} from "../functions/Counter";
import funcDownloadWord from "../functions/DownloadWord";
// import InputRangeComponent from "./InputRange";
import ItemDrawer from "./ItemDrawer";
import {
  BoxFooter,
  BoxIconDelete,
  BoxLeft,
  // BoxLength,
  BoxModes,
  // BoxSummaryLength,
  BoxTabs,
  ButtonDelete,
  // ButtonMainKeyword,
  // ButtonParaphraseSummary,
  ButtonStatistics,
  ButtonUpload,
  FileInput,
  FormSummarize,
  // KeyWords,
  // ListKeyWord,
  PasteTextBox,
  PasteTextContainer,
  Separation,
  SummaryModes,
  Tab,
  Tabs,
  Textarea,
  Tooltiptext,
} from "./SummarizeStyleComponent";
import LimitWord from "../LimitWord";
import ModalDelete from "../paraphraser/ModalDelete";

const Editor = ({
  textEditor,
  handleSetWordCounter,
  handlePasteData,
}: {
  textEditor: string;
  handleSetWordCounter: (value: any) => void;
  handlePasteData: () => void;
}) => {
  return (
    <>
      <Textarea
        id="textarea-summarize"
        placeholder='Enter or paste your text and press "Summarize."'
        value={textEditor}
        onChange={(e: any) => handleSetWordCounter(e.target.value)}
      ></Textarea>
      {!textEditor && (
        <PasteTextContainer onClick={handlePasteData}>
          <PasteTextBox id="paste-summarize">
            <Clipboard2 />
            <div>Paste Text</div>
          </PasteTextBox>
        </PasteTextContainer>
      )}
    </>
  );
};

const PARAGRAPH_INDEX = 0;
const KEY_SENTENCE_INDEX = 1;
const LIMIT_WORD = 1000
const Result = ({
  tabIndex,
  paragraphResult,
  setParagraphResult,
  keySentenceResult,
  setKeySentenceResult,
}: {
  tabIndex: number;
  paragraphResult: string;
  setParagraphResult: (value: string) => void;
  keySentenceResult: string;
  setKeySentenceResult: (value: string) => void;
}) => {
  return (
    <>
      {tabIndex === PARAGRAPH_INDEX && (
        <Textarea
          id="textarea-summarize-result"
          value={paragraphResult}
          onChange={(e: any) => setParagraphResult(e.target.value)}
          disabled={paragraphResult == "" ? true : false}
        ></Textarea>
      )}
      {tabIndex === KEY_SENTENCE_INDEX && (
        <Textarea
          id="textarea-summarize-result"
          value={keySentenceResult}
          onChange={(e: any) => setKeySentenceResult(e.target.value)}
          disabled={keySentenceResult == "" ? true : false}
        ></Textarea>
      )}
    </>
  );
};

type Props = {
  handleSummarize: any;
  isSummarize: any;
  paragraphResult: string;
  setParagraphResult: (value: string) => void;
  keySentenceResult: string;
  setKeySentenceResult: (value: string) => void;
  loading: any;
  setLoading: any;
};

const SummarizeForm = (props: Props) => {
  const {
    handleSummarize,
    isSummarize,
    paragraphResult,
    keySentenceResult,
    setParagraphResult,
    setKeySentenceResult,
    loading,
    setLoading,
  } = props;

  const [tabIndex, setTabIndex] = useState(PARAGRAPH_INDEX);
  const [wordCounter, setWordCounter] = useState<number>(0);
  const [showBoxLimit, setShowBoxLimit] = useState<boolean>(false)
  const [tabPanel, setTabPanel] = useState(0);
  const [textEditor, setTextEditor] = useState<string>("");
  const [showModalDelete, setShowModelDelete] = useState<boolean>(false);

  // const [summaryLengthParagraph, setSummaryLengthParagraph] = useState(0);
  // const [summaryLengthKeySentences, setSummaryLengthKeySentences] = useState(5);

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const handleSetWordCounter = (value) => {
    // const content = funcCutWord(value, 600);
    setTextEditor(value);
    if(funcWordCounter(value)>LIMIT_WORD){
      setShowBoxLimit(true)
    }
    setWordCounter(funcWordCounter(value));
  };
  const clTabParagraph = classNames({
    "is-active": tabIndex == 0,
    "is-active-tab": tabIndex == 0,
  });
  const clTabKeySentences = classNames({
    "is-active": tabIndex == 1,
    "is-active-tab": tabIndex == 1,
  });

  const handlePasteData = () => {
    navigator.clipboard
      .readText()
      .then((clipboardData) => {
        // const content = funcCutWord(clipboardData, 600);

        setTextEditor(clipboardData);
        handleSetWordCounter(clipboardData);
      })
      .catch((err) => {
        console.error("Failed to read from clipboard", err);
      });
  };

  // const handleParaphraseSummary = () => {};

  const handleStatistics = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handleExport = () => {
    const text = tabIndex === 1 ? paragraphResult : keySentenceResult;
    funcDownloadWord(text, "summary_results");
  };

  const handleCopyFullText = () => {
    const text = tabIndex === 1 ? paragraphResult : keySentenceResult;
    funcCopyToClipboard(text);
  };

  const handleOnSummarize = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSummarize(textEditor);
  };
  const btnCl = classNames({
    "button is-warning is-rounded": true,
    "is-loading": loading,
  });
  const clTabOriginal = classNames({
    "is-active": tabPanel == 0,
    "is-w-50": true,
  });
  const clTabSummarized = classNames({
    "is-active": tabPanel == 1,
    "is-w-50": true,
  });
  const handleDelete = () => {
    setShowModelDelete(false);
    setKeySentenceResult("");
    setParagraphResult("");
    setTextEditor("");
  };
  const handleUploadDoc = () => {
    var fileInput: any = document.getElementById("fileInput");
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        var fileContent = e.target.result;
        // const content = funcCutWord(fileContent, 600);
        setTextEditor(fileContent);
        setWordCounter(funcWordCounter(fileContent));
      };
      reader.readAsText(file);
    }
  };

  const sentenceSummaryCounter =
    tabIndex === PARAGRAPH_INDEX
      ? funcSentenceCounter(paragraphResult)
      : funcSentenceCounter(keySentenceResult);
  const wordSummaryCounter =
    tabIndex === PARAGRAPH_INDEX
      ? funcWordCounter(paragraphResult)
      : funcWordCounter(keySentenceResult);

  const statistic =
    tabIndex === PARAGRAPH_INDEX
      ? statisticSummarize(textEditor, paragraphResult)
      : statisticSummarize(textEditor, keySentenceResult);

  return (
    <FormSummarize id="form_summarize" className="form-summarize">
      <ModalDelete
        setShowModelDelete={setShowModelDelete}
        showModalDelete={showModalDelete}
        handleDelete={handleDelete}
      />
      <div className="header_form">
        <div className="tabs">
          <ul>
            <div className="pl-4">Modes:</div>
            <li className={clTabParagraph} onClick={() => setTabIndex(0)}>
              <a>Paragraph</a>
            </li>
            <li className={clTabKeySentences} onClick={() => setTabIndex(1)}>
              <a>Key Sentences</a>
            </li>
            {/* <div>Summary Length:</div>
            <div className="ml-2 mr-2">Short</div>
            <InputRangeComponent
              tabIndex={tabIndex}
              summaryLengthParagraph={summaryLengthParagraph}
              summaryLengthKeySentences={summaryLengthKeySentences}
              setSummaryLengthParagraph={setSummaryLengthParagraph}
              setSummaryLengthKeySentences={setSummaryLengthKeySentences}
            />
            <div className="ml-2">Long</div> */}
          </ul>
          {textEditor && (
            <ButtonDelete
              className="mr-3 is-flex is-align-items-center"
              onClick={() => setShowModelDelete(true)}
            >
              <Trash />
            </ButtonDelete>
          )}
        </div>
      </div>
      <div className="header_form_mobile">
        <div className="is-flex is-align-items-center	pl-4 pr-4	pt-4">
          <BoxModes>
            <b>MODES:</b>
            <p>
              {(tabIndex == 0 && "Paragraph") ||
                (tabIndex == 1 && "Key Sentences")}
            </p>
          </BoxModes>

          {/* <BoxLength>
            <b>
              LENGTH:
              <InputRangeComponent
                tabIndex={tabIndex}
                summaryLengthParagraph={summaryLengthParagraph}
                summaryLengthKeySentences={summaryLengthKeySentences}
                setSummaryLengthParagraph={setSummaryLengthParagraph}
                setSummaryLengthKeySentences={setSummaryLengthKeySentences}
              />
            </b>
            <p>
              {tabIndex == 0 && summaryLengthParagraph == 0
                ? "Short "
                : tabIndex == 0 && summaryLengthParagraph == 50
                ? "Medium "
                : tabIndex == 0 && summaryLengthParagraph == 100
                ? "Long "
                : ""}
              {tabIndex == 1 && `${summaryLengthKeySentences} `}
              sentences
            </p>
          </BoxLength> */}

          <BoxIconDelete>
            {wordCounter != 0 && (
              <ButtonStatistics>
                <Trash onClick={() => setShowModelDelete(true)} />
              </ButtonStatistics>
            )}
            <ButtonStatistics>
              <ThreeDotsVertical />
            </ButtonStatistics>
          </BoxIconDelete>
        </div>

        {/* MOBILE */}
        <div>
          <div className="">
            <SummaryModes>Summary Modes</SummaryModes>
            <BoxTabs>
              <Tabs>
                <Tab className={clTabParagraph} onClick={() => setTabIndex(0)}>
                  Paragraph
                </Tab>
                <Tab
                  className={clTabKeySentences}
                  onClick={() => setTabIndex(1)}
                >
                  Key Sentences
                </Tab>
              </Tabs>
            </BoxTabs>
          </div>
          {/* <BoxSummaryLength>
              <p>Summary Length</p>
              <div className="is-flex is-justify-content-space-around">
                <div>
                  <div>
                    <b>Less</b>
                  </div>
                  <strong>Sentences</strong>
                </div>

                <InputRangeComponent
                  tabIndex={tabIndex}
                  summaryLengthParagraph={summaryLengthParagraph}
                  summaryLengthKeySentences={summaryLengthKeySentences}
                  setSummaryLengthParagraph={setSummaryLengthParagraph}
                  setSummaryLengthKeySentences={setSummaryLengthKeySentences}
                />
                <div>
                  <div>
                    <b>More</b>
                  </div>
                  <strong>Sentences</strong>
                </div>
              </div>
            </BoxSummaryLength> */}
        </div>
        <div className="tabs">
          <ul>
            <li className={clTabOriginal} onClick={() => setTabPanel(0)}>
              <a>Original</a>
            </li>
            <li className={clTabSummarized} onClick={() => setTabPanel(1)}>
              <a>Summarized</a>
            </li>
          </ul>
        </div>
        {/* end MOBILE */}

        {tabPanel == 0 && (
          <div className="column is-flex is-justify-content-center">
            <Editor
              textEditor={textEditor}
              handleSetWordCounter={handleSetWordCounter}
              handlePasteData={handlePasteData}
            />
          </div>
        )}
        {tabPanel == 1 && (
          <Result
            tabIndex={tabIndex}
            paragraphResult={paragraphResult}
            setParagraphResult={setParagraphResult}
            keySentenceResult={keySentenceResult}
            setKeySentenceResult={setKeySentenceResult}
          />
        )}
      </div>
      <div className="columns ml-0 mr-0 mt-0 mobile-none">
        <BoxLeft className="column is-half is-flex is-justify-content-center">
          <Editor
            textEditor={textEditor}
            handleSetWordCounter={handleSetWordCounter}
            handlePasteData={handlePasteData}
          />
        </BoxLeft>
        <Separation />

        <div className="column is-half user-select-none">
          <Result
            tabIndex={tabIndex}
            paragraphResult={paragraphResult}
            setParagraphResult={setParagraphResult}
            keySentenceResult={keySentenceResult}
            setKeySentenceResult={setKeySentenceResult}
          />
        </div>
      </div>
      <div className="columns ml-0 mr-0">
        <div className="column is-half p-0">
          {/* {summary && (
            <KeyWords>
              <p className="mr-1 is-flex is-align-items-center ">
                Select keywords &nbsp;{" "}
                <div className="tooltip">
                  <InfoCircle />
                  <Tooltiptext className="tooltiptext">
                    Select a single or multiple main keywords to enhance your
                    summary
                  </Tooltiptext>
                </div>
              </p>
              <ListKeyWord className="is-flex is-align-items-center is-flex-wrap-wrap	">
                <ButtonMainKeyword className="">Keys word 1</ButtonMainKeyword>
                <ButtonMainKeyword className="">Keys 2</ButtonMainKeyword>
              </ListKeyWord>
            </KeyWords>
          )} */}
          <div className="is-flex is-justify-content-space-between is-align-items-center mb-2 p-3">
            {textEditor ? (
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
            <button
              onClick={handleOnSummarize}
              className={btnCl}
              disabled={!textEditor || wordCounter>LIMIT_WORD}
            >
              Summarize
            </button>
          </div>
        </div>
        <Separation />
        {isSummarize && (

        <BoxFooter className="column is-half is-flex is-justify-content-space-between is-align-items-center">
          <div className="is-flex is-align-items-center mb-2">
            <p>
              {sentenceSummaryCounter === 1
                ? "1 sentence"
                : `${sentenceSummaryCounter} sentences`}
            </p>
            <Dot />
            <p>
              {wordSummaryCounter === 1
                ? "1 word"
                : `${wordSummaryCounter} words`}
            </p>
          </div>

            <div className="is-flex is-align-items-center">
              {/* <ButtonParaphraseSummary onClick={handleParaphraseSummary}>
                Paraphrase Summary
              </ButtonParaphraseSummary> */}
              <ButtonStatistics
                className="p-2 mt-2 tooltip"
                onClick={handleStatistics}
              >
                <FileBarGraph size={22} />
                <Tooltiptext className="tooltiptext">Statistics</Tooltiptext>
              </ButtonStatistics>
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
        </BoxFooter>
          )}
      </div>

      {/* Drawer */}
      <Drawer
        open={isOpenDrawer}
        // onClose={toggleDrawer}
        direction="right"
        className="min-width-380"
      >
        <div className="is-flex is-justify-content-space-between p-4">
          <b>Statistics</b>
          <X
            cursor={"pointer"}
            size={24}
            onClick={() => setIsOpenDrawer(false)}
          />
        </div>
        <hr className="m-0" />
        <div>
          <ItemDrawer
            title="Word Count"
            counterOld={statistic.wordCountFrom}
            counterNew={statistic.wordCountTo}
          />
          <ItemDrawer
            title="Sentence Count"
            counterOld={statistic.sentenceFrom}
            counterNew={statistic.sentenceTo}
          />
          <ItemDrawer
            title="Characters"
            counterOld={statistic.characterFrom}
            counterNew={statistic.characterTo}
          />
          <ItemDrawer title="Reduction" reduction={`${statistic.reduction} %`} />
        </div>
      </Drawer>
    </FormSummarize>
  );
};
export default SummarizeForm;
