import { useState } from "react";
import { summarizeGPT } from "../../services/search.service";
import "./Summarize.scss";
import SummarizeForm from "./SummarizeForm";
import { Toaster } from "react-hot-toast";

const Summarize = () => {
  const [isSummarize, setIsSummarize] = useState<boolean>(false);

  const [paragraphResult, setParagraphResult] = useState<string>("");
  const [keySentenceResult, setKeySentenceResult] = useState<string>("");

  useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSummarize = async (value) => {
    setIsSummarize(true);
    const paragraph = await summarizeGPT(value, 1);
    setParagraphResult(paragraph);
    const keySentence = await summarizeGPT(value, 2);
    setKeySentenceResult(keySentence);
    setLoading(false);
  };

  return (
    <>
      <Toaster />
      <div className="wrap-tool">
        <h1>Summarizer</h1>
        <SummarizeForm
          paragraphResult={paragraphResult}
          keySentenceResult={keySentenceResult}
          loading={loading}
          setLoading={setLoading}
          handleSummarize={handleSummarize}
          isSummarize={isSummarize}
          setKeySentenceResult={setKeySentenceResult}
          setParagraphResult={setParagraphResult}
        />
      </div>
    </>
  );
};

export default Summarize;
