import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  handleRandomWord: any;
  loading: boolean;
  setLoading: any;
};
const WordType = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "Nouns",
  },
  {
    id: 2,
    name: "Verbs",
  },
  {
    id: 3,
    name: "Adjectives",
  },
  {
    id: 4,
    name: "Extended",
  },
  // {
  //   id: 5,
  //   name: "Non-English",
  // },
];
const RandomWordGeneratorForm = (props: Props) => {
  const { handleRandomWord, loading, setLoading } = props;
  const [number, setNumber] = useState<number>(3);
  const [type, setType] = useState<string>("All");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [compare, setCompare] = useState<string>("Equals");
  const [size, setSize] = useState<string>("");
  const [by, setBy] = useState<string>("Letters");
  const btnCl = classNames({
    "button is-warning is-rounded": true,
    "is-loading": loading,
  });

  const isValid = number && type;

  const handleOnRandleWord = () => {
    console.log({ number, type, start, end, compare, size, by });
    handleRandomWord({ number, type, start, end, compare, size, by });
    setLoading(true);
  };

  const handleResetOption = () => {
    setType("All");
    setCompare("Equals");
    setBy("Letters");
    setStart("");
    setEnd("");
    setNumber(3);
    setSize("");
  };

  const handleSetLetter = (value, location) => {
    const arrKey = value.split("");
    arrKey.map((item: any) => {
      if (!isNaN(item)) return (value = value.slice(0, -1));
    });
    if (location === "start") setStart(value);
    if (location === "end") setEnd(value);
  };

  return (
    <Container>
      <div>
        <BoxNumberType className="columns">
          <BoxNumberOfWords className="column is-6">
            <div className="columns">
              <div className="column is-6">
                <LabelNumberOfWords htmlFor="number-of-word">
                  Number of Words:{" "}
                </LabelNumberOfWords>
              </div>
              <div className="column">
                <InputNumberOfWords
                  id="number-of-word"
                  type="number"
                  className="input"
                  min={1}
                  value={number}
                  onChange={(e: any) => setNumber(e.target.value)}
                />
              </div>
            </div>
          </BoxNumberOfWords>
          <BoxInputLetter className="column is-6">
            <div className="columns">
              <div className="column is-4">
                <label>First letter:</label>
              </div>
              <div className="column">
                <InputLetter
                  className="input"
                  type="text"
                  value={start}
                  onChange={(e) => handleSetLetter(e.target.value, "start")}
                />
              </div>
            </div>
          </BoxInputLetter>
        </BoxNumberType>

        <ContainerInputLetter className=" columns">
          <BoxNumberOfWords className="column is-6">
            <div className="columns">
              <div className="column is-6">
                <LabelWordType htmlFor="word-type">Word Type: </LabelWordType>
              </div>
              <div className="column">
                <div className="select">
                  <SelectWordType
                    className=""
                    id="word-type"
                    onChange={(e: any) => {
                      setType(e.target.value);
                    }}
                    value={type}
                  >
                    {WordType.map((item) => (
                      <OptionWordType key={item.id}>{item.name}</OptionWordType>
                    ))}
                  </SelectWordType>
                </div>
              </div>
            </div>
          </BoxNumberOfWords>
          <BoxInputLetter className="column is-6">
            <div className="columns">
              <div className="column is-4">
                <label>Last letter:</label>
              </div>
              <div className="column">
                <InputLetter
                  className="input"
                  type="text"
                  value={end}
                  onChange={(e: any) => handleSetLetter(e.target.value, "end")}
                />
              </div>
            </div>
          </BoxInputLetter>
        </ContainerInputLetter>

        {/* <div className="columns">
          <div className="column is-3">
            <label htmlFor="">Word size by:</label>
          </div>
          <div className="column">
            <WrapRadio>
              <div className="is-flex" onClick={() => setBy("Syllables")}>
                <RadioWordSize
                  checked={by === "Syllables"}
                  type="radio"
                  name="word-size"
                  id="syllables"
                />
                <LabelWordSize htmlFor="syllables">Syllables</LabelWordSize>
              </div>
              <div className="is-flex" onClick={() => setBy("Letters")}>
                <RadioWordSize
                  type="radio"
                  name="word-size"
                  id="letters"
                  checked={by === "Letters"}
                />
                <LabelWordSize htmlFor="letters">Letters</LabelWordSize>
              </div>
            </WrapRadio>
            <div className="columns is-mobile">
              <div className="column">
                <div className="select is-fullwidth">
                  <select
                    value={compare}
                    onChange={(e: any) => setCompare(e.target.value)}
                    id="select-word-size"
                  >
                    <option value="equals">Equals</option>
                    <option value="less">Less Than</option>
                    <option value="greater">Greater Than</option>
                  </select>
                </div>
              </div>
              <div className="column">
                <InputWordSize
                  type="number"
                  value={size}
                  className="input"
                  min={1}
                  onChange={(e: any) => setSize(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <BoxButton>
        <button
          onClick={handleResetOption}
          className="button is-rounded is-primary is-light"
          disabled={!isValid}
        >
          Reset Options
        </button>
        <BtnSubmit
          className={btnCl}
          onClick={handleOnRandleWord}
          disabled={!isValid}
        >
          Generate Random Words
        </BtnSubmit>
      </BoxButton>
    </Container>
  );
};

const BtnSubmit = styled.button`
  width: 100%;
  margin-top: 20px;

  @media screen and (min-width: 767px) {
    width: auto;
    margin-top: 0;
  }
`;

const BoxNumberType = styled.div`
  display: flex;
  @media screen and (max-width: 410px) {
    display: block;
  }
  @media screen and (min-width: 580px) and (max-width: 740px) {
    display: block;
  }
`;
const BoxNumberOfWords = styled.div``;

const Container = styled.div`
  @media screen and (max-width: 580px) {
    width: 100%;
  }
  padding: 0;
  width: 50%;
  border-radius: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label {
    font-size: 16px;
  }
`;
const LabelNumberOfWords = styled.label``;

const InputNumberOfWords = styled.input`
  padding: 5px 10px;
  width: 100%;
`;

const LabelWordType = styled.label``;
const SelectWordType = styled.select`
  padding: 5px 10px;
`;
const OptionWordType = styled.option``;

const ContainerInputLetter = styled.div`
  display: flex;
  @media screen and (max-width: 410px) {
    display: block;
  }
`;
const BoxInputLetter = styled.div`
  display: flex;
  @media screen and (max-width: 1150px) {
    display: block;
  }
  @media screen and (max-width: 410px) {
    display: flex;
    align-items: center;
    margin: 0;
    padding-top: 0;
    & input {
      margin-left: 10px;
      width: auto;
    }
  }
`;

const InputLetter = styled.input`
  width: 100%;
`;

// const RadioWordSize = styled.input`
//   cursor: pointer;
// `;

// const LabelWordSize = styled.label`
//   padding-left: 6px;
//   cursor: pointer;
//   margin-right: 20px;
// `;

// const InputWordSize = styled.input`
//   padding: 5px 10px;
// `;

const BoxButton = styled.div`
  padding: 25px 0 0 0;
  @media screen and (min-width: 767px) {
    display: flex;
    justify-content: space-between;
  }
`;

// const WrapRadio = styled.div`
//   display: flex;
//   padding-bottom: 10px;
// `;

export default RandomWordGeneratorForm;
