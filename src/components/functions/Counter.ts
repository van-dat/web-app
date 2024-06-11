export const funcSentenceCounter = (value) => {
  if (!value) return 0;
  value = value.replaceAll("\n", " ");
  const exclamatorySentence = value.split("!").length - 1;
  const questionSentence = value.split("?").length - 1;
  const endingSentence = value.split(".").length - 1;
  return exclamatorySentence + questionSentence + endingSentence;
};

export const funcWordCounter = (value) => {
  if (!value) return 0;
  value = value.replaceAll("\n", " ");
  const arrayWords = value.split(" ");
  const newArrayWords = arrayWords.filter(
    (item) =>
      item !== "" && isNaN(item) === true && /[a-zA-Z]/.test(item) === true
  );
  return newArrayWords?.length;
};

export const funcCutWord = (value, numberWord) => {
  if (!value) return 0;
  value = value.replaceAll("\n", " ");
  const arrayWords = value.split(" ");
  const newArrayWords = arrayWords.filter(
    (item) =>
      item !== "" && isNaN(item) === true && /[a-zA-Z]/.test(item) === true
  );
  const remainingWords = newArrayWords.slice(0, numberWord - 1).join(" ");
  const overLimitWords = newArrayWords.slice(numberWord - 1).join(" ");
  const content =
    newArrayWords.length > numberWord
      ? `${remainingWords} <span className="highlighted">${overLimitWords}</span>`
      : newArrayWords.join(" ");
  return content;
};

export const funcCharacterCounter = (value) => {
  if (!value) return 0;
  const valueCharacter = value.replaceAll("\n", "");
  return valueCharacter.length;
};
export const funcParagraphsCounter = (value) => {
  if (!value) return 0;
  const arrayParagraph = value
    .split(
      `
    `
    )
    .join("<br />")
    .split("\n");
  const newArrayParagraph = arrayParagraph.filter((item) => item !== "");
  return newArrayParagraph.length;
};

export const statisticSummarize = (
  originalContent: string,
  summarizeContent: string
) => {
  if (!originalContent || !summarizeContent) return {};

  const oriWord = funcWordCounter(originalContent);
  const oriSentence = funcSentenceCounter(originalContent);
  const oriCharactor = funcCharacterCounter(originalContent);

  const sumWord = funcWordCounter(summarizeContent);
  const sumSentence = funcSentenceCounter(summarizeContent);
  const sumCharactor = funcCharacterCounter(summarizeContent);

  return {
    wordCountFrom: oriWord,
    wordCountTo: sumWord,
    sentenceFrom: oriSentence,
    sentenceTo: sumSentence,
    characterFrom: oriCharactor,
    characterTo: sumCharactor,
    reduction: Math.floor(((oriWord - sumWord) / oriWord) * 100),
  };
};

export const funcReadingTime = (value) => {
  let readingTime = funcWordCounter(value) / 225; // Average reading speed: 225 wpm
  let readingTimeText =
    readingTime < 1
      ? `${Math.round(readingTime * 60)} sec`
      : `${Math.floor(readingTime)} min ${Math.floor(
          (readingTime - Math.floor(readingTime)) * 60
        )} sec`;
  return readingTimeText;
};

export const funcSpeakingTime = (value) => {
  let speakingTime = funcWordCounter(value) / 137.5; // Average speaking speed: 137.5 wpm
  let speakingTimeText =
    speakingTime < 1
      ? `${Math.round(speakingTime * 60)} sec`
      : `${Math.floor(speakingTime)} min ${Math.floor(
          (speakingTime - Math.floor(speakingTime)) * 60
        )} sec`;
  return speakingTimeText;
};
