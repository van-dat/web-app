import { useCallback, useEffect, useState } from "react";
import { searchFiveLetters } from "../../services/search.service";
import Result from "../Result";
import WorldeSkeleton from "../Skeletons/WorldeSkeleton";
import {
  Container,
  Desc,
  Heading,
  WrapAll,
} from "../styleComponents/StyleComponent";
import WordleSearchForm from "./WordleSearchForm";

type Props = {
  title: string;
  desc: string;
};

const Wordle = (props: Props) => {
  const { title, desc } = props;
  const [fiveLetter, setFiveLetter] = useState();
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState<any>();
  const fetchData = useCallback(async () => {
    // console.log({ keys });
    const data = await searchFiveLetters({ ...keys });
    setFiveLetter(data);
    setLoading(false);
  }, [keys]);
  useEffect(() => {
    if (keys) {
      setLoading(true);
      fetchData();
    }
  }, [keys]);
  return (
    <div>
      <WrapAll>
        <Heading>{title}</Heading>
        <Desc>{desc}</Desc>
        <WordleSearchForm
          setKeys={setKeys}
          setLoading={setLoading}
          loading={loading}
          isAutoSearch={true}
        />
      </WrapAll>
      <Container className="wordle-result">
        {loading ? (
          <WorldeSkeleton />
        ) : keys ? (
          <Result fiveLetter={fiveLetter} keys={keys} />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default Wordle;
