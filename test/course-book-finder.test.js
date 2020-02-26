const mockData = require('../mock/data.json');
const CourseBookFinder = require('../src/api/course-book-finder');

describe('CourseBookFinder: constructor', () => {
  test('should throw error when called as a function', () => {
    expect(() => {
      CourseBookFinder();
    }).toThrow();
  });

  test('should not throw error when called with new keyword', () => {
    expect(() => {
      const finder = new CourseBookFinder(mockData);
    }).not.toThrow();
  });
});

describe('CourseBookFinder: search', () => {
  let finder;
  beforeEach(() => {
    finder = new CourseBookFinder(mockData);
  });

  afterAll(() => {
    finder = undefined;
  });

  test('should return empty array if query length is less than min char length', done => {
    finder._findMatches = jest.fn();

    const query = 'a';
    finder.search(query).then(result => {
      expect(result).toEqual([]);
      expect(finder._findMatches).not.toHaveBeenCalled();
      done();
    });
  });

  test('should call _findMatches function', () => {
    finder._formatResults = jest.fn();
    finder._getCourseBooks = jest.fn();
    finder._findMatches = jest.fn(() => {
      return Promise.resolve();
    });

    const query = 'as';
    finder.search(query);
    expect(finder._findMatches).toHaveBeenCalled();
  });

  test('should call _findMatches function with arguments', () => {
    finder._formatResults = jest.fn();
    finder._getCourseBooks = jest.fn();
    finder._findMatches = jest.fn(() => {
      return Promise.resolve();
    });

    const query = 'is your problems';
    finder.search(query);
    expect(finder._findMatches).toHaveBeenCalledWith('is your problems', [
      'is',
      'your',
      'problems',
    ]);
  });

  test('should call _formatResults function with arguments', done => {
    finder._formatResults = jest.fn();
    finder._getCourseBooks = jest.fn();
    finder._findMatches = jest.fn(() => {
      return Promise.resolve({});
    });

    const query = 'is your problems';
    finder.search(query).then(results => {
      expect(finder._formatResults).toHaveBeenCalledWith({}, 3);
      done();
    });
  });

  test('should call _getCourseBooks function with arguments', done => {
    finder._formatResults = jest.fn(() => []);
    finder._getCourseBooks = jest.fn();
    finder._findMatches = jest.fn(() => {
      return Promise.resolve({});
    });

    const query = 'is your problems';
    finder.search(query).then(results => {
      expect(finder._getCourseBooks).toHaveBeenCalledWith([]);
      done();
    });
  });
});

describe('CourseBookFinder: _findMatches', () => {
  let finder;
  beforeEach(() => {
    finder = new CourseBookFinder(mockData);
  });

  afterAll(() => {
    finder = undefined;
  });

  test('should have exactMatches and partialMatches property in the result', done => {
    finder
      ._findMatches('is your problems', ['is', 'your', 'problems'])
      .then(result => {
        expect(result).toHaveProperty('exactMatches');
        expect(result).toHaveProperty('partialMatches');
        done();
      });
  });
});

describe('CourseBookFinder: _formatResults', () => {
  let finder;
  beforeEach(() => {
    finder = new CourseBookFinder(mockData);
  });

  afterAll(() => {
    finder = undefined;
  });

  test('should return empty array if there are no matches', () => {
    const mockResults = {
      exactMatches: [],
      partialMatches: [],
    };
    const limit = 2;

    const results = finder._formatResults(mockResults, limit);
    expect(results).toEqual([]);
  });

  test('should return exact matches if there is any', () => {
    const mockResults = {
      exactMatches: [
        {
          summary_id: 2,
        },
      ],
      partialMatches: [],
    };
    const limit = 2;

    const results = finder._formatResults(mockResults, limit);
    expect(results).toEqual([
      {
        summary_id: 2,
      },
    ]);
  });

  test('should return sorted partial matches', () => {
    const mockResults = {
      exactMatches: [],
      partialMatches: [
        {
          summary_id: 3,
          score: 10,
        },
        {
          summary_id: 5,
          score: 3,
        },
        {
          summary_id: 20,
          score: 40,
        },
      ],
    };
    const limit = 2;

    const results = finder._formatResults(mockResults, limit);
    expect(results).toEqual([
      {
        summary_id: 20,
        score: 40,
      },
      {
        summary_id: 3,
        score: 10,
      },
    ]);
  });
});

describe('CourseBookFinder: _getCourseBooks', () => {
  let finder;
  beforeEach(() => {
    finder = new CourseBookFinder(mockData);
  });

  afterAll(() => {
    finder = undefined;
  });

  test('should return matching books with title, author and summary', () => {
    const mockMatches = [
      {
        summary_id: 2,
      },
      {
        summary_id: 20,
      },
    ];

    const books = finder._getCourseBooks(mockMatches);
    expect(books).toEqual([
      {
        author: 'Anna Quindlen',
        summary:
          'The Book in Three Sentences: The only thing you have that nobody else has is control of your life. The hardest thing of all is to learn to love the journey, not the destination. Get a real life rather than frantically chasing the next level of success.',
        title: 'Letters from a Self-Made Merchant to His Son',
      },
      {
        author: 'Keith Johnstone',
        summary:
          'The Book in Three Sentences: Many of our behaviors are driven by our desire to achieve a particular level of status relative to those around us. People are continually raising and lowering their status in conversation through body language and words. Say yes to more and stop blocking the opportunities that come your way.',
        title: 'The Art of War',
      },
    ]);
  });
});

describe('CourseBookFinder', () => {
  let finder;
  beforeEach(() => {
    finder = new CourseBookFinder(mockData);
  });

  afterAll(() => {
    finder = undefined;
  });

  test('should find coursebooks for the given query string', done => {
    const result = [
      {
        author: 'Grant Cardone',
        summary:
          'The Book in Three Sentences: The 10X Rule says that 1) you should set targets for yourself that are 10X greater than what you believe you can achieve and 2) you should take actions that are 10X greater than what you believe are necessary to achieve your goals. The biggest mistake most people make in life is not setting goals high enough. Taking massive action is the only way to fulfill your true potential.',
        title: 'The Richest Man in Babylon',
      },
      {
        author: 'Hermann Simon',
        summary:
          'The Book in Three Sentences: Ultimately, profit is the only valid metric for guiding a company, and there are only three ways to influence profit: price, volume, and cost. Of these three factors, prices get the least attention, but have the greatest impact. The price a customer is willing to pay, and therefore the price a company can achieve, is always a reflection of the perceived value of the product or service in the customer’s eyes.',
        title: 'Free Will',
      },
      {
        author: 'Keith Johnstone',
        summary:
          'The Book in Three Sentences: Many of our behaviors are driven by our desire to achieve a particular level of status relative to those around us. People are continually raising and lowering their status in conversation through body language and words. Say yes to more and stop blocking the opportunities that come your way.',
        title: 'The Art of War',
      },
    ];
    const query = 'achieve';

    finder.search(query).then(books => {
      expect(books).toEqual(result);
      done();
    });
  });

  test('should find coursebooks for the given query string and count', done => {
    const result = [
      {
        author: 'Grant Cardone',
        summary:
          'The Book in Three Sentences: The 10X Rule says that 1) you should set targets for yourself that are 10X greater than what you believe you can achieve and 2) you should take actions that are 10X greater than what you believe are necessary to achieve your goals. The biggest mistake most people make in life is not setting goals high enough. Taking massive action is the only way to fulfill your true potential.',
        title: 'The Richest Man in Babylon',
      },
    ];
    const query = 'achieve';
    const limit = 1;

    finder.search(query, limit).then(books => {
      expect(books).toEqual(result);
      done();
    });
  });

  test('should find coursebooks for the given query string and count', done => {
    const result = [
      {
        author: 'Mark Manson',
        summary:
          'The Book in Three Sentences: Finding something important and meaningful in your life is the most productive use of your time and energy. This is true because every life has problems associated with it and finding meaning in your life will help you sustain the effort needed to overcome the particular problems you face. Thus, we can say that the key to living a good life is not giving a fuck about more things, but rather, giving a fuck only about the things that align with your personal values.',
        title: 'Slipstream Time Hacking',
      },
    ];
    const query = 'is your problems';
    const limit = 1;

    finder.search(query, limit).then(books => {
      expect(books).toEqual(result);
      done();
    });
  });

  test('should have exactMatch if raw query matches', done => {
    const result = [
      {
        author: 'Grant Cardone',
        summary:
          'The Book in Three Sentences: The 10X Rule says that 1) you should set targets for yourself that are 10X greater than what you believe you can achieve and 2) you should take actions that are 10X greater than what you believe are necessary to achieve your goals. The biggest mistake most people make in life is not setting goals high enough. Taking massive action is the only way to fulfill your true potential.',
        title: 'The Richest Man in Babylon',
      },
    ];
    const query =
      'The Book in Three Sentences: The 10X Rule says that 1) you should set targets for yourself that are 10X greater than what you believe you can achieve and 2) you should take actions that are 10X greater than what you believe are necessary to achieve your goals. The biggest mistake most people make in life is not setting goals high enough. Taking massive action is the only way to fulfill your true potential.';
    const limit = 1;

    finder.search(query, limit).then(books => {
      expect(books).toEqual(result);
      done();
    });
  });
});
