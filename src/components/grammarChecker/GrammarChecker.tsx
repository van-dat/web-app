import { useState } from "react";
import "./Grammar.scss";
import GrammarCheckerForm from "./GrammarCheckerForm";
import GrammarRight from "./GrammarRight";
import { grammarCheckerGPT } from "../../services/search.service";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import funcHighlightedText from "../functions/HighlightedText";
// import { useDebounce } from "../hooks/useDebounce";

const GrammarChecker = () => {
  const [errorCounter, setErrorCounter] = useState<number>(0);
  const [errorList, setErrorList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [grammar, setGrammar] = useState<string>("");
  const [grammarFixed, setGrammarFixed] = useState<any>();
  const [grammarResult, setGrammarResult] = useState<any>();
  const [tabIndex, setTabIndex] = useState(0);
  // const debouncedValue = useDebounce<string>(grammar, 1000);
  // useEffect(() => {
  //   handleGrammarChecker(grammar);
  // }, [debouncedValue]);

  let language_fix = tabIndex == 0 ? "US_FIX" : "UK_FIX";
  const handleGrammarChecker = async (value) => {
    let language = tabIndex == 0 ? "US" : "UK";
    value = value.replaceAll('<span class="highlight-text">', "");
    value = value.replaceAll("</span>", "");
    value = value.replaceAll("&nbsp;", " ");

    const result = await grammarCheckerGPT(value);

    if (result) {
      const arrayLanguageFix = await result[language_fix];
      const paragraphHighlight = funcHighlightedText(arrayLanguageFix, value)
      setGrammarResult(result);
      setErrorList(result[language_fix]);
      setErrorCounter(result[language_fix]?.length);
      setGrammarFixed(result[language]);
      setLoading(false);
      setGrammar(paragraphHighlight);
    }
  };
  const handleFixError = () => {
    setErrorList(null);
    setErrorCounter(0);
    if (grammarResult) {
      let language = tabIndex == 0 ? "US" : "UK";
      // console.log(grammarResult[language].fixed);
      setGrammar(grammarResult[language].fixed);
    }
  };
  const handleSetTabIndex = (index) => {
    setTabIndex(index);
    // console.log({ grammarResult });
    // if (grammarResult) {
    //   // let language = index == 0 ? "US" : "UK";
    //   // console.log({ index, language });
    //   // console.log(grammarResult[language]?.fixed);
    //   // setGrammar(grammarResult[language]?.fixed);
    //   // setErrorList(grammarResult[language_fix]);
    //   // setErrorCounter(grammarResult[language_fix]?.length);
    // }
  };
  const handleFixOneError = (
    incorrect,
    correct
    // original_sentence,
    // fixed_sentence
  ) => {
    // const result = grammar.replace(original_sentence, fixed_sentence);

    // setGrammar(result);
    setErrorList(
      errorList.filter(
        (item) => item.incorrect !== incorrect && item.correct !== correct
      )
    );
    setErrorCounter(errorCounter - 1);
  };
  const handleIgnore = (incorrect, correct) => {
    setErrorList(
      errorList.filter(
        (item) => item.incorrect !== incorrect && item.correct !== correct
      )
    );
    setErrorCounter(errorCounter - 1);
  };
  // console.log({ errorList });
  return (
    <div id="grammar-checker">
      <Toaster />
      <div className="wrap-tool">
        <h1>Grammar Checker</h1>
        <WrapFrom>
          <GrammarCheckerForm
            setErrorCounter={setErrorCounter}
            handleSetTabIndex={handleSetTabIndex}
            errorCounter={errorCounter}
            setGrammar={setGrammar}
            grammar={grammar}
            grammarResult={grammarResult}
            handleFixError={handleFixError}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            handleGrammarChecker={handleGrammarChecker}
            loading={loading}
            setErrorList={setErrorList}
            setLoading={setLoading}
          />
          <GrammarRight
            errorCounter={errorCounter}
            errorList={errorList}
            handleFixOneError={handleFixOneError}
            handleIgnore={handleIgnore}
            grammarFixed={grammarFixed}
          />
        </WrapFrom>
      </div>
    </div>
  );
};
const WrapFrom = styled.div`
  display: flex;
  @media screen and (max-width: 970px) {
    display: block;
  }
`;
export default GrammarChecker;
