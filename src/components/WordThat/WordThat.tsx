import { useCallback, useEffect, useState } from "react";
import { searchWordThat } from "../../services/search.service";
import Result from "../Result";
import WorldeSkeleton from "../Skeletons/WorldeSkeleton";
import Sort from "../Sort";
import { Container } from "../styleComponents/StyleComponent";

type Props = {
  path: string;
};

// const arr = [
//   "a",
//   "b",
//   "c",
//   "d",
//   "e",
//   "f",
//   "g",
//   "h",
//   "i",
//   "j",
//   "k",
//   "l",
//   "m",
//   "n",
//   "o",
//   "p",
//   "q",
//   "r",
//   "s",
//   "t",
//   "u",
//   "v",
//   "w",
//   "x",
//   "y",
//   "z",
// ];
const WordThat = (props: Props) => {
  const { path } = props;
  path.split("-");
  const location = path.split("-")[2];
  const text = path.split("-")[4];
  let start;
  let end;

  if (location == "start") {
    start = text;
  }
  if (location === "end") {
    end = text;
  }
  // console.log({ start, end, location, text });
  const [wordThat, setWordThat] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [wordSorting, setWordSorting] = useState<string>("az");

  let keysWordFinder =
    wordThat && wordThat?.words_by_length
      ? Object.keys(wordThat?.words_by_length)
      : [];
  // keysWordFinder = keysWordFinder?.sort((a: any, b: any) => {
  //   return Number(b) - Number(a);
  // });
  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await searchWordThat({ start, end, wordSorting });
    // console.log(data);
    setWordThat(data);
    setLoading(false);
  }, [start, end, wordSorting]);
  useEffect(() => {
    if (start || end) {
      fetchData();
    }
  }, [start, end, wordSorting]);
  return (
    <Container>
      {loading ? (
        <WorldeSkeleton />
      ) : start || end ? (
        wordThat ? (
          <div>
            <div className="box-header-result">
              <b className="title-result">
                There are {wordThat.count.toLocaleString("en-US")} words{" "}
                {start && `that start with ${start.toUpperCase()}`}{" "}
                {end && `ending in ${end.toUpperCase()}`}
              </b>
              <Sort
                noSortPoint={true}
                wordSorting={wordSorting}
                setWordSorting={setWordSorting}
              />
            </div>
            {keysWordFinder.map((item) => (
              <Result
                wordThat={wordThat}
                keys={{ start, end, wordSorting }}
                item={item}
                key={item}
                wordSorting={wordSorting}
              />
            ))}
          </div>
        ) : (
          "No Words Found"
        )
      ) : (
        ""
      )}
    </Container>
  );
};

export default WordThat;
