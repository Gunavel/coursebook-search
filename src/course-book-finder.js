const MIN_MATCH_CHAR_LENGTH = 2;
const DEFAULT_SUGGESTIONS_COUNT = 3;

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
    const limit = Number(suggestionsCount) || DEFAULT_SUGGESTIONS_COUNT;

    return this._findMatches(rawQuery, words).then(results => {
      const matches = this._formatResults(results, limit);
      const books = this._getCourseBooks(matches);

      return books;
    });
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

  _sortMatches(matches) {
    return matches.sort((a, b) => b.score - a.score);
  }

  _getCourseBooks(matches) {
    const { titles, summaries, authors } = this.courseBooksData;

    const books = matches.map(({ summary_id }) => {
      const { summary } = summaries[summary_id];
      const { author } = authors[summary_id];

      return {
        title: titles[summary_id],
        author,
        summary
      };
    });

    return books;
  }
}

module.exports = CourseBookFinder;
