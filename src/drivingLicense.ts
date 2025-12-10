/**
 * Represents a person's details for generating a UK driving license number
 */
export interface PersonDetails {
  firstName: string;
  middleName?: string;
  surname: string;
  dateOfBirth: string; // Format: DD/MM/YYYY
  gender: "M" | "F";
}

/**
 * Generates a UK driving license number from person details
 *
 * UK Driving License Format (16 characters):
 * - Positions 1-5: First 5 characters of surname (padded with 9s if shorter)
 * - Position 6: Decade digit of birth year
 * - Positions 7-8: Month of birth (add 50 for females)
 * - Positions 9-10: Day of birth
 * - Position 11: Year digit of birth year
 * - Positions 12-13: Initials (first and middle, use 9 if no middle name)
 * - Position 14: Computer check digit (arbitrary, usually 9)
 * - Positions 15-16: Computer check digits (arbitrary, usually AA)
 *
 * @param details - Person's details including name, DOB, and gender
 * @returns UK driving license number (16 characters)
 *
 * @example
 * ```typescript
 * const license = generateDrivingLicense({
 *   firstName: 'John',
 *   surname: 'Smith',
 *   dateOfBirth: '15/05/1990',
 *   gender: 'M'
 * });
 * // Returns: SMITH905150J99AA
 * ```
 */
export function generateDrivingLicense(details: PersonDetails): string {
  // TODO: Implement this function following TDD principles
  // The tests will guide you on what to implement

  throw new Error("Not implemented - this is your task!");
}
