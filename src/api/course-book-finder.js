const MIN_MATCH_CHAR_LENGTH = 2;
const DEFAULT_SUGGESTIONS_COUNT = 3;

class CourseBookFinder {
  constructor(data) {
    this.courseBooksData = data;
    this.summariesCollection = data.summaries;
  }

  /**
   * For a given query and suggestions count, searches the summaries collection and returns
   * a Promise which resolves to collection of matching books
   * @param {String} query
   * @param {Number} suggestionsCount
   *
   * @returns SearchPromise {Array.<{title: String, author: String, summary: String}>}
   */
  search(query, suggestionsCount) {
    if (query.length < MIN_MATCH_CHAR_LENGTH) {
      return Promise.resolve([]);
    }

    const rawQuery = String(query).toLowerCase();
    const words = rawQuery.split(' ');
    const limit = Number(suggestionsCount) || DEFAULT_SUGGESTIONS_COUNT;

    return this._findMatches(rawQuery, words).then(results => {
      const matches = this._formatResults(results, limit);
      const books = this._getCourseBooks(matches);

      return books;
    });
  }

  /**
   * For a given rawQuery and words, runs through summaries collection to look for exact or partial match
   * Exact match - if rawQuery matches the summary
   * Partial match - is evaluated based on the number of occurences of the words in the summary
   * Partial match score - sum of occurences of each word
   * @param {String} rawQuery
   * @param {Array} words
   *
   * @returns {{exactMatches: Array.<{summary_id: Number}>, partialMatches: Array.<{summary_id: Number, score: Number}}
   */
  _findMatches(rawQuery, words) {
    const collection = this.summariesCollection;
    const exactMatches = [];
    const partialMatches = [];

    return new Promise(resolve => {
      for (let i = 0, len = collection.length; i < len; i++) {
        const text = String(collection[i].summary).toLowerCase();

        if (text === rawQuery) {
          exactMatches.push({
            summary_id: i,
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
          score,
        });
      }

      const result = {
        exactMatches,
        partialMatches,
      };

      resolve(result);
    });
  }

  /**
   * Given a match results, returns top matches based on the provided limit
   * Returns exactMatches if there is any otherwise picks from partialMatches.
   * @param {Array.<{exactMatches: Array, partialMatches: Array}>} results
   * @param {Number} limit
   *
   * @returns {Array.<{summary_id: Number, ?score: Number}>}
   */
  _formatResults(results, limit) {
    const { exactMatches, partialMatches } = results;
    let matches = [];

    if (exactMatches.length > 0) {
      matches.push(exactMatches[0]);
    } else {
      const sortedPartialMatches = this._sortMatches(partialMatches);
      matches = sortedPartialMatches.slice(0, limit);
    }

    return matches;
  }

  /**
   * Given a matches collection, returns a sorted collection based on score in descending order
   * @param {Array.<{score: Number, summary_id: Number}>} matches
   *
   * @returns {Array.<{score: Number, summary_id: Number}>}
   */
  _sortMatches(matches) {
    return matches.sort((a, b) => b.score - a.score);
  }

  /**
   * Given a matches collection, returns collection of matching books
   * Since 1:1 relation exists between titles, summaries and authors,
   * the value at the specified index in the array equal to summary_id is picked
   * @param {Array.<{score: Number, summary_id: Number}>} matches
   *
   * @returns {Array.<{title: String, author: String, summary: String}>}
   */
  _getCourseBooks(matches) {
    const { titles, summaries, authors } = this.courseBooksData;

    const books = matches.map(({ summary_id }) => {
      const { summary } = summaries[summary_id];
      const { author } = authors[summary_id];

      return {
        title: titles[summary_id],
        author,
        summary,
      };
    });

    return books;
  }
}

module.exports = CourseBookFinder;
