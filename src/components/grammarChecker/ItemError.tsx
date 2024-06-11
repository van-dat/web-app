import { ArrowRight } from "react-bootstrap-icons";
import styled from "styled-components";

type Props = {
  keys: any;
  toggleActiveClass: any;
  activeItem: any;
  handleFixOneError: any;
  handleIgnore: any;
  item: any;
};

const ItemError = (props: Props) => {
  const {
    keys,
    // toggleActiveClass,
    activeItem,
    // handleFixOneError,
    // handleIgnore,
    item,
  } = props;
  const { incorrect, correct, original_sentence, fixed_sentence } = item;
  return (
    <BoxItemError
      className={keys === activeItem ? "is-active-item" : ""}
      // onClick={() => toggleActiveClass(keys)}
      key={keys}
    >
      <div className="">
        {keys === activeItem && <Flag />}
        {/* <Title>{errorType}</Title> */}
        <TextError
          fontWeight={keys === activeItem}
          // onClick={() =>
          //   handleFixOneError(
          //     incorrect,
          //     correct,
          //     original_sentence,
          //     fixed_sentence
          //   )
          // }
          // disabled={keys != activeItem}
        >
          <span className="incorrect">{incorrect}</span>
          <span>
            <ArrowRight color="gray" className="mt-2 ml-2 mr-2" />
          </span>
          <span className="correct">{correct}</span>
        </TextError>
        <FixSentence
          dangerouslySetInnerHTML={{ __html: fixed_sentence }}
        ></FixSentence>
        {/* <ButtonIgnore
          display={keys === activeItem}
          onClick={() => handleIgnore(incorrect, correct)}
        >
          Ignore
        </ButtonIgnore> */}
      </div>

      {keys === activeItem && <Description>{original_sentence}</Description>}
    </BoxItemError>
  );
};

const FixSentence = styled.div`
  display: block;
  .red {
    color: red;
    text-decoration: line-through;
  }
  .green {
    color: rgb(73, 149, 87);
  }
`;

const Description = styled.div`
  margin-top: 8px;
`;
const Flag = styled.div`
  position: absolute;
  width: 4px;
  height: 16px;
  left: 0px;
  border-radius: 0px 0px 4px;
  background-color: rgb(234, 21, 55);
`;
const TextError: any = styled.div`
  display: flex;
  align-items: center;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  font-weight: ${(props: any) => (props.fontWeight ? "700" : "400")};
  /* &:hover {
    background-color: #e6f8fe;
  } */

  .incorrect {
    text-decoration: line-through;
  }
  .correct {
    color: rgb(73, 149, 87);
  }
`;
// const Title = styled.div`
//   padding: 2px 0;
//   font-size: 14px;
// `;
const ButtonIgnore: any = styled.div`
  font-size: 14px;
  border-radius: 4px;
  padding: 2px 8px;
  display: ${(props: any) => (props.display ? "block" : "none")};
  &:hover {
    background-color: #e6f8fe;
    display: block !important;
  }
`;
const BoxItemError = styled.div`
  position: relative;
  padding: 12px 20px;
  border: 1px solid rgb(222, 225, 227);
  position: relative;
  background-color: rgb(255, 255, 255);
  color: #0b3f51;
  z-index: 0;
  border-radius: 5px;
  box-shadow: rgba(115, 115, 115, 0.15) 0px 4px 15px 0px;
  margin: 8px 0px;
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  &:hover ${ButtonIgnore} {
    display: block;
  }
`;
export default ItemError;
