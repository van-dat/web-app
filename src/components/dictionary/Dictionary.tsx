import { useCallback, useEffect, useState } from "react";

import styled from "styled-components";
import { searchDetail } from "../../services/search.service";
import SkeletonDetail from "../Skeletons/SkeletonDetail";
import { Container } from "../styleComponents/StyleComponent";
import DictionnaryForm from "./DictionnaryForm";
import ResultDictionary from "./ResultDictionary";

type Props = {
  title: string;
};

const Dictionary = (props: Props) => {
  const { title } = props;
  const urlParams: any = new URLSearchParams(window.location.search);

  const [loading, setLoading] = useState(false);
  const [wordDetail, setWordDetail] = useState<any[]>([]);
  const [word, setWord] = useState(urlParams.get("word") || "");
  const getDetailWord = useCallback(async () => {
    const data = await searchDetail({ word });
    setWordDetail(data);
    setLoading(false);
  }, [word]);
  useEffect(() => {
    if (word) {
      setLoading(true);
      getDetailWord();
    }
  }, [word]);

  return (
    <div>
      <Container>
        <DictionnaryForm loading={loading} title={title} setWord={setWord} />
        <DetailWord className="content">
          {loading ? (
            <SkeletonDetail />
          ) : (
            <ResultDictionary word={word} wordDetail={wordDetail} />
          )}
        </DetailWord>
      </Container>
    </div>
  );
};

export default Dictionary;

const DetailWord = styled.div`
  margin-top: 24px;
`;
