import { useCallback, useEffect, useState } from "react";
import { search } from "../../services/search.service";
import Result from "../Result";
import WorldeSkeleton from "../Skeletons/WorldeSkeleton";

import {
  Container,
  Desc,
  Heading,
  WrapAll,
} from "../styleComponents/StyleComponent";
import WordFinderForm from "./WordFinderForm";
import Sort from "../Sort";
import { GAME_TYPES } from "../const/GAME_TYPES";
type Props = {
  title: string;
  desc: string;
  defaultSelectValue: number;
};

const WordFinder = (props: Props) => {
  const { title, desc } = props;
  const [loading, setLoading] = useState(false);
  const [wordFinder, setWordFinder] = useState<any>();
  const [keys, setKeys] = useState<any>();
  const [wordSorting, setWordSorting] = useState<string>("az");
  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await search({ ...keys, wordSorting });
    setWordFinder(data);
    setLoading(false);
  }, [keys, wordSorting]);
  useEffect(() => {
    if (keys) {
      fetchData();
    }
  }, [keys, wordSorting]);

  let keysWordFinder =
    wordFinder && wordFinder?.words_by_length
      ? Object.keys(wordFinder?.words_by_length)
      : [];
  keysWordFinder = keysWordFinder?.sort((a: any, b: any) => {
    return Number(b) - Number(a);
  });

  return (
    <div>
      <WrapAll>
        {title && <Heading>{title}</Heading>}
        {desc && <Desc>{desc}</Desc>}
        <WordFinderForm
          setLoading={setLoading}
          setKeys={setKeys}
          loading={loading}
          defaultSelectValue={props.defaultSelectValue}
          isAutoSearch={true}
        />
      </WrapAll>
      <Container className="wordFinder-result">
        {loading ? (
          <WorldeSkeleton />
        ) : keys ? (
          keysWordFinder && keysWordFinder[0] ? (
            <div>
              <div className="box-result">
                <b className="title-result">
                  {wordFinder.count == 1
                    ? "There is 1 word"
                    : `There are ${wordFinder.count.toLocaleString(
                        "en-US"
                      )} words`}
                </b>
                <Sort
                  wordSorting={wordSorting}
                  setWordSorting={setWordSorting}
                  noSortPoint={
                    keys.gameId == 0 ||
                    keys.gameId === GAME_TYPES.WORD_SCAPE ||
                    keys.gameId === GAME_TYPES.ANAGRAM || 
                    keys.gameId === GAME_TYPES.FOUR_PIC || 
                    keys.gameId === GAME_TYPES.JUMBLE_SOLVER || 
                    keys.gameId === GAME_TYPES.WORD_CONNECT || 
                    keys.gameId === GAME_TYPES.WORD_COOKIE || 
                    keys.gameId === GAME_TYPES.TEXT_TWIST || 
                    keys.gameId === GAME_TYPES.CODE_CROSS || 
                    keys.gameId === GAME_TYPES.WORD_BRAIN || 
                    keys.gameId === GAME_TYPES.WORD_STORY || 
                    keys.gameId === GAME_TYPES.WORD_SWIPE
                  }
                />
              </div>
              {keysWordFinder.map((item) => (
                <Result
                  wordFinder={wordFinder}
                  keys={keys}
                  item={item}
                  key={item}
                  wordSorting={wordSorting}
                />
              ))}
            </div>
          ) : (
            <p>No Words Found</p>
          )
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default WordFinder;
