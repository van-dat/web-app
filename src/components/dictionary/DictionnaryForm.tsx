import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  setWord: any;
  loading: boolean;
};

const DictionaryForm = (props: Props) => {
  const urlParams: any = new URLSearchParams(window.location.search);
  const [key, setKey] = useState(urlParams.get("word") || "");
  const { setWord, loading } = props;
  const handleSearch = async () => {
    if (key != urlParams.get("word") && key != "") {
      setWord(key);
      // urlParams.set("word", key);
      // window.location.search = urlParams;
    }
  };
  const isValid = key;
  const btnCl = classNames({
    "button is-warning is-medium is-rounded is-fullwidth ": true,
    "is-loading": loading,
  });
  const handleSetKey = (value: string) => {
    const arrKey = value.split("");
    arrKey.map((item: any) => {
      if (!isNaN(item)) return (value = value.slice(0, -1));
    });
    setKey(value);
  };
  return (
    <>
      <Form>
        <Label>Enter Word</Label>
        <Input
          type={!Number}
          placeholder="Hello"
          value={key}
          onChange={(e: any) => handleSetKey(e.target.value)}
        />
        <button onClick={handleSearch} disabled={!isValid} className={btnCl}>
          Search
        </button>
      </Form>
    </>
  );
};

export default DictionaryForm;

const Input: any = styled.input.attrs(() => ({}))`
  text-transform: uppercase;

  padding: 10px 10px;
  border-radius: 6px;
  width: 100%;
  border: 1px solid #ccc;
  font-size: 20px;
  margin-bottom: 28px;
`;
const Form = styled.div`
  background-color: #0077a3;
  padding: 30px;
  border-radius: 6px;
`;
const Label = styled.p`
  color: #fff;
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 12px;
`;
// const BtnSearch = styled.button`
//   background-color: #ffc31d;
//   color: #000;
//   font-size: 20px;
//   height: 54px;
//   margin: 0 auto;
//   width: 100%;
//   border: none;
// `;
