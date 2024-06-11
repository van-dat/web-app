import styled from "styled-components";
// import { Container } from "../styleComponents/StyleComponent";
import { useState } from "react";
import "./WordCounter.scss";
import CalculateKeywordDensity from "../functions/CalculateKeywordDensity";
import DownloadCSV from "../functions/DownloadCSV";
import { ArrowsCollapse, Download } from "react-bootstrap-icons";
import {
  funcCharacterCounter,
  funcParagraphsCounter,
  funcReadingTime,
  funcSentenceCounter,
  funcSpeakingTime,
  funcWordCounter,
} from "../functions/Counter";

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  padding: 25px 30px 0px;
  margin-bottom: 0;
  color: #fff;
`;

const Form = styled.div`
  padding: 30px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 550px;
  padding: 8px;
  resize: vertical;
  overflow: auto;
  border-radius: 8px;
  font-size: 16px;
  padding: 20px;
  color: #0b3f51 !important;
`;

const ButtonDownload = styled.button`
  font-size: 14px;
  border: none;
  margin: 0 4px;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  color: rgba(31, 41, 55, 1);
  background-color: rgb(0, 119, 163);
  & span {
    font-size: 14px;
    font-weight: bold;
    margin-left: 4px;
  }
`;

const PanelTitle = styled.div`
  font-size: 25px;
  color: rgb(0, 119, 163);
  padding: 0 10px;
  font-weight: bold;
`;
const BoxChangeHeight = styled.button`
  color: rgba(255, 255, 255, 1);
  cursor: ns-resize;
  border-radius: 8px;
`;

const StatisTicCol = styled.div`
  width: 500px;
  padding-left: 30px;
`;

const BgCard = styled.div`
  background-color: #f7f8f9;
  color: #0b3f51;
  border-radius: 8px;
  padding: 15px;
`;
const ExportAs = styled.div`
  font-size: 14px;
`;
const WordCounter = () => {
  const [words, setWords] = useState<number>(0);
  const [character, setCharacter] = useState<number>(0);
  const [sentences, setSentences] = useState<number>(0);
  const [paragraphs, setParagraphs] = useState<number>(0);
  const [readingTime, setReadingTime] = useState<string>("0 Sec");
  const [speakingTime, setSpeakingTime] = useState<string>("0 Sec");
  const [densities, setDensities] = useState<any>([]);

  const handleChangeTextarea = (value) => {
    setCharacter(funcCharacterCounter(value));
    setWords(funcWordCounter(value));
    setSentences(funcSentenceCounter(value));
    setParagraphs(funcParagraphsCounter(value));
    setReadingTime(funcReadingTime(value));
    setSpeakingTime(funcSpeakingTime(value));

    const arrDensities: any = CalculateKeywordDensity(value);
    const newDensities = arrDensities.sort((a, b) => {
      const valueA: any = Object.values(a);
      const valueB: any = Object.values(b);
      return valueB[0].count - valueA[0].count;
    });
    if (value == "") setDensities([]);
    setDensities(newDensities);
    // console.log({ arrDensities, newDensities });
  };
  const handleDownloadFile = (typeFile) => {
    if (typeFile === "txt") {
      const element = document.createElement("a");
      const wordsTXT: any[] = [];
      densities.map((item) => {
        const key = Object.keys(item);
        // console.log(Object.keys(item));
        wordsTXT.push(key[0]);
      });

      const file = new Blob([wordsTXT.join("\n")], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "words.txt";
      document.body.appendChild(element); // required for this to work in firefox
      element.click();
    }
    if (typeFile === "csv") {
      var csv: any[] = [];
      var rows = document.querySelectorAll("table tr");

      for (var i = 0; i < rows.length; i++) {
        var row: any[] = [],
          cols: any = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);
        csv.push(row.join(","));
      }

      // Download CSV file
      DownloadCSV(csv.join("\n"), "words.csv");
    }
  };
  const handleChangeHeightTextarea = () => {
    let block: any = document.getElementById("essay"),
      slider: any = document.querySelector(".slider_textarea");

    // on mouse down (drag start)
    slider.onmousedown = function dragMouseDown(e) {
      // get position of mouse
      let dragX = e.clientY;
      // register a mouse move listener if mouse is down
      document.onmousemove = function onMouseMove(e) {
        // e.clientY will be the position of the mouse as it has moved a bit now
        // offsetHeight is the height of the block-1
        block.style.height = block.offsetHeight + e.clientY - dragX + "px";
        // update variable - till this pos, mouse movement has been handled
        dragX = e.clientY;
      };
      // remove mouse-move listener on mouse-up (drag is finished now)
      document.onmouseup = () =>
        (document.onmousemove = document.onmouseup = null);
    };
  };

  return (
    <div className="word-counter full-container">
      <Title>Word Counter</Title>
      <Form className="is-flex columns form">
        <div className="column box-textarea">
          <Textarea
            id="essay"
            placeholder="Enter text here"
            onChange={(e) => handleChangeTextarea(e.target.value)}
          ></Textarea>
          <div>
            <BoxChangeHeight
              className="slider_textarea button is-warning is-fullwidth"
              onMouseMove={handleChangeHeightTextarea}
            >
              <ArrowsCollapse onMouseMove={handleChangeHeightTextarea} />
            </BoxChangeHeight>
            <div className="word-character">
              {words == 1 ? "1 word" : `${words} words`};{" "}
              {character == 1 ? "1 character" : `${character} characters`}
            </div>
          </div>
        </div>
        <StatisTicCol className="StatisTicCol">
          <div className="has-background-white p-3 b-radius-8">
            <PanelTitle>Statistics</PanelTitle>
            <div className="is-flex is-block-mobile is-justify-content-space-between columns">
              <div className="column is-6 is-mobile-w-100 p-2">
                <BgCard>
                  <p className="sub-title">WORDS</p>
                  <strong className="show-value">
                    {words.toLocaleString("en-US")}
                  </strong>
                </BgCard>
              </div>
              <div className="column is-6 is-mobile-w-100 p-2">
                <BgCard>
                  <p className="sub-title">CHARACTERS</p>
                  <strong className="show-value">
                    {character.toLocaleString("en-US")}
                  </strong>
                </BgCard>
              </div>
            </div>
            <div className="is-flex is-block-mobile is-justify-content-space-between columns">
              <div className="column is-6 is-mobile-w-100 p-2">
                <BgCard>
                  <p className="sub-title">SENTENCES</p>
                  <strong className="show-value">
                    {sentences.toLocaleString("en-US")}
                  </strong>
                </BgCard>
              </div>
              <div className="column is-6 is-mobile-w-100 p-2">
                <BgCard>
                  <p className="sub-title">PARAGRAPHS</p>
                  <strong className="show-value">
                    {paragraphs.toLocaleString("en-US")}
                  </strong>
                </BgCard>
              </div>
            </div>
            <div className="is-flex is-block-mobile is-justify-content-space-between columns">
              <div className="column is-6 is-mobile-w-100 p-2">
                <BgCard>
                  <p className="sub-title">
                    READING TIME
                    {/* <QuestionCircleFill /> */}
                  </p>
                  <div className="reading-time">
                    <strong className="show-value">
                      {readingTime.split(" ")[0]}
                    </strong>
                    <strong>{readingTime.split(" ")[1]?.slice(0, 3)}</strong>
                    <strong className="show-value">
                      {readingTime.split(" ")[2]}
                    </strong>
                    <strong>{readingTime.split(" ")[3]?.slice(0, 3)}</strong>
                  </div>
                </BgCard>
              </div>
              <div className="column is-6 is-mobile-w-100 p-2">
                <BgCard>
                  <p className="sub-title">
                    SPEAKING TIME
                    {/* <QuestionCircleFill /> */}
                  </p>
                  <div className="reading-time">
                    <strong className="show-value">
                      {speakingTime.split(" ")[0]}
                    </strong>
                    <strong>{speakingTime.split(" ")[1]?.slice(0, 3)}</strong>
                    <strong className="show-value">
                      {speakingTime.split(" ")[2]}
                    </strong>
                    <strong>{speakingTime.split(" ")[3]?.slice(0, 3)}</strong>
                  </div>
                </BgCard>
              </div>
            </div>
          </div>
          <div className="has-background-white p-3 mt-5 b-radius-8">
            <PanelTitle>Keyword Density</PanelTitle>
            <div className=" mb-4 p-2 border-b-2">
              {densities && densities[0] ? (
                <div className="form_densities">
                  <table id="densities" className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Word</th>
                        <th scope="col">Count</th>
                        <th scope="col">Ratio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {densities.map((item) => {
                        const key: any = Object.values(item);
                        return (
                          <tr>
                            <th id="keyword" scope="row">
                              {Object.keys(item)}
                            </th>
                            <td>{key[0].count}</td>
                            <td>{key[0].density.toFixed(2)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="pb-4">
                  Start typing to get a list of keywords that are most used
                </div>
              )}
            </div>
            <div className="is-flex is-justify-content-space-between is-align-items-center p-2">
              <ExportAs>EXPORT AS:</ExportAs>
              <div>
                <ButtonDownload
                  className="btn_download button is-warning"
                  onClick={() => handleDownloadFile("csv")}
                  disabled={!words}
                >
                  <Download />
                  <span>CSV</span>
                </ButtonDownload>
                <ButtonDownload
                  className="btn_download button is-warning"
                  onClick={() => handleDownloadFile("txt")}
                  disabled={!words}
                >
                  <Download />
                  <span>TXT</span>
                </ButtonDownload>
              </div>
            </div>
          </div>
        </StatisTicCol>
      </Form>
    </div>
  );
};

export default WordCounter;
