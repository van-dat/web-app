import classNames from "classnames";
import { useEffect, useState } from "react";
import styled from "styled-components";
type Props = {
  setKeys: any;
  setLoading: any;
  loading: boolean;
  isAutoSearch?: boolean;
};
const getParamByUrlWordle = (urlString: string) => {
  const url = new URL(urlString);
  const params = new URLSearchParams(url.search);

  const wordContains = params.get("wordContains") || "";
  const includesLetters = params.get("includesLetters") || "";
  const excludeLetters = params.get("excludeLetters") || "";

  const initStart = wordContains[0] === "_" ? "" : wordContains[0];
  const initTwo = wordContains[1] === "_" ? "" : wordContains[1];
  const initThree = wordContains[2] === "_" ? "" : wordContains[2];
  const initFour = wordContains[3] === "_" ? "" : wordContains[3];
  const initEnd = wordContains[4] === "_" ? "" : wordContains[4];

  const initContain1 = includesLetters[0] === "_" ? "" : includesLetters[0];
  const initContain2 = includesLetters[1] === "_" ? "" : includesLetters[1];
  const initContain3 = includesLetters[2] === "_" ? "" : includesLetters[2];
  const initContain4 = includesLetters[3] === "_" ? "" : includesLetters[3];
  const initContain5 = includesLetters[4] === "_" ? "" : includesLetters[4];

  return {
    initStart,
    initTwo,
    initThree,
    initFour,
    initEnd,
    initContain1,
    initContain2,
    initContain3,
    initContain4,
    initContain5,
    excludeLetters,
  };
};
const WordleSearchForm = (props: Props) => {
  const {
    initStart,
    initTwo,
    initThree,
    initFour,
    initEnd,
    initContain1,
    initContain2,
    initContain3,
    initContain4,
    initContain5,
    excludeLetters,
  } = getParamByUrlWordle(window.location.href);

  const { setKeys, setLoading, isAutoSearch } = props;
  const [isClient, setIsClient] = useState(false);
  const [start, setStart] = useState(initStart);
  const [letterTwo, setLetterTwo] = useState(initTwo);
  const [letterThree, setLetterThree] = useState(initThree);
  const [letterFour, setLetterFour] = useState(initFour);
  const [end, setEnd] = useState(initEnd);

  const [contain1, setContain1] = useState(initContain1);
  const [contain2, setContain2] = useState(initContain2);
  const [contain3, setContain3] = useState(initContain3);
  const [contain4, setContain4] = useState(initContain4);
  const [contain5, setContain5] = useState(initContain5);
  const [exclude, setExclude] = useState(excludeLetters);
  const [noti, setNoti] = useState({ message: "", type: "" } || null);
  const [isCheck, setCheck] = useState(true);
  const [showClearPlaced, setShowClearPlaced] = useState(
    start != "" ||
      letterTwo != "" ||
      letterThree != "" ||
      letterFour != "" ||
      end != ""
  );
  const [showClearInclude, setShowClearInclude] = useState(
    contain1 != "" ||
      contain2 != "" ||
      contain3 != "" ||
      contain4 != "" ||
      contain5 != ""
  );
  const [showClearExclude, setShowClearExclude] = useState(exclude != "");
  const isValid =
    start ||
    end ||
    letterTwo ||
    letterThree ||
    letterFour ||
    contain1 ||
    contain2 ||
    contain3 ||
    contain4 ||
    contain5 ||
    exclude;

  const isLetterValid = (key: string, letter: string) => {
    if (key === "exclude") {
      const arrLetter = letter.split("");
      for (let i = 0; i < arrLetter.length; i++) {
        const le = arrLetter[i].toUpperCase();
        if (le === "") continue;
        const isInValid =
          le === start?.toUpperCase() ||
          le === end?.toUpperCase() ||
          le === letterTwo?.toUpperCase() ||
          le === letterThree?.toUpperCase() ||
          le === letterFour?.toUpperCase() ||
          le === contain1?.toUpperCase() ||
          le === contain2?.toUpperCase() ||
          le === contain3?.toUpperCase() ||
          le === contain4?.toUpperCase() ||
          le === contain5?.toUpperCase();
        if (isInValid) return false;
      }
    } else {
      if (!letter) return true;
      const isInvalid = exclude.split(",").findIndex((l) => l === letter) > -1;
      if (isInvalid) return false;
    }

    return true;
  };

  const setValue = (key: string, value: any) => {
    if (key === "checkbox") {
      setCheck(!isCheck);
    }

    if (value === " " || (value.length > 0 && !isNaN(value))) return;

    if (key !== "exclude") {
      if (value.length > 1) return;
    } else {
      if (value.length > 30) return;
    }

    const isValid = isLetterValid(key, value);
    if (!isValid) {
      const arr = value.split("");
      const l = key === "exclude" ? arr[arr.length - 1] : value;
      setNoti({
        type: "warning",
        message: `Ups, you can't put "${l.toUpperCase()}" in Placed and Bad at the same time`,
      });
      setTimeout(() => {
        setNoti({ message: "", type: "" });
      }, 4000);
      return false;
    }

    if (key === "start") {
      setShowClearPlaced(true);
      setStart(value);
      if (value != "") {
        document.getElementById("two")?.focus();
      } else {
        setShowClearPlaced(false);
      }
    }

    if (key === "end") {
      setShowClearPlaced(true);
      setEnd(value);
      if (value == "") {
        document.getElementById("four")?.focus();
      }
    }

    if (key === "two") {
      setShowClearPlaced(true);
      setLetterTwo(value);
      if (value != "") {
        document.getElementById("three")?.focus();
      } else {
        document.getElementById("start")?.focus();
      }
    }

    if (key === "three") {
      setShowClearPlaced(true);
      setLetterThree(value);
      if (value != "") {
        document.getElementById("four")?.focus();
      } else {
        document.getElementById("two")?.focus();
      }
    }

    if (key === "four") {
      setShowClearPlaced(true);
      setLetterFour(value);
      if (value != "") {
        document.getElementById("end")?.focus();
      } else {
        document.getElementById("three")?.focus();
      }
    }

    if (key === "contain1") {
      setShowClearInclude(true);
      setContain1(value);
      if (value != "") {
        document.getElementById("contain2")?.focus();
      } else {
        setShowClearInclude(false);
      }
    }
    if (key === "contain2") {
      setShowClearInclude(true);
      setContain2(value);
      if (value != "") {
        document.getElementById("contain3")?.focus();
      } else {
        document.getElementById("contain1")?.focus();
      }
    }
    if (key === "contain3") {
      setShowClearInclude(true);
      setContain3(value);
      if (value != "") {
        document.getElementById("contain4")?.focus();
      } else {
        document.getElementById("contain2")?.focus();
      }
    }
    if (key === "contain4") {
      setShowClearInclude(true);
      setContain4(value);
      if (value != "") {
        document.getElementById("contain5")?.focus();
      } else {
        document.getElementById("contain3")?.focus();
      }
    }
    if (key === "contain5") {
      setShowClearInclude(true);
      setContain5(value);
      if (value == "") {
        document.getElementById("contain4")?.focus();
      }
    }

    if (key === "exclude") {
      if (value == "") {
        setExclude(value);
        setShowClearExclude(false);
      } else {
        setExclude(value);
        setShowClearExclude(true);
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSearch = async () => {
    setLoading(true);
    setKeys({
      start,
      two: letterTwo,
      three: letterThree,
      four: letterFour,
      end,
      contain1,
      contain2,
      contain3,
      contain4,
      contain5,
      not_contain: exclude,
    });
  };
  useEffect(() => {
    if (isValid && isAutoSearch) {
      onSearch();
    }
  }, []);
  if (!isClient) return null;

  const btnCl = classNames({
    "button is-warning is-medium is-fullwidth is-rounded": true,
    "is-loading": props.loading,
  });
  const handleClear = () => {
    setStart("");
    setLetterTwo("");
    setLetterThree("");
    setLetterFour("");
    setEnd("");
    setShowClearPlaced(false);
  };
  const handleClearInclude = () => {
    setContain1("");
    setContain2("");
    setContain3("");
    setContain4("");
    setContain5("");
    setShowClearInclude(false);
  };
  const handleClearExclude = () => {
    setExclude("");
    setShowClearExclude(false);
  };

  return (
    <Container className="wordle-form"
    isSidebar={props.isAutoSearch ? false : true}
    >
      <form onSubmit={(e:any)=>{
        e.preventDefault();
        onSearch()
      }}>

      <Section>
        <Strong>"Green" Letters</Strong>
        <Desc>Letters are in the word and in the correct spot</Desc>
        <Row>
          <Input
            value={start}
            onChange={(e: any) => setValue("start", e.target.value)}
            success="true"
            id="start"
          />

          <Input
            value={letterTwo}
            onChange={(e: any) => setValue("two", e.target.value)}
            success="true"
            id="two"
          />

          <Input
            value={letterThree}
            onChange={(e: any) => setValue("three", e.target.value)}
            success="true"
            id="three"
          />

          <Input
            value={letterFour}
            onChange={(e: any) => setValue("four", e.target.value)}
            success="true"
            id="four"
          />

          <Input
            value={end}
            onChange={(e: any) => setValue("end", e.target.value)}
            success="true"
            id="end"
          />
        </Row>
        {showClearPlaced && (
          <ClearAll>
            <b onClick={handleClear}>
              <a className="has-text-black	">Clear all</a>
            </b>
          </ClearAll>
        )}
      </Section>
      <Section>
        <Strong>"Yellow" Letters</Strong>
        <Desc>Letters are in the word but in the wrong spot</Desc>
        <Row>
          <Input
            type="warn"
            id="contain1"
            value={contain1}
            onChange={(e: any) => setValue("contain1", e.target.value)}
          />

          <Input
            type="warn"
            id="contain2"
            value={contain2}
            onChange={(e: any) => setValue("contain2", e.target.value)}
          />

          <Input
            type="warn"
            id="contain3"
            value={contain3}
            onChange={(e: any) => setValue("contain3", e.target.value)}
          />

          <Input
            type="warn"
            id="contain4"
            value={contain4}
            onChange={(e: any) => setValue("contain4", e.target.value)}
          />

          <Input
            type="warn"
            id="contain5"
            value={contain5}
            onChange={(e: any) => setValue("contain5", e.target.value)}
          />
        </Row>
        {showClearInclude && (
          <ClearAll>
            <b onClick={handleClearInclude}>
              <a className="has-text-black	">Clear all</a>
            </b>
          </ClearAll>
        )}
      </Section>
      <Section>
        <Strong>Invalid Letters</Strong>
        <Desc>Letters aren't in the target word at all</Desc>
        <Exclude
          value={exclude}
          onChange={(e: any) => setValue("exclude", e.target.value)}
        />
        {showClearExclude && (
          <ClearAll>
            <b onClick={handleClearExclude}>
              <a className="has-text-black	">Clear all</a>
            </b>
          </ClearAll>
        )}
        {noti && noti.message && <Message>{noti.message}</Message>}
      </Section>
      <Section>
        <input
          type="checkbox"
          checked={isCheck}
          onChange={(e) => setValue("checkbox", e.target.value)}
        />
        &nbsp;Display NYT Wordle Answers Only
      </Section>
      <button onClick={onSearch} disabled={!isValid} className={btnCl}>
        Search
      </button>
      
</form>
    </Container>
  );
};

export default WordleSearchForm;

export const Container = styled.div<{ isSidebar: boolean }>`
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0;
  box-sizing: border-box;
  color: #fff;
  padding: ${(props) => (props.isSidebar ? "35px" : "50px")};
  border-radius: 20px;
  background-color: #fff;
  color: #000;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const Input: any = styled.input.attrs((props) => ({
  id: props.id,
  tabIndex: 0,
}))`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 2px solid ${(props: any) => (props.success ? "#48c78e" : "#ffc31d")};
  text-align: center;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: ${(props: any) =>
    props.success && props.value != "" && props.value !== undefined
      ? "#48c78e"
      : props.type == "warn" && props.value != "" && props.value !== undefined
      ? "#ffc31d"
      : ""};
  &:focus {
    outline: none;
    box-shadow: ${(props: any) =>
      props.success
        ? "0 0 0 0.125em rgba(72,199,142,.25)"
        : props.type == "warn"
        ? "0 0 0 0.125em rgba(255, 224, 138, 0.25)"
        : ""};
  }
`;

// const Button = styled.button`
//   background-color: #ffc31d !important;
//   font-weight: 700;
//   text-align: center;
//   padding: 9px 25px;
//   border-radius: 30px;

//   color: #000;
//   width: 100%;
//   font-size: 20px;
//   border: none;
//   cursor: ${(props:any) => (props.disabled ? "normal" : "pointer")};
//   opacity: ${(props:any) => (props.disabled ? "0.5" : "1")};
// `;

export const ClearAll: any = styled.u`
  margin-top: 8px;
  display: flex;
  justify-content: end;
`;

const Exclude = ({ onChange, value }: { onChange: any; value: any }) => {
  return (
    <InputText
      type="text"
      id="contain"
      value={value.toUpperCase()}
      onChange={onChange}
      placeholder="OABCD"
      className="input is-medium is-full-width"
    />
  );
};

const Strong = styled.strong`
  font-size: 16px;
`;

const Desc = styled.p`
  margin: 8px 0;
`;

const InputText = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  font-size: 20px;
  border: 1px solid #f0f0f0;
  padding: 0 10px;
`;

const Message = styled.div`
  color: hsl(348, 100%, 61%);
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Section = styled.div`
  margin: 0 0 20px 0;
`;
