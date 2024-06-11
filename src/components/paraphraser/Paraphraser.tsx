import { useState } from "react";
import ParaphraserForm from "./ParaphraserForm";
import { paraphraserGPT } from "../../services/search.service";
import { Toaster } from "react-hot-toast";
import "./Paraphraser.scss";

const Paraphraser = () => {
  const [paraphraserResult, setParaphraserResult] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const handleParaphraser = async (value) => {
    const result = await paraphraserGPT(value);
    setLoading(false);
    setParaphraserResult(result);
  };
  // console.log(paraphraserResult);
  return (
    <>
      <Toaster />
      <div className="wrap-tool">
        <h1>Paraphraser</h1>
        <ParaphraserForm
          loading={loading}
          setLoading={setLoading}
          handleParaphraser={handleParaphraser}
          paraphraserResult={paraphraserResult}
        />
      </div>
    </>
  );
};

export default Paraphraser;
