import { STOP_WORDS } from "../../const/STOP_WORDS";

function CalculateKeywordDensity(text) {
    // List of common stopwords

    // Tokenize the text and filter out stopwords and non-alphabetic words
    const words = text.toLowerCase().match(/\b[a-z]+\b/g)?.filter(word => !STOP_WORDS.includes(word));
// console.log({
//     text, words
// })
    // Count occurrences of each word
    const wordCounts = words?.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});

    // Calculate total words for density calculation
    const totalWords = words?.length;

    // Calculate keyword densities and times of appearance
    const keywordData:any = [];
    for (let word in wordCounts) {


        keywordData.push({
            [word]:{
                count: wordCounts[word],
                density: (wordCounts[word] / totalWords) * 100
            }
        })
        // console.log({word,wordCounts})
        //     keywordData[word] = {
        //         count: wordCounts[word],
        //         density: (wordCounts[word] / totalWords) * 100
        //     };
    }

    return keywordData;
}
export default CalculateKeywordDensity