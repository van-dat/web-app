import classNames from "classnames";
import { useEffect, useState } from "react";
import {
  BtnDeleteInput,
  BtnDeleteLetter,
  BtnSearch,
  Col,
  Container,
  Input,
  LetterInput,
  Row,
  SmContainer,
  WrapControl,
} from "../styleComponents/StyleWordFinderForm";
import ItemGame from "./ItemGame";
import styled from "styled-components";
import { Search } from "react-bootstrap-icons";
import { BASE64_IMAGE_GAME } from "../const/BASE64_IMAGE_GAME";
import { GAME_TYPES } from "../const/GAME_TYPES";
const listGame = [
  {
    gameId: GAME_TYPES.WWF,
    text: "Word With Friends®",
    position: "-38px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.SCA_US,
    text: "Scabble® US",
    position: "-12px",
    positionIcon: "-1px -1px",
  },
  {
    gameId: GAME_TYPES.SCA_UK,
    text: "Scabble® UK",
    position: "-12px",
    positionIcon: "-13px -1px",
  },
  {
    gameId: GAME_TYPES.WORD_SCAPE,
    text: "Wordscapes®",
    position: "-402px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.ANAGRAM,
    text: "Anagram Solver",
    position: "-64px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.FOUR_PIC,
    text: "4 Pics 1 Word®",
    position: "-90px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.JUMBLE_SOLVER,
    text: "Jumble Solver",
    position: "-116px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.WORD_CONNECT,
    text: "Word Connect®",
    position: "-168px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.WORD_COOKIE,
    text: "Word Cookies®",
    position: "-142px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.WORD_CHUMS,
    text: "Word Chums®",
    position: "-194px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.TEXT_TWIST,
    text: "Text Twist®",
    position: "-220px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.CODE_CROSS,
    text: "Cody Cross®",
    position: "-246px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.WORD_FEUD,
    text: "Wordfeud",
    position: "-272px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.WORD_BRAIN,
    text: "Word Brain®",
    position: "-298px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.WORD_STORY,
    text: "Word Story®",
    position: "-324px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.WORD_SWIPE,
    text: "Word Swipe",
    position: "-350px",
    positionIcon: "",
  },
  {
    gameId: GAME_TYPES.WORD_WARS,
    text: "Word Wars",
    position: "-428px",
    positionIcon: "",
  },
  {
    gameId: 0,
    text: "All dictionaries",
    position: "-376px",
    positionIcon: "",
  },
];
const ButtonIconSearch: any = styled.div`
  position: absolute;
  background-color: ${(props: any) => (props.letter ? "#f7c342" : "none")};
  padding: 23px 20px;
  border-bottom-left-radius: 32px;
  border-top-left-radius: 32px;
  z-index: 10;
  height: 61px;
  margin-top: 1px;
  cursor: pointer;
`;
export const Letter = ({
  onChange,
  value,
  setLetter,
  onSearch,
}: {
  onChange: any;
  value: any;
  setLetter: any;
  onSearch?: any;
}) => {
  return (
    <WrapControl>
      <ButtonIconSearch onClick={onSearch} letter={value}>
        <Search size={20} color="black" />
      </ButtonIconSearch>
      <LetterInput
        type="text"
        id="letter"
        value={value}
        onChange={onChange}
        className="input is-normal"
        placeholder="Enter Letter"
      />
      {value && (
        <BtnDeleteLetter onClick={() => setLetter("")}>
          <span>&times;</span>
        </BtnDeleteLetter>
      )}
    </WrapControl>
  );
};

const Start = ({
  onChange,
  value,
  setStart,
}: {
  onChange: any;
  value: any;
  setStart: any;
}) => {
  return (
    <div className="position-relative">
      <Input
        type="text"
        id="start"
        value={value}
        onChange={onChange}
        className="input"
        placeholder="Start"
      />
      {value && (
        <BtnDeleteInput onClick={() => setStart("")}>
          <span>&times;</span>
        </BtnDeleteInput>
      )}
    </div>
  );
};

const End = ({
  onChange,
  value,
  setEnd,
}: {
  onChange: any;
  value: any;
  setEnd: any;
}) => {
  return (
    <div className="position-relative">
      <Input
        type="text"
        id="end"
        value={value}
        onChange={onChange}
        className="input"
        placeholder="End"
      />
      {value && (
        <BtnDeleteInput onClick={() => setEnd("")}>
          <span>&times;</span>
        </BtnDeleteInput>
      )}
    </div>
  );
};

const Contain = ({
  onChange,
  value,
  setContain,
}: {
  onChange: any;
  value: any;
  setContain: any;
}) => {
  return (
    <div className="position-relative">
      <Input
        type="text"
        id="contain"
        value={value}
        onChange={onChange}
        placeholder="Contain"
        className="input"
      />
      {value && (
        <BtnDeleteInput onClick={() => setContain("")}>
          <span>&times;</span>
        </BtnDeleteInput>
      )}
    </div>
  );
};

const Length = ({
  onChange,
  value,
  setLength,
}: {
  onChange: any;
  value: any;
  setLength: any;
}) => {
  return (
    <div className="position-relative">
      <Input
        type="text"
        id="length"
        min={0}
        value={value}
        onChange={onChange}
        placeholder="Length"
        className="input"
      />
      {value && (
        <BtnDeleteInput onClick={() => setLength("")}>
          <span>&times;</span>
        </BtnDeleteInput>
      )}
    </div>
  );
};

const getParamByUrl = (urlString: string) => {
  // Create a URL object
  const url = new URL(urlString);

  // Use URLSearchParams to parse the query parameters
  const params = new URLSearchParams(url.search);

  // Extract parameters individually
  const letter = params.get("letter") || "";
  const start = params.get("start") || "";
  const end = params.get("end") || "";
  const contain = params.get("contain") || "";
  const length = params.get("length") || "";
  const gameId = params.get("gameId") || 0;
  return {
    defaultLetter: letter,
    defaultStart: start,
    defaultEnd: end,
    defaultContain: contain,
    defaultLength: length,
    defaultGameId: gameId,
  };
};

export default function WordFinderForm({
  setLoading,
  setKeys,
  loading,
  defaultSelectValue,
  isAutoSearch,
}: {
  setLoading: any;
  setKeys: any;
  loading: boolean;
  defaultSelectValue: number;
  isAutoSearch?: boolean;
}) {
  const {
    defaultLetter,
    defaultStart,
    defaultEnd,
    defaultContain,
    defaultLength,
    defaultGameId,
  } = getParamByUrl(window.location.href);
  const [letter, setLetter] = useState(defaultLetter);
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const [contain, setContain] = useState(defaultContain);
  const [length, setLength] = useState(defaultLength);
  const defaultDic = defaultGameId ? Number(defaultGameId) : defaultSelectValue;
  const [dicType, setDicType] = useState(defaultDic);
  const [showGame, setShowGame] = useState<boolean>(false);

  const isValid = letter || start || end || contain || length;

  const [textGame, setTextGame] = useState<any>({
    text: "All dictionaries",
    position: "-376px",
    positionIcon: "",
  });
  const btnCl = classNames({
    "button is-warning is-medium is-fullwidth ": true,
    "is-loading": loading,
  });
  const setValue = (key: any, value: any) => {
    if (key !== "length" && key !== "dic") {
      const arrKey = value.split("");
      arrKey.map((item: any) => {
        if (!isNaN(item)) return (value = value.slice(0, -1));
      });
    }

    if (key === "length" && key !== "dic") {
      const arrKey = value.split("");
      arrKey.map((item: any) => {
        if (isNaN(item)) return (value = value.slice(0, -1));
      });
    }

    if (key === "letter") {
      if (value.length > 15) return;

      setLetter(value);
    }

    if (key === "start") {
      if (value.length > 14) return;
      setStart(value);
    }

    if (key === "end") {
      if (value.length > 14) return;
      setEnd(value);
    }

    if (key === "contain") {
      if (value.length > 14) return;
      setContain(value);
    }

    if (key === "length") {
      if (Number(value) > 15) return;
      setLength(value);
    }

    // if (key === "dic") {
    //   const type = Number(value);
    //   if (isNaN(type)) return;
    //   setDicType(type);
    // }
  };

  const onSearch = async () => {
    setLoading(true);
    setKeys({
      letter,
      start,
      end,
      contain,
      length,
      gameId: dicType,
    });
  };

  useEffect(() => {
    if (dicType) {
      const gameInfo: any =
        listGame.find((item) => item.gameId === dicType) || {};
      const { text, position, gameId, positionIcon } = gameInfo;
      handleSelectGame(text, position, gameId, positionIcon);
    }
  }, []);

  const handleSelectGame = (
    text: string,
    position: string,
    gameId: number,
    positionIcon: string
  ) => {
    setTextGame({ text, position, positionIcon });
    setShowGame(false);
    setDicType(gameId);
  };

  useEffect(() => {
    if (isValid && isAutoSearch) {
      onSearch();
    }
  }, []);
  return (
    <Container className="wordFinder-form">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <Letter
          value={letter}
          onChange={(e: any) => setValue("letter", e.target.value)}
          setLetter={setLetter}
          onSearch={onSearch}
        />
        <SmContainer>
          <WrapControl>
            <Row>
              <Col>
                <Start
                  value={start}
                  onChange={(e: any) => setValue("start", e.target.value)}
                  setStart={setStart}
                />
              </Col>
              <Col>
                <End
                  value={end}
                  onChange={(e: any) => setValue("end", e.target.value)}
                  setEnd={setEnd}
                />
              </Col>
            </Row>
          </WrapControl>
          <WrapControl>
            <Row>
              <Col>
                <Contain
                  value={contain}
                  onChange={(e: any) => setValue("contain", e.target.value)}
                  setContain={setContain}
                />
              </Col>
              <Col>
                <Length
                  value={length}
                  onChange={(e: any) => setValue("length", e.target.value)}
                  setLength={setLength}
                />
              </Col>
            </Row>
          </WrapControl>
          <WrapControl>
            <div className="position-relative">
              <div
                className="is-flex option-game"
                onClick={() => setShowGame(!showGame)}
              >
                {showGame && <div className="click-outside"></div>}
                <DefaultGame
                  position={textGame.position}
                  imageGame={BASE64_IMAGE_GAME}
                >
                  {textGame.positionIcon && (
                    <IconGame
                      positionIcon={textGame.positionIcon}
                      imageGame={BASE64_IMAGE_GAME}
                    ></IconGame>
                  )}
                </DefaultGame>
                <span className="ml-2 has-text-black-bis">{textGame.text}</span>
                <IconOption showGame={showGame}></IconOption>
              </div>
              {showGame && (
                <div className="container-game">
                  <div className="box-game-id">
                    {listGame.map((item: any) => {
                      return (
                        <ItemGame
                          handleSelectGame={handleSelectGame}
                          text={item.text}
                          position={item.position}
                          gameId={item.gameId}
                          positionIcon={item.positionIcon}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </WrapControl>
          <WrapControl>
            <BtnSearch onClick={onSearch} disabled={!isValid} className={btnCl}>
              Search
            </BtnSearch>
          </WrapControl>
        </SmContainer>
      </form>
    </Container>
  );
}
const DefaultGame: any = styled.div`
  background-image: url(${(props: any) => props.imageGame});
  background-position-y: ${(props: any) => props.position};
  background-size: 26px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
`;
const IconGame: any = styled.div`
  width: 10px;
  height: 10px;
  background-size: 26px;
  position: absolute;
  left: 30px;
  top: 6px;
  background-image: url(${(props: any) => props.imageGame});
  background-position: ${(props: any) => props.positionIcon};
`;

const IconOption: any = styled.strong`
  transform: ${(props: any) =>
    props.showGame
      ? "rotate(-45deg) scaleY(-1) translateY(calc(-50% + 5px))"
      : "rotate(45deg) translateY(calc(-50% - 2px))"};

  right: ${(props: any) => (props.showGame ? "15px" : "20px")};
`;
