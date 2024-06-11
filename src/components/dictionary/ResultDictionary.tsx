import Markdown from "react-markdown";

type Props = {
  word: string;
  wordDetail: any;
};

const ResultDictionary = (props: Props) => {
  const { word, wordDetail } = props;

  return (
    <div className="pl-5">
      <Markdown>
        {word
          ? wordDetail && wordDetail[0] && wordDetail[0].description != null
            ? wordDetail[0].description
            : "This word does not have a detailed description"
          : ""}
      </Markdown>
    </div>
  );
};

export default ResultDictionary;
