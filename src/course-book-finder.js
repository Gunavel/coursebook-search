const MIN_MATCH_CHAR_LENGTH = 2;
const DEFAULT_SUGGESTIONS_COUNT = 3;
const MIN_COLLECTION_LENGTH_PER_ITERATION = 10000;

class CourseBookFinder {
  constructor(data) {
    this.courseBooksData = data;
    this.summariesCollection = data.summaries;
  }

  search(query, suggestionsCount) {
    if (query.length < MIN_MATCH_CHAR_LENGTH) {
      return [];
    }

    const rawQuery = String(query).toLowerCase();
    const words = rawQuery.split(" ");

    return this._findMatches(rawQuery, words);
  }

  _findMatches(rawQuery, words) {
    const collection = this.summariesCollection;
    const exactMatches = [];
    const partialMatches = [];

    return new Promise(resolve => {
      for (let i = 0, len = collection.length; i < len; i++) {
        const text = String(collection[i].summary).toLowerCase();

        if (text === rawQuery) {
          exactMatches.push({
            summary_id: i
          });
          break;
        }

        let score = 0;

        for (let j = 0, wordsLength = words.length; j < wordsLength; j++) {
          const word = words[j];
          score = score + text.split(word).length - 1;
        }

        partialMatches.push({
          summary_id: i,
          score
        });
      }

      const result = {
        exactMatches,
        partialMatches
      };

      resolve(result);
    });
  }
}

module.exports = CourseBookFinder;
