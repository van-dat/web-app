import axios from "axios";
// const host =
//   process.env.APP_ENV === "development"
//     ? "http://localhost:8080/"
//     : "https://whale-app-982x8.ondigitalocean.app/";

const host = "https://whale-app-982x8.ondigitalocean.app/";
export const search = async ({
  letter,
  start,
  end,
  contain,
  length,
  gameId,
  wordSorting,
  page,
}: {
  letter?: string;
  start: string;
  end: string;
  contain?: string;
  length?: number;
  gameId?: number;
  wordSorting?: string;
  page?: number;
}) => {
  const lengthUrl = length ? `&length=${length}` : "";
  const wordSortingUrl = wordSorting ? `&word_sorting=${wordSorting}` : "";
  const api =
    host +
    `search?letter=${letter}&start=${start || ""}&end=${end || ""}&contain=${
      contain || ""
    }${lengthUrl}&page=${page || ""}&gameId=${gameId || 0}${wordSortingUrl}`;

  try {
    const result = await axios.get(api);
    return result?.data?.data;
  } catch (error) {}
};
export const searchWordThat = async ({
  start,
  end,
  page,
  length,
  wordSorting,
}: {
  start: string;
  end: string;
  length?: number;
  page?: number;
  wordSorting?: string;
}) => {
  const lengthUrl = length ? `&length=${length}` : "";
  const wordSortingUrl = wordSorting ? `&word_sorting=${wordSorting}` : "";
  const api =
    host +
    `search?start=${start || ""}&end=${end || ""}&page=${
      page || ""
    }${lengthUrl}&gameId=0${wordSortingUrl}`;

  try {
    const result = await axios.get(api);
    return result?.data?.data;
  } catch (error) {}
};
export const searchFiveLetters = async ({
  start,
  end,
  two,
  three,
  four,
  contain1,
  contain2,
  contain3,
  contain4,
  contain5,
  not_contain,
  page,
}: {
  contain1?: string;
  contain2?: string;
  contain3?: string;
  contain4?: string;
  contain5?: string;
  start?: string;
  end?: string;
  two?: string;
  three?: string;
  four?: string;
  containUrl?: string;
  not_contain?: string;
  page?: number;
}) => {
  const pageUrl = page ? `&page=${page}` : "";

  let containUrl: any[] = [];
  if (contain1) containUrl.push(contain1);
  if (contain2) containUrl.push(contain2);
  if (contain3) containUrl.push(contain3);
  if (contain4) containUrl.push(contain4);
  if (contain5) containUrl.push(contain5);
  // console.log({ containUrl });
  const api =
    host +
    `search/wordle?start=${start || ""}&end=${end || ""}&two=${
      two || ""
    }&three=${three || ""}&four=${four || ""}&contain=${
      containUrl?.join(",") || ""
    }&notContain=${not_contain?.split("").join(",") || ""}${pageUrl}&limit=80`;
  try {
    const result = await axios.get(api);
    return result?.data?.data;
  } catch (error) {}
};

export const searchDetail = async ({ word }: { word: string }) => {
  const api = host + `search/wordDetailByName?word=${word}`;
  try {
    const result = await axios.get(api);
    return result?.data?.data;
  } catch (error) {}
};

export const summarizeGPT = async (content: string, modeId: number) => {
  const api = host + `gpt/summarize`;
  try {
    const result = await axios.post(api, { content, modeId });
    return result?.data?.data || "";
  } catch (error) {
    console.log(error);
  }
};

export const grammarCheckerGPT = async (content) => {
  const api = host + "gpt/grammar-checker";
  try {
    const result = await axios.post(api, { content });
    return result?.data;
  } catch (error) {
    console.log(error);
  }
};
export const paraphraserGPT = async (content) => {
  const api = host + "gpt/paraphraser";
  try {
    const result = await axios.post(api, { content });
    return result?.data;
  } catch (error) {
    console.log(error);
  }
};

export const randomWord = async (keys) => {
  const { number, type, start, end, compare, size, by } = keys;
  const api =
    host +
    `gpt/random-words?number=${number || ""}&type=${type || ""}&start=${
      start || ""
    }&end=${end || ""}&compare=${compare || ""}&size=${size || ""}&by=${
      by || ""
    }`;

  try {
    const result = await axios.get(api);
    return result?.data;
  } catch (error) {
    console.log(error);
  }
};
