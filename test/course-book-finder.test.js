const mockData = require("../mock/data.json");
const CourseBookFinder = require("../src/course-book-finder");

describe("CourseBookFinder: constructor", () => {
  test("should throw error when called as a function", () => {
    expect(() => {
      CourseBookFinder();
    }).toThrow();
  });

  test("should not throw error when called with new keyword", () => {
    expect(() => {
      const finder = new CourseBookFinder(mockData);
    }).not.toThrow();
  });
});

describe("CourseBookFinder: search", () => {
  let finder;
  beforeEach(() => {
    finder = new CourseBookFinder(mockData);
  });

  afterAll(() => {
    finder = undefined;
  });

  test("should return empty array if query length is less than min char length", () => {
    finder._findMatches = jest.fn();
    const result = finder.search("a");

    expect(result).toEqual([]);
    expect(finder._findMatches).not.toHaveBeenCalled();
  });

  test("should call _findMatches function", () => {
    finder._findMatches = jest.fn();
    finder.search("as");

    expect(finder._findMatches).toHaveBeenCalled();
  });

  test("should call _findMatches function with arguments", () => {
    finder._findMatches = jest.fn();
    finder.search("is your problems");

    expect(finder._findMatches).toHaveBeenCalledWith("is your problems", [
      "is",
      "your",
      "problems"
    ]);
  });
});

describe("CourseBookFinder: _findMatches", () => {
  let finder;
  beforeEach(() => {
    finder = new CourseBookFinder(mockData);
  });

  afterAll(() => {
    finder = undefined;
  });

  test("should have exactMatches and partialMatches property in the result", done => {
    finder
      ._findMatches("is your problems", ["is", "your", "problems"])
      .then(result => {
        expect(result).toHaveProperty("exactMatches");
        expect(result).toHaveProperty("partialMatches");
        done();
      });
  });

  test("should have exactMatch if raw query matches", done => {
    const rawQuery =
      "The Book in Three Sentences: Seek out new ideas and try new things. When trying something new, do it on a scale where failure is survivable. Seek out feedback and learn from your mistakes as you go along.";
    finder._findMatches(rawQuery, []).then(result => {
      expect(result.exactMatches).toEqual([{ summary_id: 0 }]);
      done();
    });
  });
});
