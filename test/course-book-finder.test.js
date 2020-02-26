const mockData = require("../mock/data.json");
const CourseBookFinder = require("../src/course-book-finder");

describe("CourseBookFinder", () => {
  test("should throw error when called as a function", () => {
    expect(() => {
      CourseBookFinder();
    }).toThrow();
  });
});
