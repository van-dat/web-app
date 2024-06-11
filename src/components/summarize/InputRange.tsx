import { InputRange } from "./SummarizeStyleComponent";

type Props = {
  tabIndex: number;
  summaryLengthParagraph: number;
  summaryLengthKeySentences: number;
  setSummaryLengthParagraph: any;
  setSummaryLengthKeySentences: any;
};

const InputRangeComponent = (props: Props) => {
  const {
    tabIndex,
    summaryLengthParagraph,
    summaryLengthKeySentences,
    setSummaryLengthParagraph,
    setSummaryLengthKeySentences,
  } = props;

  return (
    <div>
      {tabIndex == 0 && (
        <InputRange
          type="range"
          min={0}
          max={100}
          value={summaryLengthParagraph}
          step={50}
          onChange={(e: any) => setSummaryLengthParagraph(e.target.value)}
        />
      )}
      {tabIndex == 1 && (
        <InputRange
          type="range"
          min={2}
          max={16}
          step={1}
          value={summaryLengthKeySentences}
          onChange={(e: any) => setSummaryLengthKeySentences(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputRangeComponent;
