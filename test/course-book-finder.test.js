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
});

describe("CourseBookFinder: _formatResults", () => {
  let finder;
  beforeEach(() => {
    finder = new CourseBookFinder(mockData);
  });

  afterAll(() => {
    finder = undefined;
  });

  test("should return empty array if there are no matches", () => {
    const mockResults = {
      exactMatches: [],
      partialMatches: []
    };
    const limit = 2;

    const results = finder._formatResults(mockResults, limit);
    expect(results).toEqual([]);
  });

  test("should return exact matches if there is any", () => {
    const mockResults = {
      exactMatches: [
        {
          summary_id: 2
        }
      ],
      partialMatches: []
    };
    const limit = 2;

    const results = finder._formatResults(mockResults, limit);
    expect(results).toEqual([
      {
        summary_id: 2
      }
    ]);
  });

  test("should return sorted partial matches", () => {
    const mockResults = {
      exactMatches: [],
      partialMatches: [
        {
          summary_id: 3,
          score: 10
        },
        {
          summary_id: 5,
          score: 3
        },
        {
          summary_id: 20,
          score: 40
        }
      ]
    };
    const limit = 2;
    const results = finder._formatResults(mockResults, limit);
    expect(results).toEqual([
      {
        summary_id: 20,
        score: 40
      },
      {
        summary_id: 3,
        score: 10
      }
    ]);
  });
});
