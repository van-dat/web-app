export default function funcHighlightedText(arrayLanguageFix, paragraph) {
  var paragraphHighlight = paragraph;
  var sentenceHighlightOld = "";
  var originalSentenceOld = "";

  arrayLanguageFix?.map((item) => {
    if (originalSentenceOld == item.original_sentence) {
      const sentenceHighlight = sentenceHighlightOld.replace(
        item.incorrect,
        `<span class="highlight-text">${item.incorrect}</span>`
      );
      paragraphHighlight = paragraphHighlight?.replace(
        sentenceHighlightOld,
        sentenceHighlight
      );
    } else {
      const sentenceHighlight = item.original_sentence.replace(
        item.incorrect,
        `<span class="highlight-text">${item.incorrect}</span>`
      );
      originalSentenceOld = item.original_sentence;
      sentenceHighlightOld = sentenceHighlight;
      paragraphHighlight = paragraphHighlight?.replace(
        item.original_sentence,
        sentenceHighlight
      );
    }
  });

  return paragraphHighlight;
}
