import "react-loading-skeleton/dist/skeleton.css";
import "../../global.scss";
import Dictionary from "../dictionary/Dictionary";
import WordFinder from "../wordFinder/WordFinder";
import Wordle from "../wordle/Wordle";
import WordThat from "../WordThat/WordThat";
import WordCounter from "../wordCounter/WordCounter";
import Summarize from "../summarize/Summarize";
import AnagramSolver from "../anagramSolver/AnagramSolver";
import GrammarChecker from "../grammarChecker/GrammarChecker";
import Paraphraser from "../paraphraser/Paraphraser";
import RandomWordGenerator from "../RandomWordGenerator/RandomWordGenerator";

const MainLayout = () => {
  let title = "Word Finder";
  let desc = "";
  // let desc = "Include up to 3 wildcards (?)";
  const url = window.location.href;
  const isWordFinder = url.indexOf("wordfinder") > -1;
  const isWorlde = url.indexOf("wordle-solver") > -1;
  const isWwf = url.indexOf("words-with-friends-cheat/") > -1;
  const isSca = url.indexOf("scrabble-word-finder") > -1;
  const isAnagram = url.indexOf("anagram-solver/") > -1;
  const isWordUnscamble = url.indexOf("unscramble/") > -1;
  const isDescrambler = url.indexOf("word-descrambler/") > -1;
  const isDictionary = url.indexOf("definition") > -1;
  const isWordCounter = url.indexOf("word-counter") > -1;
  const isSummarizer = url.indexOf("summarize") > -1;
  const isWordsThat =
    url.indexOf("words-that") > -1 && url.indexOf("5-letter-words") < 0;
  const isWordWarCheat = url.indexOf("word-wars-cheat/") > -1;
  const isGrammarChecker = url.indexOf("grammar-check") > -1;
  const isRandomWordGenerator = url.indexOf("random-word-generator") > -1;
  const isParaphraser = url.indexOf("paraphrasing-tool") > -1;

  const arrPath = window.location.pathname.split("/");
  const path = arrPath[arrPath.length - 2];

  if (isWordFinder) {
    title = "Word Finder";
  } else if (isWorlde) {
    title = "Wordle Solver";
    desc = "";
  } else if (isWwf) {
    title = "Words With Friends Cheat";
  } else if (isSca) {
    title = "Scrabble Cheat";
  } else if (isAnagram) {
    title = "Anagram Solver";
    desc = "Enter up to 20 letters";
  } else if (isWordUnscamble) {
    title = "Word Unscrambler";
  } else if (isDescrambler) {
    title = "Word Descrambler - Unscramble Jumbled Letters";
  } else if (isDictionary) {
    title = "Dictionary";
  } else if (isWordWarCheat) {
    title = "Word Wars Cheat";
  }

  const isShowWordFinder =
    isWordFinder ||
    isWwf ||
    isSca ||
    isWordUnscamble ||
    isDescrambler ||
    isWordWarCheat;

  let defaultSelectValue = 0;
  if (isWwf) {
    defaultSelectValue = 1;
  } else if (isSca) {
    defaultSelectValue = 2;
  }

  return (
    <>
      {isWorlde && <Wordle title={title} desc={desc} />}
      {isShowWordFinder && (
        <WordFinder
          title={title}
          desc={desc}
          defaultSelectValue={defaultSelectValue}
        />
      )}
      {isDictionary && <Dictionary title={title} />}
      {isWordsThat && <WordThat path={path} />}
      {isWordCounter && <WordCounter />}
      {isSummarizer && <Summarize />}
      {isAnagram && <AnagramSolver title={title} desc={desc} />}
      {isGrammarChecker && <GrammarChecker />}
      {isParaphraser && <Paraphraser />}
      {isRandomWordGenerator && <RandomWordGenerator />}
    </>
  );
};

export default MainLayout;
