import { useCallback, useEffect, useState } from "react";
import { search } from "../../services/search.service";
import Result from "../Result";
import WorldeSkeleton from "../Skeletons/WorldeSkeleton";
import Sort from "../Sort";
import "./AnagramSolver.scss";
import {
  Container,
  Desc,
  Heading,
  WrapAll,
} from "../styleComponents/StyleComponent";
import AnagramSolverForm from "./AnagramSolverForm";
import { GAME_TYPES } from "../const/GAME_TYPES";

type Props = {
  title: string;
  desc: string;
};

const AnagramSolver = (props: Props) => {
  const { title, desc } = props;
  const [loading, setLoading] = useState(false);
  const [wordFinder, setWordFinder] = useState<any>();
  const [keys, setKeys] = useState<any>();
  const [wordSorting, setWordSorting] = useState<string>("az");
  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await search({
      ...keys,
      wordSorting,
      gameId: GAME_TYPES.ANAGRAM,
    });
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
        <AnagramSolverForm setLoading={setLoading} setKeys={setKeys} />
      </WrapAll>
      <Container className="wordFinder-result">
        {loading ? (
          <WorldeSkeleton />
        ) : keys ? (
          keysWordFinder && keysWordFinder[0] ? (
            <div>
              <div className="box-header-result">
                <b className="title-result">
                  {wordFinder.count > 1
                    ? `There are ${wordFinder.count.toLocaleString(
                        "en-US"
                      )} words`
                    : "There is 1 word"}
                </b>
                <Sort
                  wordSorting={wordSorting}
                  setWordSorting={setWordSorting}
                  noSortPoint={true}
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

export default AnagramSolver;
