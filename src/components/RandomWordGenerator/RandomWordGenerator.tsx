import { useState } from "react";
import RandomWordGeneratorForm from "./RandomWordGeneratorForm";
import ResultRandomWord from "./ResultRandomWord";
import { randomWord } from "../../services/search.service";
import styled from "styled-components";

const RandomWordGenerator = () => {
  const [words, setWords] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRandomWord = async (keys) => {
    const { words } = await randomWord(keys);
    // console.log(words);
    setLoading(false);
    setWords(words);
    // console.log({ ...keys });
  };

  return (
    <>
      {/* <Toaster /> */}
      <div className="wrap-tool">
        <h1>Random Word Generator</h1>
        <Container>
          <RandomWordGeneratorForm
            loading={loading}
            setLoading={setLoading}
            handleRandomWord={handleRandomWord}
          />
          <ResultRandomWord words={words} loading={loading} />
        </Container>
      </div>
    </>
  );
};
const Container = styled.div`
  display: flex;
  @media screen and (max-width: 580px) {
    display: block;
  }
`;
export default RandomWordGenerator;
