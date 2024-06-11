import cl from "classnames";
import { useState } from "react";

import {
  SortNumericDown,
  SortAlphaDown,
  SortAlphaDownAlt,
  SortDown,
} from "react-bootstrap-icons";
import styled from "styled-components";

type Props = {
  wordSorting: string;
  setWordSorting: any;
  noSortPoint?: boolean;
};

const Sort = (props: Props) => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const { wordSorting, setWordSorting, noSortPoint } = props;
  const dropdown = cl({
    "is-active": isDropDown,
    dropdown: true,
  });
  const sortPoint = cl({
    "btn-dropdown-item": true,
    "dropdown-item": true,
    "is-active": wordSorting === "point",
  });
  const sortAZ = cl({
    "btn-dropdown-item": true,
    "dropdown-item": true,
    "is-active": wordSorting === "az",
  });
  const sortZA = cl({
    "btn-dropdown-item": true,
    "dropdown-item": true,
    "is-active": wordSorting === "za",
  });
  const handleSortPoint = () => {
    setIsDropDown(false);
    setWordSorting("point");
  };
  const handleSortAZ = () => {
    setIsDropDown(false);
    setWordSorting("az");
  };
  const handleSortZA = () => {
    setIsDropDown(false);
    setWordSorting("za");
  };

  return (
    <div id="sort" className={dropdown}>
      <div
        className="dropdown-trigger"
        onClick={() => setIsDropDown(!isDropDown)}
      >
        {isDropDown && <div className="click-outside"></div>}
        <ButtonSort
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <SortDown />
          <span>Sort by</span>
        </ButtonSort>
      </div>

      <DialogSort className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {noSortPoint ? (
            ""
          ) : (
            <div onClick={handleSortPoint} className={sortPoint}>
              <SortNumericDown />
              <span>Points</span>
            </div>
          )}
          <div onClick={handleSortAZ} className={sortAZ}>
            <SortAlphaDown />
            <span>A to Z</span>
          </div>
          <div onClick={handleSortZA} className={sortZA}>
            <SortAlphaDownAlt /> <span>Z to A</span>
          </div>
        </div>
      </DialogSort>
    </div>
  );
};

export default Sort;
const DialogSort = styled.div`
  right: 0;
  left: auto;
  minwidth: 8rem;
`;
const ButtonSort = styled.div`
  border-radius: 30px;
`;
