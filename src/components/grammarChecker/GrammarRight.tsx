import { useState } from "react";
import styled from "styled-components";
import { ErrorCounter } from "./GrammarCheckerForm";
// import { CheckCircle } from "react-bootstrap-icons";
import ItemError from "./ItemError";
// import { IMAGE_NO_ERROR } from "../const/IMAGE_NO_ERROR";
import classNames from "classnames";

type Props = {
  errorCounter: number;
  errorList: any;
  handleFixOneError: any;
  handleIgnore: any;
  grammarFixed: any;
};

const GrammarRight = (props: Props) => {
  const {
    errorCounter,
    errorList,
    handleFixOneError,
    handleIgnore,
    grammarFixed,
  } = props;
  const [activeItem, setActiveItem] = useState(null);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const toggleActiveClass = (key) => {
    setActiveItem(key === activeItem ? null : key);
  };
  const clBtnListError = classNames({
    "is-active-btn": tabIndex === 0,
    "button is-light is-rounded": true,
  });
  // const clBtnEditedList = classNames({
  //   "is-active-btn": tabIndex === 1,
  //   "button is-light is-rounded": true,
  // });
  return (
    <Container>
      <Menu grammarFixed={grammarFixed?.fixed}>
        <ButtonAll
          disabled={!errorCounter}
          className={clBtnListError}
          errorCounter={errorCounter}
          onClick={() => setTabIndex(0)}
        >
          Grammar
          {errorCounter > 0 && (
            <ErrorCounter size={18} fontSize={12}>
              {errorCounter}
            </ErrorCounter>
          )}
        </ButtonAll>
        {/* <ButtonAll
          disabled={!grammarFixed?.fixed}
          className={clBtnEditedList}
          errorCounter={errorCounter}
          onClick={() => setTabIndex(1)}
        >
          Edited list
          <ErrorCounter color="#0077a3" size={18} fontSize={12}>
            {grammarFixed ? 1 : 0}
          </ErrorCounter>
        </ButtonAll> */}
        {/* <ButtonAll errorCounter={errorCounter}>
          Sentence suggestions
          <CheckCircle className="ml-2" />
        </ButtonAll> */}
      </Menu>
      {errorCounter == 0 && tabIndex == 0 && (
        <ImageNoError>
          {/* <img src={IMAGE_NO_ERROR} alt="no error" /> */}
        </ImageNoError>
      )}
      {errorCounter !== 0 && tabIndex === 0 && (
        <ListItemError>
          {errorList?.map((item, index) => (
            <ItemError
              handleFixOneError={handleFixOneError}
              handleIgnore={handleIgnore}
              keys={index}
              toggleActiveClass={toggleActiveClass}
              activeItem={activeItem}
              item={item}
            />
          ))}
        </ListItemError>
      )}
      {tabIndex === 1 && grammarFixed?.fixed && (
        <GrammarFixed>{tabIndex === 1 && grammarFixed?.fixed}</GrammarFixed>
      )}
    </Container>
  );
};
const GrammarFixed = styled.p`
  color: black;
  margin: 0 20px;
  padding-bottom: 20px;
  overflow: auto;
  height: 43vh;
`;
const ImageNoError = styled.div`
  text-align: center;
`;
const ListItemError = styled.div`
  overflow-y: auto;
  height: 43vh;
  padding: 0 15px;
`;
const Container = styled.div`
  @media screen and (max-width: 970px) {
    width: 100%;
    margin: 0;
  }

  background-color: white;
  width: 40%;
  border-radius: 10px;

  margin: 0 0 0 15px;
  // @media screen and (max-width: 745px) {
  //   display: none !important;
  // }
`;
const Menu: any = styled.div`
  @media screen and (max-width: 970px) {
    padding-top: 20px;
  }
  display: flex;
  margin: 12px;
  font-weight: 700;
  ${(props: any) => (props.grammarFixed ? "" : "opacity:0.5; cursor: default")}
`;
const ButtonAll: any = styled.button`
  display: flex;
  border-radius: 4px;
  border: 1px solid rgb(222, 225, 227);
  // background-color: #f7f8f9;
  color: #0077a3;
  padding: 0px 8px;
  min-width: 64px;
  user-select: none;
  cursor: ${(props: any) =>
    props.errorCounter === 0 ? "default" : "pointer"} !important;
  margin: 0px 4px;
  align-items: center;
`;
export default GrammarRight;
