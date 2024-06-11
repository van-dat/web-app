import { useState } from "react";
import { Container } from "../styleComponents/StyleComponent";
import { Letter } from "../wordFinder/WordFinderForm";

type Props = {
  setLoading: any;
  setKeys: any;
};

const AnagramSolverForm = (props: Props) => {
  const { setLoading, setKeys } = props;
  const [letter, setLetter] = useState<string>("");
  const onSearch = async () => {
    setLoading(true);
    setKeys({ letter });
  };
  const setValue = (value) => {
    const arrKey = value.split("");
      arrKey.map((item: any) => {
        if (!isNaN(item)) return (value = value.slice(0, -1));
      });
    if (value.length > 20) return;
    setLetter(value);
  };
  return (
    <Container className="wordFinder-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <Letter
          value={letter}
          onChange={(e: any) => setValue(e.target.value)}
          setLetter={setLetter}
          onSearch={onSearch}
        />
      </form>
    </Container>
  );
};

export default AnagramSolverForm;
