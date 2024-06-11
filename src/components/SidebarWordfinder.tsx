import WordFinderForm from "./wordFinder/WordFinderForm";

function SidebarWordFinder({
  title,
  isAutoSearch,
}: {
  title: string;
  isAutoSearch: boolean;
}) {
  // const [keys, setKeys] = useState();
  const onClickSearch = (values) => {
    // console.log({ values });
    const { start, end, contain, length, gameId, letter } = values;

    let host = `/wordfinder`;

    let url = "";
    if (letter) {
      url += `&letter=${letter}`;
    }
    if (start) {
      url += `&start=${start}`;
    }
    if (end) {
      url += `&end=${end}`;
    }

    if (contain) {
      url += `&contain=${contain}`;
    }

    if (length) {
      url += `&length=${Number(length)}`;
    }
    if (gameId) {
      url += `&gameId=${gameId}`;
    }

    window.location.href = host + url.replace("&", "?");
  };
  return (
    <div className="wrap-finder-form">
      <h4>{title}</h4>
      <WordFinderForm
        setLoading={() => {}}
        setKeys={onClickSearch}
        loading={false}
        defaultSelectValue={0}
        isAutoSearch={isAutoSearch}
      />
    </div>
  );
}

export default SidebarWordFinder;
