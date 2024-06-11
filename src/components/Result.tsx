import cl from "classnames";
import { useEffect, useState } from "react";
import {
  search,
  searchFiveLetters,
  searchWordThat,
} from "../services/search.service";
import Markdown from "react-markdown";
import "./wordFinder/wordFinder.scss";
import "./wordle/wordle.css";
import styled from "styled-components";
type Props = {
  keys?: any;
  fiveLetter?: any;
  wordFinder?: any;
  item?: any;
  wordSorting?: string;
  wordThat?: any;
};

const Result = (props: Props) => {
  const { fiveLetter, keys, wordFinder, item, wordSorting, wordThat } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<number>(0);
  const [showWords, setShowWords] = useState<any[]>([]);
  const [isDialog, setIsDialog] = useState<boolean>(false);
  const [wordDetail, setWordDetail] = useState<any>();
  // var isShowMore:boolean = false;

  useEffect(() => {
    setCurrentPage(
      fiveLetter?.currentPage ||
        wordFinder?.words_by_length[item]?.currentPage ||
        wordThat?.words_by_length[item]?.currentPage
    );
    if (fiveLetter) {
      // isShowMore = currentPage < fiveLetter?.totalPage;

      setShowWords(fiveLetter?.words);
    }
    if (wordFinder) {
      // isShowMore = currentPage < wordFinder?.words_by_length[item].totalPage;
      setShowWords(wordFinder.words_by_length[item].words);
      // console.log(isShowMore)
    }
    if (wordThat) {
      // isShowMore = currentPage < wordThat?.words_by_length[item].totalPage;
      // console.log(isShowMore)

      setShowWords(wordThat.words_by_length[item].words);
    }
  }, []);
  const isShowMore = currentPage
    ? fiveLetter
      ? currentPage < fiveLetter?.totalPage
      : wordFinder
      ? currentPage < wordFinder?.words_by_length[item].totalPage
      : wordThat
      ? currentPage < wordThat?.words_by_length[item].totalPage
      : false
    : false;
  // const isShowMore = currentPage
  // ? fiveLetter
  //   ? currentPage < fiveLetter?.totalPage
  //   : currentPage < wordFinder?.words_by_length[item].totalPage
  // : false;
  const btnClass = cl({
    "button is-warning is-rounded": true,
    "is-loading": status === 1,
    "btn-load-more": true,
  });

  const loadMore = async (length: number) => {
    setStatus(1);
    if (fiveLetter) {
      const data = await searchFiveLetters({
        ...keys,
        page: Number(currentPage) + 1,
      });

      const newWords = showWords.concat(data?.words);
      setShowWords(newWords);
      setCurrentPage(currentPage + 1);
      setStatus(2);
    }

    if (wordFinder) {
      const data = await search({
        ...keys,
        length,
        wordSorting,
        page: Number(currentPage) + 1,
      });
      const newWords = showWords.concat(data?.words);
      setShowWords(newWords);
      setCurrentPage(currentPage + 1);
      setStatus(2);
    }
    if (wordThat) {
      const data = await searchWordThat({
        ...keys,
        length,
        page: Number(currentPage) + 1,
      });
      const newWords = showWords.concat(data?.words);
      setShowWords(newWords);
      setCurrentPage(currentPage + 1);
      setStatus(2);
    }
  };
  const isWordFinder = "is-word-finder-" + item;
  const wordClass = cl({
    word: true,
    "is-wordle": fiveLetter ? true : false,
    [isWordFinder]: wordFinder ? true : false,
  });

  const handleShowDialog = (wordItem: any) => {
    setIsDialog(true);
    setWordDetail(wordItem);
  };

  const renderDetail = () => {
    return (
      <div
        id="confirmation"
        className="custom-modal-container"
        onClick={() => setIsDialog(false)}
      >
        <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
          <header className="custom-modal-header">
            <strong>
              Definitions for <span>{wordDetail.word}</span>
            </strong>
            <p onClick={() => setIsDialog(false)}>
              <span>&times;</span>
            </p>
          </header>
          <div className="custom-modal-content">
            <Markdown>{wordDetail.description}</Markdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6 wrap-result">
      {showWords && showWords[0] ? (
        <div className="panel has-text-light">
          <HeaderResult className="panel-heading">
            <strong>
              {fiveLetter?.totalWord > 1
                ? `There are ${fiveLetter?.totalWord.toLocaleString(
                    "en-US"
                  )} words`
                : fiveLetter?.totalWord == 1
                ? `There is 1 word`
                : `${item} letter words`}
            </strong>
            {wordFinder && (
              <span>
                {wordFinder?.words_by_length[item]?.totalWord > 1
                  ? `${wordFinder?.words_by_length[
                      item
                    ]?.totalWord.toLocaleString("en-US")} words`
                  : "1 word"}
              </span>
            )}
            {wordThat && (
              <span>
                {wordThat?.words_by_length[item]?.totalWord > 1
                  ? `
                  
                  ${wordThat?.words_by_length[item]?.totalWord.toLocaleString(
                    "en-US"
                  )} words`
                  : "1 word"}
              </span>
            )}
          </HeaderResult>
          <div className="panel-block">
            <div className="words ">
              {showWords?.map((wordItem: any) => {
                const mClass = wordItem?.description ? " cursor" : "";
                return (
                  <div
                    className={wordClass + mClass}
                    key={wordItem?.id}
                    onClick={() =>
                      wordItem?.description
                        ? handleShowDialog(wordItem)
                        : () => {}
                    }
                  >
                    <span className="text-result">{wordItem?.word}</span>
                    <sub className="point">{wordItem?.score} </sub>
                  </div>
                );
              })}
              {isDialog && renderDetail()}
            </div>
            {isShowMore && (
              <div className="load-more">
                <button
                  className={btnClass}
                  onClick={() => loadMore(Number(item))}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="panel">
          <div className="panel-block">
            <p>No Words Found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
const HeaderResult = styled.div`
  background-color: #0077a3;
  color: white;
  display: flex;
  justify-content: space-between;
`;
