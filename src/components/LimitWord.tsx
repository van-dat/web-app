import { XCircle } from "react-bootstrap-icons";
import styled from "styled-components";

type Props = {
  LIMIT_WORD: number;
  wordCounter: number;
  setShowBoxLimit: any;
};

const LimitWord = (props: Props) => {
  const { LIMIT_WORD, wordCounter, setShowBoxLimit } = props;
  return (
    <BoxLimit>
      <div className="is-flex is-align-items-center is-justify-content-space-between">
        <b>
          {wordCounter}/{LIMIT_WORD} words
        </b>
        <ButtonRemoveNoti
          className="cursor-pointer"
          onClick={() => setShowBoxLimit(false)}
        >
          <XCircle />
        </ButtonRemoveNoti>
      </div>
      <p>{LIMIT_WORD} word limit</p>
    </BoxLimit>
  );
};
const ButtonRemoveNoti = styled.div`
  padding: 4px 6px 0px 6px;
  border-radius: 50%;
  &:hover {
    background-color: #e6f8fe;
  }
`;
const BoxLimit = styled.div`
  background-color: rgb(252, 235, 231);
  width: 300px;
  padding: 8px 12px;
  color: #d32f2f;
  margin-right: 10px;
`;
export default LimitWord;
