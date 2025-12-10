import { generateDrivingLicense, PersonDetails } from "../src/drivingLicense";
import driversData from "../src/assets/drivers.json";

const drivers = driversData as PersonDetails[];

/**
 * UK Driving License Generator Tests
 *
 * These tests verify that your implementation correctly generates
 * driving license numbers for the test cases provided.
 *
 * YOUR TASK: Implement the generateDrivingLicense function to make these tests pass.
 *
 * ADDITIONAL REQUIREMENT: You should also write your own tests for:
 * - Input validation (invalid/missing fields)
 * - Edge cases (leap years, different decades, etc.)
 * - Special character handling
 * - Any other scenarios you think are important
 */

describe("UK Driving License Generator - Main Tests", () => {
  it("Test Case 1: John Smith (Male, no middle name)", () => {
    const details: PersonDetails = drivers[0];

    const license = generateDrivingLicense(details);
    expect(license).toBe("SMITH905150J99AA");
  });

  it("Test Case 2: Jane Mary Brown (Female, with middle name)", () => {
    const details: PersonDetails = drivers[1];

    const license = generateDrivingLicense(details);
    expect(license).toBe("BROWN852041JM9AA");
  });

  it("Test Case 3: Bob Lee (Male, short surname)", () => {
    const details: PersonDetails = drivers[2];

    const license = generateDrivingLicense(details);
    expect(license).toBe("LEE99912255B99AA");
  });

  it("Test Case 4: Sarah Jane Johnson (Female, with middle name)", () => {
    const details: PersonDetails = drivers[3];

    const license = generateDrivingLicense(details);
    expect(license).toBe("JOHNS951202SJ9AA");
  });

  it("Test Case 5: Alexander Montgomery (Male, long surname)", () => {
    const details: PersonDetails = drivers[4];

    const license = generateDrivingLicense(details);
    expect(license).toBe("MONTG807108A99AA");
  });

  it("Test Case 6: Charlie Anderson (Male, no middle name)", () => {
    const details: PersonDetails = drivers[5];

    const license = generateDrivingLicense(details);
    expect(license).toBe("ANDER903125C99AA");
  });

  it("Test Case 7: Morgan Riley Taylor (Female, with middle name)", () => {
    const details: PersonDetails = drivers[6];

    const license = generateDrivingLicense(details);
    expect(license).toBe("TAYLO861087MR9AA");
  });

  it("Test Case 8: Jordan Kim (Female, short surname)", () => {
    const details: PersonDetails = drivers[7];

    const license = generateDrivingLicense(details);
    expect(license).toBe("KIM99007220J99AA");
  });

  it("Test Case 9: Alex Sam Rodriguez (Male, with middle name)", () => {
    const details: PersonDetails = drivers[8];

    const license = generateDrivingLicense(details);
    expect(license).toBe("RODRI909142AS9AA");
  });

  it("Test Case 10: Casey O'Brien (Male, surname with apostrophe)", () => {
    const details: PersonDetails = drivers[9];

    const license = generateDrivingLicense(details);
    expect(license).toBe("OBRIE812305C99AA");
  });
});

/**
 * ADD YOUR OWN TESTS BELOW
 *
 * Consider testing:
 * - What happens with invalid inputs?
 * - How does your code handle edge cases?
 * - Are there any assumptions that should be validated?
 *
 * Example test structure:
 *
 * describe('Input Validation', () => {
 *   it('should throw error for missing first name', () => {
 *     // Your test here
 *   });
 * });
 */
