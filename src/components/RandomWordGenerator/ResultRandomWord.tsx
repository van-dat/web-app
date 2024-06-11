import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftCircle,
  Heart,
  HeartFill,
  ListUl,
} from "react-bootstrap-icons";
import styled from "styled-components";
import ResultLoading from "./Skeleton";

type Props = {
  words: any;
  loading: boolean;
};

const ResultRandomWord = (props: Props) => {
  const { words } = props;
  const [, setWordSave] = useState<any>([]);
  const [showListWordSave, setShowListWordSave] = useState<boolean>(false);
  // console.log({ words });
  const refWordSave: any = useRef([]);
  const handleSave = (word) => {
    setWordSave([word]);
    refWordSave.current.push(word);
    // console.log(refWordSave.current)
  };
  // console.log(refWordSave.current);
  const handleUnSave = (word) => {
    refWordSave.current = refWordSave.current.filter((item) => item !== word);
    setWordSave(refWordSave.current);
  };
  useEffect(() => {
    if (refWordSave.current.length < 1) {
      setShowListWordSave(false);
    }
  }, [refWordSave.current]);
  return (
    <Container>
      {props.loading && <ResultLoading />}
      {words !== undefined && !props.loading ? (
        showListWordSave ? (
          <div>
            <div className="mb-1 is-flex is-align-items-center">
              <BoxBack onClick={() => setShowListWordSave(false)}>
                <ArrowLeftCircle />
              </BoxBack>
              <span>Saved word list</span>
            </div>
            <BoxListWordSave>
              {refWordSave.current.map((item, index) => (
                <ItemWordSave key={index}>
                  <ToolTip>
                    <div className="is-flex is-align-items-center">
                      <Word>{item.word}</Word>
                      <HeartFill
                        className="cursor-pointer"
                        size={24}
                        color="red"
                        onClick={() => handleUnSave(item)}
                      />
                    </div>
                    <Example>Example: {item.example}</Example>

                    {/* <Tooltiptext>{item.example}</Tooltiptext> */}
                  </ToolTip>
                </ItemWordSave>
              ))}
            </BoxListWordSave>
          </div>
        ) : words && words[0] ? (
          <div style={{ position: "relative" }}>
            {refWordSave.current.length > 0 && (
              <ListWordSave onClick={() => setShowListWordSave(true)}>
                <ListUl />{" "}
                <span className="mb-1 ml-1">
                  ({refWordSave.current.length})
                </span>
              </ListWordSave>
            )}
            <BoxListWordSave>
              {words.map((item) => (
                <>
                  <BoxWord>
                    <div className="is-flex is-align-items-center">
                      <Word>{item.word}</Word>
                      {refWordSave &&
                      refWordSave.current?.indexOf(item) !== -1 ? (
                        <HeartFill
                          className="cursor-pointer"
                          size={24}
                          color="red"
                          onClick={() => handleUnSave(item)}
                        />
                      ) : (
                        <Heart
                          onClick={() => handleSave(item)}
                          className="cursor-pointer"
                          size={24}
                        />
                      )}
                    </div>
                  </BoxWord>
                  <Example>Example: {item.example}</Example>
                </>
              ))}
            </BoxListWordSave>
          </div>
        ) : (
          <p>Oops! There are no words, that satisfy the conditions</p>
        )
      ) : (
        ""
      )}
    </Container>
  );
};
const BoxListWordSave = styled.div`
  position: relative;
  /* height: 375px; */
  max-height: 330px;
  overflow-y: auto;
`;
const ItemWordSave = styled.div`
  padding: 4px 0;
`;
const Tooltiptext = styled.div`
  visibility: hidden;
  width: 380px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 6px 8px;
  position: absolute;
  z-index: 1;
  top: -16px;
  left: 120%;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }
  @media screen and (min-width: 890px) and (max-width: 1170px) {
    width: 240px;
  }
`;
const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  // cursor: pointer;
  &:hover ${Tooltiptext} {
    visibility: visible;
  }
`;
const ListWordSave = styled.div`
  // position: absolute;
  // right: 0;
  // top: 0;
  justify-content: end;
  align-items: center;
  display: flex;
  cursor: pointer;
  &:hover {
    color: #0077a3;
  }
`;
const BoxBack = styled.strong`
  display: inline-block;
  cursor: pointer;
  line-height: 16px;
  height: 16px;
  margin-right: 6px;
  border-radius: 50%;
  &:hover {
    color: #0077a3;
  }
`;
const Container = styled.div`
  @media screen and (max-width: 560px) {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
  padding: 25px;
  width: 50%;
  margin-left: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  min-height: 200px;
  color: #0b3f51;
`;
const BoxWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Word = styled.strong`
  font-size: 25px;
  line-height: 50px;
  text-align: center;
  margin-right: 10px;
`;

const Example = styled.p`
  font-size: 16px;
`;
export default ResultRandomWord;
