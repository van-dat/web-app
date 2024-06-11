// import { useState } from "react";
import WordleSearchForm from "./wordle/WordleSearchForm";

function SidebarWordle({isAutoSearch}:{isAutoSearch:boolean}) {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [keys, setKeys] = useState<any>({});

  const onClickSearch = (values) => {
    // console.log({ values });
    const {
      start,
      two,
      three,
      four,
      end,
      contain1,
      contain2,
      contain3,
      contain4,
      contain5,
      not_contain,
    } = values;
    let host = "/wordle-solver";
    let startUrl = start?.toUpperCase() || "_";
    let endUrl = end?.toUpperCase() || "_";
    let twoUrl = two?.toUpperCase() || "_";
    let threeUrl = three?.toUpperCase() || "_";
    let fourUrl = four?.toUpperCase() || "_";
    let contain1Url = contain1?.toUpperCase() || "_";
    let contain2Url = contain2?.toUpperCase() || "_";
    let contain3Url = contain3?.toUpperCase() || "_";
    let contain4Url = contain4?.toUpperCase() || "_";
    let contain5Url = contain5?.toUpperCase() || "_";
    const wordContains = startUrl + twoUrl + threeUrl + fourUrl + endUrl;
    const wordContainsUrl = wordContains!=="_____"?`&wordContains=${wordContains}`:""
    const includesLetters =
      contain1Url + contain2Url + contain3Url + contain4Url + contain5Url;
      const includesLettersUrl = includesLetters!=="_____"?`&includesLetters=${includesLetters}`:""
    const excludeLettersUrl = not_contain?`&excludeLetters=${not_contain}`:""
    let url = `${wordContainsUrl}${includesLettersUrl}${excludeLettersUrl}`;
    window.location.href = host + url.replace("&", "?");

  };
  return (
    <div className="wrap-finder-form">
      <h4>Wordle Solver</h4>
      <WordleSearchForm
        setKeys={onClickSearch}
        setLoading={()=>{}}
        loading={false}
        isAutoSearch={isAutoSearch}
      />
    </div>
  );
}

export default SidebarWordle;
